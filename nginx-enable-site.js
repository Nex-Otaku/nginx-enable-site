#!/usr/bin/env node

const commander = require('commander');
const nginx = require('./src/nginx');

const notImplemented = () => {
    console.log('Not implemented yet. Want to make PR? https://github.com/Nex-Otaku/nginx-enable-site');
}

commander.version('1.0.0')
    .on('--help', () => {
        console.log('')
        console.log('Examples:')
        console.log('')
        console.log('  nginx-enable-site myproject.com')
        console.log('  nginx-disable-site myproject.com')
    })
    .arguments('[site]')
    .option('-l, --list', 'list sites')
    .description('Enables or disables specified Nginx site', {
        site: 'Site name'
    })
    .action(async (site, options) => {
        if (!nginx.isInstalled()) {
            console.log('Sorry, it seems you have not installed Nginx yet. I cant find a directory "/etc/nginx" in your system.');

            return;
        }

        if (!nginx.existsAvailableSitesDir()) {
            console.log('Directory "/etc/nginx/sites-available" doesnt exist. Sorry, but I cant work without it');

            return;
        }

        if (!nginx.existsEnabledSitesDir()) {
            console.log('Directory "/etc/nginx/sites-enabled" doesnt exist. Sorry, but I cant work without it');

            return;
        }

        if (!nginx.isWritableEnabledSitesDir()) {
            console.log('Directory "/etc/nginx/sites-enabled" is not writable for current user. Try running command with sudo');

            return;
        }

        const script = process.argv[1];
        const isEnable = script.endsWith('enable-site');
        const isDisable = script.endsWith('disable-site');
        
        if (!isEnable && !isDisable) {
            throw new Error('Cannot determine running script. Please contact author of this program at nex-otaku@yandex.ru');
        }

        if (isEnable) {
            if ('list' in options) {
                // TODO
                //nginx.listSitesToEnable();
                notImplemented();

                return;
            }

            if (site === undefined) {
                // TODO
                //nginx.selectSiteToEnable();
                notImplemented();

                return;
            }

            await nginx.enable(site);
        }

        if (isDisable) {
            if ('list' in options) {
                // TODO
                //nginx.listSitesToDisable();
                notImplemented();

                return;
            }

            if (site === undefined) {
                // TODO
                //nginx.selectSiteToDisable();
                notImplemented();

                return;
            }

            await nginx.disable(site);
        }
    });

commander.parse(process.argv);
