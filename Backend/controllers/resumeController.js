import Resume from '../models/resumemodel.js'
import fs from 'fs'
import path from 'path';


 export const CreateResume=async(requestAnimationFrame,res)=>{
    try{
        const{ title } = requestAnimationFrame.body;
        //  Default template
        const defaultResumeData = {
            profileInfo: {
                profileImg: null,
                previewUrl: '',
                fullName: '',
                designation: '',
                summary: '',
            },
            contactInfo: {
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                github: '',
                website: '',
            },
            workExperience: [
                {
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                },
            ],
             projects: [
                {
                    title: '',
                    description: '',
                    github: '',
                    liveDemo: '',
                },
            ],
            Internship:[{
                    tile:'',
                    Description:'',
                    startDate:'',
                    endDate:'',

        },
],
            skills: [
                {
                    name: '',
                    progress: 0,
                },
            ],
            Hackthon:[{
                    title:'',
                    year:'',

                },],
            education: [
                {
                    degree: '',
                    institution: '',
                    startDate: '',
                    endDate: '',
                },
            ],

           certifications: [
                {
                    title: '',
                    issuer: '',
                    year: '',
                },
            ],
            
    };
    const newResume=await Resume.create({
        userId:req.user._id,
        title,
        ...defaultResumeData,
        ...req.body
})
    res.status(201).json(newResume)
}
    catch(error){
        res.status(500).json({message:"Failed to create resume",error:error.message})

    }
}
//  get function
export const getUserResume=async(req,res)=>{
    try{
        const resumes=await Resume.find({userId:req.user._id}).sort({
            updateAt:-1

        });
        res.json(resumes)

    }
    catch(error){
        res.status(500).json({message:"Failed to get resume",error:error.message})
    }
}

// get resume by id
export const getResumeById=async(req,res)=>{
    try{
        const resume=await Resume.findOne({_id:req.params.id,userId:req.user._id})
        if(!resume){
            return res.status(400).json({message:"Resume not found"})
        }
        res.json(resume)
    }
    catch{
         res.status(500).json({message:"Failed to get resume",error:error.message})
}
}
// update resume
export const UpdateResume=async(req,res)=>{
    try{
        const resume=await Resume.findOne({
            _id:req.params.id,
            userId:req.user._id
        })
        if(!resume){
            return res.status(404).json({message:"resume not found or not authorize"})
        }
        //merge updated resume
        Object.assign(resume,req.body)
        // save updated resume
        const saveResume=await resume.save();
        res.json(saveResume)
    }
    catch(error){
        res.status(500).json({message:"Failed to Update resume",error:error.message})
    }
}
// delete resume
export const DeleteResume=async(req,res)=>{
    try{
        const resume=await Resume.findOne({
            _id:req.params.id,
            userId:req.user._id
        })
        if(!resume){
            return res.status(404).json({message:"resume not found or not authorize"})
        }
        // upload and store resume there
        const uploadFolder=path.join(process,cwd,'Uploads')
        // delete thumbnail function
        if(resume.thumbnailLink){
            const oldthumbnail=path.join(uploadFolder,path.basename(resume.thumbnailLink))
            if(fs.existsSync(oldthumbnail)){
                fs.unlinkSync(oldthumbnail)
            }
        }
        if(resume.profileInfo.profilepreviewUrl){
            const oldprofile=path.join(
                uploadFolder,
                path.basename(resume.profileInfo.profilepreviewUrl)
            )
            if(fs.existsSync(oldprofile)){
                fs.unlinkSync(oldprofile)
            }
        }
        // delete resume doc
        const deleted=await Resume.findByIdAndDelete({
            _id:req.params.id,
            userId:req.user._id
        })
        if(!deleted){
            return res.status(404).json({message:"resume not found or not authorize"})
        }
        res.json({message:"resume deleted successfully"})
    }
    catch(error){
        res.status(500).json({message:"Failed to Delete resume",error:error.message})
    }
}