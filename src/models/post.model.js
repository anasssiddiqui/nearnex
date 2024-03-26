const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('../../db/database');

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           default: user
 *           enum:
 *             - offer
 *             - need
 *             - tips
 *             - reference
 *         title:
 *           type: string
 *         price:
 *           type: number
 *         address:
 *           type: string
 *         location:
 *           type: float
 *         latitude:
 *           type: float
 *         longitude:
 *           type: string
 *         description:
 *           type: string
 *         file:
 *           type: string
 */

const Post = sequelize.define('posts', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    type: {
        type: DataTypes.STRING,
        defaultValue: 'offer',
        validate: {
            isIn: [['offer', 'need', 'tips', 'reference']],
        },
    },
    title: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    price: {
        type: DataTypes.NUMBER,
        defaultValue: null,
    },
    address: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    location: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    file: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
}, {
    timestamps: true,
    paranoid: true,
});

module.exports = Post;

const User = require('./user.model')
User.hasMany(Post, { foreignKey: 'userId' });

