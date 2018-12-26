
'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Flairs', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			color: {
				type: Sequelize.STRING,
			},
			topicId: {
				type: Sequelize.INTEGER,
			},
			postId: {
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			topicId: {
				type: Sequelize.INTEGER,
				onDelete: 'CASCADE',
				allowNull: false,
				references: {
					model: 'Topics',
					key: 'id',
					as: 'topicID',
				},
			},
			postId: {
				type: Sequelize.INTEGER,
				onDelete: 'CASCADE',
				allowNull: false,
				references: {
					model: 'Posts',
					key: 'id',
					as: 'postId',
				},
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Flairs');
	},
}