'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: 'user',
        validate: {
          isIn: [['user', 'superadmin']],
        },
      },
      name_first: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      name_last: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      username: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      profile_image: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      mobile_no: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      mobile_country_code: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        defaultValue: null,
      },
      password: {
        type: Sequelize.STRING,
        defaultValue: null,
        validate: {
          len: [6, Infinity],
        },
      },
      login_otp: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      login_otp_expiry_time: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
      country: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      device_id: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      fcm_token: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      isTermsAccept: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isAbove18: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  },
};
