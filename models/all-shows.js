
module.exports = function(sequelize, DataTypes) {
  var Shows = sequelize.define("Shows", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    genres: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // The password cannot be null
    image: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Shows;
};
