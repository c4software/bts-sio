#!/usr/bin/env bash
# Construit votre application iOS et l'installe sur l'iPhone, depuis votre machine (l'hôte), avec la dev-box.
#
#   ./devbox-build.sh [étape] [options]
#
# Posez ce fichier dans le dossier du projet (à côté de project.yml, ou du pubspec.yaml pour Flutter), rendez-le
# exécutable (chmod +x devbox-build.sh), puis lancez-le depuis un terminal de votre machine, PAS dans la dev-box.
# Il ne fait rien lui-même : il demande à votre dev-box (docker exec) de faire le travail, avec la commande
# `devbox ios xcode` (ou flutter/build.sh d'omarchy-apple-dev pour un projet Flutter).
#
# Étapes :
#   run       compile, signe, installe sur l'iPhone et lance l'application (par défaut)
#   project   génère seulement le projet (XcodeGen, puis le paquet xtool)
#   build     compile seulement, sans signer (pratique pour vérifier que le code compile)
#   install   signe et installe sur l'iPhone
#   launch    lance l'application déjà installée (celle qui tourne est d'abord arrêtée)
#   logs      affiche les logs de l'application sur l'iPhone (Ctrl-C pour arrêter)
#   pair      associe l'iPhone branché en USB pour le Wi-Fi, une seule fois (iOS 27, devbox ios pair)
#   status    état de la dev-box : SDK, connexion Apple, appareils associés (devbox ios status)
#   shell     ouvre un terminal dans la dev-box, dans le dossier du projet, avec les mêmes droits que les étapes
#   key <AuthKey_XXXX.p8>  copie votre clé d'API App Store Connect dans la dev-box
#
# Exemples :
#   ./devbox-build.sh                          tout, iPhone branché en USB
#   ./devbox-build.sh build                    compile seulement
#   ./devbox-build.sh run --wifi 100.x.y.z     tout, en Wi-Fi (iOS 27, après ./devbox-build.sh pair)
#   IOS_WIFI=100.x.y.z ./devbox-build.sh logs  les logs, en Wi-Fi
#   ./devbox-build.sh build --configuration Release
# Les options après l'étape sont celles de devbox ios xcode : ./devbox-build.sh --help les liste toutes.
#
# Variables, à donner devant la commande (VARIABLE=valeur ./devbox-build.sh) si les valeurs par défaut ne vous
# conviennent pas :
#   DEVBOX_CONTAINER  nom du conteneur de votre dev-box (défaut : dev-box)
#   DEVBOX_PROJECTS   dossier de votre machine monté sur ~/projets dans la dev-box (défaut : celui que Docker
#                     indique, sinon ~/dev-box/data/projets)
#   DEVBOX_USER       votre utilisateur dans la dev-box (défaut : dev)
#   IOS_WIFI          adresse de l'iPhone en Wi-Fi (comme --wifi)
#   IOS_UDID          l'iPhone à utiliser en Wi-Fi, si plusieurs sont associés
#
# Prérequis (support « iOS sans Mac : préparer la dev-box », https://cours.brosseau.ovh/tp/ios/introduction.html) :
# la dev-box démarrée, et dedans devbox dev-env ios, le SDK (devbox ios sdk), la connexion à Apple (xtool auth login).
set -euo pipefail

# ---------------------------------------------------------------------------------------------------------------------
# Réglages propres à votre application : c'est la seule partie à adapter.
# ---------------------------------------------------------------------------------------------------------------------
# La cible de l'application, si le projet en a plusieurs (vide : la seule du projet)
APP_TARGET=""
# La configuration de build : Debug pendant le développement
APP_CONFIGURATION="Debug"
# Kotlin Multiplateforme : le module Gradle qui produit le framework iOS (par exemple :shared), vide sinon
APP_KMP=""
# Autres options de devbox ios xcode, toujours ajoutées (par exemple : --signed-suffix .kmp)
APP_OPTIONS=()

# ---------------------------------------------------------------------------------------------------------------------
# La suite n'a pas besoin d'être modifiée.
# ---------------------------------------------------------------------------------------------------------------------
HERE="$(cd "$(dirname "$0")" && pwd)"
BOX="${DEVBOX_CONTAINER:-dev-box}"
BOX_USER="${DEVBOX_USER:-dev}"
BOX_PROJECTS="/home/$BOX_USER/projets"

