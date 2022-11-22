/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

const fs = require('fs');
const path = require('path');

const plugins = [];

const initPlugins = () => {
    const pluginsPath = path.join(__dirname, '..', 'verifier-plugins');
    
    let fileNames;
    try {
        fileNames = fs.readdirSync(pluginsPath);
    } catch(e) {
        throw new Error(`Unable to load verifier plugins: ${e}`);
    }

    fileNames.forEach((fileName) => {
        const pluginPath = path.join(__dirname, '..', 'verifier-plugins', fileName);
        // eslint-disable-next-line global-require, import/no-dynamic-require
        const Plugin = require(pluginPath);
        plugins.push(new Plugin());
    });
}

const getPlugins = () => {
    return plugins;
}

module.exports = {
    initPlugins,
    getPlugins
};
