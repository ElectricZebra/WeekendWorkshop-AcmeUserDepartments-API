const express = require('express');
const app = express();
const { syncAndSeed, models } = require('./db')
const {User, Department} = models

const port = process.env.PORT || 3000;

syncAndSeed();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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
});

app.post('/api/users/:id?', async(req, res, next) => {
  try {
    await User.create({ name: req.body.name})
    const newUser = await User.findOne({
      where: {
        name: req.body.name
      }
    })
    // TODO add user.id to res.send
    res.send({name: newUser.name})
  }
  catch (ex) {
    next(ex)
  }
});

app.post('/api/departments/:id?', async(req, res, next) => {
  try{
    await Department.create({ name: req.body.name });
    const newDept = await Department.findOne({
      where: {
        name: req.body.name
      }
    });
    res.send({ name: newDept.name })
  }
  catch(ex) {
    next(ex)
  }
})

// app.put('/api/user/:id', (req, res, next) => {
//   try {
//     console.log('///// req.body', req.body);
//     res.send('here is something')

//   }
//   catch (ex) {
//     next(ex)
//   }
// })

// app.delete(('/api/user/:id'), async (req, res, next) => {
//   try {
//     const deleteUser = await
//   }
//   catch (ex) {
//     next(ex)
//   }
// })

app.listen(port, () => console.log(`listening on port ${port}`));
