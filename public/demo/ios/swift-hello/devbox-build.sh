#!/usr/bin/env bash
# Builds an iOS app and installs it on the iPhone or iPad, from the host, through the dev-box.
#
#   ./devbox-build.sh [step] [options]
#
# Put this file in the directory of the app (next to its project.yml or .xcodeproj, or its pubspec.yaml for Flutter),
# make it executable (chmod +x devbox-build.sh), then run it in a terminal of the host, NOT in the box. It does
# nothing by itself: it asks the dev-box that is already running (docker exec) to do the work, with
# `devbox ios xcode` (or flutter/build.sh of omarchy-apple-dev for a Flutter project).
#
# Steps:
#   run       builds, signs, installs on the device and launches the app (the default)
#   project   only generates the project (XcodeGen, then the xtool package)
#   build     only builds, unsigned (handy to check that the code compiles)
#   install   signs and installs on the device
#   launch    launches the app already installed (the running one is stopped first)
#   logs      shows the logs of the app on the device (Ctrl-C to stop)
#   pair      pairs the device plugged in over USB for Wi-Fi, once (iOS 27, devbox ios pair)
#   status    the state of the box: SDK, Apple sign-in, paired devices (devbox ios status)
#   shell     a shell in the box, in the directory of the app, with the same rights as the steps
#   key <AuthKey_XXXX.p8>  copies an App Store Connect API key into the box
#
# Examples:
#   ./devbox-build.sh                          everything, device plugged in over USB
#   ./devbox-build.sh build                    only builds
#   ./devbox-build.sh run --wifi 100.x.y.z     everything over Wi-Fi (iOS 27, after ./devbox-build.sh pair)
#   IOS_WIFI=100.x.y.z ./devbox-build.sh logs  the logs, over Wi-Fi
#   ./devbox-build.sh build --configuration Release
# The options after the step are those of devbox ios xcode: ./devbox-build.sh --help lists them all.
#
# Variables, given in front of the command (VARIABLE=value ./devbox-build.sh) when the defaults do not fit:
#   DEVBOX_CONTAINER  name of the container of the box (default: dev-box)
#   DEVBOX_PROJECTS   directory of the host mounted on ~/projets in the box (default: the one Docker reports,
#                     otherwise ~/dev-box/data/projets)
#   DEVBOX_USER       the user of the box (default: dev)
#   IOS_WIFI          address of the device over Wi-Fi (like --wifi)
#   IOS_UDID          the device to use over Wi-Fi, when several are paired
#
# Needs, once: the box running, and in it devbox dev-env ios, the SDK (devbox ios sdk) and the Apple sign-in
# (xtool auth). The whole path, step by step: devbox help ios, in the box. Source of this script:
# https://github.com/c4software/dev-box/blob/main/scripts/devbox-build.sh
set -euo pipefail

# ---------------------------------------------------------------------------------------------------------------------
# Settings of the app: the only part to adapt.
# ---------------------------------------------------------------------------------------------------------------------
# The target of the app, when the project has several (empty: the only one of the project)
APP_TARGET=""
# The build configuration: Debug while developing
APP_CONFIGURATION="Debug"
# Kotlin Multiplatform: the Gradle module that produces the iOS framework (for example :shared), empty otherwise
APP_KMP=""
# Other options of devbox ios xcode, always added (for example: --signed-suffix .kmp)
APP_OPTIONS=()

# ---------------------------------------------------------------------------------------------------------------------
# Nothing below needs to change.
# ---------------------------------------------------------------------------------------------------------------------
HERE="$(cd "$(dirname "$0")" && pwd)"
BOX="${DEVBOX_CONTAINER:-dev-box}"
BOX_USER="${DEVBOX_USER:-dev}"
BOX_PROJECTS="/home/$BOX_USER/projets"

err() { echo "devbox-build: $*" >&2; }

# A Flutter project (pubspec.yaml) builds with flutter/build.sh of omarchy-apple-dev, everything else with
# devbox ios xcode
KIND=xcode
[ -f "$HERE/pubspec.yaml" ] && KIND=flutter

box_running() { [ "$(docker inspect -f '{{.State.Running}}' "$BOX" 2>/dev/null)" = true ]; }

