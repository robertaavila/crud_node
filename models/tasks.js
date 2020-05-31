const { DataTypes } = require('sequelize');

const sequelize = require('../db');

const Task = sequelize.define('task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING
})

module.exports = Task;

