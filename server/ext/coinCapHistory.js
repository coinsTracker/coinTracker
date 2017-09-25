'use strict';
const database = require('../db');
const db = require('../db/models');
const axios = require('axios')
const CoinHistory = db.CoinHistory;
const Coin = db.Coin;



// Array that defines the user selected coins to fetch history for
// let coinsToFetch = ['BTC','ETH','BCH','XRP','DASH','LTC','XEM','IOT','XMR','ETC']
let coinsToFetch = ['BTC']


//Array where ALL coin history is stored while being fetched
let coinHistoryData = []

// Don't mess with these - this is the store of all promises of Axios requests
let promisesExternal = []
let promisesLocal = []
let coinsToFetchWithId = {}


for (let i=0; i<coinsToFetch.length; i++){
  promisesLocal.push(
    Coin.findOne({
      where:{ symbol: coinsToFetch[i]}
    })
    .then(res => res.dataValues)
    .then(coin => {
      coinsToFetchWithId[coin.symbol] = coin.id
    })
  )
}

// NOTE = THERE IS AN ISSUE WITH THE BELOW PROMISE CHAIN
// THE LAST ITEM IN THE ABOVE LIST IS THE OBNLY ONE THAT GETS ASSIGNED
// TO THE ID for the coins
Promise.all(promisesLocal)
.then(()=>{
  console.log(coinsToFetchWithId)
})
.then(()=>{
  for(let j=0; j<coinsToFetch.length; j++) {
    var coinName = coinsToFetch[j]
    promisesExternal.push(
      axios.get(`http://coincap.io/history/${coinName}`)
      .then(res => res.data)
      .then(data => {
        console.log('Coin Name: ', coinName)
        console.log('Coins to Fetch with Id: ', coinsToFetchWithId[coinName])
        for(let i=0; i<=data["market_cap"].length-1;i++){
          coinHistoryData.push({
            symbol: coinName,
            time: data["market_cap"][i][0],
            price: data["price"][i][1],
            volume: data["volume"][i][1],
            marketCap: data["market_cap"][i][1],
            coinId: +coinsToFetchWithId[coinName]
          })
        }
      })
    )
  }
})
.then(()=>{
  console.log(promisesExternal)
  axios.all(promisesExternal)
  .then(() => {
      CoinHistory.sync({force:true})
      .then(()=>{
        return Promise.all(
          coinHistoryData.map((coinHistoryTx)=>{
            return CoinHistory.create(coinHistoryTx);
          }))
      })
      .catch((err)=>console.error(`There was totally a problem with this coin fetch/save: ${coinName}`, err, err.stack))
      .finally(()=>{
        database.close();
        console.log('connection closed');
        return null;
      })
  })
})
.catch(err => console.log(err))
