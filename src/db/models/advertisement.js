'use strict';
module.exports = (sequelize, DataTypes) => {
  var Advertisement = sequelize.define('Advertisement', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    topicId: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "Topics",
        key: "id",
        as: "topicId"
      },
  },}, {});
  
  Advertisement.associate = function(models) {
    Advertisement.belongsTo(models.Topic, {
			foreignKey: "topicId",
			onDelete: "CASCADE"
		});
  };
  return Advertisement;
};