# This script runs on the host: in the box, the devbox command exists
if command -v devbox >/dev/null 2>&1 || [ -f /etc/devbox/release ]; then
  err "run it on the host, not in the box."
  err "In the box, use devbox ios xcode directly: devbox ios xcode --help"
  exit 1
fi

case "${1:-}" in
-h | --help)
  # The header of this file, then the help of devbox ios xcode
  sed -n '2,/^set -euo pipefail/p' "$0" | sed '$d; s/^# \{0,1\}//'
  if box_running; then
    echo
    docker exec -u 0:0 -e USER_NAME="$BOX_USER" "$BOX" devbox ios xcode --help 2>/dev/null ||
      echo "(no devbox ios xcode in the box: update it)"
  fi
  exit 0
  ;;
esac

command -v docker >/dev/null 2>&1 || { err "docker not found on this machine."; exit 1; }
if ! box_running; then
  err "the box (container \"$BOX\") is not running. Start it:"
  err "  cd ~/dev-box && docker compose up -d"
  err "(another container name: DEVBOX_CONTAINER=<name> ./devbox-build.sh)"
  exit 1
fi

# Everything runs as root in the box, with the tools, the SDK and the Apple sign-in of the box's user (devbox ios
# takes them). With rootless Docker, root in the box is the user of the host: the files written in the project belong
# to them. With classic Docker, they are given back to their owner at the end (see give_back).
as_root=(-u 0:0 -e USER_NAME="$BOX_USER")

