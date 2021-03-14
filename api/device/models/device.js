'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

/* 
 * Rename the model device using relations
 */
const renameDevice = async (data) => {
    if ('model' in data && data.model) {
        const id = data.model,
              res = await Promise.all([strapi.query('model').findOne({ id }, ['brand', 'brand.name', 'category', 'category.name'])]);
    
        const model = res[0],
              modelName = model.name,
              category = model.category.name,
              brand = model.brand.name;

        data.name = `${category}: ${brand} ${modelName}`;
    }
};

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
            await renameDevice(data);
        },
        async beforeUpdate(_, data) {
            check(data);
            await renameDevice(data);
        }
    },
};