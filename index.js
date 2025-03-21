const commentField = document.querySelector('.comments-field')
const commentsAmount = document.querySelector('.comments-amount')
const commentForm = document.getElementById('comment-form')
const modal = document.getElementById('customModal')
const confirmDeleteBtn = document.getElementById('confirmDelete')
const cancelDeleteBtn = document.getElementById('cancelDelete')

let commentCounter = 0
let commentToDelete = null

const showCommentsAmount = () => {
    if (commentCounter > 0) {
        commentsAmount.textContent = `Комментариев: ${commentCounter}`
    }
    if (commentCounter === 0) {
        commentsAmount.textContent = 'Комментариев пока нет'
    }
}

commentForm.addEventListener('submit', function (event) {
    event.preventDefault()
    let username = document.getElementById('comment-name').value
    let commentBody = document.getElementById('comment-body').value
    let nameError = document.getElementById('name-error')
    let bodyError = document.getElementById('body-error')

    if (
        (username.length < 3 && commentBody.length < 5) ||
        (username.length > 50 && commentBody.length > 1000)
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

    if (commentBody.length < 5 || commentBody.length > 1000) {
        bodyError.style.display = 'block'
        return
    } else {
        bodyError.style.display = 'none'
    }

    const usernameArr = username.split('')
    usernameArr[0] = usernameArr[0].toUpperCase()
    username = usernameArr.join('')

    commentCounter++

    showCommentsAmount()

    commentField.insertAdjacentHTML(
        'beforeend',
        `<div class="js-div-comment" >
        <div class="js-div-name">
        <p><strong>${username}:</strong></p>
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
        <p>${commentBody}</p>
        </div>
        <p class="js-date"><em>${timeConverter(Date.now())}</em></p>
        </div>`
    )
})

commentField.addEventListener('click', function (event) {
    if (event.target.closest('.delete-btn')) {
        commentToDelete = event.target.closest('.js-div-comment')
        modal.style.display = 'block'
    }
})

confirmDeleteBtn.addEventListener('click', function () {
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
