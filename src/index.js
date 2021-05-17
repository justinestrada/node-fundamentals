import './env.js' // loads and run files immediately
import { fastify } from 'fastify'
import fastifyStatic from 'fastify-static'
import path from 'path'
import { fileURLToPath } from 'url'
import { connectDb } from './db.js'
import { registerUser } from './accounts/register.js'

// ESM specific features
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = fastify()

console.log('👋', process.env.MONGO_URL)

async function startApp() {
	try {
    app.register(fastifyStatic, {
      root: path.join(__dirname, 'public')
    })
    app.post('/api/register', {}, async (request, reply) => {
      // console.log('request', request)
      try {
        await registerUser(request.body.email, request.body.password)
      } catch (e) {
        console.error(e)
      }
    })
    // app.get('/', {}, (request, reply) => {
    //   reply.send({
    //     data: 'Hello world!',
    //   })
    // })
    await app.listen(4001)
    console.log('👋 Server listening at port 4001')
	} catch (e) {
    console.error(e)
  }
}

connectDb().then(() => {
  startApp()  
})
