module.exports = (sequelize, Sequelize) => {
    const Mean = sequelize.define(
      'mean',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING,
          field: 'name',
          allowNull: false,
          trim: true,
          validate: {
            notNull: { msg: "name is required" },
          }
        },
        publish: {
          type: Sequelize.INTEGER,
          field: 'publish',
          allowNull: false
        }
      },
      {
        timestamps: false,
        freezeTableName: true
      }
    );
    return Mean;
  };