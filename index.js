const express = require('express');
const app = express();
const path = require('path')
app.use(express.json());

app.use('/public', express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, path) => {
      if (path.endsWith('.wasm')) {
        res.setHeader('Content-Type', 'application/wasm');
      }
    }
  }));
  
  
app.get('/home',(req,res) => {
	res.sendFile(path.join(__dirname,'public','index.html'));
});
// Home page route
app.get('/', (req, res) => {
    res.send(`
    <header>
</header>
<body>
        <h1>Welcome to My Website</h1>
        <nav>
            <a href="/">Home</a> | <a href="/about">About</a> | <a href="/home">Main Home</a>
        </nav>
        <h2>This is the Home Page</h2>
        <p>Welcome to the home page of my Express app.</p>
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

// About page route
app.get('/about', (req, res) => {
    res.send(`
        <h1>About Us</h1>
        <nav>
            <a href="/">Home</a> | <a href="/about">About</a> | <a href="/home">Main Home</a>
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




