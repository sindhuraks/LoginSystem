// returns a view with the signin template
// shows an error when user enters an invalid username/password
module.exports = ({}) => {

    return `<!DOCTYPE html>
    <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <link rel = "stylesheet" type = "text/css" href = "login.css">
        <link rel="stylesheet" 
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">
        <body>
            
                <div class="modal">
                    <h1>Welcome Back!</h1>
                    <i class='fas fa-user-alt' id="user"></i>
                    <form action="/signin" method="POST">
                        <label for="username">Username</label><br>
                        <input type="text" id="uname" placeholder="Username" name="username"><br>
                        <label for="password">Password</label>
                        <input type="password" id="pswd" placeholder="Password" name="password"><br>
                        <p class="disp_err">Invalid username or password.Try logging in again</p>
                        <input type="checkbox" id="toggle">Show Password</br>
                        <button type="submit" id="loginBtn">GET STARTED</button>
                        <a href="#" id="fpswd">Forgot username/password?</a><br>
                        <p>
                            * We don’t share your personal info with anyone. Check out our 
                                <a href="#">Privacy Policy</a> for more information.</p>
                    </form>
                </div>
                <script>
                    let toggle = document.getElementById('toggle');
                    let pswd = document.getElementById('pswd');
                    toggle.onclick = function() {
                        const type = pswd.getAttribute('type') === 'password' ? 'text':'password';
                        pswd.setAttribute('type',type);
                        this.classList.toggle('fa-eye-slash');
                    }
                </script>
        </body>
    </html>`;

};