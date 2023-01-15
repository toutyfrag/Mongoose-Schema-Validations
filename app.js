//Collection is the equivalent of a table
//Document is the equivalent of a row


const express = require('express');
const app = express();
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB');//If it doesn't Exist it will create it 
  //Mongoose Schema
  const fruitSchema = new mongoose.Schema ({
    name: {
      type :String,
      required: [true, "Values not matching fruitSchema Structure Please enter a Value for Name"]
    },
    rating: {
      type: Number,
      min: 1,
      max: 10
    },
    review: String
  });

  const peopleSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Values not matching peopleSchema Structure please enter a value for Name"]
    },
    Age: {
      type: Number,
      min: 0,
      Max: 130,
      required: [true, "Values not matching peopleSchema Structure Please enter a Value for Age"]
    },
    favouriteFruit: fruitSchema 
  });
  
  const Fruit = mongoose.model("Fruit", fruitSchema);// Will ad an s to the collections name using godash
   // Fruit collection, the stucture of the object is defined in the Schema, 
   const fruits = new Fruit({
    name: "Apples",
    rating: 10,
    review: "I like apples"
   });

   const pineapple = new Fruit({
    name: "pineapple",
    rating: 10,
    review: "This is my favourite fruit :)"
   })
   // Save collection to Db
   pineapple.save();
   
   const People = mongoose.model("people", peopleSchema);

   const people = new People({
    name: "Amy",
    Age: 35,
    favouriteFruit: pineapple
   })


   // Save collection to Database 
   people.save();

}

