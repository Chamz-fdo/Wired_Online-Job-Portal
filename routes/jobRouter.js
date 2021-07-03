var express = require('express');
const bodyParser = require('body-parser');
var multer  = require('multer')
var fs = require('fs-extra');

const baseUrl = 'https://wired-backend.herokuapp.com'

var storage = multer.diskStorage({   
   destination: function(req, file, cb) { 
		let applicant = JSON.parse(req.body.job);
		let path = `./public/uploads/${applicant.name.replace(/\W+/g, '-').toLowerCase()}`;
		fs.mkdirsSync(path);
    	cb(null, path);    
   }, 
   filename: function (req, file, cb) { 
      cb(null , file.originalname.replace(/ /g, '-').toLowerCase());   
   }
});

const JobDetails = require('../models/jobDetails');
const authorize = require('../middleware/auth');

var formData = multer({ storage: storage }).single("file");
var jobRouter = express.Router();

jobRouter.use(bodyParser.json());

jobRouter.route('/getAll')
.get(formData, (req, res, next)=>{
	JobDetails.find({})
		.then((jobs)=>{
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(jobs);
		}, (err)=> next(err))
		.catch((err)=> next(err))
})
.post(formData, (req, res, next)=>{
	console.log(req.body)
	JobDetails.create(JSON.parse(req.body.job))
		.then((job)=>{
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(job);
		}, (err) => next(err))
		.catch((err)=> next(err))
})
.delete((req, res, next)=>{
	JobDetails.findOneAndDelete({jobTitle: req.body.jobTitle})
		.then((resp)=>{
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(resp);
		}, (err) => next(err))
		.catch((err)=> next(err))
})

jobRouter.route('/:companyMail')
.get(formData, (req, res, next)=>{
	JobDetails.find({companyEmail:req.params.companyMail})
		.then((jobs)=>{
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(jobs);
		}, (err)=> next(err))
		.catch((err)=> next(err))
})


jobRouter.route('/apply/:jobId')
.post(formData, (req, res, next)=>{
	JobDetails.find({jobId:req.params.jobId})
		.then((job)=>{
			if(job != null){
				let applicant = JSON.parse(req.body.job)
				applicant.resume = baseUrl + `/uploads/${applicant.name.replace(/\W+/g, '-').toLowerCase()}/${applicant.filename.replace(/ /g, '-').toLowerCase()}`
				console.log(applicant)
				
				job[0].applicants.push(applicant);
				JobDetails.findByIdAndUpdate({_id: job[0]._id}, job[0], {new: true})
				.then(()=>{
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json({message: 'Successfully Applied'})
				})
				.catch((err)=> next(err))
			}			
		}, (err)=> next(err))
		.catch((err)=> next(err))
})

jobRouter.route('/getAllGuest')
.get((req, res, next)=>{
	console.log(req.body)
	JobDetails.find({})
		.then((jobs)=>{
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(jobs);
		}, (err)=> next(err))
		.catch((err)=> next(err))
})

module.exports = jobRouter;