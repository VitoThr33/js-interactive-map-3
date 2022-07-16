
//4square api fsq3G/0NCFZ4IQ6I8CvTbK3NAQXpqFJrqFQfupiX5nBCQDw=

const myMap = {
	coordinates: [],
	businesses: [],
	map: {},
	markers: {},

//add map
	addMap() {
		this.map = L.map('map', {
		center: this.coordinates,
		zoom: 16,
		});
		
// add openstreetmap tiles
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		minZoom: '15',
		}).addTo(this.map)
		//  add geo marker
		const marker = L.marker(this.coordinates)
		marker
		.addTo(this.map)
		.bindPopup('<p>YOUR LOCATION</p>')
		.openPopup()
	},
	// add business markers
	addMarkers() {
		for (var i = 0; i < this.businesses.length; i++) {
		this.markers = L.marker([
			this.businesses[i].lat,
			this.businesses[i].long,
		])
			.bindPopup(`<p1>${this.businesses[i].name}</p1>`)
			.addTo(this.map)
		}
	},
}
	
	


// geo location api 
async function getCoords(){
	const pos = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	});
	return [pos.coords.latitude, pos.coords.longitude]
}


// 4square places
async function getFourSquare(business){
    const options ={
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'fsq3G/0NCFZ4IQ6I8CvTbK3NAQXpqFJrqFQfupiX5nBCQDw='
    }
  }
  let limit = 5
	let lat = myMap.coordinates[0]
	let lon = myMap.coordinates[1]
	let response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v3/places/search?&query=${business}&limit=${limit}&ll=${lat}%2C${lon}`, options)
	let data = await response.text()
	let parsedData = JSON.parse(data)
	let businesses = parsedData.results
	return businesses
}





// on load 
window.onload = async () => {
	const coords = await getCoords()
	myMap.coordinates = coords
	myMap.addMap()
}


//event listeners

document.getElementById('submit').addEventListener('click', async (event)=>{
    event.preventdDefault()
    let business=document.getElementById('business').value 
    let data = await getFoursquare(business)
	myMap.businesses = processBusinesses(data)
	myMap.addMarkers()
})
