const express = require('express')
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = "Tejashvi@00"






// create user using :post "/api/auth/creteuser" , no logni required



// This is a code snippet written in JavaScript using the Express.js framework for handling HTTP requests.

// The code defines a route that listens for POST requests on the '/createuser' endpoint.The route takes an array of validation checks as middleware, which will be executed before the route handler.

// The validation checks are done using the 'express-validator' middleware.There are three validation checks:

// 'name' field should have a minimum length of 3 characters
// 'email' field should be a valid email address
// 'password' field should have a minimum length of 5 characters
// If any of these checks fail, the route handler will return a 400 Bad Request response with an array of error messages.

// If all validation checks pass, the route handler will query the database to check if a user already exists with the given email address.If such a user exists, the handler will return a 400 Bad Request response with an error message.

// If no user exists with the given email address, the route handler will create a new user in the database with the provided name, password, and email.

//     Finally, the route handler does not send any response back to the client.It should be modified to send an appropriate response to the client after creating the user.




router.post('/createuser',
    [
        body('name', "Enter a valid name ").isLength({ min: 3 }),
        body('email', 'Enter a valid email ').isEmail(),
        body('password', "Password must be atleast 5 character ").isLength({ min: 5 }),
    ],


    async (req, res) => {
        // if there are errors return bad request and errors 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        // check whether the user with this email exists already


        try {
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ error: "Sorry a user already exits with this email" })

            }

            const salt = await bcrypt.genSalt(10)
            const secPass = await bcrypt.hash(req.body.password, salt)
            user = await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email

            })


            const data = {
                user: {
                    id: user.id
                }
            }

            const authToken = jwt.sign(data, JWT_SECRET)
            // console.log(authToken)
            res.json({ authToken })

        }
        catch (error) {

            console.log(error)
            res.status(500).send("Error occured")
        }

    })





module.exports = router