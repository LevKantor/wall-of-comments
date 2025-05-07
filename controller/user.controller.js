import User from '../models/user.js'

class UserController {
    async createUser(req, res) {
        const { name } = req.body
        const newPerson = await User.create({ name })
        res.json(newPerson)
    }
    async getUsers(req, res) {
        const users = await User.findAll({})
        res.json(users)
    }
    async getOneUser(req, res) {
        const id = req.params.id
        const user = await User.findOne({ where: { id } })
        res.json(user)
    }
    async updateUser(req, res) {
        const { id, name } = req.body
        const user = await User.update({ name: name }, { where: { id } })
        res.json(user)
    }

    async deleteUser(req, res) {
        const id = req.params.id
        const user = User.destroy({ where: { id } })
        res.send('User was deleted')
    }
}

export default new UserController()
