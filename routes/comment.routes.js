import { Router } from 'express'
import commentController from '../controller/comment.controller.js'
const router = new Router()

router.post('/comment', commentController.createComment)
router.get('/comments', commentController.getAllComments)
router.delete('/comment/:id', commentController.deleteComment)

export default router
