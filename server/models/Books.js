module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        name: {
            type: DataTypes.STRING
        },
        genre: {
            type: DataTypes.STRING
        }
    });

    Book.associate = ((models) => {
        models.Book.belongsTo(models.Author, {
            foreignKey: {
                allowNull: false
            }
        })
    })
    return Book
};