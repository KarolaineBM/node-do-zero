// import { createServer } from 'node:http'

// // request --> Obter dados do usuário // response --> Objeto utilizado para responder quem está chamando a API
// const server = createServer((request, response) =>{
//     response.write('Hello Karol')

//     return response.end()
// })

// server.listen(3333)

// CRUD --> (Creat, Read, Update, Delete)
// GET, POST, PUT, DELETE, PATCH (Alterar um único item de um recurso)

import { fastify} from 'fastify'
//import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const server  = fastify()

//const database = new DatabaseMemory()
const database = new DatabasePostgres()

server.post('/videos', async (request, reply) => {
const {titulo, descricao, duracao} = request.body


await database.create({
    titulo: titulo,
    descricao: descricao,
    duracao: duracao
})

    console.log(database.list())

    return reply.status(201).send()
})

server.get('/videos', async (request)=>{
const search = request.query.search

    const videos = await database.list(search)

    return videos
})

server.put('/videos/:id', async (request, reply)=>{
const videoId = request.params.id
const {titulo, descricao, duracao} = request.body


await database.update(videoId, {
    titulo: titulo,
    descricao: descricao,
    duracao: duracao})


return reply.status(204).send()

})

server.delete('/videos/:id', async (request, reply)=>{
const videoId = request.params.id

 await database.delete(videoId)


return reply.status(204).send()
})

server.listen({
    port: process.env.PORT ?? 3333,
})