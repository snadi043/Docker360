const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

app.post('/signup', async(req, res) => {
    const email = req.body.email;
    const password = req.body.password; 

    if(!email ||
       email.trim().length === 0 ||
       password.trim().length === 0 ||
       password.trim().isEmpty)
       {
        return(res.status(422).json({message: 'An error occured creating email or password.'}));
       }
    
    try{
        const hashedPswd = axios.get(`http://${process.env.AUTH_SERVICE_SERVICE_HOST}/hashed-password/` + password);
        console.log(hashedPswd, email);
        res.status(201).json({message: 'User Created.'});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: 'User Creation Failed. Try again later.'});
    }
});

app.post('/login', async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if(!email ||
       !password ||
       email.trim().length === 0 ||
       password.trim().length === 0
    )
    {
        return res.status(422).json({message: 'An error occured creating email or password.'});
    }

    const hashedPswd = password + '_hash';
    const response = axios.get(`http://${process.env.AUTH_ADDRESS}/token/` + hashedPswd + '/' + password);

    if(response.status === 200){
        return res.status(200).json({token: response.data.token });
    }
    return res.status(response.status).json({message: 'Logging in FAILED.'});
});

app.listen(8080);