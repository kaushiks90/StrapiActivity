"use strict";
const {
  parseMultipartData,
  sanitizeEntity
} = require("strapi-utils");
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

  //Custom Update Method
  //Takes discount in the body
  async updatePrice(ctx) {

    const {
      discount
    } = ctx.request.body

    const activities = await strapi.services.activity.find(ctx.query);

    await activities.map(async (x) => {
      await strapi.services.activity.update({
        id: x.id
      }, {
        "price": x.price - (x.price / discount)
      });

    });
    return "Successfully Updated"
  },

  //Sends a e-mail whenever a new activity is created 
  async create(ctx) {

    console.log(ctx.query);
    let entity = await strapi.services.activity.create(ctx.request.body);

    await strapi.plugins['email'].services.email.send({
      to: 'info@mallorcard.es',
      from: 'eifpztkwrcvxnqhqkj@awdrt.net',
      subject: 'Activity Created',
      text: 'Activity Added',
      html: `<h4>Created a new Activity</h4>`
    });

    return sanitizeEntity(entity, {
      model: strapi.models.activity
    });
  },



};
