'use strict';

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
        variant: async (modelID, properties) => {
            const names = [],
                  model = await strapi.query('furniture-model').findOne({ id: modelID }, 'furniture-model');

            names.push(model.name);

            await Promise.all(
                properties.map(async prop => {
                    let component = prop.__component;

                    switch (component) {
                        case 'properties.dimensions':
                            names.push(prop.l);

                            break;
                        case 'properties.materials':
                            let materialID = prop.materials[0],
                                material = await strapi.query('material').findOne({ id: materialID });

                            names.push(material.name);

                            break;
                        case 'properties.styles':
                            let colourID = prop.colours[0],
                                colour = await strapi.query('colour').findOne({ id: colourID });

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

            return names.join(' ');
        },
        package: async (furniture) => {
            let id = furniture.furniture_variant;
            let quantity = furniture.quantity;
            let variant = await strapi.query("furniture-variant").findOne({ id }, ['properties']);

            return `${variant.name} - ${quantity}st`;
        },
    }
}