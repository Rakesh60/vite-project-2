import "dotenv/config";

import jwt from "jsonwebtoken";

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    res.status(401).send({ error: "Please authenticate using valid token" });
  }

  try {
    const { userId } = jwt.verify(token, "" + process.env.JWT_SECRET);
    req.userId = userId;
    console.log("Fetch user :", userId);
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

export default fetchUser;
