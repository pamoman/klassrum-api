'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

const constructDeviceName = async (result) => {
    const id = result.id,
          device = await strapi.query("device").findOne({ id }, ["model", "model.brand", "model.category"]);

    const brand = device.model.brand.name,
          category = device.model.category.name,
          model = device.model.name,
          deviceName = `${category}: ${brand} ${model}`;

    await strapi.query('device').update(
        { id },
        { name: deviceName }
    );
};

module.exports = {
    /**
     * Triggered after device creation.
     */
    lifecycles: {
        async afterCreate(result) {
            await constructDeviceName(result);
        },
    },
};