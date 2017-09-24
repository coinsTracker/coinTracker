'use strict';
const database = require('./server/db');
const db = require('./server/db/models');
const User = db.User;
const Transaction = db.Transaction;
const Coin = db.Coin;

//Create seed data
let data = {
  userData: [
    {name: 'Alex', isAdmin: true, password: '123', email: 'Alex@gmail.com'},
    {name: 'Ranjeet', isAdmin: true, password: '123', email: 'Ranjeet@gmail.com'},
    {name: 'Bojan', isAdmin: true, password: '123', email: 'Bojan@gmail.com'},
    {name: 'Kim', isAdmin: true, password: '123', email: 'kim@gmail.com'}
  ],
  // coinData: [
  //   { symbol: 'BTC', name: 'Bitcoin', icon: 'https://bitcoin.org/img/icons/opengraph.png', currentPrice: 3709.9474442048486, currentSupply:16579100, currentVolume: 1127060000, currentMarketCap:61507589672.216606 },
  //   { symbol: 'ETH', name: 'Ethereum', icon: 'https://bitcoin.org/img/icons/opengraph.png', currentPrice: 272.817, currentSupply:94750947, currentVolume: 394370000, currentMarketCap:25849669107.699 },
  // ],
  transactionData: [
    { purchaseQuantity: 10, purchasePrice: 4000.00, purchaseDate: '2017-09-19 23:43:20.759 +00:00', userId: 1, coinId: 1 },
    { purchaseQuantity: 10, purchasePrice: 250.00, purchaseDate: '2017-09-19 19:43:14.151-04', userId: 1, coinId: 2 },
    { purchaseQuantity: 12, purchasePrice: 500.00, purchaseDate: '2017-09-19 19:43:14.126-04', userId: 1, coinId: 3 },
    { purchaseQuantity: 5, purchasePrice: 4000.00, purchaseDate: '2017-09-19 19:43:14.126-04', userId: 1, coinId: 1 },
    { purchaseQuantity: 2, purchasePrice: 3700.00, purchaseDate: '2017-09-19 19:43:14.126-04', userId: 1, coinId: 1 },
    { purchaseQuantity: 500, purchasePrice: 0.17, purchaseDate: '2017-09-19 19:43:14.126-04', userId: 1, coinId: 4 },
    { purchaseQuantity: 20, purchasePrice: 347.00, purchaseDate: '2017-09-19 19:43:14.126-04', userId: 1, coinId: 5 },
    { purchaseQuantity: 40, purchasePrice: 280.00, purchaseDate: '2017-09-19 19:43:14.126-04', userId: 1, coinId: 5 },
    { purchaseQuantity: 10, purchasePrice: 4000.00, purchaseDate: '2017-09-19 23:43:20.759 +00:00', userId: 2, coinId: 1 },
    { purchaseQuantity: 10, purchasePrice: 250.00, purchaseDate: '2017-09-19 19:43:14.151-04', userId: 2, coinId: 2 },
    { purchaseQuantity: 12, purchasePrice: 500.00, purchaseDate: '2017-09-19 19:43:14.126-04', userId: 2, coinId: 3 },
    { purchaseQuantity: 5, purchasePrice: 4000.00, purchaseDate: '2017-09-19 19:43:14.126-04', userId: 2, coinId: 1 },
    { purchaseQuantity: 500, purchasePrice: 0.17, purchaseDate: '2017-09-19 19:43:14.126-04', userId: 2, coinId: 4 },
    { purchaseQuantity: 20, purchasePrice: 347.00, purchaseDate: '2017-09-19 19:43:14.126-04', userId: 2, coinId: 5 },
  ]
};


//Force sync the db, and then create the data in the two tables.
User.sync({force:true})
  // .then(() => Coin.sync({force: true}))
  .then(() => Transaction.sync({force: true}))
  .then(() => {
    console.log('Dropping data in the database, and re-seeding');
    return Promise.all(
      data['userData'].map((user)=>{
        return User.create(user);
      })
    );
  })
  // .then(()=>{
  //   return Promise.all(
  //     data['coinData'].map((coin)=>{
  //       return Coin.create(coin);
  //     })
  //   );
  // })
  .then(()=>{
    return Promise.all(
      data['transactionData'].map((transaction)=>{
        return Transaction.create(transaction);
      })
    );
  })
  .catch((err)=>console.error("There was totally a problem", err, err.stack))
  .finally(()=>{
    database.close();
    console.log('connection closed');
    return null;
  });
