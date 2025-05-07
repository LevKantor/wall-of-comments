import Comment from '../models/comment.js'

class CommentService {
    async createComment(comment) {
        const createdComment = await Comment.create(comment)
        return createdComment
    }
    async getCommentsByUser(condition) {
        const comments = await Comment.findAll(condition)
        return comments
    }
}

export default new CommentService()
