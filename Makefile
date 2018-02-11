build:
	gitbook build . docs	

install_plugins:
	gitbook install

serve:
	gitbook serve

version:
	git add docs/ && git commit -am "Rebuild du GitBook"

publish:
	git push && git push gitlab

help:
	@echo '                '
	@echo 'Usage:          '
	@echo '   make build   '
	@echo '   make install_plugins '
	@echo '   make serve   '
	@echo '   make version '
	@echo '   make full    '
	@echo '                '

full: build version

.PHONY: build publish install_plugins serve version help full