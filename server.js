const express = require('express');
const app = express();
const { syncAndSeed, models } = require('./db')
const {User, Department} = models




const port = process.env.PORT || 3000;

syncAndSeed();

app.use(require('cors')());

app.get('/api/users', async(req, res, next) => {
  try {const users = await User.findAll()
  res.send(users)
  }
  catch (ex) {
    next(ex)
  }
});

app.get('/api/departments', async(req, res, next) => {
  try {
    const departments = await Department.findAll();
    res.send(departments)
  }
  catch (ex) {
    next (ex)
  }
})

app.get('/api/users/:id', async(req, res, next) => {
  try {const user = await User.findByPk()
  res.send(user)
  }
  catch (ex) {
    next(ex)
  }
});

app.get('/api/department/:id', async(req, res, next) => {
  try {
    const department = await Department.findByPk();
    res.send(department)
  }
  catch (ex) {
    next (ex)
  }
})

app.listen(port, () => console.log(`listening on port ${port}`));
