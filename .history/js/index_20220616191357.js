document.addEventListener("DOMContentLoaded", function() {
    getBooks()

});

function getBooks () {
    fetch('http://localhost:3000/books')
    .then(resp => resp.json())
    .then(books => books.forEach(book => addBookToDom(book))
    )}

function addBookToDom(book) {
    let listUl = document.getElementById('list')
    let li = document.createElement('li')
    li.id = book.id
    li.textContent = book.title
    li.addEventListener('click', (e) => showBookDetails(e, book))
    listUl.append(li)
}

function showBookDetails(e, book) {
    e.preventDefault()
    let showPanel = document.querySelector("div#show-panel")
    showPanel.innerHTML = ""
    let image = document.createElement('img')
    image.src = book.img_url
    let title = document.createElement('h1')
    title.textContent = book.title
    let description = document.createElement('p')
    description.textContent = book.description
    let likeButton = document.createElement('button')
    likeButton.innerText = "LIKE"
    likeButton.addEventListener('click', () => {
        postNewUser(book)
    })

    showPanel.append(image, title, description, likeButton)
}

function renderUsers(book) {
    let showPanel = document.querySelector("div#show-panel")
    let users = document.createElement('ul')
    book.users.forEach(user => {
        let userLi = document.createElement('li')
        userLi.textContent = user.username
        users.append(userLi)
    })
    showPanel.append(users)
}

let postNewUser = (book) => {
    console.log(book)
    fetch(`http://localhost:3000/books/${book.id}`, {
        method: "PATCH",
        headers:
            {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
        body: JSON.stringify({
            users: [...book.users, {"id":1, "username":"pouros"}]
        })
    })
    .then(resp => resp.json())
    .then(users => {
        renderUsers(users)
})
}