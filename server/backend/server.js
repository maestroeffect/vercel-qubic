const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema & Model
const SubscriberSchema = new mongoose.Schema({ email: String });
const Subscriber = mongoose.model("Subscriber", SubscriberSchema);

// Route: Subscribe User
app.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Check if email exists
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: "Email already subscribed" });
    }

    // Save to DB
    await new Subscriber({ email }).save();
    res.status(200).json({ message: "Subscribed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Route: Send Newsletter
app.post("/send-newsletter", async (req, res) => {
  const { subject, content } = req.body;

  try {
    const subscribers = await Subscriber.find();
    const emails = subscribers.map((sub) => sub.email);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emails,
      subject,
      html: content,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Newsletter sent!" });
  } catch (error) {
    res.status(500).json({ message: "Error sending emails", error });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
