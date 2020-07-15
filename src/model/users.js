module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define(
      'users',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          primaryKey: true
        },
        username: {
          type: Sequelize.STRING,
          field: 'username',
          allowNull: false,
          trim: true,
          validate: {
            notNull: { msg: "username is required" },
          }
        },
        email: {
          type: Sequelize.STRING,
          field: 'email',
          allowNull: false,
          trim: true,
          validate: {
            notNull: { msg: "email is required" },
          }
        },
        password: {
          type: Sequelize.STRING,
          field: 'password',
          allowNull: false,
          trim: true,
          validate: {
            notNull: { msg: "password is required" },
          }
        }
      },
      {
        timestamps: false,
        freezeTableName: true
      }
    );
    return Users;
  };