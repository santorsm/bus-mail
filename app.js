'use strict';

// create a constructor function hat creates an object associated with each product
//  has following properties:
//    Name of product
//    File path of image
//Randomly generate 3 unique product images from the images directory and display them side-by-side-by-side in the browser
//Attach an event listener to the section of the HTML page where the images are going to be displayed
//Once the users ‘clicks’ a product, generate three new products for the user to pick from.

//global variables

var products = [];
var productSelected = [];
var myContainer = document.getElementById('container');
var productImgOne = document.getElementById('image-one');
var productImgTwo = document.getElementById('image-two');
var productImgThree = document.getElementById('image-three');


// constructor

function Product(productName, filePatht) {
  this.name = productName;
  this.src = `img/${productName}.${filePath}`;
  this.views = 0;

  products.push(this);

}

// functions
function getRandomProductIndex(max) {
  return Math.floor(Math.random() * max);
}
function productGenerator() {
  var productOne = getRandomProductIndex(products.length);
  var productTwo = getRandomProductIndex(products.length);
  var productThree = getRandomProductIndex(products.length);

  productOne = getRandomProductIndex(products.length);
  productSelected.push(productOne);
  products.pop(productOne);
  console.log(productOne);
  console.log(products.length);

  while (productOne === productTwo){
    productTwo = getRandomProductIndex(products.length);
  }
  productSelected.push(productTwo);
  products.pop(productTwo);
  console.log(productTwo);
  console.log(products.length);

  while(productThree === productOne || productThree === productTwo) {
    productThree = getRandomProductIndex(products.length);
  }
  productSelected.push(productThree);
  products.pop(productThree);
  console.log(productThree);
  console.log(products.length);

  console.log(productThree);

  console.log(productOne, productTwo, productThree);

}




// }


//event handler

//executable code
new Product('bag', 'IMG/bag.jpg');
new Product('banana', 'IMG/banana.jpg');
new Product('bathroom', 'IMG/bathroom.jpg');
new Product('boots', 'IMG/boots.jpg');
new Product('breakfast', 'IMG/breakfast.jpg');
new Product('bubblegum', 'IMG/bublegum.jpg');
new Product('chair', 'IMG/chair.jpg');
new Product('cthulhu', 'IMG/cthulu.jpg');
new Product('dog-duck', 'IMG/dog-duck.jpg');
new Product('dragon', 'IMG/dragon.jpg');
new Product('pen', 'IMG/pen.jpg');
new Product('pet-sweep', 'IMG/pet-sweep.jpg');
new Product('scissors', 'IMG/scissors.jpg');
new Product('shark', 'IMG/shark.jpg');
new Product('sweep', 'jIMG/sweep.pg');
new Product('tauntaun', 'IMG/tauntaun.jpg');
new Product('unicorn', 'IMG/unicorn.jpg');
new Product('usb', 'IMG/usb.jpg');
new Product('water-can', 'IMG/water-can.jpg');
new Product('wine-glass', 'IMG/wine-glass.jpg');



// console.log(getRandomProductIndex(products.length));
productGenerator();

//event listener

