const products = require('./products.json');
const fs = require('fs');
const path = require('path');

const nameToImg = {
  'Hamburguesa sencilla — cerdo': 'classic-pork-burger-hamburguesa-sencilla.png',
  'Hamburguesa sencilla — pollo': 'classic-chicken-burger-hamburguesa-sencilla.png',
  'Hamburguesa jamón viking — cerdo': 'pork-burger-with-viking-ham-hamburguesa-jam.png',
  'Hamburguesa jamón viking — pollo': 'chicken-burger-with-viking-ham-hamburguesa.png',
  'Hamburguesa jamón pierna — cerdo': 'pork-burger-with-leg-ham-hamburguesa-jam-n.png',
  'Hamburguesa jamón pierna — pollo': 'chicken-burger-with-leg-ham-hamburguesa-jam.png',
  'Hamburguesa queso gouda — cerdo': 'pork-burger-with-melted-gouda-cheese.png',
  'Hamburguesa queso gouda — pollo': 'chicken-burger-with-melted-gouda-cheese.png',
  'Big Americana — cerdo': 'big-americana-pork-burger-with-egg-and.png',
  'Big Americana — pollo': 'big-americana-chicken-burger-with-egg-and.png',
  'Big Plus — cerdo': 'big-plus-pork-burger-with-two-patties-ham.png',
  'Big Plus — pollo': 'big-plus-chicken-burger-with-two-patties-ham.png',
  'Sandwich tradicional': 'traditional-sandwich-with-ham-and-cheese.png',
  'Sandwich a lo cubano': 'sandwich-a-lo-cubano-with-ham-pork-steak-and.png',
  'Sandwich de Jamón Pierna': 'ham-sandwich-sandwich-de-jam-n-pierna-on-a.png',
  'Sandwich de Bistec de cerdo': 'pork-steak-sandwich-with-onions-and.png',
  'Pizza napolitana — queso blanco': 'classic-neapolitan-pizza-with-white-cheese.png',
  'Pizza napolitana — queso gouda': 'classic-neapolitan-pizza-with-gouda-cheese.png',
  'Pizza con jamón viking — queso blanco': 'pizza-with-viking-ham-and-white-cheese-pizza.png',
  'Pizza con jamón viking — queso gouda': 'pizza-with-viking-ham-and-gouda-cheese-pizza.png',
  'Pizza con jamón pierna — queso blanco': 'pizza-with-leg-ham-and-white-cheese-pizza.png',
  'Pizza con jamón pierna — queso gouda': 'pizza-with-leg-ham-and-gouda-cheese-pizza.png',
  'Pizza con aceitunas — queso blanco': 'pizza-with-olives-and-white-cheese-pizza-con.png',
  'Pizza con aceitunas — queso gouda': 'pizza-with-olives-and-gouda-cheese-pizza-con.png',
  'Pizza Roldós — queso blanco': 'pizza-rold-s-with-bolognese-sauce-olives-1.png',
  'Pizza Roldós — queso gouda': 'pizza-rold-s-with-bolognese-sauce-olives-2.png',
  'Espagueti napolitano — queso blanco': 'professional-food-photography-of-spaghetti-with-neapolitan-sauce-and-white.png',
  'Espagueti napolitano — queso gouda': 'professional-food-photography-of-spaghetti-with-neapolitan-sauce-and-gouda.png',
  'Espagueti con jamón viking — queso blanco': 'professional-food-photography-of-spaghetti-with-viking-ham-and-white-cheese.png',
  'Espagueti con jamón viking — queso gouda': 'professional-food-photography-of-spaghetti-with-viking-ham-and-gouda-cheese.png',
  'Espagueti con jamón pierna — queso blanco': 'professional-food-photography-of-spaghetti-with-leg-ham-and-white-cheese.png',
  'Espagueti con jamón pierna — queso gouda': 'professional-food-photography-of-spaghetti-with-leg-ham-and-gouda-cheese.png',
  'Espagueti con aceitunas — queso blanco': 'professional-food-photography-of-spaghetti-with-olives-and-white-cheese.png',
  'Espagueti con aceitunas — queso gouda': 'professional-food-photography-of-spaghetti-with-olives-and-gouda-cheese.png',
  'Espagueti Roldós — queso blanco': 'professional-food-photography-of-espagueti-rold-s-with-bolognese-sauce-olives-1.png',
  'Espagueti Roldós — queso gouda': 'professional-food-photography-of-espagueti-rold-s-with-bolognese-sauce-olives-2.png',
  'Agregado — Queso blanco': 'portion-of-white-cheese-and-gouda-cheese.png',
  'Agregado — Queso gouda': 'portion-of-white-cheese-and-gouda-cheese.png',
  'Agregado — Jamón viking': 'pizza-with-viking-ham-and-white-cheese-pizza.png',
  'Agregado — Jamón pierna': 'pizza-with-leg-ham-and-white-cheese-pizza.png',
  'Agregado — Huevo': 'big-americana-chicken-burger-with-egg-and.png',
  'Ensalada fría 160g': 'cold-pasta-salad-ensalada-fr-a-on-a-clean.png',
  'Ensalada fría 1 lb': 'cold-pasta-salad-ensalada-fr-a-on-a-clean.png',
  'Flan': 'big-americana-chicken-burger-with-egg-and.png'
};

const updatedProducts = products.map(p => {
  const imgFile = nameToImg[p.name];
  if (imgFile) {
    return { ...p, img: `img/${imgFile}` };
  }
  console.log(`No match for: ${p.name}`);
  return p;
});

fs.writeFileSync('products.json', JSON.stringify(updatedProducts, null, 2));
console.log('Updated products.json with new image paths');
