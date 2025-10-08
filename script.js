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
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readStatus}`;
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

addBookToLibrary(new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read yet"));

