const step1 = document.querySelector(".step1"),
      step2 = document.querySelector(".step2"),
      step3 = document.querySelector(".step3"),
      emailAddress = document.getElementById("emailAddress"),
      inputs = document.querySelectorAll(".otp-group input"),
      nextButton = document.querySelector(".nextButton"),
      verifyButton = document.querySelector(".verifyButton");

let OTP = "";

window.addEventListener("load", () => {
    step2.style.display = "none";
    step3.style.display = "none";
    nextButton.classList.add("disable");
    verifyButton.classList.add("disable");
    emailjs.init("wxpgXrbGxdc_5VXdM");
});

const validateEmail = (email) => {
    let re = /\S+@\S+\.\S+/;
    // Toggles 'disable' class: adds it if re.test(email) is FALSE, removes it if TRUE
    nextButton.classList.toggle("disable", !re.test(email));
};
// ... existing functions ...

const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000);
};

// >>>>>> ADD THIS LISTENER <<<<<<
emailAddress.addEventListener("input", (e) => {
    validateEmail(e.target.value);
});
// >>>>>> END OF ADDED CODE <<<<<<

inputs.forEach((input, index) => {
// ... rest of your code ...
});

inputs.forEach((input, index) => {
    input.addEventListener("keyup", function (e) {
        this.value = this.value.substring(0, 1);

        if (
            inputs[0].value &&
            inputs[1].value &&
            inputs[2].value &&
            inputs[3].value
        ) {
            verifyButton.classList.remove("disable");
        } else {
            verifyButton.classList.add("disable");
        }
    });
});

const serviceID = "service_nm37fhh";
const templateID = "template_i6iyrxx";
// Add this new event listener
emailAddress.addEventListener("input", (e) => {
    validateEmail(e.target.value);
});

nextButton.addEventListener("click", () => {
    OTP = generateOTP();
    nextButton.innerHTML = "⚡ sending...";

    let templateParameter = {
        from_name: "Nature Craft Store Dev Community",
        OTP: OTP,
        message:"Your OTP is: " + OTP, // Changed message to be relevant to OTP
        to_email: emailAddress.value.trim(),
    };

    // --- CRITICAL FIX HERE: Use the variables (no quotes) ---
    // 1. serviceID, 2. templateID, 3. templateParameter
    emailjs.send(serviceID, templateID, templateParameter).then( 
        (res) => {
            nextButton.innerHTML = "Next →";
            step1.style.display = "none";
            step2.style.display = "block";
        },
        (err) => {
            console.error("EmailJS Error:", err);
            nextButton.innerHTML = "Next →"; // Reset button text
            alert("Failed to send OTP. Please check the console for details.");
        }
    );
});

verifyButton.addEventListener("click", () => {
    let values = "";
    inputs.forEach((input) => (values += input.value));

    if (OTP == values) {
        step1.style.display = "none";
        step2.style.display = "none";
        step3.style.display = "block";
    } else {
        verifyButton.classList.add("error-shake");
        setTimeout(() => {
            verifyButton.classList.remove("error-shake");
        }, 1000);
    }
});

function changeMYEmail() {
    step1.style.display = "block";
    step2.style.display = "none";
    step3.style.display = "none";
}
