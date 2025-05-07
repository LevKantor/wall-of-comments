import { Router } from 'express'
import commentController from '../controller/comment.controller.js'
const router = new Router()

router.post('/comment', commentController.createComment)
router.get('/comment', commentController.getCommentsByUser)

export default router
