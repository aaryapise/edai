// server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./mongo'); // Import the User model correctly
require('dotenv').config(); // To load environment variables from .env

const app = express();

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3001' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes

app.get("/",cors(),(req,res)=>{

})



app.get("/signup", (req, res) => {
    res.render("signup");
});

const nodemailer = require('nodemailer');

// Set up email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'glead7103@gmail.com', 
        pass: 'juas qiob jgzq ayaj',  
    }
});

// Function to send email to the customer
function sendServiceRequestEmail(email) {
    const mailOptions = {
        from: 'chaudhariastha2003@gmail.com', // Sender address
        to: email,            // Customer's email
        subject: 'Service Request Confirmation',
        text: `Dear Customer, \n\nYour service request for a selected job has been successfully made. The labourer will contact you shortly.\n\nThank you for using our service.\n\nBest regards,\nLabourHub`
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });
        if (user) {
            // Send email to the user
            sendServiceRequestEmail(email);

            // Return success response
            return res.status(200).json({
                message: "exist",
                user: { email: user.email, name: user.name },
            });
        } else {
            return res.status(401).json("notexist");
        }
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json("An error occurred during login.");
    }
});


app.post("/signup", async (req, res) => {
    console.log("Signup request body:", req.body);
    try {
        const { name, email, password } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json("exist"); // User already exists
        }

        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json("User created successfully");
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json("An error occurred during signup.");
    }
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});
