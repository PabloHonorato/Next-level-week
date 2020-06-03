function populateUFs() {
  const ufSelect =  document.querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then( res => res.json() )
  .then( states => {

    for( const state of states ) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
    }
  } )
}

populateUFs()


function getCities(event) {
    const CitySelect = document.querySelector("[name=City]")
    const stateinput = document.querySelector("[name=state]")

    const ufValue  = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateinput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)
  .then( res => res.json() )
  .then( Cities => {

    for( const City of Cities ) {
        CitySelect.innerHTML += `<option value="${City.id}">${City.nome}</option>`
    }

    CitySelect.disabled = false
  } )
}



document.querySelector("select[name=uf]")
.addEventListener("change", getCities)