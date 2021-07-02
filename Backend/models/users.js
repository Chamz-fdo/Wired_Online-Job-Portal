const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')


const userDetailSchema = new Schema({
	FName:{
		type: String,
		default: null
	},
	LName:{
		type: String,
		default: null
	},
	email:{
		type: String,
		unique: true,
		required: true
	},
	mobileNo:{
		type: Number,
		default: null
	},
	accType:{
		type: Number,
		default: 1
	},
	companyName:{
		type: String,
		default : null,
	},
	password:{
		type: String,
		required: true,
	}
},{
	timestamps: true
})

// userDetailSchema.pre('save', async function(next){
// 	const user = this
// 	if(user.isModified('password')){
// 		user.password = await bcrypt.hash(user.password, 8)
// 	}
// 	next()
// })

// userDetailSchema.methods.generateAuthToken = async function(){
// 		const user = this
// 		const token = jwt.sign({_id: user._id}, JWT_KEY)
// 		user.tokens = user.tokens.concat({token})
// 		await user.save()
// 		return token
// }

// userDetailSchema.statics.findByCredentials = async(email,password)=>{
// 	const user = await Users.findOne({email})
// 	if(!user){
// 		throw new Error({error: 'Invalid login credentials'})
// 	}

// 	const isPasswordMatch = await bcrypt.compare(password, user.password)
// 	if(!isPasswordMatch){
// 		throw new Error({error: 'Invalid login credentials'})
// 	}
// 	return user
// }

var Users = mongoose.model('User', userDetailSchema);
module.exports = Users;
