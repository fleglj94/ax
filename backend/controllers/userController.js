const User = require('../models/users');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {TOKEN_SECRET} = process.env;

exports.signUp = async (req, res) => {
    try {
        const {first_name, last_name, email, password} = req.body;

        if (!(first_name && last_name && email && password)) {
            res.status(400).send('All fields are required!');
        }
        const existingUser = await User.findOne({'email': email});

        if (existingUser) {
            res.status(409).send('User already exists!');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            first_name,
            last_name,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({
            user_id: user._id, email
        }, TOKEN_SECRET, {
            expiresIn: '1h'
        })

        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
};

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!(email && password)) {
            res.status(403).send('ALl fields are required')
        }
        const existingUser = await User.findOne({'email': email});

        if (existingUser && (await bcrypt.compare(password, existingUser.password))) {
            const token = jwt.sign(
                {user_id: existingUser._id, email},
                TOKEN_SECRET,
                {
                    expiresIn: '1h'
                }
            );
            res.status(200).json({
                id: existingUser._id,
                email: existingUser.email,
                first_name: existingUser.first_name,
                last_name: existingUser.last_name,
                token
            });

        }
        res.status(400).send('Wrong email or password!');
    } catch (err) {
        console.log(err);
    }
};

exports.removeUserById = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        await User.findByIdAndDelete(id, (error, deletedRecord) => {
            if (!error) {
                res.json(deletedRecord);
            }
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getAllUsersById = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (e) {
        console.log(e);
    }
};

exports.updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const {first_name, last_name, email, password} = req.body;

        if (!(first_name && last_name && email && password)) {
            res.status(400).send('All fields are required!');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate(id, {
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'password': hashedPassword
        }, {new: true}, (err, document) => {
            if (err) {
                res.json(err);
            } else {
                res.json(document);
            }
        });

    } catch (err) {
        console.log(err);
    }
};

exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const foundUser = await User.findById(id).exec();
        res.json(foundUser);
    } catch (e) {
        console.log(e);
    }
};