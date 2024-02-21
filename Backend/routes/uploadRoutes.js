import multer from "multer";
import path from "path";
import express from 'express';
const router = express.Router();

const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null, 'uploads/');
    },

    filename(req,file,cb){
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    
    }
});

function checkfileType(file, cb){
    const filetypes = '/jpg|jpeg|png/';
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(filetypes.mimetype)
    if(extname && mimetype){
        return cb(null,true);
    }
    else{
        cb('Images only');
    }
}

const upload = multer({
    storage
})

router.post('/',upload.single('image'),(req,res)=>{
    res.send({
        message: 'Image uploaded',
        image: `/${req.file.path}`
    })
})

export default router;