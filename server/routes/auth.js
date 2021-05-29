const router = require('express').Router();
const User = require('../model/user');
const {registerValidation, loginValidation} = require('../validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Entries = require('../models/model')


router.get('/find', async (req, res) => {
	try{
		const entries = await Entries.find()
		res.json(entries)
	}catch(error) {
		res.send(error)
	}


})

router.post('/register', async (req, res) => {



	//checking if user is already exist
	const emailExist = await User.findOne({email: req.body.email});
	if(emailExist) return res.status(400).send({ message:'Email already exists' })

	const salt = await bcrypt.genSalt(10)
	const hashPassword = await bcrypt.hash(req.body.password, salt)
	
	// Create New User
	const user = new User({
	      name: req.body.name,
	      email: req.body.email,
	      password: hashPassword 
	})
	try{
	    const savedUser = await user.save()
	    res.status(200).send(savedUser)
	}catch(err){
 	    res.status(400).send(err)
	}


});

router.post('/login',  async (req, res) =>{

	//checking if user is already exist
	const user = await User.findOne({email: req.body.email});
	if(!user) return res.status(400).send({ message:'Email or Password does not Match'  })
	
	//password is correct
	const validPass = await bcrypt.compare(req.body.password, user.password)
	if(!validPass) return res.status(400).send({ message:'Invalid Password'  })
	
	res.send({ message: "logged in" })
})


module.exports = router;

