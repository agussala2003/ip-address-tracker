let map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '<a href="https://agussala2003.github.io/portfolio/">Agustin Saladino</a>'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('This is your location')
    .openPopup();

console.log(L)

let button = document.querySelector('#send')
let greenIcon = L.icon({
    iconUrl: 'https://www.iconpacks.net/icons/2/free-location-pointer-icon-2961-thumb.png',
    iconSize:     [38, 45], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
});

button.addEventListener('click', () => {
    let id = document.querySelector('#searcher').value
    let url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_DPVtU3Z5ENcpsGuean1SD13uqKdmC&ipAddress=${id}`
    fetch(url, {
        method: 'GET'
      })
    .then((response) => response.json())
    .then((data) => {
        console.log(data.location.lat)
        document.querySelector('#ip').innerText = `${data.ip}`
        document.querySelector('#location').innerText = `${data.location.region}`
        document.querySelector('#timezone').innerText = `${data.location.timezone}`
        document.querySelector('#isp').innerText = `${data.isp}`
        map.setView([data.location.lat, data.location.lng], 13);
        L.marker([data.location.lat, data.location.lng], {icon: greenIcon}).addTo(map);
    })
    .catch((error) => {
        console.error('Error:', error);
        document.querySelector('#ip').innerText = undefined
        document.querySelector('#location').innerText = undefined
        document.querySelector('#timezone').innerText = undefined
        document.querySelector('#isp').innerText = undefined
    });
})

