function validateForm() {
    const firstname = document.getElementById("firstname").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const email = document.getElementById("email").value.trim();
    const reemail = document.getElementById("reemail").value.trim();
    const password = document.getElementById("password").value.trim();
    const dob = document.getElementById("dob").value;
    const genderMale = document.getElementById("male").checked;
    const genderFemale = document.getElementById("female").checked;
  
    if (!firstname || !lastname || !email || !reemail || !password || !dob || (!genderMale && !genderFemale)) {
      alert("Please fill in all fields.");
      return false;
    }
  
    if (email !== reemail) {
      alert("Email addresses do not match.");
      return false;
    }
  
    if (password.length < 6) {
      alert("Password should be at least 6 characters.");
      return false;
    }
  
    return true;
  }