const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const connection = require("./db");

class Escalator extends Model {}

Escalator.init(
    {
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
        activated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        dob: DataTypes.DATE,
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
