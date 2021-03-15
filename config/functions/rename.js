'use strict';

const { sanitizeEntity } = require('strapi-utils');

/**
 * Helper object for renaming fields
 */

module.exports = {
    device: async (data) => {
        let category = "", brand = "", modelName= "";

        if ('model' in data && data.model) {
            const id = data.model,
                  res = await Promise.all([strapi.query('model').findOne({ id }, ['brand', 'brand.name', 'category', 'category.name'])]);
        
            const model = res[0];

            modelName = model.name;
            category = model.category.name;
            brand = model.brand.name;
        }

        return `${category}: ${brand} ${modelName}`;
    },
    furniture: {
        model: async (data) => {
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

            return `${category}: ${brand} ${data.model}`;
        },
        variant: async (data) => {
            const names = [];

            if ('furniture_model' in data && data.furniture_model) {
                let id = data.furniture_model;
                let model = await strapi.query('furniture-model').findOne({ id }, 'furniture-model');

                names.push(model.name);
            }

            if (data.properties.length) {
                await Promise.all(
                    data.properties.map(async prop => {
                        let component = prop.__component;

                        switch (component) {
                            case 'properties.dimensions':
                                names.push(prop.l);

                                break;
                            case 'properties.materials':
                                let material = await strapi.query('material').findOne({ id: prop.materials[0] });

                                names.push(material.name);

                                break;
                            case 'properties.styles':
                                let colour = await strapi.query('colour').findOne({ id: prop.colours[0] });

                                names.push(colour.name);

                                break;
                            case 'properties.options':
                                prop.electric && names.push('El');

                                break;
                            default: 
                                return null;
                        }
                    })
                )
            }

            return names.join(' ');
        },
        package: async (furniture) => {
            let id = furniture.furniture_variant;
            let quantity = furniture.quantity;
            let variant = await strapi.query("furniture-variant").findOne({ id }, ['furniture_variant']);

            return `${variant.name} - ${quantity}st`;
        }
    }
}