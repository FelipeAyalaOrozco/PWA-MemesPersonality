
var url = 'https://api.imgflip.com/get_memes'
let cache = []

function getDataFromNetwork(url) {
  var req = new Request(url)
  var rand = Math.floor(Math.random() * 100)

  fetch(url)
    .then(Response => Response.json())
    .then(data => {
      cache = data
      let element = document.getElementById('element')
      element.innerHTML = `
      <style>
      .imagen{
      height: 570px;
      vertical-align: middle;}
      @media screen and (max-width: 600px) {
        .imagen{
          height: 200px; 
          max-width: 100%;
        }
      } 
    </style>
      <h5 class="card-title">${data.data.memes[rand].name}</h5>
      
      <div>
      <img class="imagen" src=${data.data.memes[rand].url} alt=""  /></div>
      <div>
      <button type="button" onClick="window.location.reload();" class="btn btn-outline-secondary m-5 btn-lg">Try again</button></div>    
       `

    })
    .catch(err => console.log(err))
}


function getDataFromCache() {
  if (!('caches' in window)) {
    return null;
  }

  return caches.match(url)
    .then((response) => {
      if (response) {
        console.log(response)
        return response.json();
      }
      return null;
    })
    .catch((err) => {
      console.error('Error getting data from cache', err);
      return null;
    });
}

getDataFromCache()
getDataFromNetwork(url)
