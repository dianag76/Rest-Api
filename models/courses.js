'use strict'
        const Sequelize = require('sequelize');
const { sequelize } = require('.');

        module.exports = (sequelize) => {
            class Course extends Sequelize.Model {}
            Course.init({
                title:{
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                notEmpty:{
                    msg: 'Please provide a value for title',
                }
            },
                },
                description: {
                type: Sequelize.TEXT,
                allowNull: false,
                validate: {
                notEmpty:{
                    msg: 'Please provide a value for description',
                }
            },
        },
              estimatedTime: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                notEmpty:{
                    msg: 'Please provide a value for time',
                }
            },
             },
                materialsNeeded: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                notEmpty:{
                    msg: 'Please provide a value for materials needed',
                },
            },
        },

        //userid 
        
    }, { sequelize });

    Course.associate = (models) => {
        Course.belongsTo(models.User);
    };
    
    return Course;
};
    