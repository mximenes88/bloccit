'use strict';
module.exports = (sequelize, DataTypes) => {
  var Advertisement = sequelize.define('Advertisement', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
  },{});
  
  Advertisement.associate = function(models) {
    
  };
  return Advertisement;
};
