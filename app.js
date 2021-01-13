'use strict'

var arrayOfProduct=[];
var trialsleft = 25;
var leftImg = document.getElementById('leftImg');
var middleImg = document.getElementById('middleImg');
var rightImg = document.getElementById('rightImg');
var leftImgText= document.getElementById('leftImgText')
var middleImgText=document.getElementById('middleImgText')
var rightImgeText=document.getElementById('rightImgeText')
var imgContainer= document.getElementById('imgContainer');
var view=document.getElementById('viewRuslt');
var productChart=document.getElementById('productChart').getContext('2d');
var clearDataBtn = document.getElementById('clearLocalStorage');
var showDataBtn = document.getElementById('showDataBtn');
var shownImages = []; 
var  preventTwoic=[];
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////


function Product (imgName, images){
this.image=images;
this.name= imgName;
this.path= 'assets/'+images;
this.show=0;
this.clickCount=0; 
arrayOfProduct.push(this);
///////////////////////////////////////// nothing inside of it 
}


function productStorage(){
  localStorage.setItem('product',JSON.stringify(arrayOfProduct));
}

function checkAndRestore() {
    
  if (localStorage.length > 0 ) { // check if the local storage has any values in it
      arrayOfProduct = JSON.parse(localStorage.getItem('product')); // restore the data from the local storage
      // renderChart();
  }
} 
function clearLocalStorage(){

  localStorage.clear();

  arrayOfProduct = [];
  alert("you remove the data, try another round ")
  location.reload();
}
function showData(){
  renderChart();
}
//CREAT AN OBJECT FOR EACH ITEM OF LIST 
new Product('pag','bag.jpg');
new Product('banana','banana.jpg');
new Product('bathroom','bathroom.jpg');
new Product('boots','boots.jpg');
new Product('breakfast','breakfast.jpg');
new Product('bubblegum','bubblegum.jpg');
new Product('chair','chair.jpg');
new Product('cthulhu','cthulhu.jpg');
new Product('dog-duck','dog-duck.jpg');
new Product('dragon','dragon.jpg');
new Product('pen','pen.jpg');
new Product('pet-sweep','pet-sweep.jpg');
new Product('scissors','scissors.jpg');
new Product('shark','shark.jpg');
new Product('sweep','sweep.png');
new Product('tauntaun','tauntaun.jpg');
new Product('unicorn','unicorn.jpg');
new Product('usb','usb.gif');
new Product('water-can','water-can.jpg');
new Product('wine-glass','wine-glass.jpg');

///////////////////////////////////////////////////////////////////////////////////

imgContainer.addEventListener('click',countItem);




function countItem(event){

    var targetId = event.target.id;
   
    if (trialsleft !== 0) { 
      
      if (targetId === 'leftImg' || targetId === 'middleImg' || targetId === 'rightImg') { 
        var objectIndicator = event.target.getAttribute('src');
        checkItem(objectIndicator);
        // console.log(objectIndicator);
        randomImgs();

      }
  
    } else {
      imgContainer.removeEventListener('click',countItem);
      alert('Good job, the vote is over, now you can see the results ')
      
      
      
    }
    // console.log(arrayOfProduct);
      
    
}


//////////////////////////////////////////////////////////////   
//////////////////////////////////////////////////////////////   
//////////////////////////////////////////////////////////////   

//////////////////////////////////////////////////////////////   
    
function getProduct(leftImage,middleImage,rightImage) {

   
    leftImg.setAttribute('src', arrayOfProduct[leftImage].path);
    middleImg.setAttribute('src', arrayOfProduct[middleImage].path);
    rightImg.setAttribute('src', arrayOfProduct[rightImage].path);
  
    leftImgText.textContent = arrayOfProduct[leftImage].name;
    middleImgText.textContent = arrayOfProduct[middleImage].name;
    rightImgeText.textContent = arrayOfProduct[rightImage].name;

    arrayOfProduct[leftImage].show++;
    arrayOfProduct[rightImage].show++;
    arrayOfProduct[middleImage] .show++;
}


