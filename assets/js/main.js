// Search Phone by input
const phoneSearch = () => {
    const inputText = document.getElementById('phone_name');
    const searchText = inputText.value;
    loadData(searchText);
    inputText.value = '';
}

// Load API Information
const loadData = (searchText) => {
    let url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(res => displayPhone(res.data));
}

// Display Phone
const displayPhone = (phones) => {
    const expectPhones = phones.slice(0, 20);
    // console.log(expectPhones);
    expectPhones.forEach(phone => console.log(phone));
}