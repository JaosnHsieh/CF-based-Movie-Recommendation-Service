module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    MemberId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    MovieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
  }, {
    paranoid: false,
    comment: '排名資料表',
    indexes: [
      {
        name: 'UserRatingIsUnique',
        unique: true,
        method: 'BTREE',
        fields: ["MovieId", "MemberId"],
      }
    ],
    classMethods: {
      associate: (models) => {
        return;
      }
    }
  });
  return Rating;
};
