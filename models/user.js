// var bcrypt = require("bcrypt");

// module.exports = function(sequelize, DataTypes) {
//   var User = sequelize.define("User", {
//     userName: {
//       type: DataTypes.STRING,
//       unique: true,
//       allowNull: false
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     admin: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false
//     },
//     createdAt: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: sequelize.fn("NOW")
//     },
//     updatedAt: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: sequelize.fn("NOW")
//     }
//   });

//   User.associate = function(models) {
//     User.hasMany(models.AuthToken);
//   };

//   User.authenticate = async function(userName, password) {
//     const user = await User.findOne({ where: { userName } });

//     if (bcrypt.compareSync(password, user.password)) {
//       return user.authorize();
//     }

//     throw new Error("invalid password");
//   };

//   User.prototype.authorize = async function() {
//     const { AuthToken } = sequelize.models;
//     const user = this;

//     // create a new auth token associated to 'this' user
//     // by calling the AuthToken class method we created earlier
//     // and passing it the user id
//     const authToken = await AuthToken.generate(this.id);

//     // addAuthToken is a generated method provided by
//     // sequelize which is made for any 'hasMany' relationships
//     await user.addAuthToken(authToken);

//     return {
//       userId: user.id,
//       userName: user.userName,
//       token: authToken.token
//     };
//   };

//   User.prototype.logout = async function(token) {
//     // destroy the auth token record that matches the passed token
//     sequelize.models.AuthToken.destroy({ where: { token } });
//   };

//   return User;
// };
