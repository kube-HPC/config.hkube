const fs = require('fs');
const path = require('path');
const deepExtend = require('lodash.merge');
const BASE_CONFIG = 'base';
const DEFAULT_CONFIG_FOLDER = 'config';

class ConfigIT {
    constructor() {
        this._env = process.env.NODE_ENV || 'development';
    }

    env() {
        return this._env;
    }

    load(option) {
        const options = option || {};
        options.configFolder = options.configFolder || '';
        const dir = options.cwd || process.cwd();
        const folders = fs.readdirSync(path.join(dir, options.configFolder, DEFAULT_CONFIG_FOLDER));
        const configs = Object.create(null);
        folders.forEach((folder) => {
            const config = this._readConfigFromDisk({
                ...options,
                useBase: options.useBase !== false,
                configFolder: `${options.configFolder}/${DEFAULT_CONFIG_FOLDER}/${folder}`
            });
            configs[folder] = config;
        });
        return configs;
    }

    _requireConfigFile(dir, configFolder, configName) {
        const configEnvironment = path.join(configFolder, `config.${configName}.js`);
        try {
            const file = path.join(dir, configEnvironment);
            if (!fs.existsSync(file)) {
                throw new Error(`unable to find file ${configEnvironment}`);
            }
            return require(file);
        }
        catch (e) {
            throw new Error(`unable to load config file for environment ${configName} at folder ${dir}/${configFolder}. ${e.message}`);
        }
    }

    _readConfigFromDisk(options) {
        const dir = options.cwd || process.cwd();
        const configFolder = options.configFolder || DEFAULT_CONFIG_FOLDER;

        const envConfig = this._requireConfigFile(dir, configFolder, this._env);
        if (options.useBase === false) {
            return envConfig;
        }
        const baseConfig = this._requireConfigFile(dir, configFolder, BASE_CONFIG);
        const mergedConfig = deepExtend(baseConfig, envConfig);
        return mergedConfig;
    }
}

module.exports = new ConfigIT();
