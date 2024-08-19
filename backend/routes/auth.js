const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "shhhhh";
const fetchuser = require('../middleware/fetchuser')
const {
  query,
  body,
  matchedData,
  validationResult,
} = require("express-validator");
//---------Route1: Authenticate a user using :POSt "/api/auth/createuser". no login
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password(must be 6 characters)").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success=false
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
      success=false
      return res.status(400).json({ error: "Email already in use" });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    user = await Users.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });
    const data = {
      user: {
        id: user.id,
      },
    };
    success=true
    const token = jwt.sign(data, jwtSecret);
    // res.json(user)
    res.json({success,token:token});
  }
);
//---------Route2: Authenticate a user using :POSt "/api/auth/login". no login
router.post(
  "/login",
  [
    // body('name','Enter a valid name').isLength({min : 3}),
    body("email", "Enter a valid email").isEmail().exists(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await Users.findOne({ email: req.body.email });
      if (!user) {
        success=false
        return res.status(400).json({ error: "Enter valid email" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success=false
        return res.status(400).json({ error: "Enter valid credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, jwtSecret);
      success=true
      // res.json(user)
      res.json({success,token:token});

    } catch (error) {
      console.error(error.message);
      res.status(400).json({errors:"Internal server"})
    }
  }
);

//Route3: get loggedin user details using :POSt "/api/auth/getuser". login req
router.post("/getuser", fetchuser ,async (req, res) => {
  try {
      userId = req.user.id;
      const user =await Users.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(400).json({errors:"Internal server"})
    }
  }
);
module.exports = router;
