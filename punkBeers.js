var data;

async function getData() {
  var response = await fetch("./punkipaData.json");
  data = await response.json();
  return data;
}

function mashTemplate(beerMethod) {
  return `
  <ul class="list-group list-group-flush">
  ${beerMethod
    .map(
      (item) =>
        `<li class="list-group-item">${item.duration} mins at ${item.temp.value} &degc</li>`
    )
    .join("")}
  </ul>
  `;
}

function maltsTemplate(malts) {
  return `
    <ul class="list-group list-group-flush">
    ${malts
      .map(
        (item) => `
    <li class="list-group-item">Malt: ${item.name}</li>
    <li class="list-group-item"> ${item.amount.value} ${item.amount.unit}</li>
    `
      )
      .join("")}
    </ul>
    `;
}

function hopsTemplate(hops) {
  return `
    <ul class="list-group list-group-flush">
    ${hops
      .map(
        (item) => `
    <li class="list-group-item">Hop: ${item.name}</li>
    <li class="list-group-item">Attribute: ${item.attribute}</li>
    <li class="list-group-item">Add: ${item.add}</li>
    <li class="list-group-item">Qty: ${item.amount.value} ${item.amount.unit}</li>
    <hr>
    `
      )
      .join("")}
    </ul>
    `;
}

function yeastTemplate(yeast) {
  return `
    <ul class="list-group list-group-flush">
    <li class="list-group-item">Yeast: ${yeast}</li>
    <hr>
    </ul>
    `;
}

function twistTemplate(twist) {
  return `
      <ul class="list-group list-group-flush">
      <li class="list-group-item">Twist: ${twist}</li>
      <hr>
      </ul>
      `;
}

function foodTemplate(food) {
  return `
    <ul class="list-group list-group-flush">
    ${food.map((item) => `<li class="list-group-item">${item} </li>`).join("")}
    </ul>
    `;
}

function beerTemplate(beer) {
  return `
    <div class="card beer col-sm-3">
  <img src="${beer.image_url}" class="card-img-top beer-photo" id="${beer.name}" alt="beer-image">
  <div class="card-body">
    <h3 class="card-title">${beer.name}</h3>
    <h4>ABV: ${beer.abv}%</h4>
    <p class="card-text">${beer.description}</p>
    <hr>
    <h4 class="card-title"><em>"${beer.tagline}"</em></h4>
    <hr>
    <h4 class="card-title">Tips from the Brewer!</h4>
    <p class="card-text">${beer.brewers_tips}</p>
    <hr>
    <h5 class="card-title">Ingredients</h5>
    <h6 class="card-title">Malts</h6>
  ${beer.ingredients.malt ? maltsTemplate(beer.ingredients.malt) : ""}
    <hr>
    <h6 class="card-title">Hops</h6>
    ${beer.ingredients.hops ? hopsTemplate(beer.ingredients.hops) : ""}
    <hr>
    <h6 class="card-title">Yeast</h6>
    ${beer.ingredients.yeast ? yeastTemplate(beer.ingredients.yeast) : ""}
    <h5 class="card-title">Mash Method</h5>
  ${beer.method.mash_temp ? mashTemplate(beer.method.mash_temp) : ""}
  <h6 class="card-title">Twist</h6>
  ${beer.method.twist ? twistTemplate(beer.method.twist) : ""}
  <hr>
  <h4 class="card-title">Food Pairings</h4>
  ${beer.food_pairing ? foodTemplate(beer.food_pairing) : ""}
  <hr>
  <h4 class="card-title">Stats</h4>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">IBU : ${beer.ibu}</li>
    <li class="list-group-item">EBC: ${beer.ebc}</li>
    <li class="list-group-item">Target Original Gravity:${beer.target_og} </li>
    <li class="list-group-item">Target Final Gravity: ${beer.target_fg}</li>
    <li class="list-group-item">Boil Volume: ${beer.boil_volume.value} ${
    beer.boil_volume.unit
  }</li>
    <li class="list-group-item">Final Volume: ${beer.volume.value} ${
    beer.volume.unit
  }</li>
    <li class="list-group-item">Fermentation Temp: <br>${
      beer.method.fermentation.temp.value
    } ${beer.method.fermentation.temp.unit}</li>
  </ul>
  <div class="card-body">
    <h4 class="card-title">First Brewed: ${beer.first_brewed}</h4>
  </div>
</div>
</div>

`;
}

getData().then((data) => {
  console.log(data);
  document.getElementById("root").innerHTML = `
   
    <div class="card-container row"> ${data.map(beerTemplate).join("")}</div>
    `;
 

  function createMenu(data) {
        let i =0
        for (i=0; i < data.length; i++){
        document.getElementById("myMenu").innerHTML +=  `
        <a class="dropdown-item" href="#${data[i].name}">${data[i].name}--${data[i].abv}% ABV</a>
        `};
    };
    createMenu(data);
      }
);

