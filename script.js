const container = document.querySelector('.container')
const info = document.querySelector('#info')
const plus = document.querySelector('.plus')
const add = document.querySelector('.add')
const title = document.querySelector('#title')
const text = document.querySelector('#text')
const task = document.querySelector('.task')
const close = document.querySelector('#close')
const all = document.querySelector('#all')
const completed = document.querySelector('#completed')
const date = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
const hour = `${new Date().getHours()} : ${new Date().getMinutes()}`



window.addEventListener('load', () => {
    if (!JSON.parse(localStorage.getItem('arr'))) {
        localStorage.setItem('arr', JSON.stringify([]))
    }else {
        const note = JSON.parse(localStorage.getItem('arr'))
        const noteID = note.map((item, index) => {
            return {...item , id: index}
        })

        localStorage.setItem('arr', JSON.stringify([...noteID]))

        const base = JSON.parse(localStorage.getItem('arr'))
        cards(base)
    }

    const allNote = JSON.parse(localStorage. getItem('arr'))
    const completedNote = allNote.filter(item => item.completed)

    all.innerHTML = allNote.length
    completed.innerHTML = completedNote.length
})

plus.addEventListener('click', e => {
    e.preventDefault()
    info.classList.add('is')
})

close.addEventListener('click', e => {
    e.preventDefault()
    info.classList.remove('is')
})

function cards(base) {
    const template = base.map(({title, text, id, completed, date, hour}) => {
        return `
        <div class="card ${completed ? 'finish' : null}" >

            <div class="name">
                <h1>${title}</h1>
            </div>

            <div class="task ${completed ? 'finish' : null}">
                <p>${text}</p>
                <p class="data_time">${date} (${hour})</p>
            </div>

            <div class="buttons">
                <button onclick="remove(${id})">remove</button>
                <button onclick="complete(${id})">complete</button>
            </div>
        
        </div>
        `
    }).join('')
    container.innerHTML = template
}

function remove(idshnik) {
    const note = JSON.parse(localStorage.getItem('arr'))
    const filtered = note.filter(item => item.id !== idshnik)

    localStorage.setItem('arr', JSON.stringify(filtered))
    window.location.reload()
}

// function edit(idshnik) {
//     const note = JSON.parse(localStorage.getItem('arr'))
//     const edited = note.map(item => {
//         if (item.id === idshnik) {
//             return {
//                 ...item, 
//                 title: prompt('Title', item.title),
//                 text: prompt('Task', item.text),
//             }
//         }else {
//             return item
//         }
//     })
//     localStorage.setItem('arr', JSON.stringify(edited))
//     window.location.reload()
// <button onclick="edit(${id})">edit</button>
// }

function complete(idshnik) {
    const note = JSON.parse(localStorage.getItem('arr'))
    const completed = note.map(item => {
        if (item.id === idshnik) {
            return {
                ...item, 
                completed: !item.completed
            }
        }else {
            return item
        }
    })
    localStorage.setItem('arr', JSON.stringify(completed))
    window.location.reload()
}

add.addEventListener('click', e => {
    e.preventDefault()

    if (title.value.length === 0 || text.value.length === 0) {
        if (title.value.length === 0) {
            title.style.borderColor = 'white'
        }
        if (text.value.length === 0) {
            text.style.borderColor = 'white'
        }
        
    } else {
        const base = JSON.parse(localStorage.getItem('arr'))
        localStorage.setItem('arr', JSON.stringify(
            [...base, {id: 1, title:title.value, text:text.value, completed: false, date: date, hour: hour}]
        ))
        window.location.reload()
        info.classList.remove('is')

    }
})
