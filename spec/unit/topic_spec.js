const sequelize = require('../../src/db/models/index').sequelize;
const Topic = require('../../src/db/models').Topic;
const Post = require('../../src/db/models').Post;

describe('Post', () => {
	beforeEach(done => {
		this.topic;
		this.post;

		sequelize.sync({ force: true }).then(res => {
				Topic.create(
					{
						title: 'Food Eating Contests',
						description: 'A list of recent food eating contests',

						posts: [
							{
								title: 'Hot Dog Fair',
								body: 'The winner ste 300 hot dogs',
							},
						],
					},
					{
						include: {
							model: Post,
							as: 'posts',
						},
					},
				).then(topic => {
					this.topic = topic; 
					this.post = topic.posts[0]; 
					done();
				});
			});
		});

	describe('#create()', () => {
		it('should create a topic object with a title and description', done => {
			Topic.create({
				title: 'Food Eating Contests',
				description: 'A list of recent food eating contests',
			})
				.then(topic => {
					expect(topic.title).toBe('Food Eating Contests');
					expect(topic.description).toBe('A list of recent food eating contests');
					done();
				})
				.catch(err => {
					console.log(err);
					done();
				});
		});

		it('should not create a topic with missing title or description', done => {
			Topic.create({
				title:'Food Eating Contests',
			})
				.then(post => {
					done();
				})
				.catch(err => {
					expect(err.message).toContain('Topic.description cannot be null');
					done();
				});
		});
	});

	describe('#getPosts()', () => {
		it('should return the posts with the associated topic', done => {
			this.topic.getPosts().then(associatedPosts => {
				expect(associatedPosts[0].title).toBe( 'Hot Dog Fair');
				expect(associatedPosts[0].body).toBe('The winner ste 300 hot dogs');
				expect(associatedPosts[0].topicId).toBe(this.topic.id);
				done();
			});
		});
	});
});
