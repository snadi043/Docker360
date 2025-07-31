const express = require('express');
const bodyParser = require('body-parser');
const e = require('express');

const app = express();

app.use(bodyParser.json());

app.get('/verify-token/:token', (req, res) => {
    const token = req.params.token;

    if(token === 'abc'){
        return res.status(200).json({message: 'Valid token', uid: 'u1'});
    }
    res.status(401).json({message:'Token invalid'});
});

app.get('/token/:hashedPswd/:enteredPassword', (req, res) => {
    const hashedPassword = req.params.hashedPswd;
    const enteredPassword = req.params.enteredPassword;

    if(hashedPassword === enteredPassword + '_hash'){
        const token = 'abc';
        return res.status(200).json({message: 'Token created', token: token});
    }
    res.status(401).json({message: 'Passwords donot match.'});
});

app.get('/hashed-Pswd/:password', (req, res) => {
    const enteredPassword = req.params.password;
    const hashedPassword = enteredPassword + '_hash';
    res.status(200).json({hashedPassword: hashedPassword});
});

app.listen(80);