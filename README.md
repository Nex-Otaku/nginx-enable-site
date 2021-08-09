# Nginx Enable Site

Two simple commands to enable and disable Nginx sites.

```bash
# Enable nginx site by name
nginx-enable-site myproject.com

# List all sites that can be enabled
nginx-enable-site --list

# Run without parameters to select site from menu
nginx-enable-site


# Disable nginx site by name
nginx-disable-site myproject.com

# List all sites that can be disabled
nginx-disable-site --list

# Run without parameters to select site from menu
nginx-disable-site

```

## Why

Nginx does not provide you with convenient command to manage sites.

You have to write your own command from scratch, or just deal with symlinks, but that would be tiresome.

Instead, you can just install this cutie little command and forget about this problem forever.

Syntax is very simple and straightforward.

## How it works

 - Read sites from folders "/etc/nginx/sites-enabled" and "/etc/nginx/sites-available"
 - To enable site, it creates symlink in "/etc/nginx/sites-enabled".
 - To disable site, it deletes symlink in "/etc/nginx/sites-enabled".

## Options

Option | Description
--- | ---
**(no parameters)** | Show interactive menu to select site
**site** | Enable or disable site
**--list** | List all sites that can be enabled or disabled

## Installation

To use this tool, you need [NodeJS](https://nodejs.org/).

```
sudo npm install -g @nex_otaku/nginx-enable-site
```

## To Be Done

 - List sites
 - Select site from menu  


## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2021 © Nex Otaku.
