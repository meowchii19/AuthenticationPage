const router = require('express').Router();
const User = require('../model/user');
const {registerValidation, loginValidation} = require('../validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Entries = require('../models/model')



router.post('/register', async (req, res) => {

	//checking if user is already exist
	try{
			const emailExist = await User.findOne({email: req.body.email});
			if(emailExist) return res.status(400).send({ message:'Email already exists' })

			const salt = await bcrypt.genSalt(10)
			const hashPassword = await bcrypt.hash(req.body.password, salt)
			
			// Create New User
			const newUser = new User({
						name: req.body.name,
						email: req.body.email,
						password: hashPassword 
			})
	    const savedUser = await newUser.save()

			const token = jwt.sign({ user: savedUser._id }, process.env.SECRET)
			res.cookie('jwt', token, {
				httpOnly: true,
			})
			res.send({ message: 'success' })
	
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
	
	//sign a token
	const token = jwt.sign({ _id: user._id }, process.env.SECRET)

	res.cookie('jwt', token, {
		httpOnly: true,
		maxAge: 24*60*60*1000
	})
	res.send({ message: 'success' })
})

router.get('/find', async (req, res) => {
	
	try{
		const entries = await Entries.find()
		res.json(entries)
	}catch(error) {
		res.send(error)
	}



})


router.get('/loggedIn', (req, res)=> {
	try{
		const token = req.cookies.jwt
		if(!token) return res.json(false)

		jwt.verify(token, process.env.SECRET)
		res.send(true)
	}catch (err) {
		return res.json(false)
	}
})

router.get("/logout", (req,res) => {
	res.cookie('jwt', '', {
		httpOnly: true,
		expires: new Date(0)
	}).send({ message: "logout" })
})

module.exports = router;

