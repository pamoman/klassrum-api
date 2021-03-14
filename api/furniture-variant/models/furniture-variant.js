'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

/**
 * Rename the furniture variant using its model and properties.
 */
const renameFurnitureVariant = async (data) => {
    try {
        const props = data.properties,
              names = [];

        if ('furniture_model' in data && data.furniture_model) {
            let id = data.furniture_model;
            let model = await strapi.query('furniture-model').findOne({ id }, 'furniture-model');

            names.push(model.name);
        }

        if (props.length) {
            await Promise.all(
                props.map(async prop => {
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

        data.name = names.join(' ');
    } catch (err) {
        console.error(err);
    }
};

const check = (data) => {
    if (!'furniture_model' in data || !data.furniture_model) {
        throw strapi.errors.badRequest('Furniture model required!')
    }
}

module.exports = {
    /**
     * Triggered before furniture variation create and update.
     */
    lifecycles: {
        async beforeCreate(data) {
            check(data);
            await renameFurnitureVariant(data);
        },
        async beforeUpdate(_, data) {
            check(data);
            await renameFurnitureVariant(data);
        }
    },
};