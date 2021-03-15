'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

const check = (data) => {
    if (!'model' in data || !data.model) {
        throw strapi.errors.badRequest('Model required!')
    }
}

module.exports = {
    /**
     * Triggered before device create and update.
     */
    lifecycles: {
        async beforeCreate(data) {
            check(data);
            data.name = await strapi.config.functions.rename.device(data);
        },
        async beforeUpdate(_, data) {
            check(data);
            data.name = await strapi.config.functions.rename.device(data);
        }
    },
};