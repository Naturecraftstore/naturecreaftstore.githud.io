const express = require("express"); // <<< ADDED
const app = express();             // <<< ADDED

const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const twilio = require("twilio");
// const { app } = require("./login"); // <<< REMOVED/COMMENTED OUT

app.use(cors());
app.use(bodyParser.json());

// Twilio Credentials (use environment variables in a production app)
const accountSid = "ACc67150236a7f28c12d77b048c135c142";
const authToken = "8ec5207d4e2cf3ef723997e8f102bc63";
const twilioClient = twilio(accountSid, authToken);
const twilioNumber = "+1xxxxxxx";

// Email Credentials (Gmail SMTP)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "YOUR_GMAIL@gmail.com",
        pass: "YOUR_GMAIL_APP_PASSWORD"
    }
});

// Generate OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

// API: Send OTP
app.post("/send-otp", async (req, res) => {
    const { phone, email } = req.body;
    const otp = generateOTP();

    // SMS OTP (Error handling should be added for production)
    if (phone && accountSid.startsWith('AC')) { // Check to prevent sending with placeholder
        try {
            await twilioClient.messages.create({
                body: `Your OTP is: ${otp}`,
                from: twilioNumber,
                to: phone
            });
        } catch (error) {
            console.error("Twilio SMS failed:", error.message);
        }
    }

    // EMAIL OTP (Error handling should be added for production)
    if (email) {
        try {
            await transporter.sendMail({
                from: "Nature Craft Store",
                to: email,
                subject: "Your OTP Code",
                text: `Your OTP is: ${otp}`
            });
        } catch (error) {
            console.error("Nodemailer email failed:", error.message);
        }
    }

    res.json({ success: true, otp: otp });
});

// API: Verify OTP
app.post("/verify-otp", (req, res) => {
    const { sentOTP, enteredOTP } = req.body;

    if (sentOTP == enteredOTP) {
        res.json({ verified: true });
    } else {
        res.json({ verified: false });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));