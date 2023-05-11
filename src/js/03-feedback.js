import throttle from "lodash.throttle"

const refs ={
    form : document.querySelector('.feedback-form'),
    textarea: document.querySelector('textarea[name="message"]'),
    email: document.querySelector('input[name="email"]')
}
const FEEDBACK = localStorage;
let formData = {}
refs.form.addEventListener('input', throttle(onInputChange, 500))
refs.form.addEventListener('submit', onFormSubmit)
function onFormSubmit(event){
    event.preventDefault()
    if (refs.textarea.value === '' || refs.email.value === '') {
        return alert('All fields must be filled')
    }
    event.currentTarget.reset()
    console.log(FEEDBACK.getItem("formData"))
    FEEDBACK.removeItem("formData")
}

function onInputChange(event){
    formData[event.target.name] = event.target.value
    FEEDBACK.setItem("formData", JSON.stringify(formData))
}
if(FEEDBACK.getItem("formData")){
    formData = JSON.parse(FEEDBACK.getItem("formData"))
    for(let nameOfElement in formData){
        refs.form.elements[nameOfElement].value = formData[nameOfElement]
    }
}

