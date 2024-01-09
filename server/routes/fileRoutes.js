import express from 'express'

const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
} from '../controllers/userController.js'
import { uploadFile } from "../controllers/uploadController.js"
import {getAllFiles,createFiles} from "../controllers/fileController.js"
import { protect, admin, limiter } from '../middleware/authMiddleware.js'
router.route('/').post(getAllFiles).get(limiter, getUsers)
router
  .route('/list')
  .post(protect, getAllFiles)
router
  .route('/upload')
  .post(protect, uploadFile)

 router
  .route('/create')
  .post(protect, createFiles)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

export default router