err() { echo "devbox-build : $*" >&2; }

# Un projet Flutter (pubspec.yaml) se construit avec flutter/build.sh d'omarchy-apple-dev, le reste avec
# devbox ios xcode
KIND=xcode
[ -f "$HERE/pubspec.yaml" ] && KIND=flutter

box_running() { [ "$(docker inspect -f '{{.State.Running}}' "$BOX" 2>/dev/null)" = true ]; }

# Ce script se lance depuis votre machine : dans la dev-box, la commande devbox existe
if command -v devbox >/dev/null 2>&1 || [ -f /etc/devbox/release ]; then
  err "à lancer depuis votre machine (l'hôte), pas dans la dev-box."
  err "Dans la dev-box, utilisez directement : devbox ios xcode --help"
  exit 1
fi

case "${1:-}" in
-h | --help)
  # L'en-tête de ce fichier, puis l'aide de devbox ios xcode
  sed -n '2,/^set -euo pipefail/p' "$0" | sed '$d; s/^# \{0,1\}//'
  if box_running; then
    echo
    docker exec -u 0:0 -e USER_NAME="$BOX_USER" "$BOX" devbox ios xcode --help 2>/dev/null ||
      echo "(devbox ios xcode est absente de la dev-box : mettez-la à jour)"
  fi
  exit 0
  ;;
esac

command -v docker >/dev/null 2>&1 || { err "docker est introuvable sur cette machine."; exit 1; }
if ! box_running; then
  err "la dev-box (conteneur « $BOX ») ne tourne pas. Démarrez-la :"
  err "  cd ~/dev-box && docker compose up -d"
  err "(autre nom de conteneur : DEVBOX_CONTAINER=<nom> ./devbox-build.sh)"
  exit 1
fi

# Tout est lancé en root dans la dev-box, avec les outils, le SDK et la connexion Apple de votre utilisateur
# (devbox ios le prévoit). Avec Docker « rootless », root dans la dev-box est votre utilisateur sur la machine : les
# fichiers écrits dans le projet vous appartiennent. Avec Docker classique, ils sont rendus à leur propriétaire à la fin
# (voir give_back).
as_root=(-u 0:0 -e USER_NAME="$BOX_USER")

