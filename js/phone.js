const failError = document.getElementById('notify-fail');
//search using phone  name
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';

    if (searchText == '') {

        failError.style.display = 'block';
    }

    else {
        // load data
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data.slice(0, 20)));
        failError.style.display = 'none';

    }

}

//display all phone
const displaySearchResult = phones => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (phones.length == 0) {
        // show no result found;
        failError.style.display = 'block';
    }
    phones.forEach(phone => {
        //console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-200 bg-secondary text-white m-2">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.brand}</h5>
                <p class="card-text">${phone.phone_name}</p>
                <button type="button" class="btn btn-info" onclick="loadPhoneDetail('${phone.slug}')">Details</button>
                
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
}
