'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

const renameFurnitureModel = async (result) => {
    const id = result.id,
          category = result.category.name,
          brand = result.brand.name,
          model = result.model,
          name = `${category}: ${brand} ${model}`;

    await strapi.query('furniture-model').update(
        { id },
        { name }
    );
}

module.exports = {
    /**
     * Triggered after furniture model creation.
     */
    lifecycles: {
        async afterCreate(result) {
            await renameFurnitureModel(result);
        },
    },
};