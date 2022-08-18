'use strict';
    const Sequelize = require('sequelize');
    var bcypt = require('bcryptjs');
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync("B4c0/\/", salt);

    module.exports = (sequelize) => {
      class User extends Sequelize.Model {}
      User.init(
        {
          id: {
            type: DataTypes.INTEGER,// sequelize or datatype?
            primaryKey: true,
            autoIncrement: true,
          },
          firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notNull: {
                msg: "First name is required",
              },
                notEmpty: {
                    msg: "Please provide a name"
                }
            },
          },
          lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notNull: {
                msg: "Last name is required",
              },
            },
          },
          emailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
              msg: "The email you entered already exists",
            },
            validate: {
              notNull: {
                msg: "An email is required",
              },
              isEmail: {
                msg: "Pleases provide a valid email address",
              },
            },
          },
          Password: {
            type: DataTypes.STRING,//or vitual?
            allowNull: false,
            set(val) {
              if (val === this.password) {
                const hashedPassword = bcrypt.hashSync(val, 10);
                this.setDataValue("Password", hashedPassword);
              }
            },
            validate: {
              notNull: {
                msg: "Both passwords must match",
              },
            },
          },
        },
        { sequelize }
      );

      User.associate = (models) => {
        User.hasMany(models.Course);
      };

      return User;
    };