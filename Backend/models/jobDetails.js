const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const applicantSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    email:{
        type:String,
        required:true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    telno:{
        type:String,
        required:true
    },
    resume:{
        type:String,
        required:false
    },
    linkedin:{
        type:String
    },
    portfolio:{
        type:String
    }
},{
    timestamps:true
});


const jobDetailSchema = new Schema({
	jobId:{
		type: Number
	},
	jobTitle:{
		type: String,
		required: true
	},
	jobDescription:{
		type: String,
		required: true
	},
	jobQualifications:{
		type: String,
		required: true
	},
	jobDeadline:{
		type: String,
		required: true
	},
	companyName:{
		type: String,
		required: true
	},
	companyEmail:{
		type: String,
		required: true
	},
	jobTags:{
		type: Array,
		required: false
	},
	applicants:[applicantSchema]
},{
	timestamps: true
});

jobDetailSchema.plugin(AutoIncrement, {id:'order_seq', inc_field:'jobId'});

var JobDetails = mongoose.model('JobDetail', jobDetailSchema);
module.exports = JobDetails;