import commentService from '../service/comment.service.js'

class CommentController {
    async getAllComments(req, res) {
        const comments = await commentService.getAllComments({
            order: [['datetime', 'DESC']],
        })
        res.json(comments)
    }
    async getLastComment(req, res) {
        const comment = await commentService.getLastComment({
            order: [['datetime', 'DESC']],
        })
        res.json(comment)
    }
    async createComment(req, res) {
        const comment = req.body
        const newComment = await commentService.createComment(comment)
        res.json(newComment)
    }
    async deleteComment(req, res) {
        const id = req.params.id
        const comment = await commentService.deleteComment({ where: { id } })
        res.json(comment)
        res.send('Comment was deleted')
    }
}

export default new CommentController()
