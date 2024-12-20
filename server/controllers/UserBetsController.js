const { UserBetsModel } = require('../models');

const create = (req, res) => {
  const { userId } = req.session;
  if (!userId) {
    return res.status(401).send({ message: 'User is not logged in' });
  }

  const { name, color, emoji } = req.body;
  if (!name || !color || !emoji) {
    return res
      .status(400)
      .send({ message: 'Provide name, color and emoji to create a user' });
  }

  UserBetsModel.create(userId, name, color, emoji)
    .then(user => {
      res.status(201).send({ message: 'Created!', user });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error creating user', error: error.message });
    });
};

const getAll = (req, res) => {
  console.log('getAll at controller')
  UserBetsModel.getAll()
    .then(usersBets => {
      if (usersBets.length === 0) {
        return res.status(200).send({ message: 'No usersBets available!' });
      }

      res.status(200).send({ usersBets });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error reading usersBets', error: error.message });
    });
};

const getById = (req, res) => {
  const { id } = req.params;

  UserBetsModel.getById(id)
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'user not found!!!!! Test' });
      }

      res.status(200).send({ message: 'Here is your user!', user });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error reading user', error: error.message });
    });
};

const update = (req, res) => {
  const { userId } = req.session;
  if (!userId) {
    return res.status(401).send({ message: 'User is not logged in' });
  }

  const { name, color, emoji } = req.body;
  if (!name || !color || !emoji) {
    return res
      .status(400)
      .send({ message: 'Provide name, color and emoji to update a user' });
  }

  const { id } = req.params;

  UserBetsModel.update(name, color, emoji, id)
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'user not found!' });
      }

      res.status(201).send({ message: 'Updated!', user });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error updating user', error: error.message });
    });
};

const remove = (req, res) => {
  const { userId } = req.session;
  if (!userId) {
    return res.status(401).send({ message: 'User is not logged in' });
  }

  const { id } = req.params;

  UserBetsModel.remove(id)
    .then(() => {
      res.status(204).send();
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error deleting user', error: error.message });
    });
};

const getProfile = (req, res) => {
  console.log('get profile controller ID')
  const { userId } = req.session;
  
  if (!userId) {
    return res.status(401).send({ message: 'User is not logged in' });
  }
  else {
    UserBetsModel.getById(userId)
      .then((user) => {
        delete user.password
        res.send({user})
      });
  }
};

module.exports = { create, getAll, getById, update, remove, getProfile };
