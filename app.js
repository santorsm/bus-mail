'use strict';

// create a constructor function hat creates an object associated with each product
//  has following properties:
//    Name of product
//    File path of image
//Randomly generate 3 unique product images from the images directory and display them side-by-side-by-side in the browser
//Attach an event listener to the section of the HTML page where the images are going to be displayed
//Once the users ‘clicks’ a product, generate three new products for the user to pick from.

//global variables

var productsArray = [];
var selectedProductArray = [];
var arrayLength = 3;
var maxClicks = 25;
var clicks = 0;
var myContainer = document.getElementById('container');
var productImgOneEl = document.getElementById('image-one');
var productImgTwoEl = document.getElementById('image-two');
var productImgThreeEl = document.getElementById('image-three');
var resultList = document.getElementById('list');

// constructor with properties of Name of the product & File path of image

function Product(productName, filePath) {
  this.name = productName;
  this.src = `img/${productName}.${filePath}`;
  this.views = 0;
  this.votes = 0;
  productsArray.push(this);
}

// functions
function getRandomProductIndex(max) {
  return Math.floor(Math.random() * max);
}
function productGenerator() {
  selectedProductArray = [];
  var selectedProduct = getRandomProductIndex(productsArray.length);

  // selectedProduct = getRandomProductIndex(productsArray.length);
  // selectedProductArray.push(selectedProduct);

  while (selectedProductArray.length < arrayLength) {
    if (!selectedProductArray.includes(selectedProduct)) {
      selectedProductArray.push(selectedProduct);
    }
    else {
      selectedProduct = getRandomProductIndex(productsArray.length);
    }
  }
  console.log('selected products:', selectedProductArray);
}

function renderProduct() {
  productGenerator();
  var productOne = selectedProductArray[0];
  var productTwo = selectedProductArray[1];
  var productThree = selectedProductArray[2];

  productImgOneEl.src = productsArray[productOne].src;
  productImgOneEl.alt = productsArray[productOne].name;
  productsArray[productOne].views++;

  productImgTwoEl.src = productsArray[productTwo].src;
  productImgTwoEl.alt = productsArray[productTwo].name;
  productsArray[productTwo].views++;

  productImgThreeEl.src = productsArray[productThree].src;
  productImgThreeEl.alt = productsArray[productThree].name;
  productsArray[productThree].views++;

  // console.log(productOne, productTwo, productThree);

}


//executable code
new Product('bag', 'jpg');
new Product('banana', 'jpg');
new Product('bathroom', 'jpg');
new Product('boots', 'jpg');
new Product('breakfast', 'jpg');
new Product('bubblegum', 'jpg');
new Product('chair', 'jpg');
new Product('cthulhu', 'jpg');
new Product('dog-duck', 'jpg');
new Product('dragon', 'jpg');
new Product('pen', 'jpg');
new Product('pet-sweep', 'jpg');
new Product('scissors', 'jpg');
new Product('shark', 'jpg');
new Product('sweep', 'jpg');
new Product('tauntaun', 'jpg');
new Product('unicorn', 'jpg');
new Product('usb', 'jpg');
new Product('water-can', 'jpg');
new Product('wine-glass', 'jpg');



// console.log(getRandomProductIndex(products.length));

function renderResults() {
  for (var i = 0; i < productsArray.length; i++) {
    // create element
    var li = document.createElement('li');
    //provide content to element
    li.textContent = `${productsArray[i].name} had ${productsArray[i].votes} votes, and was seen ${productsArray[i].views} times.`;
    //append to DOM
    resultList.appendChild(li);
  }
}

renderProduct();

function handleClick(event) {

  var clickedProduct = event.target.alt;
  if (clickedProduct) {
    console.log('clicked:', clickedProduct);
    console.log(clicks);
    clicks++;


    for (var i = 0; i < productsArray.length; i++) {
      if (clickedProduct === productsArray[i].name) {
        productsArray[i].votes++;
      }
    }

    renderProduct();

    if (clicks === maxClicks) {

      myContainer.removeEventListener('click', handleClick);
      renderResults();
    }
  } else {
    alert('Please click on an image');
  }
}

//event listener

myContainer.addEventListener('click', handleClick);
