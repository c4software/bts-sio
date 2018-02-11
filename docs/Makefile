build:
	gitbook build . docs	

version:
	git add docs/ && git commit -am "Rebuild du GitBook"

help:
	@echo '                '
	@echo 'Usage:          '
	@echo '   make build   '
	@echo '   make version '
	@echo '   make full    '
	@echo '                '

full: build version

.PHONY: build version help full