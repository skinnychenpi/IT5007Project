// GraphQL and Express config:
const fs = require('fs');
const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

// MongoDB config:
let db;
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017/shopallSneaker';
const client = new MongoClient(url, { useNewUrlParser: true });
let collection;

// Other config:
let aboutMessage = "Shopall Sneaker API v1.0";

// Mongo:
async function connectToDb() {
  await client.connect();
  console.log('Connected to MongoDB at', url);
  db = client.db();
  collection = db.collection('guest');
}

// ShopAll API:
const shopAllAPI = require('./controller/controller.js');



// GraphQL
const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'A Date() type in GraphQL as a scalar',
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    const dateValue = new Date(value);
    return isNaN(dateValue) ? undefined : dateValue;
  },
  parseLiteral(ast) {
    if (ast.kind == Kind.STRING) {
      const value = new Date(ast.value);
      return isNaN(value) ? undefined : value;
    }
  },
});

const resolvers = {
  Query: {
    about: () => aboutMessage,
    searchProduct,
    getProductDetail,
    getMostPopular,
  },
  Mutation: {
    setAboutMessage,
  },
  GraphQLDate,
};

function setAboutMessage(_, { message }) {
  return aboutMessage = message;
}


// function objToDictOnSearch(obj) {
//   var keys = Object.keys(obj);
//   var dict = {};
//   for (var i = 0; i < keys.length; i++) {
//       var key = keys[i];
//       if (key == "imageLinks" || key == "resellLinks" || key == "size" || key == "lowestResellPrice" || key == "resellPrices") {
//         continue;
//       }
//       dict[key] = obj[key];
//   }
//   return dict;
// }

async function searchProduct(_, {message, count}) {
  return await shopAllAPI.searchProduct(message, count);
}

async function getProductDetail(_, {styleID, urlKey}) {
  var sneakerDetail = await shopAllAPI.getProductDetail(styleID, urlKey);
  return sneakerDetail;
}

async function getMostPopular(_, {count}) {
  return await shopAllAPI.getMostPopular(count);
}

// async function guestList() {
//   const guests = await collection.find({}).toArray();
//   guestNum = guests.length;
//   return guests;
// }

// function freeSeats() {
//   return limit - guestNum;
// }

// function isNumber(value) {
//     var patrn = /^[0-9]*$/;
//     if (patrn.exec(value) == null || value == "") {
//         return false;
//    } else {
//         return true;
//    }
// }

// function guestAddValidate(guest) {
//   const errors = [];
//   if (guest.name.length == 0) {
//     errors.push('Name of the guest can not be empty.');
//   }
//   if (!isNumber(guest.phNum)) {
//     errors.push('Phone number of the guest is not valid.');
//   }
//   if (guestNum == limit) {
//     errors.push('The waiting list is already full.');
//   }
//   if (errors.length > 0) {
//     throw new UserInputError('Invalid input(s)', { errors });
//   }
// }

// function guestDeleteValidate(size) {
//   const errors = [];
//   if (size == 0) {
//     errors.push('The waiting list is empty.');
//   }
//   if (errors.length > 0) {
//     throw new UserInputError('Invalid input(s)', { errors });
//   }
// }

// async function guestAdd(_, { guest }) {
//   guestAddValidate(guest);
//   guest.time = new Date();
//   guest.serial = guestNum + 1;
//   const result = await collection.insertOne(guest);
//   const savedGuest = await collection.findOne({ _id: result.insertedId });
//   return savedGuest;
// }

// async function guestDelete() {
//     guestDeleteValidate(guestNum);
//     const Deletedguest = await collection.findOne({serial: 1});
//     result = await collection.deleteOne({serial: 1});
//     console.log('Result of delete:\n', result.result);
    
//     result = await collection.updateMany({}, {$inc : {serial: -1}});
//     console.log('Result of decrementing serial:\n', result.result);
//     return Deletedguest;
// }

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./schema.graphql', 'utf-8'),
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
});


// Server

async function main() {
  console.log("\n--- Express Server Starts --- ")
  await connectToDb();
  
  const app = express();

  app.use(express.static('public'));

  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(3000, function () {
    console.log('\n--- Express server started on port 3000 ---');
  });

}

main();
