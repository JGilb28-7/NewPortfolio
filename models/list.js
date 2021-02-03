// 1 user has many accounts
module.exports = function (sequelize, DataTypes) {
    var List = sequelize.define("List", {
      firstname: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Required",
          },
          is: {
            args: ["^[a-z]+$", "i"],
            msg: "Only letters allowed",
          },
          len: {
            args: [4, 32],
            msg: "String length is not in this range",
          },
        },
      },
      lastname: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Required",
          },
          is: {
            args: ["^[a-z]+$", "i"],
            msg: "Only letters allowed",
          },
          len: {
            args: [4, 32],
            msg: "String length is not in this range",
          },
        },
      },
       email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
  
      Message: {
        type: DataTypes.STRING,
        allowNull: false,
        created_at: sequelize.date, 
      } ,
    });
  
    List.prototype.validPassword = function (password) {
      return bcrypt.compareSync(password, this.password);
    };
    List.addHook("beforeCreate", function (list) {
      List.password = bcrypt.hashSync(
        list.password,
        bcrypt.genSaltSync(10),
        null
      );
    });
    return List;
  };