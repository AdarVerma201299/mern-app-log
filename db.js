const mongoose = require('mongoose');
const mongoUrL = 'mongodb+srv://user:user@cluster0.kahg8il.mongodb.net/ShopDB';


const MongoDB = async () => {
    try {
        await mongoose.connect(mongoUrL);
        console.log('Connected to MongoDB');
        const Food = mongoose.connection.db.collection("food");
        const data = await Food.find({}).toArray();
        global.food_item=data;
        const FoodCategory = mongoose.connection.db.collection("foodcategary");
        const catData = await FoodCategory.find({}).toArray();
        global.food_cat=catData;
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}
module.exports = MongoDB;
