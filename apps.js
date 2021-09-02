const searchInput = document.getElementById('search-field');

// spinner
const toggleSpinner = spinners => {
    document.getElementById('spinners').style.display = spinners;
};

const bookSearch = () => {
    const searchField = searchInput;
    const searchText = searchField.value;

    // load data
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    if (searchText == '') {
        const errorMessage = document.getElementById('error-mssg');
        const p = document.createElement('p');
        p.style.padding = '8px';
        p.style.fontSize = '20px';
        p.innerText = `(OPPS) Please Books Name`;
        errorMessage.appendChild(p);
    } else {
        fetch(url)
            .then(response => response.json())
            .then(data => displayBooks(data));

        // clear data
        searchField.value = '';
     
        // clear error message
        const errorMessage = document.getElementById('error-mssg');
        errorMessage.textContent= '';
        // display spinner
        toggleSpinner('block');
       
    };
};

const displayBooks = displayBook => {
    if (displayBook.docs == 0) {
        const notFoundMssg = document.getElementById('item-not-found');
        const p = document.createElement('p');
        p.style.fontSize = '20px';
        p.innerText = `Book Not Found`
        notFoundMssg.appendChild(p);
    };
    // total result
    const totalResult = document.getElementById('total-result');
    totalResult.textContent = '';
    const p = document.createElement('p');
    p.style.fontSize = '20px';
    p.style.padding = '8px';
    p.innerText = `Total Found: ${displayBook.numFound}, Maximum 100 Books Display`;
    totalResult.appendChild(p);

    // display result
    const displayContainer = document.getElementById('display-result');
    displayContainer.textContent = '';
    displayBook.docs.forEach(books => {
        if (`${books.ebook_count_i}` == 0) {
            return
        };
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${books.cover_i}-L.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 style ="text-color: red" class="card-title">${books.title}</h5>
                <p>Author: ${books.author_name[0]}</p>
                <p>Publisher: ${books.publisher[0]}</p>
                <p>Publish Place: ${books.publish_place}</p>
                <p class="card-text">Publish Date: ${books.publish_date[0]}</p>
            </div>
        </div>
        `;
        displayContainer.appendChild(div);
    });
    
    // remove spinner
    toggleSpinner('none');
};