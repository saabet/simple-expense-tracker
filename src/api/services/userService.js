const bcrypt = require('bcrypt');

const users = [];

const addUser = async ({ username, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: `${Date.now()}`,
    username,
    password: hashedPassword,
  };
  users.push(newUser);
  return newUser;
};

const getUserByUsername = (username) => users.find((u) => u.username === username);

module.exports = { addUser, getUserByUsername };
