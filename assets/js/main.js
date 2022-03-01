// Search Phone by input
const phoneSearch = () => {
    const inputText = document.getElementById('phone_name');
    const searchText = inputText.value;
    loadPhone(searchText);
    inputText.value = '';
};

// Load API Information
const loadPhone = (searchText) => {
    let url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
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
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
            <div class="card h-100">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">Brand: <span class="text-primary">${phone.brand}</span> </p>
                    <button onclick="loadPhoneDetails('${phone.slug}')"  type="button" class="btn btn-outline-dark">Show Details</button>
                </div>
            </div>
        `;
        // Append Phone div
        phoneContainer.appendChild(div);

    });
};


// Load Phone Details
const loadPhoneDetails = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(res => displayPhoneDetails(res.data));
}

// Display Phone Details
const displayPhoneDetails = phone => {
    console.log(phone.mainFeatures);
    const phoneDetailes = document.getElementById('phone_detiles');
    console.log(phoneDetailes);
    phoneDetailes.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card')
    div.innerHTML = `
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.name}</h5>
            <p class="card-text"><span class="text-primary">Release Date: </span>${phone.releaseDate} </p>
            <p class="card-text text-primary">Main Feature</p>
            <ul class="list-group list-group-flush">
                <li class="list-group-item"><span class="text-primary">Chipset: </span>${phone.mainFeatures.chipSet}</li>
                <li class="list-group-item"><span class="text-primary">Display Size: </span>${phone.mainFeatures.displaySize}</li>
                <li class="list-group-item"><span class="text-primary">Memory: </span>${phone.mainFeatures.memory}</li>
                <li class="list-group-item"><span class="text-primary">Storage: </span>${phone.mainFeatures.storage}</li>
            </ul>

        </div>
        `;
    phoneDetailes.appendChild(div);
}