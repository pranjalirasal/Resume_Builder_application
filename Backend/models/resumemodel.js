import mongoose from "mongoose";

const ResumeSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    
    title:{
        type:String,
        required:true
    },
    thumbnailLink:{
        type:String

    },

    template:{
        theme:String,
        colorpalette:[String]
    },
    profileInfo:{
        profilepreviewUrl:String,
        fullName:String,
        designation:String,
        summary:String,
    },
    contactInfo:{
        email:String,
        phone:String,
        location:String,
        linkedin:String,
        github:String,
        website:String

    },
    //work exp
    WorkExperience:[
    {
        company:String,
        role:String,
        startDate:String,
        endDate:String,
        Description:String

    },
    ],
    Projects:[
        {
        title:String,
        Description:String,
        github:String,
        liveDemo:String

    },
],
Internship:[{
    tile:String,
    Description:String,
    startDate:String,
    endDate:String

},
],
    Skills:[{
        name:String,
        progress:String

    },],
    Hackthon:[{
        title:String,
        year:String

    },],
    Education:[{
        degree:String,
        institution:String,
        // StartDate:String,
        // endDate:String
        },],
    Certification:[{
        title:String,
        issuer:String,
        year:String
    },],
},
    {
        timestamps:{createdAt:"createAt",updatedAt:"updateAt"}
    }
);
export default mongoose.model("Resume",ResumeSchema)
