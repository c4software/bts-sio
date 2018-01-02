#!/bin/bash

gitbook build . docs # Build le dossier courant vers un output dans ./docs/
git add docs/
git commit -am "Rebuild du GitBook"
