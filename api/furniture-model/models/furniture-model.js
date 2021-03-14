'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

 /* 
  * Rename furniture model using relations
  */
const renameFurnitureModel = async (data) => {
    const model = data.model;

    let category = "", brand = "";

    if ('category' in data && data.category) {
        const categoryID = data.category;
        const categoryRes = await strapi.query('category').findOne({ id: categoryID }, ['category']);

        category = categoryRes.name;
    }

    if ('brand' in data && data.brand) {
        const brandID = data.brand;
        const brandRes = await strapi.query('brand').findOne({ id: brandID }, ['brand']);

        brand = brandRes.name;
    }

    data.name = `${category}: ${brand} ${model}`;
}

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
            await renameFurnitureModel(data);
        },
        async beforeUpdate(_, data) {
            check(data);
            await renameFurnitureModel(data);
        }
    },
};