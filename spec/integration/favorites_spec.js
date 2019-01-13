const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics/";

const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;
const Favorite = require("../../src/db/models").Favorite;

describe("routes : favorites", () => {

 beforeEach((done) => {
   this.user;
   this.topic;
   this.post;

   sequelize.sync({force: true}).then((res) => {
     User.create({
       email: "starman@tesla.com",
       password: "Trekkie4lyfe"
     })
     .then((res) => {
       this.user = res;

       Topic.create({
         title: "Expeditions to Alpha Centauri",
         description: "A compilation of reports from recent visits to the star system.",
         posts: [{
           title: "My first visit to Proxima Centauri b",
           body: "I saw some rocks.",
           userId: this.user.id
         }]
       }, {
         include: {
           model: Post,
           as: "posts"
         }
       })
       .then((res) => {
         this.topic = res;
         this.post = this.topic.posts[0];
         done();
       })
       .catch((err) => {
         console.log(err);
         done();
       });
     });
   });
 });

 //context suites here
 describe("guest attempting to favorite on a post", () => {

    beforeEach((done) => {   

      request.get({
        url: "http://localhost:3000/auth/fake",
        form: {
          userId: 0
        }
      },
        (err, res, body) => {
          done();
        }
      );

    });

    describe("POST /topics/:topicId/posts/:postId/favorites/create", () => {

      it("should not create a new favorite", (done) => {
        const options = {
          url: `${base}${this.topic.id}/posts/${this.post.id}/favorites/create`
        };

        let favCountBeforeCreate;

        this.post.getFavorites()
        .then((favorites) => {
          favCountBeforeCreate = favorites.length;

          request.post(options,
            (err, res, body) => {
              Favorite.all()
              .then((favorite) => {
                expect(favCountBeforeCreate).toBe(favorite.length); 
                done();
              })
              .catch((err) => {
                console.log(err);
                done();
              });
        
           }
          )
        });
      });

    });
  });