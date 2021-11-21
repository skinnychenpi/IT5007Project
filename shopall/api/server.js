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

  app.listen(5000, function () {
    console.log('\n--- Express server started on port 5000 ---');
  });

}

main();
