'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

const check = (data) => {
    if (!'category' in data || !data.category) {
        throw strapi.errors.badRequest('Category required!')
    }

    if (!'brand' in data || !data.brand) {
        throw strapi.errors.badRequest('Brand required!')
    }
}

module.exports = {
    /**
     * Triggered before furniture model create and update.
     */
    lifecycles: {
        async beforeCreate(data) {
            check(data);
            data.name = await strapi.config.functions.rename.furniture.model(data);
        },
        async beforeUpdate(_, data) {
            check(data);
            data.name = await strapi.config.functions.rename.furniture.model(data);
        }
    },
};