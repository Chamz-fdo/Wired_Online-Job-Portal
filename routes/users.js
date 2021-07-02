var express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const authorize = require('../middleware/auth');
const JWT_KEY='IAmOnFire';
const Users = require('../models/users');

var router = express.Router();

/* GET users listing. */
router.route('/')
.get(authorize, (req, res, next)=>{
	Users.find({})
		.then((users)=>{
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(users);
		}, (err)=> next(err))
		.catch((err)=> next(err))
})
.post((req, res, next)=>{
	bcrypt.hash(req.body.password, 10)
		.then((hash)=>{
			const user = new Users({
				email: req.body.email,
				password: hash,
				mobileNo: req.body.mobileNo ? req.body.mobileNo : null,
				companyName: req.body.companyName ? req.body.companyName : null,
				FName: req.body.FName ? req.body.FName : null,
				LName: req.body.LName ? req.body.LName : null,
				accType: req.body.companyName ? 2 : 1
			});
console.log(user)
			user.save()
				.then((user)=>{
					res.statusCode = 201;
					res.setHeader('Content-Type', 'application/json');
					res.json({
						message: 'User successfully created',
						data: user.email
					})
				})
				.catch((err)=> {
					console.log(err)
					next(err)
				})
		})
	// Users.create(req.body)
	// 	.then((userr)=>{
	// 		Users.generateAuthToken()
	// 			.then((fd)=>{
	// 				console.log(fd)
	// 			})
	// 	})

	 // try {
  //       const user = new Users(req.body)
  //       await user.save()
  //       const token = await user.generateAuthToken()
  //       res.status(201).send({ user, token })
  //   } catch (error) {
  //       res.status(400).send(error)
  //   }
})


router.route('/login')
.post((req, res, next)=>{
	let getUser;
	Users.findOne({email: req.body.email})
		.then((user)=>{
			if(!user){
				var err = new Error('Email is incorrect');
				err.status = 401;
				next(err)
			}

			getUser = user;

			bcrypt.compare(req.body.password, getUser.password)
				.then((resp)=>{
					if(!resp){
						var err = new Error('Password is incorrect');
						err.status = 401;
						next(err)
					}
					else{
						let token = jwt.sign({
							email: getUser.email,
						}, JWT_KEY, {
							expiresIn: '1h'
						});

						res.statusCode = 201;
						res.setHeader('Content-Type', 'application/json');
						res.json({
							message: 'User successfully logged',
							data: {
								accType: getUser.accType,
								companyName : getUser.companyName,
								user: getUser.email,
								token: token,
							}
						})
					}
				})
				.catch((err)=> next(err))
		})
})

module.exports = router;
