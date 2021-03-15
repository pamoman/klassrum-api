'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

const check = (data) => {
    if (!'furniture_model' in data || !data.furniture_model) {
        throw strapi.errors.badRequest('Furniture model required!');
    }
}

module.exports = {
    /**
     * Triggered before furniture variation create and update.
     */
    lifecycles: {
        async beforeCreate(data) {
            check(data);
            data.name = await strapi.config.functions.rename.furniture.variant(data.furniture_model, data.properties);
        },
        async beforeUpdate(_, data) {
            check(data);
            data.name = await strapi.config.functions.rename.furniture.variant(data.furniture_model, data.properties);
        }
    },
};