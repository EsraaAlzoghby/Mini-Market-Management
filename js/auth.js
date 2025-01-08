/** Helper Functions */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function validatePassword(password) {
    return password.length >= 6; // Minimum password length
  }
  
  /** Handle Sign Up */
  const signUpForm = document.getElementById("signUpForm");
  if (signUpForm) {
    signUpForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const name = document.getElementById("signUpName").value.trim();
      const email = document.getElementById("signUpEmail").value.trim();
      const password = document.getElementById("signUpPassword").value.trim();
  
      // Validation
      if (!name || !email || !password) {
        alert("All fields are required!");
        return;
      }
      if (!validateEmail(email)) {
        alert("Please enter a valid email address!");
        return;
      }
      if (!validatePassword(password)) {
        alert("Password must be at least 6 characters long!");
        return;
      }
  
      let users = JSON.parse(localStorage.getItem("users")) || [];
      if (users.some((user) => user.email === email)) {
        alert("User already exists with this email!");
      } else {
        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Sign Up Successful! You can now sign in.");
        signUpForm.reset();
        window.location.href = "./sign-in.html"; // Redirect to Sign In page
      }
    });
  }
  
  /** Handle Sign In */
  const signInForm = document.getElementById("signInForm");
  if (signInForm) {
    signInForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const email = document.getElementById("signInEmail").value.trim();
      const password = document.getElementById("signInPassword").value.trim();
  
      // Validation
      if (!email || !password) {
        alert("All fields are required!");
        return;
      }
      if (!validateEmail(email)) {
        alert("Please enter a valid email address!");
        return;
      }
  
      let users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find((user) => user.email === email && user.password === password);
  
      if (user) {
        alert(`Welcome back, ${user.name}!`);
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "../index.html"; // Redirect to Home page
      } else {
        alert("Invalid email or password!");
      }
    });
  }
  
  /** Check Authentication on Protected Pages */
  function checkAuthentication() {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      alert("You must be logged in to access this page!");
      window.location.href = "./sign-in.html"; // Redirect to Sign In page
    }
  }
  
  /** Example: Run checkAuthentication on protected pages */
  if (window.location.pathname.includes("index.html")) {
    checkAuthentication();
  }
  
  /** Handle Logout */
  function logout() {
    localStorage.removeItem("currentUser");
    alert("You have been logged out!");
    window.location.href = "./sign-in.html"; // Redirect to Sign In page
  }
  