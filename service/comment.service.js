import Comment from '../models/comment.js'

class CommentService {
    async createComment(comment) {
        const createdComment = await Comment.create(comment)
        return createdComment
    }
    async getAllComments(condition) {
        const comments = await Comment.findAll(condition)
        return comments
    }
    async deleteComment(condition) {
        const deletedComment = await Comment.destroy(condition)
        return deletedComment
    }
}

export default new CommentService()
