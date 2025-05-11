import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
// import Placemark from './Placemark.js';
// import UserPlacemark from './UserPlacemark.js';

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

// User.belongsToMany(Placemark, { through: UserPlacemark });
// Placemark.belongsToMany(User, { through: UserPlacemark });

export default User;