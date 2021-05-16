import mongo from 'mongodb'

const { MongoClient } = mongo

const url = process.env.MONGO_URL

export const client = new MongoClient(url, { useNewUrlParser: true })

export async function connectDb() {
	try {
    await client.connect()
    await client.db('admin').command({ ping: 1 })
    console.log('👋 connected to db success')
  } catch (e) {
    console.error(e)
    // if there is problem close connection to db
    await client.close()
  }
}
