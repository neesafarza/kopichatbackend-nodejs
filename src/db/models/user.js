module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    userName: {
      type: 'VARCHAR',
      unique: true,
      allowNull: false,
    }
  });
  return User;
}