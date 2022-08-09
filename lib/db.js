import MongoClient from "mongodb/lib/mongo_client";

async function ConnectDatabase() {
  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.su40zpo.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`
  
    const client = await MongoClient.connect(connectionString)
  return client
}

export default ConnectDatabase