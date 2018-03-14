var config = require('config.json');
var express = require('express');
var findOrCreate = require('mongoose-findorcreate')
    // const passport = require('passport');
    // var FacebookStrategy = require('passport-facebook').Strategy;
    // var GoogleOAuth2Strategy = require('passport-google-auth').Strategy;


var router = express.Router();
var userService = require('services/user.service');
import mongoose from 'mongoose';
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var _ = require('lodash');

const app = express();
app.set('superSecret', config.secret);
//import models
import users from '../models/users.server.model';
// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:_id', getCurrent);

router.put('/:_id', update);
router.delete('/:_id', _delete);

//by social login
// router.get('/auth/facebook', passport.authenticate('facebook'));
// router.get('/auth/google', passport.authenticate('google'));


router.post('/auth/google', googleauth);

module.exports = router;

// passport.use(new GoogleOAuth2Strategy({
//         clientId: '794869107629-sq8eflbo87bpi4qlj5smesqmehqngcle.apps.googleusercontent.com',
//         clientSecret: 'QcP7jtmsWP7DEYi2jw8uwQNb',
//         callbackURL: 'https://www.example.com/auth/example/callback'
//     },
//     function(accessToken, refreshToken, profile, done) {
//         users.findOrCreate(id, function(err, user) {
//             done(err, user);
//         });
//     }
// ));

// passport.use(new FacebookStrategy({
//         clientID: 175394159743171,
//         clientSecret: 'b41488e9b830c0e1367cb7ef6f570623',
//         callbackURL: "http://localhost:4200/login"
//     },
//     function(accessToken, refreshToken, profile, cb) {
//         console.log('j')

//         users.findOrCreate({ facebookId: profile.id }, function(err, user) {
//             console.log(user)
//             return cb(err, user);
//         });
//     }
// ));


function googleauth(req, res) {
    console.log(req.body.id)
    users.findOrCreate({ _id: req.body.id }, { username: req.body.name, email: req.body.email, photoUrl: req.body.photoUrl }, function(err, user) {
        console.log(user)
        const payload = {
            admin: false
        };
        var token = jwt.sign(payload, app.get('superSecret'), {
            expiresIn: 14440 // expires in 24 hours
        });

        return res.json({ 'success': true, token, user });

        //  return cb(err, user);
    });
}


function authenticate(req, res) {
    // userService.authenticate(req.body.username, req.body.password)
    //     .then(function(user) {
    //         if (user) {
    //             // authentication successful
    //             res.send(user);
    //         } else {
    //             // authentication failed
    //             res.status(400).send('Username or password is incorrect');
    //         }
    //     })
    //     .catch(function(err) {
    //         res.status(400).send(err);
    //     });

    // find the user

    users.findOne({
        username: req.body.username
    }, function(err, user) {

        if (err) throw err;
        //console.log(user)
        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            console.log('sucess', )
                //  check if password matches
            if (!bcrypt.compareSync(req.body.password, user.hash)) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token with only our given payload
                // we don't want to pass in the entire user since that has the password
                const payload = {
                    admin: user.admin
                };
                var token = jwt.sign(payload, app.get('superSecret'), {
                    expiresIn: 14440 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token,
                    res: user
                });
            }

        }
    });
}

function register(req, res) {
    users.findOne({
        username: req.body.username
    }, function(err, user) {

        if (err) throw err;
        //console.log(user)
        if (user) {
            res.json({ success: false, message: 'User name already available' });
        } else {
            createUser();
        }
    });

    function createUser() {
        var user = _.omit(req.body, 'password');
        // add hashed password to user object
        user.hash = bcrypt.hashSync(req.body.password, 10);
        const newusers = new users(user);

        newusers.save((err, user) => {
            console.log(user)
            if (err) {
                return res.json({ 'success': false, 'message': 'Some Error tod' });
            }
            return res.json({ 'success': true, 'message': 'user added successfully', user });
        })
    }
}



function getAll(req, res) {
    // userService.getAll()
    //     .then(function(users) {
    //         res.send(users);
    //     })
    //     .catch(function(err) {
    //         res.status(400).send(err);
    //     });
    users.find({}, function(err, users) {
        res.json(users);
    });
}

function getCurrent(req, res) {
    console.log(req.user.sub)
    userService.getById(req.user.sub)
        .then(function(user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    userService.update(req.params._id, req.body)
        .then(function() {
            res.sendStatus(200);
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    userService.delete(req.params._id)
        .then(function() {
            res.sendStatus(200);
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}