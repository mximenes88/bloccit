'use strict';

const faker = require ("faker");

let advertisements =[];

for(let i = 1 ; i <= 15 ; i++){
  advertisements.push({
    title: faker.company.companyName(),
    description: faker.company.catchPhrase(),
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
   
   return queryInterface.bulkInsert("Advertisements", advertisements, {});
  },

  down: (queryInterface, Sequelize) => {
  
   return queryInterface.bulkDelete("Advertisements", null, {});
  }
};
