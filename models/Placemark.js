import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Placemark = sequelize.define('Placemark', {
  coordinates: {
    type: DataTypes.JSON, 
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

export default Placemark;