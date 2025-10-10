const form = document.querySelector("#bookform");
const newBookBtn = document.querySelector("#newbookbtn");
const addBookBtn = document.querySelector("#addbookbtn")
const titleInput = document.querySelector("#title")
const authorInput = document.querySelector("#author")
const pagesInput = document.querySelector("#pages")
const readStatusInput = document.querySelector("#readstatus")

const myLibrary = [];

function Book(title, author, pages, readStatus) {
    if(!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.id = crypto.randomUUID();
}

Book.prototype.info = function() {
    const statusText = this.readStatus ? "Read" : "Not Read Yet";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${statusText}`;
};

function addBookToLibrary(book) {
    myLibrary.push(book);
    displayBook();
}

function displayBook() {
    const cardText = document.querySelector("#card");
    cardText.innerHTML = "";
    for (const book of myLibrary) {
        cardText.innerHTML += `<p>${book.info()}</p>`
    }
}

newBookBtn.addEventListener("click", () => {
    if (form.style.display === "none" || form.style.display === "") {
        form.style.display = "block";
    }else {
        form.style.display = "none";
    }
})

addBookBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const readStatus = readStatusInput.checked;

    addBookToLibrary(new Book(title, author, pages, readStatus));

    form.reset();
});

