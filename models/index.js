const dbConfig = require("../config/dbConfig.js");

const { Sequelize, DataTypes } = require("sequelize")

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        logging: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        }
    }
)

sequelize.authenticate()
    .then(() => {
        console.log("DB Connected.")
    })
    .catch((error) => {
        console.log(error)
    })

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.products = require("./productModel.js")(sequelize, DataTypes);
db.reviews = require("./reviewModel.js")(sequelize, DataTypes);

db.sequelize.sync({ force: false })
    .then(() => {
        console.log("Yes re-sync done.")
    });

// 1 to many relationships
db.products.hasMany(db.reviews, {
    foreignKey: 'product_id',
    as: 'reviews',
});

db.reviews.belongsTo(db.products, {
    foreignKey: 'product_id',
    as: 'product',
});
module.exports = db;