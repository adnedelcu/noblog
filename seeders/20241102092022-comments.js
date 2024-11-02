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
    const comments = [];
    const oldComments = await queryInterface.select(null, 'comments');
    const users = await queryInterface.select(null, 'users');
    const posts = await queryInterface.select(null, 'posts');
    for (let i = 0; i < 100; i++) {
      const shouldBeReply = i % 3 == Math.floor(Math.random() * 3) && i != 0;
      const user = users.find(user => user.id == (Math.floor(Math.random() * 10)) + 1) || users[0];
      const post = posts.find(post => post.id == (Math.floor(Math.random() * 10)) + 1) || posts[0];
      const comment = oldComments.find(comment => comment.id == (Math.floor(Math.random() * 10)) + 1 && comment.post_id == post.id) || oldComments[0];
      comments.push({
        author_id: user.id,
        post_id: post.id,
        parent_id: shouldBeReply && comment ? comment.id : null,
        content: faker.lorem.paragraphs(),
        created_at: new Date(),
        updated_at: new Date(),
      })
    }

    return queryInterface.bulkInsert('comments', comments);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('comments', null, {});
  }
};
