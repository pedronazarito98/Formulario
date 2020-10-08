let B7Validator = {
    handleSubmit:(Event) => {
        Event.preventDefault(); //preventDefault === para o comportamento padrão (enviar)
        let send = true;

        let inputs =  form.querySelectorAll('input');


        B7Validator.clearError();

        for(let i=0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = B7Validator.checkInput(input);

            if( check !== true) {
                send = false;
                //Exibir o erro

                B7Validator.showError(input, check);
            }

        }
        

        if(send){
            form.submit();
        }
    },
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');
        if(rules !== null) {
            rules = rules.split('|');
                for(let k in rules) {
                    let rDetails = rules[k].split('=');
                    switch(rDetails[0]){
                        case 'required':
                            if(input.value == ''){
                                return 'Campo Obrigatório';
                            }
                        break;

                        case 'min':
                            if(input.value.length < rDetails[1]) {
                                return 'Minimo de caracteres ' + rDetails[1]; 
                            }
                        break;

                        case 'email':
                            if(input.value != ''){
                                let regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi
                                /* Regex serve para validar um email / Expressão Regular */ 
                                if(!regex.test(input.value.toLowerCase())) {
                                    return "Campo de email inválido";
                                }
                            }
                        break;
                    }
                }
        }
        return true;
    },
    showError:(input, error) =>{
        input.style.borderColor = '#ff0000';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },
    clearError:() => {
        let  inputs = form.querySelectorAll('input');
        for(let i=0; i<inputs.length; i++) {
            inputs[i].style = '';
        }

        let errorElements = document.querySelectorAll('.error');
        for( let i=0; i < errorElements.length; i++) {
            errorElements[i].remove();
        }
    }
};

let form = document.querySelector('.b7validator');

form.addEventListener('submit', B7Validator.handleSubmit);