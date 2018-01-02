#!/bin/bash

rm -rf docs/
gitbook build && mv _book docs
git add docs/ 
git commit -am "Rebuild du GitBook"
