'use strict';
const database = require('../db');
const db = require('../db/models');
const axios = require('axios')
const Coin = db.Coin;

let coinData = []
let icons = {
  ADC: "ADC",
  AEON: "AEON",
  AMP: "AMP",
  ANC: "ANC",
  ARCH: "ARCH",
  ARDR: "ARDR",
  AUR: "AUR",
  BANX: "BANX",
  BAT: "BAT",
  BAY: "BAY",
  BC: "BC",
  BCH: "BCC",
  BCN: "BCN",
  BFT: "BFT",
  BRK: "BRK",
  BRX: "BRX",
  BSD: "BSD",
  BTA: "BTA",
  BTC: "BTC",
  BCC: "BCC",
  BTCD: "BTCD",
  BTS: "BTS",
  CLAM: "CLAM",
  CLOAK: "CLOAK",
  DAO: "DAO",
  DASH: "DASH",
  DCR: "DCR",
  DCT: "DCT",
  DGB: "DGB",
  DGD: "DGD",
  DGX: "DGX",
  DMD: "DMD",
  DOGE: "DOGE",
  EMC: "EMC",
  EOS: "EOS",
  EOS: "EOS",
  ERC: "ERC",
  ETC: "ETC",
  ETH: "ETH",
  FC2: "FC2",
  FCT: "FCT",
  FLO: "FLO",
  FRK: "FRK",
  FTC: "FTC",
  GAME: "GAME",
  GDC: "GDC",
  GEMZ: "GEMZ",
  GLD: "GLD",
  GNO: "GNO",
  GNT: "GNT",
  GOLOS: "GOLOS",
  GRC: "GRC",
  GRS: "GRS",
  HEAT: "HEAT",
  ICN: "ICN",
  IFC: "IFC",
  INCNT: "INCNT",
  IOC: "IOC",
  IOT: "IOTA",
  JBS: "JBS",
  KMD: "KMD",
  KORE: "KORE",
  LBC: "LBC",
  LDOGE: "LDOGE",
  LSK: "LISK",
  LTC: "LTC",
  MAID: "MAID",
  MCO: "MCO",
  MINT: "MINT",
  MONA: "MONA",
  MRC: "MRC",
  MSC: "MSC",
  MTR: "MTR",
  MUE: "MUE",
  NEO: "NEO",
  NEOS: "NEOS",
  NEU: "NEU",
  NLG: "NLG",
  NMC: "NMC",
  NOTE: "NOTE",
  NVC: "NVC",
  NXT: "NXT",
  OK: "OK",
  OMG: "OMG",
  OMNI: "OMNI",
  OPAL: "OPAL",
  PART: "PART",
  PIGGY: "PIGGY",
  PINK: "PINK",
  PIVX: "PIVX",
  POT: "POT",
  PPC: "PPC",
  QRK: "QRK",
  RADS: "RADS",
  RBIES: "RBIES",
  RBT: "RBT",
  RBY: "RBY",
  RDD: "RDD",
  REP: "REP",
  RISE: "RISE",
  SAR: "SAR",
  SCOT: "SCOT",
  SDC: "SDC",
  SIA: "SIA",
  SJCX: "SJCX",
  SLG: "SLG",
  SLS: "SLS",
  SNRG: "SNRG",
  START: "START",
  STEEM: "STEEM",
  STR: "STR",
  STRAT: "STRAT",
  SWIFT: "SWIFT",
  SYNC: "SYNC",
  SYS: "SYS",
  TRIG: "TRIG",
  TX: "TX",
  UBQ: "UBQ",
  UNITY: "UNITY",
  USDT: "USDT",
  VIOR: "VIOR",
  VNL: "VNL",
  VPN: "VPN",
  VRC: "VRC",
  VTC: "VTC",
  WAVES: "WAVES",
  XAI: "XAI",
  XBS: "XBS",
  XCP: "XCP",
  XEM: "XEM",
  XMR: "XMR",
  XPM: "XPM",
  XRP: "XRP",
  XTZ: "XTZ",
  XVG: "XVG",
  YBC: "YBC",
  ZEC: "ZEC",
  ZEIT: "ZEIT"
}

axios.get('https://coincap.io/front')
.then(res => res.data)
.then(data => {
  for(var i=0; i<data.length;i++){
    let iconURL = (icons[data[i].short] !== undefined) ? `/icons/${icons[data[i].short]}.svg` : 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Antu_application-default-icon.svg/1024px-Antu_application-default-icon.svg.png'
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
