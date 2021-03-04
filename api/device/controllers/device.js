'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    // GET /devices/rename
    async rename() {
        return await strapi.config.functions.rename.devices();
    }
};
