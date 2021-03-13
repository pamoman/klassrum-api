'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

/* 
 * Rename the model device
 */
const renameDevice = async (data) => {
    if ('model' in data) {
        const id = data.model,
              res = await Promise.all([strapi.query('model').findOne({ id }, ['brand', 'brand.name', 'category', 'category.name'])]);
    
        const model = res[0],
              modelName = model.name,
              category = model.category.name,
              brand = model.brand.name;

        data.name = `${category}: ${brand} ${modelName}`;
    }
};

module.exports = {
    /**
     * Triggered before device creation and update.
     */
    lifecycles: {
        async beforeCreate(data) {
            await renameDevice(data);
        },
        async beforeUpdate(_, data) {
            await renameDevice(data);
        }
    },
};