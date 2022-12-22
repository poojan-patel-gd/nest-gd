const express = require("express");
const router = express.Router();
const Student = require("../models/model");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "ddwqghrweqhrweorjwprqrpqwe-qe0wqeirwqkdas-awe9dhqw98edeid";
const bcrypt = require("bcryptjs");
var nodemailer = require("nodemailer");
router.get("/forgot-password", (req, resp) => {
  resp.render("forgot");
});

router.post("/add", async (req, resp) => {
  console.log(req.body.password);
  req.body.password = await bcrypt.hash(req.body.password, 10);
  const student = new Student(req.body);
  console.log(student);
  console.log(req.body.password);
  try {
    const result = await student.save();
    resp.send("data add successfully for database");
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, resp) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email + " " + password);
    const result1 = await Student.findOne({ email: email });
    console.log(result1.password);
    const isvalid = await bcrypt.compare(password, result1.password);
    console.log(isvalid);
    if (!isvalid) {
      resp.send("invalid credentials");
      return;
    }
    resp.send("login successfully");
  } catch (error) {
    console.log(error);
  }
});

router.post("/forgot-password", async (req, resp) => {
  const { email } = req.body;
  console.log(email)
  try {
    const olduser = await Student.findOne({ email });
    if (!olduser) {
      return resp.json({ status: "USER not Exists!" });
    }
    const secret = JWT_SECRET + olduser.password;
    const token = await jwt.sign(
      { email: olduser.email, id: olduser._id },
      secret,
      {
        expiresIn: "5m",
      }
    );
    const link = `http://localhost:9000/reset-password/${olduser._id}/${token}`;
    console.log(link);
    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true, 
      auth: {
        user: "vaibhavbhanderi5@gmail.com",
        pass: "tcbmonjzuhmwbjyz",
      },
    });
    var mailOptions = {
      from: "vaibhavbhanderi5@gmail.com",
      to: "vaibhavbhanderi5@gmail.com ",
      subject: "Sending Email using Node.js",
      text: link,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    resp.json({ status: "please check your email" });
  } catch (error) {
    console.log(error);
  }
});
router.get("/reset-password/:id/:token", async (req, resp) => {
  const { id, token } = req.params;
  console.log(req.params);
  const olduser = await Student.findOne({ _id: id });
  if (!olduser) {
    return resp.json({ status: "USER not Exists!" });
  }
  const secret = JWT_SECRET + olduser.password;
  try {
      const verify = await jwt.verify(token, secret);

    resp.render("index", { email: verify.email });
  } catch (error) {
    console.log(error);
    resp.send("not verified");
  }
});
router.post("/reset-password/:id/:token", async (req, resp) => {
  const { id, token } = req.params;
  const { password } = req.body;
  console.log(req.params);
  const olduser = await Student.findOne({ _id: id });
  if (!olduser) {
    return resp.json({ status: "USER not Exists!" });
  }
  const secret = JWT_SECRET + olduser.password;
  try {
    const verify = jwt.verify(token, secret);
    const hashpassword = await bcrypt.hash(password, 10);
    await Student.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: hashpassword,
        },
      }
    );

    resp.send({ status: "password updated" });
  } catch (error) {
    console.log(error);
    resp.send("Something went wrong");
  }
});

module.exports = router;
