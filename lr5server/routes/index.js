let express = require('express');
let router = express.Router();
let brokers = require("../public/json/brokers.json")
let stocks = require("../public/json/stocks.json")
let settings = require("../public/json/settings.json")
let fs = require("fs")
let path = require("path")

/* GET home page. */
router.get('/brokers', function(req, res, next) {
  res.json(brokers);
});

router.get('/stocks', function (req, res, next) {
  res.json(stocks);
});

router.get('/settings', function (req, res) {
  res.json(settings);
})

router.post('/settings/edit', function (req, res) {
  settings.startTime = req.body.startTime;
  settings.endTime = req.body.endTime;
  settings.interval = req.body.interval;
  fs.writeFile(path.join(__dirname, '..', 'public', 'json', 'settings.json'), JSON.stringify(settings), function (err) {
    if (err) throw err;
  })
  res.json(settings);
})

router.post('/stocks/edit', function (req, res) {
  let saved;
  for (let s of stocks) {
    if (s.id === req.body.id) {
      s.name = req.body.name;
      s.valueRule = req.body.valueRule;
      s.value = req.body.value;
      s.max = req.body.max;
      s.number = req.body.num;
      saved = s;
    }
  }
  fs.writeFile(path.join(__dirname, '..', 'public', 'json', 'stocks.json'), JSON.stringify(stocks), function (err) {
    if (err) throw err;
  })
  res.json(saved)
})

router.post('/brokers/edit', function (req, res) {
  if (req.body.balance >= 0) {
    for (let b of brokers) {
      if (b.id === req.body.id) {
        b.balance = req.body.balance;
      }
    }
    fs.writeFile(path.join(__dirname, '..', 'public', 'json', 'brokers.json'), JSON.stringify(brokers), function (err) {
      if (err) throw err;
    })
    res.json("ok");
  } else {
    res.json("err");
  }
})

router.post('/brokers/add', function (req, res) {
  let broker = {
    id: (brokers.length + 1).toString(),
    nickname: req.body.nick,
    name: req.body.name,
    surname: req.body.surname,
    balance: req.body.balance
  }
  if (broker.balance >= 0) {
    brokers.push(broker);
    fs.writeFile(path.join(__dirname, '..', 'public', 'json', 'brokers.json'), JSON.stringify(brokers), function (err) {
      if (err) throw err;
    })
    res.json(broker);
  } else {
    res.json("err");
  }
})

router.post('/stocks/add', function (req, res) {
  let stock = {
    id: (stocks.length + 1).toString(),
    name: req.body.name,
    valueRule: req.body.valueRule,
    value: req.body.value,
    max: req.body.max,
    number: req.body.num
  }
  stocks.push(stock);
  fs.writeFile(path.join(__dirname, '..', 'public', 'json', 'stocks.json'), JSON.stringify(stocks), function (err) {
    if (err) throw err;
  })
  res.json(stock);
})

router.delete('/brokers/:num', function (req, res) {
  let id = req.params.num;
  let i = 0;
  for (let b of brokers) {
    if (b.id === id) {
      brokers.splice(i, 1);
      break;
    }
    i++;
  }
  fs.writeFile(path.join(__dirname, '..', 'public', 'json', 'brokers.json'), JSON.stringify(brokers), function (err) {
    if (err) throw err;
  })
  res.json("ok");
})

router.delete('/stocks/:num', function (req, res) {
  let id = req.params.num;
  let i = 0;
  for (let s of stocks) {
    if (s.id === id) {
      stocks.splice(i, 1);
      break;
    }
    i++;
  }
  fs.writeFile(path.join(__dirname, '..', 'public', 'json', 'stocks.json'), JSON.stringify(stocks), function (err) {
    if (err) throw err;
  })
  res.json("ok");
})

module.exports = router;
