//library logic
const myLibrary = [];
const contentContainer = document.querySelector('.content');

function Book(title, author, pages, pubYear, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.pubYear = pubYear;
    this.read = read;
}
Book.prototype.info = function() {
    return `${this.title} by ${this.author}, published in ${this.pubYear}, ${this.pages} pages. ${this.read ? 'Read.' : 'Not read.'}`
}
let book1 = new Book("To Kill a Mockingbird", "Harper Lee", 336, 1960, true);
let book2 = new Book("1984", "George Orwell", 328, 1949, false);
let book3 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, 1925, true);
let book4 = new Book("Pride and Prejudice", "Jane Austen", 279, 1813, true);
let book5 = new Book("The Catcher in the Rye", "J.D. Salinger", 277, 1951, true);
let book6 = new Book("To the Lighthouse", "Virginia Woolf", 209, 1927, false);
let book7 = new Book("Brave New World", "Aldous Huxley", 311, 1932, true);
let book8 = new Book("Moby-Dick", "Herman Melville", 600, 1851, false);
let book9 = new Book("The Grapes of Wrath", "John Steinbeck", 464, 1939, true);
let book10 = new Book("Jane Eyre", "Charlotte Bronte", 532, 1847, true);
let book11 = new Book("Crime and Punishment", "Fyodor Dostoevsky", 551, 1866, false);
let book12 = new Book("Beloved", "Toni Morrison", 321, 1987, true);
let book13 = new Book("Wuthering Heights", "Emily Bronte", 315, 1847, true);
let book14 = new Book("The Lord of the Rings", "J.R.R. Tolkien", 1178, 1954, true);
let book15 = new Book("Anna Karenina", "Leo Tolstoy", 964, 1877, true);
myLibrary.push(book1, book2, book3, book4, book5, book6, book7, book8, book9, book10, book11, book12, book13, book14, book15);

displayLibrary();

//form
const bookForm = document.querySelector('#add-book-form');
//inputs
let titleInput = document.querySelector('#title');

let authorInput = document.querySelector('#author');

let pagesInput = document.querySelector('#pages');

let publishedInput = document.querySelector('#published');

let readInput = document.querySelector('#read');

const dialog = document.getElementById('add-book-dialog');

//show dialog button
const showDialogButton = document.querySelector('.show-dialog');
showDialogButton.addEventListener('click', () => {
    dialog.showModal();
});

//cancel form button
const cancelFormButton = document.querySelector('#cancel-form-button');
cancelFormButton.addEventListener("click", (e) => {
    e.preventDefault();
    bookForm.reset();
    dialog.close();
});

//add book button
const addBookButton = document.querySelector('#add-book-button');
addBookButton.addEventListener('click', (e) => {
    e.preventDefault();
    if(titleInput.value && authorInput.value && pagesInput.value && publishedInput.value && readInput.value){
        let newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, publishedInput.value, Boolean(readInput.value.toLowerCase()));
        myLibrary.push(newBook);
        bookForm.reset();
        dialog.close();
        displayLibrary();
    }else{
        alert('Fill in all values');
    }
    
});


function displayLibrary(){
    contentContainer.innerHTML = ' ';
    myLibrary.forEach((book, index) => {
        const bookDisplay = document.createElement('div');
        bookDisplay.className = 'book-card';
        bookDisplay.setAttribute('data-index',index);
        bookDisplay.innerHTML = `
            <p><b>Title:</b> ${book.title}</p>
            <p><b>Author:</b> ${book.author}</p>
            <p><b>Pages:</b> ${book.pages}</p>
            <p><b>Published:</b> ${book.pubYear}</p>
            <p id="read-paragraph"><b>Read:</b> ${book.read}</p>
            <div>
                <button class="toggle-read-button">Read/Not read</button>
                <button class="remove-book-button">Remove</button>
            </div>
        `;
        contentContainer.appendChild(bookDisplay);
    });
}

contentContainer.addEventListener('click', removeBook)

function removeBook(event) {
    let card = event.target.parentNode.parentNode;
    if (event.target.classList.contains('remove-book-button')) {
        const index = card.dataset.index;
        myLibrary.splice(index, 1);
        card.parentNode.removeChild(card);
        //displayLibrary();
    }
    if (event.target.classList.contains('toggle-read-button')) {
        const index = card.dataset.index;
        myLibrary[index].read = !myLibrary[index].read;
        card.querySelector('#read-paragraph').innerHTML = `<b>Read:</b> ${myLibrary[index].read}`;
        console.log(myLibrary[index].read);
    }
}