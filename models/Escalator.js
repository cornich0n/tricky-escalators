const { Model, DataTypes } = require("sequelize");
const connection = require("./db");

class Escalator extends Model {}

Escalator.init(
    {
        id: {
            type: DataTypes.TINYINT,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        status: {
            type: DataTypes.ENUM('En mache', 'En panne', 'En reparation'),
            allowNull: false,
        }
    },
    {
        sequelize: connection
    }
);
