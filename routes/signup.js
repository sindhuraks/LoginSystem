const getError = (errors, field) => {
    try {
  
        // return error message if any error occurs
        return errors.mapped()[field].msg;
    } catch (error) {
  
        // return empty string if no error
        return '';
    }
};
  
// returns a view with the signup template
// shows an error when user enters an invalid value in the displayed form fields
module.exports = ({ errors }) => {
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <link rel = "stylesheet" type = "text/css" href = "style.css">
        <link rel="stylesheet" 
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">
        <body>
            <div class="left">
                <div class="layer">
                    <h1>SIGN UP</h1>
                    <h5>Please enter your details to sign up</h5>
                    <p>Already have an account?</p>
                    <form method="post">
                        <button type="submit" id="signinBtn">SIGN IN</button>
                    </form>
                </div>
            </div>
            <div class="right" id='right'>
                <h3>Register</h3>
                <form action = "/signup" method="POST" class="modal">
                    <label for="username" >Username</label><br>
                    <input type="text" id="username" placeholder="Enter username.." name="username" required>
                    <p class="disp_err">
                        ${getError(errors, 'username')}</p>
                    <label for="email">Email</label><br>
                    <input type="email" id="mail" placeholder="Enter your mail.." name="email" required>
                    <p class="disp_err">
                        ${getError(errors, 'email')}</p>
                    <label for="password">Password</label><br>
                    <input type="password" id="pswd" placeholder="Enter your password.." name="password" required>
                    <i class="far fa-eye" id="togglePassword"></i>
                    <p class="disp_err">
                        ${getError(errors, 'password')}</p>
                        <div id="message">
                            <p><b>Password must contain the following:</b></p>
                            <p id="letters" class="invalid"><b>Lowercase </b>and <b>uppercase </b>letters</p>
                            <p id="number" class="invalid">A <b>number</b></p>
                            <p id="special" class="invalid">A <b>special </b>character</p>
                            <p id="length" class="invalid">Minimum <b>8 characters</b></p>
                        </div>
                    <label for="repeat-password">Repeat Password</label><br>
                    <input type="password" id="rep-pswd" placeholder="Repeat password.." name="repeat_password" required>
                    <i class="far fa-eye" id="toggleRepeatPassword"></i>
                    <p class="disp_err">
                        ${getError(errors, 'repeat_password')}</p><br>
                    <button type="submit" id="signupBtn">SIGN UP</button>
                </form>
            </div>
            <script>
                let letters = document.getElementById("letters");
                let numbers = document.getElementById('number');
                let splChar = document.getElementById('special');
                let length = document.getElementById("length");
                let pswd = document.getElementById('pswd');
                let repPswd = document.getElementById('rep-pswd');
                let toggle = document.getElementById('togglePassword');
                let toggleRepeatPassword = document.getElementById('toggleRepeatPassword');
                let signin = document.getElementById('signinBtn');
                pswd.onfocus = function() {
                    document.getElementById('message').style.display ='block';
                }
                pswd.onblur = function() {
                    document.getElementById('message').style.display ='none';
                }
                pswd.onkeyup = function() {
                    let validLowercaseLetters = /[a-z]/g;
                    let validUppercaseLetters = /[A-Z]/g;
                    if(pswd.value.match(validLowercaseLetters) && 
                    pswd.value.match(validUppercaseLetters)) {
                        letters.classList.remove("invalid");
                        letters.classList.add("valid");
                    }
                    else {
                        letters.classList.remove("valid");
                        letters.classList.add("invalid");
                    }
    
                    let validNumbers = /[0-9]/g;
                    if(pswd.value.match(validNumbers)) {
                        numbers.classList.remove("invalid");
                        numbers.classList.add("valid");
                    }
                    else {
                        numbers.classList.remove("valid");
                        numbers.classList.add("invalid");
                    }
    
                    let validSplChar = /[^a-zA-Z0-9]/g;
                    if(pswd.value.match(validSplChar)) {
                        splChar.classList.remove("invalid");
                        splChar.classList.add("valid");
                    }
                    else {
                        splChar.classList.remove("valid");
                        splChar.classList.add("invalid");
                    }
    
                    if(pswd.value.length >= 8) {
                        length.classList.remove("invalid");
                        length.classList.add("valid");
                    } else {
                        length.classList.remove("valid");
                        length.classList.add("invalid");
                    }
    
                }
                toggle.onclick = function() {
                    const type = pswd.getAttribute('type') === 'password' ? 'text':'password';
                    pswd.setAttribute('type',type);
                    this.classList.toggle('fa-eye-slash');
                }

                toggleRepeatPassword.onclick = function() {
                    const type = repPswd.getAttribute('type') === 'password' ? 'text':'password';
                    repPswd.setAttribute('type',type);
                    this.classList.toggle('fa-eye-slash');
                }
    
                signin.onclick = function() {
    
                    location.href = './login.html';
                    return false;
                }
            </script>
        </body>
    </html>
    `
}