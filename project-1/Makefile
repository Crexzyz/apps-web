SASS := sass
COMPILED_CSS_FOLDER := css-build
SCSS_FOLDER := scss
HTML_FOLDER := html
SCSS_FILES := $(wildcard $(SCSS_FOLDER)/*.scss)
CSS_FILES := $(patsubst $(SCSS_FOLDER)/%.scss, $(COMPILED_CSS_FOLDER)/%.css, $(SCSS_FILES))
APACHE_PATH := /var/www/appsweb/html

all: compile_css install

install:
	cp $(wildcard $(COMPILED_CSS_FOLDER)/*.css) $(APACHE_PATH)
	cp $(wildcard $(COMPILED_CSS_FOLDER)/*.css.map) $(APACHE_PATH)
	cp -r $(wildcard $(HTML_FOLDER)/*) $(APACHE_PATH)

compile_css: $(COMPILED_CSS_FOLDER) $(CSS_FILES)

$(COMPILED_CSS_FOLDER)/%.css: $(SCSS_FOLDER)/%.scss
	$(SASS) $^ $@

$(COMPILED_CSS_FOLDER):
	mkdir -p $@

.PHONY: clean
clean:
	rm -rf $(COMPILED_CSS_FOLDER)
