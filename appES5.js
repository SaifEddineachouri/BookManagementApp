// Book Constructor

function Book(title,author,isbn) {
    this.title = title ;
    this.author = author ;
    this.isbn = isbn ;
}

// UI Constructor
function UI() {
    
}


UI.prototype.addBookToList = function (book) {
    
    const list = document.getElementById('book-list');

    // Create  Tr Element
    const row = document.createElement('tr');

    //Insert  Rows 
    row.innerHTML =  `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete"> X </a></td>
    `;

    list.appendChild(row);

    console.log(row);
}

// Show Alert
UI.prototype.showAlert = function(message,className){
    
    // Create Div
    const div = document.createElement('div');
    // Give Classes
    div.className = `alert ${className}` ;
    // Add Text
    div.appendChild(document.createTextNode(message));
    // Get Parent 
    const container= document.querySelector('.container');
    // Get Form
    const form = document.getElementById('book-form');
    // Insert Alert
    container.insertBefore(div,form);

    // Timeout after 3sec 
    setTimeout(function(){
        document.querySelector('.alert').remove();
    },3000);
}

// Delete Book
UI.prototype.deleteBook = function(target) {
    
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
};


// Clear Input Fields
UI.prototype.clearFields = function() {
    document.getElementById('title').value = "" ;
    document.getElementById('author').value ="";
    document.getElementById('isbn').value="";
}

// Event Listener for Add
document.getElementById('book-form').addEventListener('submit',function (e) {

    console.log('test');
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

    // Show message 
    ui.showAlert('Book Removed' , 'success');

    e.preventDefault();
});
