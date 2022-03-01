const failError = document.getElementById('notify-fail');
//search phone usining name
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
            .then(data => console.log(data.data.slice(0, 20)));
        failError.style.display = 'none';

    }

}
