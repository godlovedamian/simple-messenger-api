'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  /**
   * Returns an iso date of 30 days ago
   * @returns {string}
   */
  getISODate30DaysBack: () => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString();
  },

  /**
   * Filters out messages that are older than 30 days
   * @param messages
   * @param dateFilter
   * @returns {*}
   */
  filterOldMessages: (messages, dateFilter) => {
    return messages.filter(message => new Date(message.created_at) > new Date(dateFilter));
  },

};
