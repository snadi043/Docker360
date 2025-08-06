const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {createAndThrowError} = require('../helpers/error');

const createPasswordHash = async (password) => {
    try{
        console.log(password);
        const hashedPassword = await bcrypt.hash(password, 12);
        return hashedPassword;
    }
    catch(err){
        createAndThrowError('Failed to create a secure passsword', 500);
    }
};

const verifyPasswordHash = async (password, hashedPassword) => {
    let passwordIsValid;
    try{
        passwordIsValid = await bcrypt.compare(password, hashedPassword);
        console.log(passwordIsValid, password, hashedPassword);
    }
    catch(err){
        createAndThrowError('Unable to match the passwords', 500);
    }
    if(!passwordIsValid){
        createAndThrowError('Failed to verify the passwords', 401);
    }
};

const createToken = () => {
    return jwt.sign({}, process.env.TOKEN_KEY, {
        expiresIn: '1h',
    });
};

const verifyToken = (token) => {
    try{
        jwt.verify(token, process.env.TOKEN_KEY);
    }
    catch(err){
        createAndThrowError('Could not verify token', 401);
    }
};

const getHashedPassword = async (req, res, next) => {
    const rawPassword = req.params.password;
    try{
        const hashedPassword = await createPasswordHash(rawPassword);
        res.status(200).json({hashed: hashedPassword});
    }catch(err){
        next(err);
    }
};

const getToken = async (req, res, next) => {
    const password = req.body.password;
    const hashedPassword = req.body.hashedPassword;
    try{
        await verifyPasswordHash(password, hashedPassword);
    }catch(err){
        return next(err);
    }

    const token = createToken();
    res.status(200).json({token});
};

const getTokenConfirmation = (req, res, next) => {
    const token = req.body.token;
    verifyToken(token);
    res.status(200).json({});
};

exports.getHashedPassword = getHashedPassword;
exports.getTokenConfirmation = getTokenConfirmation;
exports.getToken = getToken;