# coinTracker
A tool to create and track the performance of a crypto currency portfolio

The market data feed is sourced via CoinCap.io, at a frequency determined by the CRON job in the backend. This feed gets all current prices for all coins. Additionally, history data is sourced for the top 10 coins for all time, and updated via a cron job infrequently.

The application leverages the following technology stack:
- Postgres database
- Sequelize (backend database interaction)
- Express (for routing from the server)
- React for MVC component rendering
- Redux for managing the state
- D3 Graphs for visual graphs
- AXIOS, and Promises for async operations (API Load, Database access etc)

![alt text](http://sodhi.org/images/COINTRACKER.gif)

## Home Page
![alt text](http://www.sodhi.org/images/AllCoins.png)
![alt text](http://www.sodhi.org/images/AllCoins2.png)

## User Portfolio Page
![alt text](http://www.sodhi.org/images/UserDashboard.png)

## User All Transactions Page
![alt text](http://www.sodhi.org/images/AllUserTransactions.png)

## Add new Transactions
![alt text](http://www.sodhi.org/images/AddTransaction.png)

