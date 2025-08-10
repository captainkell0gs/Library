const myLibrary = [];

function Book(title, author, pages, status) {
    if(!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.id = crypto.randomUUID();
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.status}`
}

function addBookToLibrary(Book) {
    myLibrary.push(Book);
}



