import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const UserPlacemark = sequelize.define('UserPlacemark', {
}, {
  timestamps: true,
});

export default UserPlacemark;