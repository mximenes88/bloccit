const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;
const Comment = require("../../src/db/models").Comment;

describe("Comment", () =>{
    beforeEach((done) =>{
      this.user;
      this.topic;
      this.post;
      this.comment;

      sequelize.sync({force:true}).then((res) =>{
          User.create({
              email: "starman@tesla.com",
              password: "Trekkie4lyfe"
          })
          .then((user) =>{
              this.user = user;
          })

          Topic.create({
              title: "Expeditions to Alpha Centauri",
              description:"A compilation of reports from recent visits to the star system.",
              posts:[{
                  title:"My first visit to Proxima Centauri b",
                  userId: this.user.id
              }]
            }, {
                include:{
                    model: Post,
                    as: "posts"
                }
          })
          .then((topic) =>{
              this.topic = topic;
              this.post = this.topic.post[0];

              Comment.create({
                  body: "ay caramba !!!",
                  userId: this.user.id,
                  postId : this.post.id
              })
              .then((comment) =>{
                  this.comment = comment;
                  done();
              })
              .catch((err) =>{
                  console.log(err);
                  done();
              });
          })

          .catch((err) =>{
              console.log(err);
              done();
          });
      });
    });

    describe("#create()", () =>{
        it("should create a comment object with a body, assigned post and user", (done) =>{
            Comment.create({
                body:"The geological kind.",
                postId: this.post.id,
                userId: this.user.id
            })
            .then((comment) =>{
                expect(comment.body).toBe("the geological kind.");
                expect(comment.postId).toBe(this.post.id);
                expect(comment.userId).toBe(this.user.id);
                done();
            })
            .catch((err) =>{
                console.log(err);
                done();
            });
        });

        it("should not create a comment with missing body, assigned post or user", (done) =>{
            Comment.create({
                body: "Are the inertial dampers still engaged?"
            })
            .then((comment) =>{
                done();
            })
            .catch((err) =>{
                expect(err.message).toContain("Comment.userId cannot be null");
                expect(err.message).toContain("Comment.postId cannot be null");
            })
        }); 
    });

    describe("#setUser()", () =>{
        it("should associate a comment and a user together" , (done) =>{
            User.create({
                email: "bob@example.com",
                password:"password"
            })
            .then((newUser) =>{
                expect(this.comment.userId).toBe(this.user.id);
                this.comment.setUser(newUser)
                .then((comment) =>{
                    expect(comment.userId).toBe(newUser.id);
                    done();
                });
            })
        });
    });

    describe("#getUser()" , () =>{
        it("should return the associated user", (done) =>{
            this.comment.getUser()
            .then((associatedUser) =>{
                expect(associatedUser.email).toBe("starman@tesla.com");
                done();
            });
        });
    });

    describe("#setPost()", () => {

        it("should associate a post and a comment together", (done) => {
    
          Post.create({      
            title: "Dress code on Proxima b",
            body: "Spacesuit, space helmet, space boots, and space gloves",
            topicId: this.topic.id,
            userId: this.user.id
          })
          .then((newPost) => {
    
            expect(this.comment.postId).toBe(this.post.id); 
    
            this.comment.setPost(newPost)                  
            .then((comment) => {
    
              expect(comment.postId).toBe(newPost.id);  
              done();
    
            });
          })
        });
    
      });
    

      describe("#getPost()", () => {
    
        it("should return the associated post", (done) => {
    
          this.comment.getPost()
          .then((associatedPost) => {
            expect(associatedPost.title).toBe("My first visit to Proxima Centauri b");
            done();
          });
    
        });
    
      });
    });


