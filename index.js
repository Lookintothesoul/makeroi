const layer = document.getElementById('layer')

document.querySelector('button').addEventListener('click', () => {
    layer.style.display = 'block'
    document.querySelector('body').style.overflow = 'hidden'
})
layer.addEventListener('click', (e) => {
    if (e.target === layer) {
        layer.style.display = 'none'
        document.querySelector('body').style.overflow = 'auto'
    }
})

const closeBtn = document.getElementById('btn_cancel')
closeBtn.addEventListener('click', (e) => {
    if (e.target === closeBtn) {
        layer.style.display = 'none'
        document.querySelector('body').style.overflow = 'auto'
    }
})


const form = document.querySelector('.form_sub')

form.addEventListener('submit', function (event) {
    event.preventDefault()
    let name = document.getElementById('name').value
    if (!validateName(name)){
        alert('Введите корректное имя!')
    }else{
        form.addEventListener('submit', function () {
            let phone = document.getElementById('phone').value
            if (!validatePhone(phone)){
                alert('Введите корректный телефон!')
            }else{
                load()
            }
        })
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
    const url = 'https://jsonplaceholder.typicode.com/todos';
    const response = await fetch(url);
    const data = await response.json();
    const ul = document.querySelector('todos');
    const html = data.map(function (item) {
        if (item.id >= 5 && item.completed == 'false')
            return '<li>' + item.userId + ' ' + item.id + ' ' + item.title + ' ' + item.completed + '</li>'
    });

    ul.insertAdjacentHTML('afterbegin', html.join(' '))
}

