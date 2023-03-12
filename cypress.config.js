const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
// import allureWriter from "@shelex/cypress-allure-plugin/writer";
module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/results/reporter',
    reportFilename: "[name]_[status]",
    overwrite: true,
    charts: true,
    reportPageTitle: 'API Testing',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: true,
    video: true
  },
  e2e: {
    baseUrl: 'https://fakerestapi.azurewebsites.net/api',
    testIsolation: false,
    screenshotsFolder: 'cypress/results/screenshots',
    videosFolder: 'cypress/results/videos',
    video: true,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      // implement node event listeners here
    },

  },

  env: {
    //snapshotOnly: true
  }
});


