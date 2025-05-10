import commentService from '../service/comment.service.js'

class CommentController {
    async getAllComments(req, res) {
        try {
            const comments = await commentService.getAllComments({
                order: [['datetime', 'DESC']],
            })
            res.json(comments)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getLastComment(req, res) {
        try {
            const comment = await commentService.getLastComment({
                order: [['datetime', 'DESC']],
            })
            res.json(comment)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async createComment(req, res) {
        try {
            const comment = req.body
            const newComment = await commentService.createComment(comment)
            res.json(newComment)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async deleteComment(req, res) {
        try {
            const id = req.params.id
            await commentService.deleteComment({
                where: { id },
            })
            res.send('Comment was deleted')
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new CommentController()
