const fs = require('fs');
const {setupStrapi} = require('./helpers/strapi');
const request = require('supertest');
const {getISODate30DaysBack, filterOldMessages} = require("../api/message/services/message");


/** this code is called once before any test is called */
beforeAll(async () => {
  await setupStrapi(); // singleton so it can be called many times
});

//testing strapi instance
it('strapi is defined', () => {
  expect(strapi).toBeDefined();
});

//testing getISODate30DaysBack function from message service
it('getISODate30DaysBack function', () => {
  const date = new Date();
  const date30DaysBack = new Date(date.setDate(date.getDate() - 30));
  const date30DaysBackISO = date30DaysBack.toISOString();
  const date30DaysBackISO2 = getISODate30DaysBack();
  expect(date30DaysBackISO).toEqual(date30DaysBackISO2);
});

//testing filterOldMessages function from message service
it('filterOldMessages function', () => {
  const date = new Date();
  const date30DaysBack = new Date(date.setDate(date.getDate() - 30));
  const date30DaysBackISO = date30DaysBack.toISOString();
  const message = [{
    "id": 1,
    "sender": {
      "id": 1,
      "username": "godlove@innocent.com",
      "email": "godlove@innocent.com",
      "provider": "local",
      "confirmed": false,
      "blocked": false,
      "role": 1,
      "created_at": "2021-12-17T12:42:30.718Z",
      "updated_at": "2021-12-17T12:42:30.726Z"
    },
    "recipient": {
      "id": 2,
      "username": "akimatthews@gmail.com",
      "email": "akimatthews@gmail.com",
      "provider": "local",
      "confirmed": false,
      "blocked": false,
      "role": 1,
      "created_at": "2021-12-17T13:33:17.166Z",
      "updated_at": "2021-12-17T13:33:17.179Z"
    },
    "content": "Hello",
    "read": false,
    "published_at": "2021-12-17T13:35:35.158Z",
    "created_at": "2021-12-17T13:34:22.797Z",
    "updated_at": "2021-12-17T13:35:35.181Z"
  }];
  const filteredMessages = filterOldMessages(message, date30DaysBackISO);
  expect(filteredMessages.length).toEqual(1);
});
