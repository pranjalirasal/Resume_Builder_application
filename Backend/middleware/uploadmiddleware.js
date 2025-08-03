import multer from 'multer'

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
    cb(null,"uploads/")
    },
    filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
}
});
// file filter
const fileFilter = (req, file, cb) => {
    const allowedTypes=["image/jpeg","image/png","image/jpg"];
    // Accept images only
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Only .jpeg,.jpg,.png are allowed in format'), false) // Reject the file
    }
}

const upload=multer({storage,fileFilter})
export default upload;
