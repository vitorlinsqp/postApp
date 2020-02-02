const Sequelize = require('sequelize');

//database mysql connection
const sequelize = new Sequelize('postapp', 'root', 'ventura', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
})

module.exports = {
    Sequelize : Sequelize,
    sequelize : sequelize
}