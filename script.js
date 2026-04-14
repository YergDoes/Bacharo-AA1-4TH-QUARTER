/*
  script.js
  Purpose: Client‑side validation for signup form (no page reload)
  Author: Student Project
  Date: 2026-04-10
*/

// ---------- HELPER: clear individual error span (used by inline events) ----------
function clearFieldError(spanId) {
  const span = document.getElementById(spanId);
  if (span) span.innerHTML = "";
}

// Individual live validations (onblur) – optional but improves UX
function validateFullname() {
  const name = document.getElementById("fullname").value.trim();
  const err = document.getElementById("fullnameError");
  if (name === "") err.innerHTML = "Full name is required.";
  else if (name.length < 2) err.innerHTML = "Full name must be at least 2 characters.";
  else err.innerHTML = "";
}
function validateBirthdate() {
  const bday = document.getElementById("birthdate").value;
  const err = document.getElementById("birthdateError");
  if (!bday) { err.innerHTML = "Birthdate is required."; return; }
  const birth = new Date(bday);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  if (age < 13) err.innerHTML = "You must be at least 13 years old.";
  else err.innerHTML = "";
}
function validateEmail() {
  const email = document.getElementById("email").value.trim();
  const err = document.getElementById("emailError");
  if (email === "") err.innerHTML = "Email is required.";
  else if (!email.includes("@") || !email.includes(".") || email.indexOf("@") > email.lastIndexOf("."))
    err.innerHTML = "Enter a valid email address (must contain @ and a dot).";
  else err.innerHTML = "";
}
function validateUsername() {
  const uname = document.getElementById("username").value.trim();
  const err = document.getElementById("usernameError");
  const lettersAndNumbers = /^[a-zA-Z0-9]+$/;
  if (uname === "") err.innerHTML = "Username is required.";
  else if (uname.length < 8 || uname.length > 20) err.innerHTML = "Username must be 8–20 characters.";
  else if (!lettersAndNumbers.test(uname)) err.innerHTML = "Username may only contain letters and numbers.";
  else err.innerHTML = "";
}
function validatePassword() {
  const pwd = document.getElementById("password").value;
  const err = document.getElementById("passwordError");
  if (pwd.length < 10) err.innerHTML = "Password must be at least 10 characters.";
  else if (!/[A-Z]/.test(pwd)) err.innerHTML = "Password must include at least one uppercase letter.";
  else if (!/[a-z]/.test(pwd)) err.innerHTML = "Password must include at least one lowercase letter.";
  else if (!/[0-9]/.test(pwd)) err.innerHTML = "Password must include at least one digit.";
  else err.innerHTML = "";
}
function validateConfirm() {
  const pwd = document.getElementById("password").value;
  const confirm = document.getElementById("confirmPassword").value;
  const err = document.getElementById("confirmError");
  if (confirm === "") err.innerHTML = "Please confirm your password.";
  else if (pwd !== confirm) err.innerHTML = "Passwords do not match.";
  else err.innerHTML = "";
}
function validateReferrer() {
  const ref = document.getElementById("referrer").value;
  const err = document.getElementById("referrerError");
  if (ref === "") err.innerHTML = "Please select an option.";
  else err.innerHTML = "";
}
function validateTopic() {
  const topic = document.getElementById("favoriteTopic").value.trim();
  const err = document.getElementById("topicError");
  if (topic === "") err.innerHTML = "Please enter a favorite topic.";
  else err.innerHTML = "";
}

