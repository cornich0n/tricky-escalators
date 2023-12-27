const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const connection = require("./db");

class Users extends Model {}

Users.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true, // Add auto-increment for primary key
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,32}/,
            },
        },
        role: {
            type: DataTypes.ENUM('user', 'tech', 'vandal'),
            allowNull: false,
        },
    },
    {
        sequelize: connection,
        modelName: 'Users', // Explicitly set the model name
    }
);

Users.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
});

Users.beforeUpdate(async (user) => {
    if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
});

Users.prototype.toJSON = function () {
    const user = this.get();
    delete user.password;
    return user;
};

module.exports = Users;
