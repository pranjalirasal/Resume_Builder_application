
import fs from 'fs'
import path from 'path'

import Resume from '../models/resumemodel.js'
import upload from '../middleware/uploadmiddleware.js'
import uploadsimages from '../controllers/uploadsimages.js';



export const UploadResumeImages = async (req, res) => {
  try {
    upload.fields([{ name: "thumbnail" }, { name: "profileimage" }])(req, res, async (err) => {
      if (err) {
        // Multer-specific errors or custom file filter errors
        return res.status(400).json({ message: "File upload failed", error: err.message });
      }

      const resumeId = req.params.id;
      const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });

      if (!resume) {
        return res.status(400).json({ message: "Resume not found or unauthorized" });
      }

      // Use path.join here
      const uploadFolder = path.join(process.cwd(), "uploads");
      const baseUrl = `${req.protocol}://${req.get("host")}`;

      const newThumbnail = req.files.thumbnail?.[0];
      const newProfileImage = req.files.profileimage?.[0]; // note lowercase "profileimage" matches multer field

      if (newThumbnail) {
        if (resume.thumbnailLink) {
          const oldThumbnail = path.join(uploadFolder, path.basename(resume.thumbnailLink));
          if (fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail);
        }
        resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
      }

      if (newProfileImage) {
        if (resume.profileInfo?.profilepreviewUrl) {
          const oldProfileImage = path.join(uploadFolder, path.basename(resume.profileInfo.profilepreviewUrl));
          if (fs.existsSync(oldProfileImage)) fs.unlinkSync(oldProfileImage);
        }
        // make sure profileInfo exists
        resume.profileInfo = resume.profileInfo || {};
        resume.profileInfo.profilepreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;
      }

      await resume.save();

      res.status(200).json({
        message: "Image upload Successfully",
        thumbnailLink: resume.thumbnailLink,
        profilepreviewUrl: resume.profileInfo.profilepreviewUrl
      })
    });
  } catch (error) {
    console.error('error uploading images:', err);
    res.status(500).json({ message: "Failed upload images", error: 'Server error' });
  }
}
