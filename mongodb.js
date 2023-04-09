const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://fars_user:1chQSlWjjCLMHgOc@cluster0.skrc6yu.mongodb.net/";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB Atlas");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

function getDb(restaurant_name) {
    return client.db('sample_restaurants');
}

module.exports = { client, connect, getDb  };
