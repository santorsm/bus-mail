'use strict';
//global variables
var productsArray = [];
var selectedProductArray = [];
var arrayLength = 3;
var arrayLengthMultiplier = 2;
var maxClicks = 25;
var clicks = 0;
var votesArray = [];
var viewsArray = [];
var namesArray = [];

var myContainer = document.getElementById('container');
var productImgOneEl = document.getElementById('image-one');
var productImgTwoEl = document.getElementById('image-two');
var productImgThreeEl = document.getElementById('image-three');
var resultList = document.getElementById('list');
var ctx = document.getElementById('chart').getContext('2d');

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
  var selectedProduct = getRandomProductIndex(productsArray.length);
  //skipped on first go, then removes elements from the front of the array until 3 remain
  while (selectedProductArray.length > arrayLength) {
    selectedProductArray.shift(selectedProduct);
  }
  //replaces elements from the end of the array only if the array does not contain this most recently selected item
  //until array reaches a length of 6 inthis instance
  while (selectedProductArray.length < (arrayLength * arrayLengthMultiplier)) {
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
}

//local storage - check for stored data and, if it exists, grab it

var retrievedProducts = localStorage.getItem('productResults');

//use data if available
if (retrievedProducts) {
  var parsedretrievedProducts = JSON.parse(retrievedProducts);
  console.log(parsedretrievedProducts);

  productsArray = parsedretrievedProducts;

} else {
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
}

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

function buttonFunction() {
  var x = document.getElementById('list');
  if (x.style.display === 'none') {
    x.style.display = 'block';
  } else {
    x.style.display = 'none';
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
      makeMyChart();
      buttonFunction();
      renderResults();
      var stringifiedResults = JSON.stringify(productsArray);
      console.log(stringifiedResults);
      localStorage.setItem('productResults', stringifiedResults);
    }
  } else {
    alert('Please click on an image');
  }
}

function chartData() {
  for (var i = 0; i < productsArray.length; i++) {
    votesArray.push(productsArray[i].votes);
    viewsArray.push(productsArray[i].views);
    namesArray.push(productsArray[i].name);
  }
}

function makeMyChart() {
  chartData();
  var chartObject = {
    type: 'bar',
    data: {
      labels: namesArray,
      datasets: [{
        label: '# of Votes',
        data: votesArray,
        backgroundColor:
          'rgba(63, 104, 191, 0.4)',
        borderColor:
          'rgba(63, 104, 191, 0.4)',
        borderWidth: 1
      },
      {
        label: '# of views',
        data: viewsArray,
        backgroundColor:
          'rgba(63, 104, 191, 1)',
        borderColor:
          'rgba(63, 104, 191, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        position: 'top',
        text: 'Product Vote & View Totals',
        fontSize: 32,
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }],
        xAxes: [{
          ticks: {
            fontSize: 18,
          }
        }],
      }
    }
  };
  var myChart = new Chart(ctx, chartObject);  // eslint-disable-line
}
//event listener
myContainer.addEventListener('click', handleClick);
