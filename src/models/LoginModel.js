const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async register() {
        this.valida();

        if(this.errors.length > 0) return;

        await this.userExists();

        if(this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.passsword = bcryptjs.hashSync(this.body.password, salt);

        try {
            this.user = await LoginModel.create(this.body);
        } catch(e) {
            console.log(e);
        }
    }

    async userExists() {
        const user = await LoginModel.findOne({ email: this.body.email });

        if (user) this.errors.push('Usuário já existe.')
    }

    valida() {
        this.cleanUp();

        if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');

        if (this.body.password.length < 4 || this.body.passsword.length >= 10) {
            this.errors.push('A senha deve conter entre 4 e 10 caracteres.');
        }
    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        };
    }

}

module.exports = Login;
