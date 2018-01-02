#!/bin/bash

gitbook build && mv _book docs && git add docs/ && git commit -am "Rebuild du GitBook"
