const Sequelize = require('sequelize');
const port = 3000;
const db = new Sequelize(`postgres://localhost:${port}`);

const User = db.define('user', {
  name: {
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  id: {
    type: db.Sequelize.UUID,
    defaultValue: db.Sequelize.UUIDV4
  }
})

const Department = db.define('department')


module.export = User
