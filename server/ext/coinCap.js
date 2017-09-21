'use strict';
const database = require('../db');
const db = require('../db/models');
const axios = require('axios')
const Coin = db.Coin;

let coinData = []

axios.get('https://coincap.io/front')
.then(res => res.data)
.then(data => {
  for(var i=0; i<data.length;i++){
    let iconURL = (data[i].short) ? `/public/icons/${data[i].short}.svg` : 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Antu_application-default-icon.svg/1024px-Antu_application-default-icon.svg.png'
    coinData.push({
      symbol: data[i].short,
      name: data[i].long,
      icon: iconURL,
      currentPrice: data[i].price,
      currentSupply: data[i].supply,
      currentVolume: data[i].volume,
      currentMarketCap: data[i].mktcap
    })
  }
})
.then(() => {
  Coin.sync({force:true})
  .then(()=>{
    return Promise.all(
      coinData.map((coin)=>{
        return Coin.create(coin);
      })
    );
  })
  .catch((err)=>console.error("There was totally a problem", err, err.stack))
  .finally(()=>{
    database.close();
    console.log('connection closed');
    return null;
  });
})
.catch(err => console.log(err))
