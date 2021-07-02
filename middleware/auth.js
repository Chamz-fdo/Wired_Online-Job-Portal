const jwt = require("jsonwebtoken");

const JWT_KEY='IAmOnFire'

module.exports = (req, res, next)=>{
	
	const token = req.headers.authorization.split(" ")[1];
	
	jwt.verify(token, JWT_KEY, (err, decoded)=>{
		if(err){
			var err = new Error('Unauthorized');
			err.status = 401;
			next(err)
		}
		else{
			next()
		}
	})
}