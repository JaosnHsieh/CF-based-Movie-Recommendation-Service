import getHashedPassword from '../libs/getHashedPassword';

module.exports = (sequelize, DataTypes) => {
    let Member = sequelize.define('Member', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            comment: '索引值',
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            comment: '信箱',
            unique: true,
        },
        hashedPassword: {
            type: DataTypes.CHAR(50),
            comment: '加密後密碼',
        },
        password: {
            type: DataTypes.VIRTUAL,
            allowNull: false,
            set: function(val) {
                let hashedPassword = getHashedPassword(val);
                this.setDataValue('password', val);
                this.setDataValue('hashedPassword', hashedPassword);
            },
            comment: '原始密碼傳入後會轉換成加密（此欄位為虛擬不會真實存在）',
        },
        username: {
            type: DataTypes.STRING,
            comment: '姓名',
        }
    }, {
        comment: '會員資料表',
        classMethods: {
            associate: (models) => {
                Member.belongsToMany(models.Movie, { through: 'Rating' });
                return;
            }
        }
    });
    return Member;
};