# Directory of the host mounted on ~/projets in the box
projects="${DEVBOX_PROJECTS:-}"
if [ -z "$projects" ]; then
  projects="$(docker inspect -f "{{range .Mounts}}{{if eq .Destination \"$BOX_PROJECTS\"}}{{.Source}}{{end}}{{end}}" "$BOX")"
  [ -d "$projects" ] || projects="$HOME/dev-box/data/projets"
fi
projects="$(cd "$projects" 2>/dev/null && pwd)" || {
  err "projects directory not found: $projects (set DEVBOX_PROJECTS)"
  exit 1
}

# Path of a directory of the host, as the box sees it
inside() {
  local path
  path="$(cd "$1" && pwd)"
  case "$path/" in
  "$projects"/*) echo "$BOX_PROJECTS/${path#"$projects"/}" ;;
  *)
    err "$path is not under $projects: the box cannot see it."
    err "Move the project there (or set DEVBOX_PROJECTS)."
    exit 1
    ;;
  esac
}
here_in_box="$(inside "$HERE")"

# Is the iOS environment of the box ready? Otherwise, say what to do.
check_ios() {
  local status
  if ! status="$(docker exec "${as_root[@]}" "$BOX" devbox ios status 2>&1)"; then
    echo "$status" >&2
    err "the iOS environment is not installed. In the box: devbox dev-env ios, then devbox help ios"
    exit 1
  fi
  if ! grep -q 'SDK *registered' <<<"$status"; then
    err "the iOS SDK is not ready. In the box: devbox ios sdk (with the .xip of Xcode in the home)"
    exit 1
  fi
  if ! grep -q 'Apple *signed in' <<<"$status"; then
    err "the box is not signed in to Apple. In the box: xtool auth"
    exit 1
  fi
  if [ "$KIND" = flutter ] && ! docker exec "${as_root[@]}" "$BOX" bash -c \
    '. /usr/share/devbox/lib/ios-common.sh && ios_root_env && command -v flutter' >/dev/null 2>&1; then
    err "Flutter is not installed. In the box: devbox dev-env flutter"
    exit 1
  fi
}

# With classic Docker, root in the box is root on the host too: the files the build creates (build/, .gradle/...)
# are given back to the owner of the project. With rootless Docker there is nothing to do.
top="$HERE"
if [ -n "$APP_KMP" ]; then
  # Kotlin Multiplatform project: Gradle also writes in the directory of gradlew, above
  while [ "$top" != / ] && [ ! -x "$top/gradlew" ]; do top="$(dirname "$top")"; done
  [ "$top" != / ] || top="$HERE"
fi
give_back() {
  local dir owner
  dir="$(inside "$top")"
  owner="$(docker exec -u 0:0 "$BOX" stat -c %u:%g "$dir" 2>/dev/null)" || return 0
  [ "$owner" = 0:0 ] && return 0
  docker exec -u 0:0 "$BOX" find "$dir" ! -user "${owner%%:*}" -exec chown -h "$owner" {} + 2>/dev/null || true
}

# Wi-Fi address and device picked, passed to the box; USBMUXD_SOCKET_ADDRESS for a device plugged into another
# machine (devbox help ios-usb)
envs=()
for var in IOS_WIFI IOS_UDID USBMUXD_SOCKET_ADDRESS; do
  [ -z "${!var:-}" ] || envs+=(-e "$var=${!var}")
done

step="${1:-run}"
case "$step" in
status)
  exec docker exec "${envs[@]}" "${as_root[@]}" "$BOX" devbox ios status
  ;;
pair)
  check_ios
  exec docker exec "${envs[@]}" "${as_root[@]}" "$BOX" devbox ios pair
  ;;
shell)
  # bash as root, with the environment devbox ios takes as root (tools, SDK, Apple sign-in)
  exec docker exec -it "${envs[@]}" "${as_root[@]}" -w "$here_in_box" "$BOX" \
    bash -c '. /usr/share/devbox/lib/ios-common.sh && ios_root_env && exec bash -l'
  ;;
key)
  # App Store Connect API key (AuthKey_<Key ID>.p8) put where xtool looks for it
  key="${2:-}"
  [ -f "$key" ] || { err "key not found: \"$key\" (./devbox-build.sh key ~/Downloads/AuthKey_XXXX.p8)"; exit 1; }
  name="$(basename "$key")"
  [[ "$name" == AuthKey_*.p8 ]] || { err "$name: expected AuthKey_<Key ID>.p8"; exit 1; }
  dir="/home/$BOX_USER/.appstoreconnect/private_keys"
  docker exec -u "$BOX_USER" "$BOX" mkdir -p "$dir"
  docker cp "$key" "$BOX:$dir/$name"
  docker exec -u 0:0 "$BOX" chown "$BOX_USER:" "$dir/$name"
  docker exec -u 0:0 "$BOX" chmod 600 "$dir/$name"
  echo "Key copied into the box: $dir/$name"
  echo "Then, in the box: xtool auth login --mode key"
  exit 0
  ;;
run | project | build | install | launch | logs) shift || true ;;
-*) step=run ;;
*)
  err "unknown step: $step (./devbox-build.sh --help)"
  exit 1
  ;;
esac

check_ios
trap give_back EXIT

# -it for the logs (Ctrl-C), only from a terminal
tty=()
[ "$step" = logs ] && [ -t 0 ] && tty=(-it)

if [ "$KIND" = flutter ]; then
  # Flutter: flutter/build.sh of omarchy-apple-dev builds (build), or builds and installs over USB (run, install)
  case "$step" in
  build) flutter_opts=() ;;
  run | install) flutter_opts=(--install) ;;
  *)
    err "no $step step for a Flutter project: build, run or install."
    exit 1
    ;;
  esac
  if [ -n "${IOS_WIFI:-}" ] || [[ " $* " == *" --wifi "* ]]; then
    err "a Flutter project installs over USB only (xtool install), not over Wi-Fi."
    exit 1
  fi
  docker exec "${envs[@]}" "${as_root[@]}" -w "$here_in_box" "$BOX" bash -c \
    '. /usr/share/devbox/lib/ios-common.sh && ios_root_env && "$OAD_DIR/flutter/build.sh" "$@"' \
    _ "${flutter_opts[@]}" . "$@"
  exit
fi

# The settings of the app, then those of the command line
opts=(--configuration "$APP_CONFIGURATION")
[ -z "$APP_TARGET" ] || opts+=(--target "$APP_TARGET")
[ -z "$APP_KMP" ] || opts+=(--kmp "$APP_KMP")
opts+=("${APP_OPTIONS[@]}")

docker exec "${tty[@]}" "${envs[@]}" "${as_root[@]}" -w "$here_in_box" "$BOX" \
  devbox ios xcode . "$step" "${opts[@]}" "$@"
