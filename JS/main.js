const library = [];

function Book(name, author, pages) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.id = crypto.randomUUID();
  this.state = false;
}

let addBook = (n, a, p) => {
  let newBook = new Book(n, a, p);
  library.push(newBook);
};

let add = document.querySelector(".new");
let form = document.querySelector("form");
let submitButton = document.querySelector(".submit");
let hide = document.querySelector(".hide");
let main = document.querySelector(".books");

add.addEventListener("click", (e) => {
  form.classList.add("form");
  hide.classList.add("blur");
});

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  let bookName = document.querySelector("#name").value;
  let bookAuthor = document.querySelector("#author").value;
  let bookPages = document.querySelector("#pages").value;
  if (bookName !== "" && bookAuthor !== "" && bookPages !== "") {
    addBook(bookName, bookAuthor, bookPages);
    form.classList.remove("form");
    hide.classList.remove("blur");
  } else {
    alert("Fill all fields");
  }
  main.innerHTML = "";
  showBooks();
});

let showBooks = () => {
  for (let i = 0; i < library.length; i++) {
    let book = document.createElement("div");
    book.classList.add("book-card");
    book.innerHTML = `
    <h3>${library[i].name}</h3>
    <p>${library[i].author}</p>
    <p>${library[i].pages} pages</p>
    <button data-id="${library[i].id}" class="state ${
      library[i].state ? "read-state" : "unread-state"
    }">${library[i].state ? "Read" : "Unread"}</button>
    <button class="remove" data-id="${library[i].id}">Remove</button>
    `;
    main.appendChild(book);
  }
};

main.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    let index = library.findIndex((book) => book.id === e.target.dataset.id);
    library.splice(index, 1);
    main.innerHTML = "";
    showBooks();
  }
  if (e.target.classList.contains("state")) {
    e.target.classList.toggle("read-state");
    e.target.classList.toggle("unread-state");
    let index = library.findIndex((book) => book.id === e.target.dataset.id);
    library[index].state = !library[index].state;
    main.innerHTML = "";
    showBooks();
  }
});
