const mongoose = require('mongoose');

const Message= mongoose.model('Message', {
    //Easy Signup
	firstname: { 
        type: String,require:true
    },
    email :{
        type: String,require:true 
    },
    subject :{
        type: String,require:true
    },
    message: { 
        type: String ,require:true
    }
});

module.exports = Message;