////////////////////////////////////
///////////////////////////////////


    function randomImgs(){ //to chose randomly without samilize
        do {
            var leftImage = Math.round(Math.random() * (arrayOfProduct.length - 1));
            var leftProductImageName = arrayOfProduct[leftImage].name;    
          } while (checkAvailability(leftProductImageName) ||  checkAvailability2(leftProductImageName) );
          
          do {
            var middleImage = Math.round(Math.random() * (arrayOfProduct.length - 1));
            var middleProductImageName = arrayOfProduct[middleImage].name;    
          } while (leftImage === middleImage || leftImage ===  rightImage  || rightImage === middleImage  ||checkAvailability(middleProductImageName) ||  checkAvailability2(middleProductImageName) );
        
          do {
            var rightImage = Math.round(Math.random() * (arrayOfProduct.length - 1));
            var rightProductmageName = arrayOfProduct[rightImage].name;    
          } while (leftImage === middleImage || leftImage ===  rightImage  || rightImage === middleImage ||checkAvailability(rightProductmageName) || checkAvailability2(rightProductmageName));
          
          

          
          shownImages = [];
            
              shownImages.push(
                arrayOfProduct[leftImage],
                arrayOfProduct[middleImage],
                arrayOfProduct[rightImage]
              )

            preventTwoic=[];

            preventTwoic.push(
                arrayOfProduct[leftImage],
                arrayOfProduct[middleImage],
                arrayOfProduct[rightImage]
            )

               
        getProduct(leftImage,middleImage,rightImage);
        
            
    }
    
    

function checkItem(objectIndicator) {
    for (var index = 0; index < arrayOfProduct.length; index++) {
      if (arrayOfProduct[index].path === objectIndicator) {
        arrayOfProduct[index].clickCount++;
        trialsleft--;
        productStorage();

      }     

    }
}
function viewRuslt(){
    for(var i=0;i<arrayOfProduct.length;i++){
        var myNewListItem = document.createElement('li');
        myNewListItem.textContent = arrayOfProduct[i].name+" "+"had" +arrayOfProduct[i].clickCount+" votes, and was seen"+arrayOfProduct[i].show+" times.";
        document.getElementById("viewRuslt").appendChild(myNewListItem);

    }
}      


function renderChart() {

    var arrayOfProductNames = [];
    var arrayOfProductCount = [];
    var arrayOfProductsShown = [];
  
  
    for (var index = 0; index < arrayOfProduct.length; index++) {
        arrayOfProductNames.push(arrayOfProduct[index].name);
        arrayOfProductCount.push(arrayOfProduct[index].clickCount);
        arrayOfProductsShown.push(arrayOfProduct[index].show);
      
    }

    var myChart = new Chart(productChart, {
        type: 'bar',
        data: {
          labels: arrayOfProductNames , // array of labels (names of the product )
          datasets: [
            {
            label: '# of item Clicks',
            data: arrayOfProductCount, // array of values (count for each goat when it was clicked)
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 159, 64, 0.2)'


            ],
            borderColor: [
              'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderWidth: 2
          },
          {
            label: 'Time shown for theis item',
            data: arrayOfProductsShown, // array of values (count for each item when it was clicked)
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    }
    

    function checkAvailability (selectedProductName) {
    
        for (var index = 0; index < shownImages.length; index++) {
          if (shownImages[index].name === selectedProductName) {
            return true;
          }
        }
        return false;  
      }




      function checkAvailability2 (selectedProductName) {
    
        for (var index = 0; index < preventTwoic.length; index++) {
          if (preventTwoic[index].name === selectedProductName) {
            return true;
          }
        }
        return false;  
      }
      
      checkAndRestore(); 

      clearDataBtn.addEventListener('click', clearLocalStorage);
      showDataBtn.addEventListener('click', showData);