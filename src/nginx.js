const files = require('./files');
const shell = require('./shell');

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

const enabledSiteLink = (site) => {
    return dirEnabledSites + '/' + site;
}

const makeSymlink = async (source, link) => {
    console.log('Command to run: ' + 'ln -s ' + source + ' ' + link);

    return shell.run('ln -s ' + source + ' ' + link);
}

const getAvailableSites = () => {
    return files.getFiles(dirAvailableSites);
}

const searchAvailableSite = (site) => {
    const sites = getAvailableSites();

    for (let i = 0; i < sites.length; i++) {
        if (sites[i] === site) {
            return dirAvailableSites + '/' + sites[i];
        }
    }

    return null;
}

const getEnabledSites = () => {
    return files.getFiles(dirEnabledSites);
}

const searchEnabledSite = (site) => {
    const sites = getEnabledSites();

    for (let i = 0; i < sites.length; i++) {
        if (sites[i] === site) {
            return dirEnabledSites + '/' + sites[i];
        }
    }

    return null;
}

const isEnabled = (site) => {
    return searchEnabledSite(site) !== null;
}

const isAvailable = (site) => {
    return searchAvailableSite(site) !== null;
}

const isDisabled = (site) => {
    return isAvailable(site) && !isEnabled(site);
}

const enable = async (site) => {
    if (isEnabled(site)) {
        console.log('Site ' + site + ' is already enabled. Nothing to do');

        return;
    }

    const sitePath = searchAvailableSite(site);

    if (sitePath === null) {
        console.log('Can not find ' + site + ' in available sites. Run "nginx-enable-site --list" to see all available sites');

        return;
    }

    await makeSymlink(sitePath, enabledSiteLink(site));

    console.log('Enabled ' + site);
};

const disable = async (site) => {
    if (isDisabled(site)) {
        console.log('Site ' + site + ' is already disabled. Nothing to do');

        return;
    }

    const sitePath = searchEnabledSite(site);

    if (sitePath === null) {
        console.log('Can not find ' + site + ' in enabled sites. Run "nginx-disable-site --list" to see all enabled sites');

        return;
    }

    files.deleteFile(sitePath);

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