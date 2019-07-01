const Sequelize = require("sequelize");
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost:5432/acmeUserDepartmentsAPI"
);

const User = conn.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  id: {
    type: conn.Sequelize.UUID,
    defaultValue: conn.Sequelize.UUIDV4,
    primaryKey: true
  }
});

const Department = conn.define("department", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  id: {
    type: conn.Sequelize.UUID,
    defaultValue: conn.Sequelize.UUIDV4,
    primaryKey: true
  }
});

Department.hasMany(User)

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const deptNames = ["admin", "service"];
  await Promise.all(deptNames.map(name => Department.create({ name })));
  const userNames = ["Dirty Harry", "Susie", "Dolly"];
  await Promise.all(userNames.map(name => User.create({ name })));
};



module.exports ={
  syncAndSeed,
  models: {
    User,
    Department
  }
};