// ---------- MAIN VALIDATION (runs on submit) ----------
function validateForm() {
  // 1. CLEAR ALL ERROR SPANS AND SUCCESS MESSAGE
  const errorSpans = document.querySelectorAll(".error-message");
  errorSpans.forEach(span => span.innerHTML = "");
  document.getElementById("formFeedback").innerHTML = "";

  let isValid = true;

  // ========== PERSONAL INFORMATION ==========
  // Full name
  const fullname = document.getElementById("fullname").value.trim();
  if (fullname === "") {
    document.getElementById("fullnameError").innerHTML = "Full name is required.";
    isValid = false;
  } else if (fullname.length < 2) {
    document.getElementById("fullnameError").innerHTML = "Full name must be at least 2 characters.";
    isValid = false;
  }

  // Birthdate + age >= 13
  const birthdateInput = document.getElementById("birthdate").value;
  if (birthdateInput === "") {
    document.getElementById("birthdateError").innerHTML = "Birthdate is required.";
    isValid = false;
  } else {
    const birth = new Date(birthdateInput);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age--;
    if (age < 13) {
      document.getElementById("birthdateError").innerHTML = "You must be at least 13 years old.";
      isValid = false;
    }
  }

  // Sex (radio group) – loop
  const sexRadios = document.getElementsByName("sex");
  let sexChecked = false;
  for (let i = 0; i < sexRadios.length; i++) {
    if (sexRadios[i].checked) {
      sexChecked = true;
      break;
    }
  }
  if (!sexChecked) {
    document.getElementById("sexError").innerHTML = "Please select your sex.";
    isValid = false;
  }

  // Email
  const email = document.getElementById("email").value.trim();
  if (email === "") {
    document.getElementById("emailError").innerHTML = "Email is required.";
    isValid = false;
  } else if (!email.includes("@") || !email.includes(".") || email.indexOf("@") > email.lastIndexOf(".")) {
    document.getElementById("emailError").innerHTML = "Enter a valid email (must contain @ and a dot).";
    isValid = false;
  }

  // ========== ACCOUNT DETAILS ==========
  // Username
  const username = document.getElementById("username").value.trim();
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  if (username === "") {
    document.getElementById("usernameError").innerHTML = "Username is required.";
    isValid = false;
  } else if (username.length < 8 || username.length > 20) {
    document.getElementById("usernameError").innerHTML = "Username must be 8–20 characters.";
    isValid = false;
  } else if (!usernameRegex.test(username)) {
    document.getElementById("usernameError").innerHTML = "Username may only contain letters and numbers.";
    isValid = false;
  }

  // Password (multiple rules, separate checks)
  const password = document.getElementById("password").value;
  if (password.length < 10) {
    document.getElementById("passwordError").innerHTML = "Password must be at least 10 characters.";
    isValid = false;
  } else if (!/[A-Z]/.test(password)) {
    document.getElementById("passwordError").innerHTML = "Include at least one uppercase letter.";
    isValid = false;
  } else if (!/[a-z]/.test(password)) {
    document.getElementById("passwordError").innerHTML = "Include at least one lowercase letter.";
    isValid = false;
  } else if (!/[0-9]/.test(password)) {
    document.getElementById("passwordError").innerHTML = "Include at least one digit.";
    isValid = false;
  }

  // Confirm password (only if password is valid enough to compare)
  const confirmPwd = document.getElementById("confirmPassword").value;
  if (confirmPwd === "") {
    document.getElementById("confirmError").innerHTML = "Please confirm your password.";
    isValid = false;
  } else if (password !== confirmPwd) {
    document.getElementById("confirmError").innerHTML = "Passwords do not match.";
    isValid = false;
  }

  // ========== TOPIC QUESTIONS ==========
  // Dropdown (select)
  const referrer = document.getElementById("referrer").value;
  if (referrer === "") {
    document.getElementById("referrerError").innerHTML = "Please select how you heard about us.";
    isValid = false;
  }

  // Checkbox list – loop through getElementsByName
  const interests = document.getElementsByName("interests");
  let oneChecked = false;
  for (let i = 0; i < interests.length; i++) {
    if (interests[i].checked) {
      oneChecked = true;
      break;
    }
  }
  if (!oneChecked) {
    document.getElementById("interestsError").innerHTML = "Select at least one interest.";
    isValid = false;
  }

  // Third topic question: favorite topic (text)
  const favTopic = document.getElementById("favoriteTopic").value.trim();
  if (favTopic === "") {
    document.getElementById("topicError").innerHTML = "Please enter a favorite topic.";
    isValid = false;
  }

  // 4. SHOW SUCCESS MESSAGE ONLY IF EVERYTHING PASSED
  if (isValid) {
    document.getElementById("formFeedback").innerHTML = "✓ Form submitted successfully! (demo)";
  }

  return isValid;  // false prevents page reload
}