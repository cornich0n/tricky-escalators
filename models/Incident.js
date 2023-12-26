const { Model, DataTypes } = require("sequelize");
const connection = require("./db");

class Incident extends Model {}

Incident.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        escalator_id: {
            type: DataTypes.TINYINT,
            allowNull: false,
            references:{
                model: 'Escalator',
                key: 'id'
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        date_begin: {
            type: DataTypes.DATE,
            allowNull: false
        },
        date_end: DataTypes.DATE,
    },
    {
        sequelize: connection,
    }
);