# Dossier de votre machine monté sur ~/projets dans la dev-box
projects="${DEVBOX_PROJECTS:-}"
if [ -z "$projects" ]; then
  projects="$(docker inspect -f "{{range .Mounts}}{{if eq .Destination \"$BOX_PROJECTS\"}}{{.Source}}{{end}}{{end}}" "$BOX")"
  [ -d "$projects" ] || projects="$HOME/dev-box/data/projets"
fi
projects="$(cd "$projects" 2>/dev/null && pwd)" || {
  err "dossier des projets introuvable : $projects (réglez DEVBOX_PROJECTS)"
  exit 1
}

# Chemin d'un dossier de votre machine, vu depuis la dev-box
inside() {
  local path
  path="$(cd "$1" && pwd)"
  case "$path/" in
  "$projects"/*) echo "$BOX_PROJECTS/${path#"$projects"/}" ;;
  *)
    err "$path n'est pas dans $projects : la dev-box ne le voit pas."
    err "Placez le projet dans ce dossier (ou réglez DEVBOX_PROJECTS)."
    exit 1
    ;;
  esac
}
here_in_box="$(inside "$HERE")"

# L'environnement iOS de la dev-box est-il prêt ? Sinon, on dit quoi faire.
check_ios() {
  local status
  if ! status="$(docker exec "${as_root[@]}" "$BOX" devbox ios status 2>&1)"; then
    echo "$status" >&2
    err "l'environnement iOS n'est pas installé. Dans la dev-box : devbox dev-env ios"
    err "(détails : https://cours.brosseau.ovh/tp/ios/introduction.html)"
    exit 1
  fi
  if ! grep -q 'SDK *registered' <<<"$status"; then
    err "le SDK iOS n'est pas prêt. Dans la dev-box : devbox ios sdk (avec le .xip de Xcode dans votre dossier personnel)"
    exit 1
  fi
  if ! grep -q 'Apple *signed in' <<<"$status"; then
    err "la dev-box n'est pas connectée à votre compte Apple. Dans la dev-box : xtool auth login"
    exit 1
  fi
  if [ "$KIND" = flutter ] && ! docker exec "${as_root[@]}" "$BOX" bash -c \
    '. /usr/share/devbox/lib/ios-common.sh && ios_root_env && command -v flutter' >/dev/null 2>&1; then
    err "Flutter n'est pas installé. Dans la dev-box : devbox dev-env flutter (voir le TP Flutter)"
    exit 1
  fi
}

# Avec Docker classique, root dans la dev-box est aussi root sur votre machine : les fichiers créés par le build
# (build/, .gradle/…) sont rendus au propriétaire du projet. Avec Docker rootless, il n'y a rien à faire.
top="$HERE"
if [ -n "$APP_KMP" ]; then
  # Projet Kotlin Multiplateforme : Gradle écrit aussi dans le dossier du gradlew, au-dessus
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

# Adresse Wi-Fi et choix de l'iPhone transmis à la dev-box ; USBMUXD_SOCKET_ADDRESS pour l'iPhone branché sur une
# autre machine (devbox help ios-usb)
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
  # bash en root, avec l'environnement que devbox ios prend en root (outils, SDK, connexion Apple)
  exec docker exec -it "${envs[@]}" "${as_root[@]}" -w "$here_in_box" "$BOX" \
    bash -c '. /usr/share/devbox/lib/ios-common.sh && ios_root_env && exec bash -l'
  ;;
key)
  # Clé d'API App Store Connect (AuthKey_<Key ID>.p8) mise là où xtool la cherche
  key="${2:-}"
  [ -f "$key" ] || { err "clé introuvable : « $key » (./devbox-build.sh key ~/Téléchargements/AuthKey_XXXX.p8)"; exit 1; }
  name="$(basename "$key")"
  [[ "$name" == AuthKey_*.p8 ]] || { err "$name : nom attendu AuthKey_<Key ID>.p8"; exit 1; }
  dir="/home/$BOX_USER/.appstoreconnect/private_keys"
  docker exec -u "$BOX_USER" "$BOX" mkdir -p "$dir"
  docker cp "$key" "$BOX:$dir/$name"
  docker exec -u 0:0 "$BOX" chown "$BOX_USER:" "$dir/$name"
  docker exec -u 0:0 "$BOX" chmod 600 "$dir/$name"
  echo "Clé copiée dans la dev-box : $dir/$name"
  echo "Puis, dans la dev-box : xtool auth login --mode key"
  exit 0
  ;;
run | project | build | install | launch | logs) shift || true ;;
-*) step=run ;;
*)
  err "étape inconnue : $step (./devbox-build.sh --help)"
  exit 1
  ;;
esac

check_ios
trap give_back EXIT

# -it pour les logs (Ctrl-C), seulement depuis un terminal
tty=()
[ "$step" = logs ] && [ -t 0 ] && tty=(-it)

if [ "$KIND" = flutter ]; then
  # Flutter : flutter/build.sh d'omarchy-apple-dev compile (build), ou compile et installe par USB (run, install)
  case "$step" in
  build) flutter_opts=() ;;
  run | install) flutter_opts=(--install) ;;
  *)
    err "l'étape $step n'existe pas pour un projet Flutter : build, run ou install."
    exit 1
    ;;
  esac
  if [ -n "${IOS_WIFI:-}" ] || [[ " $* " == *" --wifi "* ]]; then
    err "un projet Flutter s'installe seulement par USB (xtool install), pas en Wi-Fi."
    exit 1
  fi
  docker exec "${envs[@]}" "${as_root[@]}" -w "$here_in_box" "$BOX" bash -c \
    '. /usr/share/devbox/lib/ios-common.sh && ios_root_env && "$OAD_DIR/flutter/build.sh" "$@"' \
    _ "${flutter_opts[@]}" . "$@"
  exit
fi

# Les options propres à l'application, puis celles de la ligne de commande
opts=(--configuration "$APP_CONFIGURATION")
[ -z "$APP_TARGET" ] || opts+=(--target "$APP_TARGET")
[ -z "$APP_KMP" ] || opts+=(--kmp "$APP_KMP")
opts+=("${APP_OPTIONS[@]}")

docker exec "${tty[@]}" "${envs[@]}" "${as_root[@]}" -w "$here_in_box" "$BOX" \
  devbox ios xcode . "$step" "${opts[@]}" "$@"
