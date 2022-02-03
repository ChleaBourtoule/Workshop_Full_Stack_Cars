const connection = require("../db-config");
const Joi = require("joi");

const db = connection.promise();

const findCars = ({ filters: { plate, brand, model } }) => {
  let sql = `SELECT c.id_car, c.plate, DATE_FORMAT(c.date, '%d/%m/%Y') AS date, c.id_model, m.name AS model, m.id_brand, b.name AS brand FROM car c INNER JOIN model m ON m.id_model = c.id_model INNER JOIN brand b ON b.id_brand = m.id_brand`;
  const sqlValues = [];

  if (plate) {
    sql += " WHERE c.plate = ?";
    sqlValues.push(plate);
  }
  if (brand) {
    if (plate) sql += " AND b.name = ?";
    else sql += " WHERE b.name = ?";

    sqlValues.push(brand);
  }
  if (model) {
    if (plate || brand) sql += " AND m.name = ?";
    else sql += " WHERE m.name = ?";

    sqlValues.push(model);
  }

  return db.query(sql, sqlValues).then(([results]) => results);
};

const findBrand = () => {
  let sql = `SELECT * FROM brand`;
  return db.query(sql).then(([results]) => results);
};

const findModel = ({ filters: { brand } }) => {
  let sql = `SELECT model.name FROM model INNER JOIN brand ON model.id_brand = brand.id_brand`;
  const sqlValues = [];

  if (brand) {
    sql += ` WHERE brand.name = ?`;

    sqlValues.push(brand);
  }

  return db.query(sql, sqlValues).then(([results]) => results);
};

module.exports = {
  findCars,
  findBrand,
  findModel,
};
