// Canonical path provides a consistent path (i.e. always forward slashes) across different OSes
// canonical-path fournit un chemin cohérent (c'est à dire toujours des /) entre les différents systèmes d'exploitation
var path = require('canonical-path');

var Package = require('dgeni').Package;

// Create and export a new Dgeni package called test-i18n. This package depends upon
// the jsdoc and nunjucks packages defined in the dgeni-packages npm module.
// Crée et exporte un nouveau package de Dgeni appelé test-i18n. Ce package dépend des
// packages jsdoc et nunjucks définies dans le module npm de dgeni-packages.
module.exports = new Package('test-i18n', [require('dgeni-packages/i18n'), require('dgeni-packages/jsdoc'), require('dgeni-packages/nunjucks')])

// Configure our test-i18n package. We can ask the Dgeni dependency injector
// to provide us with access to services and processors that we wish to configure
// Configure notre package test-i18n. Nous pouvons demander à l'injecteur de dépendance de Dgeni
// de nous fournir l'accès aux services et aux processeurs que nous voulons configurer
.config(function(log, readFilesProcessor, templateFinder, writeFilesProcessor) {

  // Set logging level
  // Définit le niveau de log
  log.level = 'info';

  // Specify the base path used when resolving relative paths to source and output files
  // Spécifie le chemin de base utilisé lors de la résolution des chemins relatifs pour la source et les fichiers en sortie
  readFilesProcessor.basePath = path.resolve(__dirname, '..');

  // Specify collections of source files that should contain the documentation to extract
  // Spécifie les collections des fichiers sources qui contiennent la documentation à extraire
  readFilesProcessor.sourceFiles = [
    {
      // Process all js files in `src` and its subfolders ...
      // Traite tous les fichiers js dans `src` et ses sous-dossiers ...
      include: 'src/**/*.js',
      // ... except for this one!
      // ... à l'exception d'un!
      exclude: 'src/do-not-read.js',
      // When calculating the relative path to these files use this as the base path.
      // So `src/foo/bar.js` will have relative path of `foo/bar.js`
      // Lors de la détermination du chemin relatif, ces fichiers l'utilisent comme chemin de base.
      // Donc `src/foo/bar.js` aura le chemin relatif `foo/bar.js`
      basePath: 'src'
    },
    {
      // Process all json files in `locales`
      // Traite tous les fichiers json dans `locales`
      include: 'locales/*.json',
      basePath: 'locales'
    }
  ];

  // Add a folder to search for our own templates to use when rendering docs
  // Ajoute un répertoire pour rechercher nos propres templates qui seront utiliser lors du rendu des docs
  templateFinder.templateFolders.unshift(path.resolve(__dirname, 'templates'));

  // Specify how to match docs to templates.
  // In this case we just use the same static template for all docs
  // Explique comment on doit faire correspondre les docs aux templates. 
  // Dans ce cas, nous utilisons le même template statique pour tous les docs
  templateFinder.templatePatterns.unshift('common.template.html');

  // Specify where the writeFilesProcessor will write our generated doc files
  // Explique où le writeFilesProcessor écrira nos fichiers de doc générés
  writeFilesProcessor.outputFolder  = 'build';
})

.config(function(parseI18nProcessor) {
  parseI18nProcessor.defaultLang = 'en_GB';
  parseI18nProcessor.translateLangs = [ 'fr_FR', 'de_DE', 'es_ES' ];
  parseI18nProcessor.outputFolder = 'build\\translation';
});