const layer = document.getElementById('layer')
const closeMark = document.getElementById('close_form')

document.querySelector('button').addEventListener('click', () => {
    const content = document.getElementById('content');
    content.classList.add('form_1')
    content.classList.remove('result')
    content.classList.remove('catch')
    layer.style.display = 'block'
    document.querySelector('body').style.overflow = 'hidden'
})

layer.addEventListener('click', (e) => {
    if (e.target === layer) {
        layer.style.display = 'none'
        document.querySelector('body').style.overflow = 'auto'
    }
})

closeMark.addEventListener('click', (e) => {
    e.stopPropagation();
    layer.style.display = 'none'
    document.querySelector('body').style.overflow = 'auto'
})

const closeBtn = document.getElementById('btn_cancel')
closeBtn.addEventListener('click', (e) => {
    if (e.target === closeBtn) {
        layer.style.display = 'none'
        document.querySelector('body').style.overflow = 'auto'
    }
})


const form = document.querySelector('.form_sub')

form.addEventListener('submit', event => {
    event.preventDefault()
    let isFormValid = true

    let name = document.getElementById('name');

    if (validateName(name.value)) {
        name.classList.remove('error')
    } else {
        name.classList.add('error')
        isFormValid = false
    }

    let phone = document.getElementById('phone');

    if (validatePhone(phone.value)) {
        phone.classList.remove('error')
    } else {
        phone.classList.add('error')
        isFormValid = false
    }

    if (isFormValid) {
        clear()
        load()
    }

})

function validateName(name){
    let regex = /^[а-яА-ЯёЁa-zA-Z0-9]{3,}$/;
    return regex.test(name);
}

function validatePhone(phone){
    let regex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    return regex.test(phone);
}

async function load() {
    const content = document.getElementById('content');
        content.classList.remove('form_1')
        content.classList.add('loading')
    try {
        const url = 'https://jsonplaceholder.typicode.com/todos';
        const response = await fetch(url);
        const data = await response.json();

        const ul = document.querySelector('.todos');
        let html = data.map(item => {
            if (item.userId === 5 && !item.completed)
                return '<li>' + 'userID: ' + item.userId + ' id: ' + item.id + ' title: ' + item.title + ' completed: ' + item.completed + '</li>'
        });
        ul.insertAdjacentHTML('afterbegin', html.join(' '))
        content.classList.add('result')
    }catch (e) {
        const err = document.querySelector('.catch');
        err.insertAdjacentHTML('afterbegin', `${e}`)
        content.classList.add('catch')
    } finally {
        content.classList.remove('loading')
    }
}

function clear() {
    const ul = document.querySelector('.todos');
    while(ul.firstChild) {
        ul.removeChild(ul.firstChild)
    }
    const err = document.querySelector('.catch');
    while(err.firstChild) {
        err.removeChild(err.firstChild)
    }
}
