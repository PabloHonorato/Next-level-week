//função que puxa opcçoes de dados pelo http do ibge
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

    //limpando o campo e deixando o campo cidade bloqueado
    CitySelect.innerHTML = "<option value>selecione a cidade</option"
    CitySelect.innerHTML = true

    fetch(url)
  .then( res => res.json() )
  .then( Cities => {

    for( const City of Cities ) {

        CitySelect.innerHTML += `<option value="${City.nome}">${City.nome}</option>`
    }

    CitySelect.disabled = false
  } )
}



document.querySelector("select[name=uf]")
.addEventListener("change", getCities)

//items de coleta
//pegar todo os li`s
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem)

}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {

  const itemLi = event.target

  //adicionar ou remover uma classe com javascript
  itemLi.classList.toggle("selected")

  const ItemId = event.target.dataset.id

  //verificara se existe items selecionados , se sim
  //pegar os itens selecionados

   const alreadySelected = selectedItems.findIndex(function(item){
     const itemFound = item == ItemId //será true or false
     return itemFound
   })
   console.log(alreadySelected)
  //se ja estiver selecionado, tirar o cara da seleção
  if(alreadySelected >= 0)  {
      //tirar da seleção
      const filteredItems = selectedItems.filter(item =>{
        const itemsIsDifferent = item != ItemId //false
        return itemsIsDifferent
      })

      selectedItems = filteredItems
  }else {
    //se não estiver selecionado, adicionar à seleção

    //adicionar a seleção

    selectedItems.push(ItemId)

    console.log(selectedItems)
  }

  //atualizar o campo escondido com os campos selecionados
    collectedItems.value = selectedItems
}