const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
// import allureWriter from "@shelex/cypress-allure-plugin/writer";
module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://fakerestapi.azurewebsites.net/api',
    testIsolation: false,
    video: false,
    setupNodeEvents(on, config) {
      allureWriter(on, config);
            return config;
      // implement node event listeners here
    },

  },

  env: {
    //snapshotOnly: true
  }
});


