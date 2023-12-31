const { Model, DataTypes } = require("sequelize");
const connection = require("./db");

class Incident extends Model {}

Incident.init(
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
        maintenance_id: {
            type: DataTypes.TINYINT,
            allowNull: false,
            references:{
                model: 'Maintenance',
                key: 'id'
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
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
