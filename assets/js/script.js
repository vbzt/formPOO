class ValidateCpf{
  constructor(cpf){
    this.cpf = cpf
  }

  validateCharacters(){
    if(!this.cpf || typeof(this.cpf) !== 'string'){
      return false
    }
    return true
  }

  cleanCpfArray(){
    let cleanCpf = this.cpf.replace(/\D+/g, '');
    let cleanCpfArray = Array.from(cleanCpf)
    cleanCpfArray = cleanCpfArray.map((val) => Number(val))
    
    if(cleanCpfArray.length !== 11){
      
      return false
    }
    return cleanCpfArray
  }

  firstDigit(){
    let cpfArray = this.cleanCpfArray()
    cpfArray.splice(-2)
    let i = 10
    let total = cpfArray.reduce((sum, val) =>{

      sum += val * i
      i--

      return sum
    },0)
    let result = 11 - (total % 11)
    result = result > 9 ? 0 : result
    return result
  }

  secondDigit(){
    let cpfArray = this.cleanCpfArray()
    cpfArray.splice(-1)
    let i = 11
    let total = cpfArray.reduce((sum, val) =>{

      sum += val * i
      i--

      return sum
    },0)
    let result = 11 - (total % 11)
    result = result > 9 ? 0 : result
    return result
  }

  validateCpf(){
    let originalCpfArray = this.cleanCpfArray().splice(-2)
    let validateCpfArray = [this.firstDigit(), this.secondDigit()]
    if(originalCpfArray.join('') !== validateCpfArray.join('')) return false
    return true
  }
}

class ValidateForm{
  constructor() {
    this.formulario = document.querySelector('form');
    this.event();
  }

  event() {
    this.formulario.addEventListener('submit', e => {
      this.handleSubmit(e);
      
    });
  }

  handleSubmit(e) {
    e.preventDefault()
    const validFields = this.checkInput()
    if(validFields){
      alert('Formulario enviado com sucesso!')
    }
  }
  
  checkInput() {
    for(let msgError of this.formulario.querySelectorAll('p')){
      msgError.remove()
    }
    let valido = true
    for (let campo of this.formulario.querySelectorAll('input')) {
      if (!campo.value) {
        this.criaErro(campo, `Todos campos devem estar preenchidos`)
        valido = false
      }

      if(campo.classList.contains('usuario')){
        if(!this.checkUser(campo)) valido = false
      }

      if(campo.classList.contains('senha')){
        if(!this.checkPass(campo)) valido = false
      }

      if(campo.classList.contains('repeatSenha')){
        if(!this.checkConfirmPass(campo)) valido = false
      }

      if(campo.classList.contains('cpf')){
        if(!this.checkCpf(campo)) valido = false
      }
    }

    return valido
  }
    
  
  checkUser(field) {
    const user = field.value;
    let valido = true;
    if(user.length <= 0) return
    if (user.length < 3 || user.length > 12) {
      this.criaErro(field, "O nome de usuario deve conter entre 3 a 12 caracteres");
      valido = false;
      return valido
    }
    if (!user.match(/^[a-zA-Z0-9]+$/g)) {
      this.criaErro(field, "O nome de usuario deve conter apenas letras e numeros");
      valido = false;
      return valido;
    }

    return valido;
  }

  checkPass(field) {
    const password = field.value;
    let valido = true;
    if(password.length <= 0) return
    if (password.length < 6) {
      this.criaErro(field, "A senha deve conter no mínimo 6 caracteres");
      valido = false;
    }

    return valido;
  }

  checkConfirmPass(field){
    const pass = this.formulario.querySelector('.senha').value
    const confirmPass = field.value
    let valido = true
    if(confirmPass <= 0) return valido = false
    if(confirmPass !== pass){
      this.criaErro(field, "As senhas não coincidem")
      valido = false
    }
    return valido
  }

  checkCpf(field){
    const cpf = new ValidateCpf(field.value)
    let valido = true

    if(!cpf.validateCharacters()){
      valido = false
      return valido
    }
    if(!cpf.validateCpf()){
      valido = false
      this.criaErro(field, 'Cpf inválido')
    }
    return valido
  }

  criaErro(field, msg){
    const p = document.createElement('p')
    p.classList.add('error-msg')
    p.innerHTML = msg
    field.insertAdjacentElement('afterend',p)
  }
}

const validate = new ValidateForm()