'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
    /**
     * Triggered before furniture package create and update.
     */
    lifecycles: {
        async beforeCreate(data) {
            if (data.furniture.length && Object.keys(data.furniture[0]).length) {
                await Promise.all(data.furniture.map(async furniture => {
                    furniture.name = await strapi.config.functions.rename.furniture.package(furniture);
                }));
            }
        },
        async beforeUpdate(_, data) {
            if (data.furniture.length && Object.keys(data.furniture[0]).length) {
                await Promise.all(data.furniture.map(async furniture => {
                    furniture.name = await strapi.config.functions.rename.furniture.package(furniture);
                }));
            }
        }
    },
};