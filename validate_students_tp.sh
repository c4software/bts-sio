#!/bin/bash

# Script de validation du TP GitLab pour plusieurs étudiants avec notation sur 10
# Utilisation : ./validate_students_tp.sh students.csv

CSV_FILE="$1"

# Vérifier si le fichier CSV est fourni
if [ -z "$CSV_FILE" ]; then
  echo "Usage: $0 <fichier_csv>"
  echo "Le fichier CSV doit contenir les colonnes NOM;LIEN"
  exit 1
fi

# Vérifier si le fichier CSV existe
if [ ! -f "$CSV_FILE" ]; then
  echo "Erreur : le fichier $CSV_FILE n'existe pas"
  exit 1
fi

# Fonction pour valider un projet étudiant et calculer la note
validate_student_project() {
  local name="$1"
  local git_url="$2"
  local temp_dir="/tmp/validate_$name"
  local note=0
  local max_note=10

  echo "🔍 Validation du projet de $name"
  echo "🔗 Lien GitLab : $git_url"

  # Créer un répertoire temporaire
  mkdir -p "$temp_dir"

  # Cloner le projet
  echo "📥 Clonage du projet..."
  if git clone "$git_url" "$temp_dir/project" 2>/dev/null; then
    echo "✅ Projet cloné avec succès"
  else
    echo "❌ Échec du clonage du projet"
    rm -rf "$temp_dir"
    echo "Note finale pour $name : 0/10"
    return 1
  fi

  # Se positionner dans le répertoire du projet
  cd "$temp_dir/project" || return 1

  # Vérifier si c'est un dépôt Git
  if ! git rev-parse --git-dir >/dev/null 2>&1; then
    echo "❌ Ce n'est pas un dépôt Git"
    rm -rf "$temp_dir"
    echo "Note finale pour $name : 0/10"
    return 1
  fi

  # Vérifier la présence des fichiers requis
  echo "📋 Vérification des fichiers requis..."
  if [ ! -f "README.md" ]; then
    echo "❌ Fichier README.md manquant"
  else
    echo "✅ README.md trouvé"
    note=$((note + 2)) # 2/10
  fi

  if [ ! -f ".gitignore" ]; then
    echo "❌ Fichier .gitignore manquant"
  else
    echo "✅ .gitignore trouvé"
    note=$((note + 1)) # 1/10
  fi

  # Vérifier le nombre de commits
  echo "🔢 Vérification du nombre de commits..."
  commit_count=$(git rev-list --count HEAD)
  # Note basée sur le nombre de commits (max 3 points)
  if [ "$commit_count" -ge 20 ]; then
    note=$((note + 3))
  elif [ "$commit_count" -ge 15 ]; then
    note=$((note + 2))
  elif [ "$commit_count" -ge 10 ]; then
    note=$((note + 1))
  fi

  # Vérifier la branche feature/contact-form
  echo "📂 Vérification de la branche feature/contact-form..."
  if git show-ref --verify --quiet "refs/heads/feature/contact-form"; then
    echo "✅ Branche feature/contact-form existe"
    note=$((note + 2)) # 2/10
  else
    echo "❌ Branche feature/contact-form introuvable"
  fi

  # Vérifier la présence du fichier contact.html
  echo "📄 Vérification du fichier contact.html..."
  if [ ! -f "contact.html" ]; then
    echo "❌ Fichier contact.html manquant"
  else
    echo "✅ contact.html trouvé"
    note=$((note + 1)) # 1/10

    # Vérifier que le fichier contact.html contient un formulaire
    if grep -q "<form" "contact.html"; then
      echo "✅ Formulaire de contact trouvé dans contact.html"
      note=$((note + 1)) # 1/10
    else
      echo "⚠️  Aucun formulaire trouvé dans contact.html (optionnel)"
    fi
  fi

  # Vérifier la présence d'une branche feature/ avec un commit
  echo "📂 Vérification d'une branche feature/..."
  feature_branch=$(git branch --list "feature/*" | head -n 1)
  if [ -n "$feature_branch" ]; then
    echo "✅ Branche feature/ trouvée : $feature_branch"
    note=$((note + 1)) # 1/10
  else
    echo "⚠️  Aucune branche feature/ trouvée (optionnel)"
  fi

  # Vérifier le contenu du README.md
  echo "📄 Vérification du contenu du README.md..."
  if grep -q "#.*" "README.md" 2>/dev/null; then
    echo "✅ README.md contient un titre"
    note=$((note + 1)) # 1/10
  else
    echo "⚠️  README.md ne contient pas de titre (optionnel)"
  fi

  # Vérifier la présence de commits explicites
  echo "📝 Vérification des messages de commit..."
  commit_messages=$(git log --oneline -5)
  echo "$commit_messages"

  # Vérifier si les messages de commit sont explicites
  if echo "$commit_messages" | grep -qE "(ajout|modif|suppr|corrig|fix|update|add|fix|change)"; then
    echo "✅ Messages de commit explicites détectés"
    note=$((note + 1)) # 1/10
  else
    echo "⚠️  Messages de commit peu explicites (optionnel)"
  fi

  # Calculer la note finale
  if [ "$note" -gt "$max_note" ]; then
    note="$max_note"
  fi

  # Nettoyage
  cd - >/dev/null
  rm -rf "$temp_dir"

  echo "Note finale pour $name : $note/$max_note"
  return 0
}

# Lecture du fichier CSV
echo "🚀 Début de la validation des projets..."
echo "========================================"

# Ignorer la première ligne (en-têtes)
tail -n +2 "$CSV_FILE" | while IFS=';' read -r name git_url; do
  # Ignorer les lignes vides
  if [ -n "$name" ] && [ -n "$git_url" ]; then
    echo ""
    echo "========================================"
    echo "Étudiant : $name"
    echo "Lien : $git_url"
    echo "========================================"

    # Valider le projet
    validate_student_project "$name" "$git_url"
  fi
done

echo ""
echo "========================================"
echo "Fin de la validation"
echo "========================================"

