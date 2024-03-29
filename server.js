import { DatabasePostgres } from "./database-postgres.js";
import { fastify } from "fastify";
const server = fastify()
// const database = new DatabaseMemory()
const database = new DatabasePostgres()
server.get('/videos', async (request)=> {
    const search = request.query.search
    const videos = await database.list(search)
    return videos
})

server.post('/videos', async (request, response)=> {

    const {title, decription, duration} = request.body

    await database.create({
        title,
        decription,
        duration,
    })

    return response.status(201).send()
})

server.put('/videos/:id', async(request, response)=> {
    const {title, decription, duration} = request.body

    const videosID =  request.params.id
    await database.update(videosID,{
        title,
        decription,
        duration,
    })

    return response.status(204).send()
})

server.delete('/videos/:id', async(request, response)=> {
    
    const videosID =  request.params.id

    await database.delete(videosID)

    return response.status(204).send()
})


server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
})