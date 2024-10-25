module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define("review", {
        ratings: {
            type: DataTypes.INTEGER,
        },
        description: {
            type: DataTypes.TEXT,
        },
    })

    return Review
}