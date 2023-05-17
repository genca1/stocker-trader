const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const users = [
  { fullname: 'ahmet',  email: 'ahmet@ahmet.com',   username: "ahmet1",  balance: 10000 },
  { fullname: 'mehmet', email: 'mehmet@mehmet.com', username: "mehmet2", balance: 10000 },
  { fullname: 'veli',   email: 'veli@veli.com',     username: "veli3",   balance: 10000 },
  { fullname: 'ali',    email: 'ali@ali.com',       username: "ali4",    balance: 10000 },
  { fullname: 'murat',  email: 'murat@murat.com',   username: "murat5",  balance: 10000 }]

const portfolios = [
  { fullname: 'ahmetportfolio',  ownerId: 1 },
  { fullname: 'mehmetportfolio', ownerId: 1 },
  { fullname: 'veliportfolio',   ownerId: 1 },
  { fullname: 'aliportfolio',    ownerId: 1 },
  { fullname: 'muratportfolio',  ownerId: 1 }]
  
const stocks = [
  { fullname: 'Advanced Micro Devices Inc',      symbol: 'AMD', share: 10000, price: 101.48, portfolioId: 1 },
  { fullname: 'Exxon Mobil Corp',                symbol: 'XOM', share: 10000, price: 102.52, portfolioId: 1 },
  { fullname: 'Walt Disney Company',             symbol: 'DIS', share: 10000, price: 90.98,  portfolioId: 1 },
  { fullname: 'UnitedHealth Group Incorporated', symbol: 'UNH', share: 10000, price: 479.72, portfolioId: 2 },
  { fullname: 'Pfizer Inc',                      symbol: 'PFE', share: 10000, price: 37.01,  portfolioId: 2 }]

const markets = [
  { fullname: 'Advanced Micro Devices Inc',      symbol: 'AMD', share: 10000, price: 101.48 },
  { fullname: 'Exxon Mobil Corp',                symbol: 'XOM', share: 10000, price: 102.52 },
  { fullname: 'Walt Disney Company',             symbol: 'DIS', share: 10000, price: 90.98  },
  { fullname: 'UnitedHealth Group Incorporated', symbol: 'UNH', share: 10000, price: 479.72 },
  { fullname: 'Pfizer Inc',                      symbol: 'PFE', share: 10000, price: 37.01  },
  { fullname: 'Bank of America Corp',            symbol: 'BAC', share: 10000, price: 27.36  },
  { fullname: 'Target Corporation',              symbol: 'TGT', share: 10000, price: 156.91 },
  { fullname: 'Salesforce Inc',                  symbol: 'CRM', share: 10000, price: 204.56 },
  { fullname: 'Nike Inc',                        symbol: 'NKE', share: 10000, price: 116.48 },
  { fullname: 'Wells Fargo & Company',           symbol: 'WFC', share: 10000, price: 38.39  }]

  const orders = [
    { orderType: 'BUY',  stock:'AMD', amount:10, priceByShare:101.48, totalPrice: 1014.8, ownerId:1},
    { orderType: 'BUY',  stock:'AMD', amount:10, priceByShare:101.48, totalPrice: 1014.8, ownerId:1},
    { orderType: 'BUY',  stock:'XOM', amount:10, priceByShare:102.52, totalPrice: 102.52, ownerId:1},
    { orderType: 'BUY',  stock:'XOM', amount:10, priceByShare:102.52, totalPrice: 1025.2, ownerId:1},
    { orderType: 'BUY',  stock:'BAC', amount:10, priceByShare:27.36,  totalPrice: 273.6,  ownerId:1},
    { orderType: 'BUY',  stock:'BAC', amount:10, priceByShare:27.36,  totalPrice: 273.6,  ownerId:1},
    { orderType: 'BUY',  stock:'NKE', amount:10, priceByShare:116.48, totalPrice: 1164.8, ownerId:1},
    { orderType: 'BUY',  stock:'NKE', amount:10, priceByShare:116.48, totalPrice: 1164.8, ownerId:1},
    { orderType: 'BUY',  stock:'WFC', amount:10, priceByShare:10.48,  totalPrice: 104.8,  ownerId:1},
    { orderType: 'SELL', stock:'WFC', amount:10, priceByShare:10.48,  totalPrice: 104.8,  ownerId:1},
    { orderType: 'SELL', stock:'WFC', amount:10, priceByShare:10.48,  totalPrice: 104.8,  ownerId:1},
    { orderType: 'SELL', stock:'WFC', amount:10, priceByShare:10.48,  totalPrice: 104.8,  ownerId:1}]  

const db = require("./src/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
    seedDatabase();
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


async function seedDatabase() {
  try {
      await db.sequelize.authenticate();
      await db.sequelize.sync({ force: true });

      await db.user.bulkCreate(users);
      await db.portfolio.bulkCreate(portfolios);
      await db.stock.bulkCreate(stocks);
      await db.market.bulkCreate(markets);
      await db.order.bulkCreate(orders);

      console.log("Everything setup!");
  } catch(e) {
      console.log(`Error in seeding database with fields: ${e}`);
  }
}


app.use(express.urlencoded({ extended: true }));

require("./src/routers/user.router")(app);
require("./src/routers/stock.router")(app);
require("./src/routers/portfolio.router")(app);
require("./src/routers/market.router")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});