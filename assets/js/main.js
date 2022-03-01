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
            <div class="card border-0 shadow-lg h-100 text-center">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">Brand: <span class="text-primary">${phone.brand}</span> </p>
                    <button onclick="loadPhoneDetails('${phone.slug}')"  type="button" class="btn btn-outline-primary">Show Details</button>
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
    console.log(phone);

    const phoneDetailes = document.getElementById('phone_detiles');
    phoneDetailes.textContent = '';
    const div = document.createElement('div');
    div.classList.add()
    div.innerHTML = `

    <div class="card mb-3 mx-auto" style="max-width: 540px;">
            <div class="row g-0">
              <div class="col-lg-4">
                <img src="${phone.image}" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-lg-8">
                <div class="card-body">
                  <h5 class="card-title">${phone.name}</h5>
                  <p class="card-text"><span class="text-primary">Release Date: </span>${phone.releaseDate} </p>
                </div>
              </div>
            </div>
          </div>


        `;
    phoneDetailes.appendChild(div);
}