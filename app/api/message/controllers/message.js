'use strict';
const {sanitizeEntity} = require('strapi-utils');
const {getISODate30DaysBack, filterOldMessages} = require("../services/message");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    let entities;
    const last30DaysDate = getISODate30DaysBack();

    if (ctx.query._q) {
      entities = await strapi.services.message.search(ctx.query);
    } else {
      entities = await strapi.services.message.find(ctx.query);
    }

    const newerMessages = filterOldMessages(entities, last30DaysDate);

    return newerMessages.map(entity => sanitizeEntity(entity, {model: strapi.models.message}));
  },
};
