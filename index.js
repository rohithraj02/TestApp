const express = require('express');
const app = express();
const path = require('path')
const compression = require('compression'); 
const cors = require('cors');
app.use(express.json());

app.use(compression());

// app.use(cors({
//     origin: '*', // Allow all origins (you can restrict this to a specific domain)
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
//     allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'] // List allowed headers
// }));


app.use('/public', express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, filePath) => {
        // Set correct MIME type for .wasm
        if (filePath.endsWith('.wasm')) {
            res.setHeader('Content-Type', 'application/wasm');
        }

        // Set long-term cache headers (1 year) for all static assets
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
}));
  
  
app.get('/home',(req,res) => {
	res.sendFile(path.join(__dirname,'public','index.html'));
});
// Home page route
app.get('/', (req, res) => {
    res.send(`
    <header>
        <script>
  (function(w, d, e, u, c, g, a, b){
    w["SSJSConnectorObj"] = w["SSJSConnectorObj"] || {ss_cid : c, domain_info: "auto"};
    w[g] = function(i, j){w["SSJSConnectorObj"][i] = j};
    a = d.createElement(e);
    a.async = true;
    if(navigator.userAgent.indexOf('MSIE')!==-1
    || navigator.appVersion.indexOf('Trident/') > -1){
    u = u.replace("/advanced/", "/advanced/ie/");
    }
    a.src = u;
    b = d.getElementsByTagName(e)[0];
    b.parentNode.insertBefore(a, b);
    
  })(window,document,"script","https://storage.googleapis.com/ss-js-cdn/test/cdn/build/stormcaster.js","cspt","ssConf");
    
    ssConf("c1" , "https://cas.avalon.perfdrive.com");
    ssConf("au" , "35.193.94.221");
</script></header>
    <body>
        <h1>Welcome to My Website</h1>
        <nav>
            <a href="/">Login</a> | <a href="/about">About</a> 
        </nav>

        <div id="login-container"
            style="background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 8px rgba(0,0,0,0.1); max-width: 400px; margin-bottom: 30px;">
            <h2>Login</h2>
            <form id="login-form">
                <label for="username">Username:</label><br>
                <input type="text" id="username" name="username" required style="width: 100%; margin-bottom: 10px;"><br>
                <label for="password">Password:</label><br>
                <input type="password" id="password" name="password" required style="width: 100%; margin-bottom: 10px;"><br>
                <button type="submit" style="padding: 10px 20px;">Login</button>
            </form>
            <p id="login-message" style="color: red;"></p>
        </div>

        <script>
            document.getElementById('login-form').addEventListener('submit', function (e) {
                e.preventDefault();

                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;

                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/auth/login', true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); // classic AJAX marker

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            const result = JSON.parse(xhr.responseText);
                            if (result.validUser) {
                                window.location.href = '/home';
                            } else {
                                document.getElementById('login-message').textContent = 'Invalid username or password.';
                            }
                        } else {
                            document.getElementById('login-message').textContent = 'Request failed. Try again.';
                        }
                    }
                };

                const data = JSON.stringify({ username, password });
                xhr.send(data);
            });
        </script>
    </body>
    `);
});


app.post('/error', (req, res) => {
console.log('500 post')
	res.status(500).send('Internal Server Error');
});

app.get('/error', (req, res) => {
    res.status(500).send('Internal Server Error');
});

app.get('/get-ajax-data', (req, res) => {
    // You can return any HTML here
    const html = `
        <div>
            <h2>Data from Server</h2>
            <p>This is some <strong>HTML</strong> content fetched via AJAX from the server.</p>
        </div>
    `;

    // Send the HTML
    res.send(html);
});


// About page route
app.get('/about', (req, res) => {
    res.send(`
        <h1>About Us</h1>
        <nav>
            <a href="/">Login</a> | <a href="/about">About</a> | <a href="/home">Main Home</a>
        </nav>
        <h2>About This Website</h2>
        <p>This is an example Express app showcasing basic HTML content.</p>
    `);
});

app.post('/auth/login',(req,res)=>{
	console.log("request received")
    const body=req.body;
    const username = body.username;
    const password = body.password;
    if(username==='roh' && password==='123')
        res.send({validUser:true});
    else
        res.send({validUser:false});
})
// Start the server
app.listen(3000, '0.0.0.0', () => {
    console.log('Server is running on port 3000');
});




