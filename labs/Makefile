SASS := sass
LABS_FOLDER := .
APACHE_LABS_PATH := /var/www/appsweb/html/labs/

install:
	mkdir -p $(APACHE_LABS_PATH)
	cp -r $(wildcard $(LABS_FOLDER)/*.shtml) $(APACHE_LABS_PATH)
	cp -r $(wildcard $(LABS_FOLDER)/*/) $(APACHE_LABS_PATH)

