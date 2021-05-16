
import { fastify } from 'fastify'
import fastifyStatic from 'fastify-static'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = fastify()

async function startApp() {
	try {
    app.register(fastifyStatic, {
      root: path.join(__dirname, 'public')
    })
    app.get('/', {}, (request, reply) => {
      reply.send({
        data: 'Hello world!',
      })
    })
    await app.listen(4001)
    console.log('Server listening at port 4001')
	} catch (e) {
    console.error(e)
  }
}

startApp()