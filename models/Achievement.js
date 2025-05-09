import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Achievement = sequelize.define('Achievement', {
  coordinates: {
    type: DataTypes.GEOGRAPHY,
    allowNull: false,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  achievement: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  timestamps: true,
});

export default Achievement;