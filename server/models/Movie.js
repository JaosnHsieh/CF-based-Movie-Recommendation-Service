module.exports = (sequelize, DataTypes) => {
    let Movie = sequelize.define('Movie', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            comment: '索引值',
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        genres: {
            type: DataTypes.STRING
        },
    });

    return Movie;
};
