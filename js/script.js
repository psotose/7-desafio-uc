class Card {
  constructor(name, species, image) {
    this.__name = () => name;
    this.__species = () => species;
    this.__image = () => image;
  }

  get name() {
    return this.__name();
  }
  get species() {
    return this.__species();
  }
  get image() {
    return this.__image();
  }
}

class GaleryCards {
  constructor(cards) {
    this.__cards = [];
  }

  add(card) {
    this.__cards.push(card)
  }
  get cards() {
    return this.__cards;
  }

  show() {
    const mainContainer = document.getElementById('main-container');
    const template = document.getElementById('template-card-desk');
  
    for(let i = 0; i < this.__cards.length; i++) {
      const clone = template.cloneNode(true);
      clone.style.visibility = 'visible'
      clone.getElementsByTagName('img')[0].setAttribute("src", this.__cards[i].image);
      clone.getElementsByClassName('card__name')[0].innerHTML = this.__cards[i].name;
      clone.getElementsByClassName('card__specie')[0].innerHTML = this.__cards[i].species;
      const fragment = document.createDocumentFragment();
      fragment.appendChild(clone);
      mainContainer.appendChild(fragment);
    }    
  }
}

const getCharacters = async () => {
  const url = "https://rickandmortyapi.com/api/character";
  try {
    const request = await axios.get(`${url}`);
    const galery = new GaleryCards();
    const data = request.data;
    data.results.forEach(element => {
      const card = new Card(element.name, element.species, element.image)
      galery.add(card);
    });
    galery.show();
  } catch (e) {
    console.log("error", e);
  } finally {
    console.log("getCharacters process done");
  }
}

document.addEventListener('DOMContentLoaded', () => {
  getCharacters();
});


