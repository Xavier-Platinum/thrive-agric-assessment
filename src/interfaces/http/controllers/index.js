const fs = require('fs');
const path = require('path');

const controllers = {};

fs
    .readdirSync(__dirname)
    .filter(name => {
        const full = path.join(__dirname, name);
        return fs.statSync(full).isDirectory();
    })
    .forEach(dir => {
        // Sample usage dir = 'inventory' → you’ll get controllers.inventoryController
        const key = `${dir}Controller`;
        controllers[key] = require(path.join(__dirname, dir));
        if (dir === fs.readdirSync(__dirname).filter(name => {
            const full = path.join(__dirname, name);
            return fs.statSync(full).isDirectory();
        }).pop()) {
            console.log('Loaded controllers successfully');
        }
    });

module.exports = controllers;