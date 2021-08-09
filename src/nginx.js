const files = require('./files');

const isInstalled = () => {
    return files.directoryExists('/etc/nginx');
};

const dirAvailableSites = '/etc/nginx/sites-available';
const dirEnabledSites = '/etc/nginx/sites-enabled';

const existsAvailableSitesDir = () => {
    return files.directoryExists(dirAvailableSites);
}

const existsEnabledSitesDir = () => {
    return files.directoryExists(dirEnabledSites);
}

const isWritableEnabledSitesDir = () => {
    return existsEnabledSitesDir() && files.isDirectoryWritable(dirEnabledSites);
}

const enable = (site) => {
    // TODO
    console.log('Enabled ' + site);
};

const disable = (site) => {
    // TODO
    console.log('Disabled ' + site);
};

module.exports = {
    isInstalled: isInstalled,
    existsAvailableSitesDir: existsAvailableSitesDir,
    existsEnabledSitesDir: existsEnabledSitesDir,
    isWritableEnabledSitesDir: isWritableEnabledSitesDir,
    enable: enable,
    disable: disable
};