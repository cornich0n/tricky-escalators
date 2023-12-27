const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const connection = require("./db");

class SuperUser extends Model {}

SuperUser.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,32}/,
            },
        },
        role: {
            type: DataTypes.ENUM('user','tech','vandal'),
            allowNull: false
        }
    },
    {
        sequelize: connection,
        hooks: {
            beforeCreate: async (user) => {
                user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
            },
            beforeUpdate: async (user, options) => {
                if (options.fields.includes("password")) {
                    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
                }
            },
        },
    }
);

module.exports = SuperUser;
