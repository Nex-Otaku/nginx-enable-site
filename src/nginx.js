const files = require('./files');

const isInstalled = () => {
    return files.directoryExists('/etc/nginx');
};

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
    enable: enable,
    disable: disable
};