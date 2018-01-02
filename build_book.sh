#!/bin/bash

gitbook build && rm -rf docs/ && mv _book docs
git add docs/ 
git commit -am "Rebuild du GitBook"
