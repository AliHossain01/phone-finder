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
        //console.log(phone.slug);
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

//single phone details
const loadPhoneDetail = slug => {
    console.log(slug);
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data));
}

// Show details of each phone
const displayPhoneDetail = phone => {
    console.log(phone);
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';

    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${phone.image}" class="card-img-top" alt="...">
    <div class="card-body bg-info text-dark">
        <h6 class="card-title">Brand: ${phone.brand}</h6>
        <p class="card-text"><small> ${phone.name}</small></p>
        <p class="card-text"><small>${phone.releaseDate ? phone.releaseDate : 'Comming Soon'} </small></p>  
        
        <h6 class="card-title">Main Features:</h6>
        <p class="card-text"> <small> Chipset: ${phone.mainFeatures.chipSet} </small></p>    
        <p class="card-text"> <small> Display Size: ${phone.mainFeatures.displaySize}</small></p>    
        <p class="card-text"><small> Memory: ${phone.mainFeatures.memory}</small></p>    
        <p class="card-text"><small>Storage: ${phone.mainFeatures.storage}</small></p>

        
    </div>
    `;
    phoneDetails.appendChild(div);
}