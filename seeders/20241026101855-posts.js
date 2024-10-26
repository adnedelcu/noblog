'use strict';

/** @type {import('@faker-js/faker').Faker} */
const faker = require('@faker-js/faker').faker;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const posts = [];
    const users = await queryInterface.select(null, 'users');
    for (let i = 0; i < 10; i++) {
      posts.push({
        author_id: (users.find(user => user.id == (Math.floor(Math.random() * 10)) + 1) || users[0]).id,
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(),
        cover: faker.image.url(),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    return queryInterface.bulkInsert('posts', posts);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
