import Comment from '../models/comment.js'
import commentService from '../service/comment.service.js'

class CommentController {
    async createComment(req, res) {
        const { content, userId } = req.body
        const timestamp = Date.now()
        const dateTime = new Date(timestamp)
        const newComment = await commentService.createComment({
            content,
            dateTime,
            userId,
        })
        res.json(newComment)
    }
    async getCommentsByUser(req, res) {
        const { id } = req.query
        const comments = await commentService.getCommentsByUser({
            where: { id },
        })
        res.json(comments)
    }
}

export default new CommentController()
