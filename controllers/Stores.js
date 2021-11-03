const { sign, verify } = require("jsonwebtoken");
const db = require("../models");

exports.getAllStores = (req, res) => {
  db.Stores.findAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.json(err)
    })
}

exports.getAllProducts = async (req, res) => {
  const uJwtToken = req.header("uJwtToken");

  const decodedJwt = await verify(uJwtToken, process.env.JWT_SECRET);
  if (!decodedJwt) return res.json(decodedJwt);

  db.Stores.findOne({
    where: { UserId: decodedJwt.id },
    include: [db.Products],
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.updateStoreDetails =  async (req, res) => {
  console.log(req.body)

  const uJwtToken = req.header("uJwtToken");

  const decodedJwt = await verify(uJwtToken, process.env.JWT_SECRET);
  if (!decodedJwt) return res.json(decodedJwt);

  db.Stores.update(
    {
      ...req.body
    },
    { where: { UserId: decodedJwt.id } }
  )
  .then(response => {
    res.status(200).json("Updated!")
  })
  .catch(err => {
    res.json(err)
  })
}

