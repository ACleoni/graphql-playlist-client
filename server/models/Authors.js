'use strict';

module.exports = (sequelize, DataTypes) => {
    const Author = sequelize.define('Author', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true

        },
        name: DataTypes.STRING,
        books: DataTypes.STRING
    })
    Author.associate = ((models) => {
        models.Author.hasMany(models.Book)
    })
    return Author
};