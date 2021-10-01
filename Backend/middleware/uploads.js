const multer = require('multer');


const storage =multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./images/')
    },
    filename : function(req,file,cb){
        cb(null,Date.now()+file.originalname)

    }

});

const fileFilter=function(req,file,cb){

    if (file.mimetype =='image/jpeg' || file.mimetype=='image/png'){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}



const uplaod = multer({

    storage :storage,
    fileFilter :fileFilter,
});


module.exports =uplaod;