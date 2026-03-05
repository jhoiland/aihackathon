const cityContainer = document.getElementById("cities")
const guide = document.getElementById("guide")

function renderCities(){

cities.forEach(city => {

const card = document.createElement("div")

card.className = "city-card"

card.innerHTML = `
<h3>${city.name}</h3>
<p>${city.country}</p>
`

card.onclick = () => showGuide(city)

cityContainer.appendChild(card)

})

}

function showGuide(city){

guide.innerHTML = `
<h3>${city.name}</h3>

<h4>Kjent for</h4>
<ul>
${city.knownFor.map(i => `<li>${i}</li>`).join("")}
</ul>

<h4>Ting å gjøre</h4>
<ul>
${city.things.map(i => `<li>${i}</li>`).join("")}
</ul>
`

}

renderCities()