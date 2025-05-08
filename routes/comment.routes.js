import { Router } from 'express'
import commentController from '../controller/comment.controller.js'
const router = new Router()

router.get('/comments', commentController.getAllComments)
router.get('/comment', commentController.getLastComment)
router.post('/comment', commentController.createComment)
router.delete('/comment/:id', commentController.deleteComment)

export default router
