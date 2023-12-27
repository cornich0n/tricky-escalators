const { Model, DataTypes } = require("sequelize");
const connection = require("./db");

class Maintenance extends Model {}

Maintenance.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        escalator_id: {
            type: DataTypes.TINYINT,
            allowNull: false,
            references:{
                model: 'Escalator',
                key: 'id'
            },
        },
        incident_id: {
            type: DataTypes.TINYINT,
            allowNull: true,
            references: {
                model : 'Incident',
                key : 'id'
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },

    },
    {
        sequelize: connection,
    }
);
