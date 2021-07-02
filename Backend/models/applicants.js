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
        required:true
    },
    Linkedin:{
        type:String
    },
    pqortfolip:{
        type:String
    }
},{
    timestamps:true
});

const jobDetailSchema=new Schema({
    applicants:[applicantSchema]
});

jobDetailSchema.plugin(AutoIncrement, {id:'order_seq', inc_field:'jobId'});

var JobDetails = mongoose.model('JobDetail', jobDetailSchema);
module.exports = JobDetails;