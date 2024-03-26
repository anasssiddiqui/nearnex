const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret, saltRounds } = require('../utility/config');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('./../../db/database');
// console.log(Post)

const User = sequelize.define('users', {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
    validate: {
      isIn: [['user', 'superadmin']],
    },
  },
  name_first: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  name_last: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  username: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  profile_image: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  mobile_no: DataTypes.STRING,
  mobile_country_code: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
    defaultValue: null,
  },
  password: {
    type: DataTypes.STRING,
    defaultValue: null,
    validate: {
      len: [6, Infinity],
    },
  },
  login_otp: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
  login_otp_expiry_time: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
  country: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  device_id: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  fcm_token: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  isTermsAccept: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isAbove18: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
  paranoid: true,
});

User.beforeCreate(async (user) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
});

User.prototype.generateToken = async function () {
  const user = this;
  const token = jwt.sign(
    {
      _id: user.id,
      role: user.role,
    },
    jwtSecret
  );
  user.token = token;
  await user.save();
  return token;
};

User.prototype.matchPassword = async function (password = '') {
  return bcrypt.compare(password, this.password);
};

module.exports = User;

const Post = require("./post.model");

Post.belongsTo(User, { foreignKey: 'userId' });
