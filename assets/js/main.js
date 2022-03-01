// search Phone by input
const phoneSearch = () => {
    const inputText = document.getElementById('phone_name');
    const searchText = inputText.value;
    loadData(searchText);
}

// Load API Information
const loadData = (searchText) => {
    let url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(res => console.log(res.data));
}