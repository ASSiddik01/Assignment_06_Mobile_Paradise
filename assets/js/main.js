// Search Phone by input
const phoneSearch = () => {
  // Error message handle
  document.getElementById('result_not_found').style.display = 'none';
  document.getElementById('empty_search').style.display = 'none';

  // Get Container and empty form UI
  const phoneContainer = document.getElementById('display_phone');
  phoneContainer.textContent = '';
  const phoneDetailes = document.getElementById('phone_detiles');
  phoneDetailes.textContent = '';
  
  // Spinner Handle
  toggleSpinner('block');

  // Get Input value and case convert
  const inputText = document.getElementById('phone_name');
  const searchText = inputText.value.toLowerCase();

  // Empty search handle
  if (searchText == '') {
    document.getElementById('empty_search').style.display = 'block';
    toggleSpinner('none');
    return;
  }

  loadPhone(searchText);
  inputText.value = '';
};

// Spinner Handle
const toggleSpinner = displayStyle => {
  document.getElementById('spinner').style.display = displayStyle;
}

// Load Phone Information
const loadPhone = (searchText) => {
  let url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  fetch(url)
    .then(res => res.json())
    .then(res => displayPhone(res.data));
};

// Display Phone
const displayPhone = (phones) => {

  // Spinner and error message handle
  if (phones.length == 0) {
    toggleSpinner('none');
    document.getElementById('result_not_found').style.display = 'block';
  }

  // Get max 20 phones
  const searchResult = phones.slice(0, 20);

  // Get Container
  const phoneContainer = document.getElementById('display_phone');

  // Loop on search result
  searchResult.forEach(phone => {
    const div = document.createElement('div');
    div.classList.add('col')
    div.innerHTML = `
            <div class="card border-0 shadow h-100 text-center">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">Brand: <span class="text-primary">${phone.brand}</span> </p>
                </div>
                <div class="card-footer border-0 bg-white">
                  <button onclick="loadPhoneDetails('${phone.slug}')"  type="button" class="btn btn-outline-primary">Show Details</button>
                </div>
            </div>
        `;
    // Append Phone div
    phoneContainer.appendChild(div);
    // Spinner hide
    toggleSpinner('none');
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
  const features = phone.mainFeatures;

  // Other info undefiend handle
  let WLAN = phone?.others?.WLAN;
  let Bluetooth = phone?.others?.Bluetooth;
  let GPS = phone?.others?.GPS;
  let NFC = phone?.others?.NFC;
  let Radio = phone?.others?.Radio;
  let USB = phone?.others?.USB;
  if (phone.others == undefined) {
    WLAN = 'No info found',
      Bluetooth = 'No info found',
      NFC = 'No info found',
      Radio = 'No info found',
      USB = 'No info found',
      GPS = 'No info found';
  }


  // Release Date handle
  let date = phone.releaseDate;
  if (date == '') {
    const notFound = 'No date found';
    date = notFound;
  }

  // Show more details
  const phoneDetailes = document.getElementById('phone_detiles');
  phoneDetailes.textContent = '';
  const div = document.createElement('div');
  div.classList.add()
  div.innerHTML = `
    <div class="card shadow-lg mb-3 mx-auto p-3" style="max-width: 540px;">
            <div class="row g-0">
              <div class="col-lg-4">
                <img src="${phone.image}" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-lg-8">
                <div class="card-body">
                  <h5 class="card-title">${phone.name}</h5>

                  <p class="card-text"><span class="text-primary">Release Date: </span>${date} </p>
                  <p class="card-text"><span class="text-primary">Main Feature: </span></p>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item"><span class="text-primary">Chipset: </span>${features.chipSet} </li>
                    <li class="list-group-item"><span class="text-primary">Display Size: </span>${features.displaySize} </li>
                    <li class="list-group-item"><span class="text-primary">Memory: </span>${features.memory} </li>
                    <li class="list-group-item"><span class="text-primary">Sotrage: </span>${features.storage} </li>

                  <p class="card-text"><span class="text-primary">Sensors:</span></p>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">${features.sensors}</li>
                    </ul>
                  
                  <hr>

                  <p class="card-text"><span class="text-primary">Other Informations: </span></p>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item"><span class="text-primary">WLAN: </span>${WLAN} </li>
                    <li class="list-group-item"><span class="text-primary">Bluetooth: </span>${Bluetooth} </li>
                    <li class="list-group-item"><span class="text-primary">GPS: </span>${GPS} </li>
                    <li class="list-group-item"><span class="text-primary">NFC: </span>${NFC} </li>
                    <li class="list-group-item"><span class="text-primary">Radio: </span>${Radio} </li>
                    <li class="list-group-item"><span class="text-primary">USB: </span>${USB} </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        `;
  phoneDetailes.appendChild(div);
}