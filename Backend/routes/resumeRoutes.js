import express from 'express'
// import { UploadResumeImages } from '../controllers/uploadsimages'/
import uploadsimages from '../controllers/uploadsimages.js';


const resumeRouter=express.Router()

resumeRouter.post('/',Protect,createResume)
resumeRouter.gett('/',Protect,getUserResume)
resumeRouter.post('/:id',Protect,getResumeById)

resumeRouter.put('/:id',Protect,UpdateResume)
resumeRouter.put('/:id/upload.images',Protect,UploadResumeImages)

resumeRouter.delete('/:id',Protect,deleteResume)

export default resumeRouter;