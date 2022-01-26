class Book{

    constructor(title , author , isbn){
        this.title = title ;
        this.author = author;
        this.isbn = isbn ;
    }
}

class UI{

    addBookToList(book){
        const list = document.getElementById('book-list');

        // Create tr Element 
        const row = document.createElement('tr');
        //Insert Cols

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete"> X </a></td>
        `;
        list.appendChild(row);
    }

    showAlert(message , className){
        // Create Div
        const div = document.createElement('div');
        // Add Classes
        div.className = `alert ${className}` ;
        // Add Text 
        div.appendChild(document.createTextNode(message));
        // Get Parent 
        const container = document.querySelector('.container');
        // Get Form 
        const form = document.getElementById('book-form');
        // Insert Alert 
        container.insertBefore(div,form) ;
        // TimeOut 3 after sec
        setTimeout(function() {
            document.querySelector('.alert').remove();
        },3000);
    }


    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }

    clearFields(){  
        document.getElementById('title').value = "";
        document.getElementById('author').value = "";
        document.getElementById('isbn').value = "" ;
    }

}


// Local Storage Class
class store {

    static getBooks(){
        let books ;
        if(localStorage.getItem('books') === null ){
            books = [] ;
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    
    static displayBooks(){
        // console.log('it works');
        const books = store.getBooks() ;

        books.forEach(function(book) {
            const  ui = new UI();

            //Add Book to UI 
            ui.addBookToList(book);

        });
    }

    static addBook(book){
        const books = store.getBooks() ;
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }

    static removeBook(isbn){
        
        const books = store.getBooks() ;
        
        books.forEach(function(book,index){
            
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        });

        localStorage.setItem('books',JSON.stringify(books));
    }
}


// DOM Load Event
document.addEventListener('DOMContentLoaded' , store.displayBooks());

// Event Listener for Add
document.getElementById('book-form').addEventListener('submit',function (e) {

    // console.log('test');
    // Get Form Values
    const title = document.getElementById('title').value ,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value 
    
    // Instantiate a Book
    const book = new Book(title,author,isbn);
        
    // Instantiate UI Object
    const ui = new UI();

    // Validate Inputs 
    if(title === '' || author === '' || isbn === ''){
        // Error Alert 
        ui.showAlert('Please fill in all Fields','error');   
    } else {
    // Add Book to list
    ui.addBookToList(book);

    // Add to LocalStorage
    store.addBook(book);
    
    // Show Success 
    ui.showAlert('Book Has been Added Succefully','success');
    }


    // Clear Fields
    ui.clearFields();

    e.preventDefault();
});

// Event Listener for Delete

document.getElementById('book-list').addEventListener('click',function(e){

    // Instantiate UI Object
    const ui = new UI();

    ui.deleteBook(e.target);

    store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    
    // Show message 
    ui.showAlert('Book Removed' , 'success');

    e.preventDefault();
});
