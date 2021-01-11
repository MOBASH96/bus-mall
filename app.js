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

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////


function Product (imgName, images){
this.image=images;
this.name= imgName;
this.path= 'assets/'+images;
this.show=0;
this.clickCount=0; 
arrayOfProduct.push(this);

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
        console.log(objectIndicator);
        randomImgs();

      }
  
    } else {
      imgContainer.removeEventListener('click',countItem);
    }
    console.log(arrayOfProduct);
    
    
     
    
}



//////////////////////////////////////////////////////////////   
//////////////////////////////////////////////////////////////   
//////////////////////////////////////////////////////////////   

//////////////////////////////////////////////////////////////   
    
function getProduct(leftImage,middleImage,rightImage) {
    // console.log(leftImage, middleImage, rightImage);
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
                 var middleImage = Math.round(Math.random() * (arrayOfProduct.length - 1));
                 var rightImage = Math.round(Math.random() * (arrayOfProduct.length - 1));
    
        }
    
    
            while(leftImage===middleImage || leftImage===rightImage || middleImage===rightImage)
                
           
            getProduct(leftImage,middleImage,rightImage);
    
    }
    

function checkItem(objectIndicator) {
    for (var index = 0; index < arrayOfProduct.length; index++) {
      if (arrayOfProduct[index].path === objectIndicator) {
        arrayOfProduct[index].clickCount++;
        trialsleft--;
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