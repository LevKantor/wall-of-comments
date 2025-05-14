const commentField = document.querySelector('.comments-field')
const commentsAmount = document.querySelector('.comments-amount')
const commentForm = document.getElementById('comment-form')
const modal = document.getElementById('customModal')
const confirmDeleteBtn = document.getElementById('confirmDelete')
const cancelDeleteBtn = document.getElementById('cancelDelete')

let commentCounter = 0
let commentToDelete = null
let comments

const showCommentsAmount = () => {
    if (commentCounter > 0) {
        commentsAmount.textContent = `Комментариев: ${commentCounter}`
    }
    if (commentCounter === 0) {
        commentsAmount.textContent = 'Комментариев пока нет'
    }
}

const showComments = async () => {
    let comments

    const response = await fetch(
        'https://wall-of-comments-production.up.railway.app/api/comments'
    )
    if (response.status === 500) {
        return console.log('Ошибка сервера!')
    } else {
        comments = await response.json()
    }

    comments.forEach((comment) => {
        let formedComment = `<div class="js-div-comment" id="${comment.id}" >
        <div class="js-div-name">
        <p><strong>${comment.username}:</strong></p>
        <div class="functions">
        <button class="like-btn">
        <img class="like-icon" src="./img/not-like.png" alt="like">
        </button>
        <button class="delete-btn" >
        <img class="delete-btn_img"  src="./img/delete.png" alt="delete">
        </button>
        </div>
        </div>
        <div class="js-div-body">
        <p>${comment.content}</p>
        </div>
        <p class="js-date"><em>${timeConverter(comment.datetime)}</em></p>
        </div>`

        commentField.insertAdjacentHTML('beforeend', formedComment)
    })

    commentCounter = comments.length

    showCommentsAmount()
}

showComments()

commentForm.addEventListener('submit', async function addNewComment(event) {
    event.preventDefault()
    let username = document.getElementById('comment-name').value
    let content = document.getElementById('comment-body').value
    let nameError = document.getElementById('name-error')
    let bodyError = document.getElementById('body-error')

    if (
        (username.length < 3 && content.length < 5) ||
        (username.length > 50 && content.length > 1000)
    ) {
        nameError.style.display = 'block'
        bodyError.style.display = 'block'
        return
    } else {
        nameError.style.display = 'none'
        bodyError.style.display = 'none'
    }

    if (username.length < 3 || username.length > 50) {
        nameError.style.display = 'block'
        return
    } else {
        nameError.style.display = 'none'
    }

    if (content.length < 5 || content.length > 1000) {
        bodyError.style.display = 'block'
        return
    } else {
        bodyError.style.display = 'none'
    }

    const usernameArr = username.split('')
    usernameArr[0] = usernameArr[0].toUpperCase()
    username = usernameArr.join('')

    fetch('https://wall-of-comments-production.up.railway.app/api/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            username,
            content,
            datetime: Date.now(),
        }),
    })

    const response = await fetch(
        'https://wall-of-comments-production.up.railway.app/api/comment'
    )
    let comment

    if (response.status === 500) {
        return console.log('Ошибка сервера!')
    } else {
        comment = await response.json()
    }

    let newComment = `<div class="js-div-comment" id="${comment.id}" >
        <div class="js-div-name">
        <p><strong>${comment.username}:</strong></p>
        <div class="functions">
        <button class="like-btn">
        <img class="like-icon" src="./img/not-like.png" alt="like">
        </button>
        <button class="delete-btn" >
        <img class="delete-btn_img"  src="./img/delete.png" alt="delete">
        </button>
        </div>
        </div>
        <div class="js-div-body">
        <p>${comment.content}</p>
        </div>
        <p class="js-date"><em>${timeConverter(comment.datetime)}</em></p>
        </div>`

    commentField.insertAdjacentHTML('afterBegin', newComment)

    commentCounter++
    showCommentsAmount()
})

commentField.addEventListener('click', function (event) {
    if (event.target.closest('.delete-btn')) {
        commentToDelete = event.target.closest('.js-div-comment')
        modal.style.display = 'block'
    }
})

confirmDeleteBtn.addEventListener('click', async function deleteComment() {
    const response = await fetch(
        `https://wall-of-comments-production.up.railway.app/api/comment/${commentToDelete.id}`,
        {
            method: 'DELETE',
        }
    )

    if (response.status === 500) {
        return console.log('Ошибка сервера!')
    }

    commentToDelete.remove()
    commentCounter--
    showCommentsAmount()

    modal.style.display = 'none'
})

cancelDeleteBtn.addEventListener('click', function () {
    modal.style.display = 'none'
})

window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.style.display = 'none'
    }
})

commentField.addEventListener('click', function (event) {
    if (event.target.closest('.like-icon')) {
        const likeIcon = event.target.closest('.like-icon')
        if (likeIcon.src.includes('/img/not-like.png'))
            likeIcon.src = './img/like.png'
        else {
            likeIcon.src = './img/not-like.png'
        }
    }
})

function timeConverter(time) {
    let timeObj = new Date(time)
    let months = [
        'янв',
        'фев',
        'мар',
        'апр',
        'май',
        'июн',
        'июл',
        'авг',
        'сен',
        'окт',
        'ноя',
        'дек',
    ]
    let year = timeObj.getFullYear()
    let month = months[timeObj.getMonth()]
    let date = timeObj.getDate()
    let hour = timeObj.getHours()
    let min = timeObj.getMinutes()

    return `${date} ${month} ${year} ${
        hour.toString().length === 1 ? '0' + hour : hour
    }:${min.toString().length === 1 ? '0' + min : min}`
}
