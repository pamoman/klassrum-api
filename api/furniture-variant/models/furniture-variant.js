'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

const renameFurnitureVariant = async (result) => {
    try {
        const id = result.id,
            model = result.furniture_model.name,
            props = result.properties,
            names = [model];

        if (props.length > 0) {
            props.map(prop => {
                let component = prop.__component;

                switch (component) {
                    case 'properties.dimensions':
                        names.push(prop.l);

                        break;
                    case 'properties.materials':
                        names.push(prop.materials[0].name);

                        break;
                    case 'properties.styles':
                        names.push(prop.colours[0].name);

                        break;
                    case 'properties.options':
                        let electric = prop.electric;

                        electric && names.push('El');

                        break;
                    default: 
                        return null;
                }
            });
        }

        let name = names.join(' ');

        await strapi.query('furniture-variant').update(
            { id },
            { name }
        );

        return true;
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    /**
     * Triggered after furniture variants creation.
     */
    lifecycles: {
        async afterCreate(result) {
            await renameFurnitureVariant(result);
        },
        async afterUpdate(result, _, data) {
            'updated_by' in data && await renameFurnitureVariant(result);
        }
    },
};