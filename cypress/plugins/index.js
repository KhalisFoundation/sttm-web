import * as common from '../../common/api-urls-constants';
/// <reference types="Cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  on('before:browser:launch', (browser, launchOptions) => {

    if (browser.name === 'chrome' && browser.isHeadless) {
      launchOptions.args.push('--disable-gpu');
      return launchOptions
    }
  });

  const isProduction = process.env.NODE_ENV === 'production';
  config.env.PROTOCOL = isProduction ? 'https' : 'http'
  config.env.BANIS_URL = common.BANIS
  config.env.API_URL = isProduction ? common.PRODUCTION : common.DEVELOPMENT;
  config.env.AMRIT_KEERTAN_API_URL = common.AMRIT_KEERTAN;
  config.env.AMRIT_KEERTAN_SHABADS_API_URL = common.AMRIT_KEERTAN_SHABADS;
  config.env.BANNERS_URL = common.BANNERS;
  config.env.SYNC = isProduction ? common.SYNC.PRODUCTION : common.SYNC.LOCAL;
  config.env.CEREMONIES_URL = common.CEREMONIES;
  config.env.DOODLE_URL = common.DOODLE;

  return config;
}
