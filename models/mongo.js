const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://user:user@cluster0.kahg8il.mongodb.net/ShopDB', {
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

const newSchema = new mongoose.Schema({
    name:{
        type: String,
        requierd: true
    }
})

const show=mongoose.model("users",newSchema)

module.exports=show