'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

const check = (data) => {
    if (!'brand' in data || !data.brand) {
        throw strapi.errors.badRequest('Brand required!')
    }

    if (!'category' in data || !data.category) {
        throw strapi.errors.badRequest('Category required!')
    }    
}

module.exports = {
    /**
     * Triggered before model create and update.
     */
    lifecycles: {
        async beforeCreate(data) {
            check(data);
        },
        async beforeUpdate(_, data) {
            check(data);
        }
    },
};
