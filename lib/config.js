const fs = require('fs');
const path = require('path');
const deepExtend = require('deep-extend');
const BASE_CONFIG = 'config.base.js';
const DEFAULT_CONFIG_FOLDER = 'config';

class ConfigIT {
    constructor() {
        this._env = process.env.NODE_ENV || 'development';
    }

    env() {
        return this._env;
    }

    load(options) {
        options = options || {};
        options.configFolder = options.configFolder || '';
        const dir = options.cwd || process.cwd();
        const folders = fs.readdirSync(path.join(dir, options.configFolder, DEFAULT_CONFIG_FOLDER));
        const configs = Object.create(null);
        folders.forEach((folder) => {
            const config = this._readConfigFromDisk({
                useBase: options.useBase !== false,
                configFolder: `${options.configFolder}/${DEFAULT_CONFIG_FOLDER}/${folder}`
            });
            configs[folder] = config;
        });
        return configs;
    }

    _readConfigFromDisk(options) {
        const dir = options.cwd || process.cwd();
        const configFolder = options.configFolder || DEFAULT_CONFIG_FOLDER;
        const configEnvironment = configFolder + '/config.' + this._env + '.js';
        try {
            const envConfig = require(path.join(dir, configEnvironment));
            if (options.useBase === false) {
                return envConfig;
            }
            const baseConfig = require(path.join(dir, configFolder, BASE_CONFIG));
            const mergedConfig = deepExtend(baseConfig, envConfig);
            return mergedConfig;
        }
        catch (error) {
            return error;
        }
    }
}

module.exports = new ConfigIT();
