const bcrypt = require("bcrypt");

const hashpassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparepassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

exports.hashpassword = hashpassword;
exports.comparepassword = comparepassword;
