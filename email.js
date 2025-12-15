const step1 = document.querySelector(".step1"),
step2 = document.querySelector(".step2"),
step3 = document.querySelector(".step3"),
emailAddress = document.getElementById("emailAddress"),
verifyEmail = document.getElementById("verifyEmail"),
inputs = document.querySelectorAll(".otp-group input"),
nextButton = document.querySelector(".nextButton"),
verifyButton = document.querySelector(".verifyButton");

let OTP = "";
// Ensure this URL is correct for your home page
const HOME_PAGE_URL = "home.html"; 

// Initial UI Setup
window.addEventListener("load", () => {
    step2.style.display = "none";
    step3.style.display = "none";
    nextButton.classList.add("disable");
    verifyButton.classList.add("disable");
    emailjs.init("wxpgXrbGxdc_5VXdM");
});

// Email validation
const validateEmail = (email) => {
    let re = /\S+@\S+\.\S+/;
    // CRITICAL FIX: Also use the disabled attribute for robustness
    if (re.test(email)) {
        nextButton.classList.remove("disable");
        nextButton.disabled = false; 
    } else {
        nextButton.classList.add("disable");
        nextButton.disabled = true; 
    }
};

// Input listener for real-time validation (Needed to make sure the button enables)
if (emailAddress) {
    emailAddress.addEventListener("input", (e) => {
        validateEmail(e.target.value.trim());
    });
}

// OTP generator
const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000);
};

// OTP Input handler
inputs.forEach((input, index) => {
    input.addEventListener("keyup", (e) => {
        // Accept only 1 digit
        e.target.value = e.target.value.substr(0, 1);

        // Move to next input
        if (e.target.value && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }

        // Enable verify button only if all fields filled
        let allFilled = [...inputs].every(inp => inp.value !== "");
        if (allFilled) {
            verifyButton.classList.remove("disable");
        } else {
            verifyButton.classList.add("disable");
        }
    });
    // Handle backspace to move focus backward and clear previous input
    input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && input.value === "" && index > 0) {
            inputs[index - 1].focus();
            inputs[index - 1].value = "";
            verifyButton.classList.add("disable");
        }
    });
});

const serviceID = "service_nm37fhh";
const templateID = "template_i6iyrxx";

// Send OTP
nextButton.addEventListener("click", () => {
    
    const recipientEmail = emailAddress.value.trim(); 
    
    // SAFETY CHECK
    if (!recipientEmail || nextButton.classList.contains("disable")) {
        console.error("Recipient email is empty or invalid. Preventing send.");
        return; 
    }
    
    // 1. Generate OTP and store it in the global 'OTP' variable
    OTP = generateOTP(); 
    
    // 2. Calculate Expiration Time
    const now = new Date();
    const expiration = new Date(now.getTime() + 10 * 60000); 
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    const expirationTime = expiration.toLocaleString('en-US', timeOptions);

    nextButton.innerHTML = "⚡ Sending...";
    nextButton.disabled = true; // Disable during send
    
    // Display the email on step 2
    if (verifyEmail) {
        verifyEmail.textContent = recipientEmail;
    }

    let templateParameter = {
        from_name: "Nature Craft Store Dev Community",
        passcode: OTP, 
        time: expirationTime, 
        to_email: recipientEmail, 
        reply_to: recipientEmail,
    };

    emailjs.send(serviceID, templateID, templateParameter)
        .then(() => {
            nextButton.innerHTML = "Next &rarr;";
            nextButton.disabled = false;
            step1.style.display = "none";
            step2.style.display = "block";
        })
        .catch(err => {
            console.error("EmailJS Send Error:", err);
            nextButton.innerHTML = "❌ Failed. Try Again";
            nextButton.disabled = false;
        });
});

// --- 👇 MODIFIED VERIFY OTP LOGIC 👇 ---
verifyButton.addEventListener("click", () => {
    let userOTP = "";
    inputs.forEach(inp => userOTP += inp.value);

    if (Number(userOTP) === Number(OTP)) {
        // 1. Show the success screen (step3)
        step2.style.display = "none";
        step3.style.display = "block";

        // 2. Set a 3-second delay (3000 milliseconds) and redirect
        setTimeout(() => {
            window.location.href = HOME_PAGE_URL; // THIS PERFORMS THE REDIRECTION
        }, 3000); // 3000ms = 3 seconds

    } else {
        // Handle incorrect OTP
        verifyButton.classList.add("error-shake");
        setTimeout(() => verifyButton.classList.remove("error-shake"), 800);
    }
});
// --- 👆 END OF MODIFIED VERIFY OTP LOGIC 👆 ---

// Change Email
function changeMYEmail() {
    step1.style.display = "block";
    step2.style.display = "none";
    step3.style.display = "none";
    // Clear the inputs when returning to step 1
    inputs.forEach(inp => inp.value = "");
    verifyButton.classList.add("disable");
    emailAddress.value = "";
    nextButton.classList.add("disable");
}