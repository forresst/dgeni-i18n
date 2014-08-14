# Dgeni-i18n

**WIP**

Test to create a tool for i18n.

The proposed solution is a package Dgeni. To do this, i use the `wip-i18n` branch on this [repository](https://github.com/forresst/dgeni-packages/tree/wip-i18n).

## Treatment Principles

1. The user adds pseudo functions `i18nDgeni()` in templates to mark parts to translate. (See the [template](https://github.com/forresst/dgeni-i18n/blob/master/docs/templates/common.template.html) example)

2. The user runs `gulp` to generate the docs (which uses the `i18n` package)
    - Running gulp will generate documentation in the language of origin, and a copy other languages ​​which you want translate.
    - This will also generate json files that will be used in the next execution gulp. Each file contains a language to translate. (Its contents look like [this](https://github.com/forresst/dgeni-i18n/blob/master/locales/fr_FR-i18ndgeni.json))

3. The user translates the texts by changing appropriate json file

4. The user runs again `gulp` to generate the docs
    - Running gulp will generate documentation in the language of origin, and a copy other languages ​​which you want translate. But this time, the translated texts in json files replace the text in the original language  for other languages
    - This will also generate json files that will be used in the next execution gulp. Each file contains a language to translate. (With any addition, modification and deletion of text to be translated, and of course the copy of the text already translated)

## How use I18n Package

1. Add one item in ReadFilesProcessor.sourceFiles to setup the json files folder :
```js
  // Specify collections of source files that should contain the documentation to extract
  readFilesProcessor.sourceFiles = [
    {
      // Process all js files in `src` and its subfolders ...
      include: 'src/**/*.js',
      // ... except for this one!
      exclude: 'src/do-not-read.js',
      // When calculating the relative path to these files use this as the base path.
      // So `src/foo/bar.js` will have relative path of `foo/bar.js`
      basePath: 'src'
    },
    {
      // Process all json files in `locales`
      include: 'locales/*.json',
      basePath: 'locales'
    }
  ];
```

2. Configure original language, others languages to translate and folder where generate the docs translated :

```js
.config(function(parseI18nProcessor) {
  parseI18nProcessor.defaultLang = 'en_GB';
  parseI18nProcessor.translateLangs = [ 'fr_FR', 'de_DE', 'es_ES' ];
  parseI18nProcessor.outputFolder = 'build\\translation';
});
```

## TO DO

  - Read existing json files (**Done !**)
  - Load translations into memory (**Done !**)
  - Parse the docs in the original language to generate the text to be translated (**Done !**)
  - Add, Update and delete text to translate in memory (**To do**)
  - Translate the docs in others languages with the translations in the memory (**Done !**)
  - Write/Replace json files (**To do**)
  - And more ....





