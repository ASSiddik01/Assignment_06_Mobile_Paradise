// Search Phone by input
const phoneSearch = () => {
    const inputText = document.getElementById('phone_name');
    const searchText = inputText.value;
    loadData(searchText);
    inputText.value = '';
};

// Load API Information
const loadData = (searchText) => {
    let url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(res => displayPhone(res.data));
};

// Display Phone
const displayPhone = (phones) => {
    // Get max 20 phones
    const searchResult = phones.slice(0, 20);
    // Get Container form UI
    const phoneContainer = document.getElementById('display_phone');
    // Clear Container form UI
    phoneContainer.textContent = '';
    // Loop on seach result
    searchResult.forEach(phone => {
        console.log(phone)
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
            <div class="card h-100">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">Brand: <span class="text-primary">${phone.brand}</span> </p>
                    <button type="button" class="btn btn-outline-dark">Show Details</button>
                </div>
            </div>
        `;
        // Append Phone div
        phoneContainer.appendChild(div);

    });
};