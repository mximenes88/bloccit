'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull:false
    }
  }, {});
  Post.associate = function(models) {
    Post.belongsTo(models.Topic, {
      foreignKey: "topicId",
      onDelete: "CASCADE"
    });

    Post.hasMany(models.Flair, {
			foreignKey: 'postId',
			as: 'flairs',
    });
    
    Post.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });

    Post.hasMany(models.Comment,{
      foreignKey: "postId",
      as:"comments"
    });

   Post.hasMany(models.Favorite, {
    foreignKey: "postId",
    as: "favorites"
  });

    Post.hasMany(models.Vote, {
      foreignKey: "postId",
      as: "votes"
    });
  };

  Post.afterCreate((post, callback) => {
    return models.Favorite.create({
      userId: post.userId,
      postId: post.id
    });
  });

  Post.afterCreate((post, callback) => {
    return models.Vote.create({
      userId: post.userId,
      value:1,
      postId: post.id,
    });
  });

  Post.prototype.getPoints = function(){
     if(this.votes.length === 0) return 0
        return this.votes
          .map((v) => { return v.value })
          .reduce((prev, next) => { return prev + next });
      };
      
  
   Post.prototype.getFavoriteFor = function(userId){
        return this.favorites.find((favorite) => { return favorite.userId == userId });
      };
    
   Post.addScope("lastFiveFor", (userId) =>{
     return{
       where:{userId:userId},
       limit:5,
       order:[["createdAt", "DESC"]]
     }
   })
  return Post;
};