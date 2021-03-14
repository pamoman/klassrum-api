'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

/** 
 * Rename package furniture
 */
const renamePackageFurniture = async (data) => {
    if (data.furniture.length && Object.keys(data.furniture[0]).length) {
        await Promise.all(
            data.furniture.map(async f => {
                let furniture_variant = f.furniture_variant;
                let quantity = f.quantity;
                let variant = await strapi.query("furniture-variant").findOne({ id: furniture_variant }, ['furniture_variant']);

                f.name = `${variant.name} - ${quantity}st`;
            })
        );
    }
};

module.exports = {
    /**
     * Triggered before furniture package create and update.
     */
    lifecycles: {
        async beforeCreate(data) {
            await renamePackageFurniture(data);
        },
        async beforeUpdate(_, data) {
            await renamePackageFurniture(data);
        }
    },
};