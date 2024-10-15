const User = require("../models/User");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const user = await User.selectWhere("email", email);
  if (user == "") return res.status(400).json({ message: "email not exists" });
  console.log(user);

  if (user[0].password != password)
    return res.status(401).json({ message: "Wrong pasword" });

  const accessToken = jwt.sign(
    {
      name: user[0].name,
      email,
      user_id: user[0].user_id,
      mobile: user[0].mobile,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
  res.status(200).json({ accessToken });
};

module.exports = { login };
