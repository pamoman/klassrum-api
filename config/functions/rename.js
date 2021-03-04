'use strict';

const { sanitizeEntity } = require('strapi-utils');

/**
 * Generate data and insert into the database
 * Helper functions positioned after exports
 */

module.exports = {
    devices: async () => {
        const devices = await strapi.services.device.find({_limit: -1}, ["model", "model.brand.name", "model.category.name"]);
        let count = 0;

        devices.map(device => {
            const id = device.id,
                  category = device.model.category.name,
                  brand = device.model.brand.name,
                  model = device.model.name,
                  deviceName = `${category}: ${brand} ${model}`;

            count ++;

            strapi.query('device').update({ id }, { name: deviceName })
            .then(data => data.invoices);
        });

        return `Devices updated: ${count}`;
    }
}