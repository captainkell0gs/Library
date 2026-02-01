const form = document.querySelector("#bookform");
const newBookBtn = document.querySelector("#newbookbtn");
const addBookBtn = document.querySelector("#addbookbtn")
const titleInput = document.querySelector("#title")
const authorInput = document.querySelector("#author")
const pagesInput = document.querySelector("#pages")
const readStatusInput = document.querySelector("#readstatus")

class Book {
    constructor (title, author, pages, readStatus) {
        if(!new.target) {
            throw Error("You must use the 'new' operator to call the constructor");
        }

        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
        this.id = crypto.randomUUID();
    }

    info() {
        const statusText = this.readStatus ? "Read" : "Unread";
        return `${this.title} by ${this.author}, ${this.pages} pages, ${statusText}`;
    }
}

class Library {
    #books = [];

    addBook(book) {
        this.#books.push(book);
        this.displayBook();
    }

    removeBook(id) {
        const index = this.#books.findIndex(b => b.id === id);
        this.#books.splice(index, 1);
        this.displayBook();
    }

    toggleStatus(id) {
        const book = this.#books.find(b => b.id === id);
        book.readStatus = !book.readStatus;
        this.displayBook();
    }

    displayBook() {
    const cardText = document.querySelector("#card");
    cardText.innerHTML = "";
        for (const book of this.#books) {
            cardText.innerHTML += `<p>
            ${book.info()} 
            <button class="remove-btn" data-id="${book.id}">Remove</button>
            <button class="status" data-id="${book.id}">Status</button>
            </p>`
        }
    }

    init() {
        newBookBtn.addEventListener("click", () => {
            if (form.style.display === "none" || form.style.display === "") {
                form.style.display = "flex";
            }else {
                form.style.display = "none";
            }
        })

        const validators = {
            title (input, error) {
                if (input.validity.valueMissing) {
                    error.textContent = 'Title is required.';
                    input.setCustomValidity('Title is required');
                } else {
                    error.textContent = '';
                    input.setCustomValidity('');
                }
            }, 

            author (input, error) {
                if (input.validity.valueMissing) {
                    error.textContent = 'Author is required.';
                    input.setCustomValidity('Author is required');
                } else {
                    error.textContent = '';
                    input.setCustomValidity('');
                }
            }, 

            pages (input, error) {
                if (input.validity.valueMissing) {
                    error.textContent = 'Number of pages is required.';
                    input.setCustomValidity('Number of pages is required');
                } else if (input.validity.typeMismatch) {
                    error.textContent = 'Please enter a valid number.';
                    input.setCustomValidity('Invalid number');
                } else {
                    error.textContent = '';
                    input.setCustomValidity('');
                }
            }, 

            readstatus (input, error) {
                error.textContent = '';
                input.setCustomValidity('');
            }
        }

        function validateInput (input) {
            const error = document.querySelector(`#${input.id}-error`);
            const validator = validators[input.id];

            if (!validator) return;

            validator(input, error);
        }

        document.querySelectorAll("#bookform input").forEach((input) => {
            input.addEventListener("input", () => {
                validateInput(input);
            });

            input.addEventListener("blur", () => {
                input.classList.add("touched");
                validateInput(input);
            });
        });

        form.addEventListener("input", () => {
            const addBookBtn = document.querySelector("#addbookbtn");
            addBookBtn.disabled = !form.checkValidity();
        });

        form.addEventListener("submit", (e) => {
            const title = titleInput.value;
            const author = authorInput.value;
            const pages = pagesInput.value;
            const readStatus = readStatusInput.checked;

            if (!form.checkValidity()) {
                e.preventDefault();
                form.querySelectorAll("input").forEach((input) => {
                    input.classList.add("touched");                    
                });
            } else {
                e.preventDefault();
                this.addBook(new Book(title, author, pages, readStatus));
                form.style.display = "none";
                form.reset();
            }
        });

        document.querySelector("#card").addEventListener("click", (e) => {
            if (e.target.classList.contains("remove-btn")) {
                const id = e.target.dataset.id;
                this.removeBook(id);
            }

            if(e.target.classList.contains("status")) {
                const id = e.target.dataset.id;
                this.toggleStatus(id);
            }
        })
    }
}

const library = new Library();
library.init();

