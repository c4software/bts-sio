#!/bin/bash

gitbook build docs
git add docs/ 
git commit -am "Rebuild du GitBook"
