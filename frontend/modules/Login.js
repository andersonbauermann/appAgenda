import validator from 'validator';

export default class Login {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
  }

  init() {
    this.events();
  }

  events() {
    if(!this.form) return;
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      this.validate(e);
    });
  }

  validate(e) {
    const el = e.target;
    const emailInput = el.querySelector('input[name="email"]');
    const passwordInput = el.querySelector('input[name="password"]');
    let error = false;

    if(!validator.isEmail(emailInput.value)) {
      this.criaErro(email, "Insira um e-mail válido.")
      error = true;
    }

    if(passwordInput.value.length < 4 || passwordInput.value.length >= 10) {
      this.criaErro(password, "Senha precisa estar entre 4 e 10 caractéres.")
      error = true;
    }

    if(!error) el.submit();
  }

  criaErro(campo, msg) {
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add('error-text');
    campo.insertAdjacentElement('afterend', div);
  }
}
