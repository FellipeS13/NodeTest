import { randomUUID } from "crypto"
import { db } from "./sql.js"

export class DatabasePostgres {
    async list(search) {
        let videos
        if (search) {
            videos = await db`select * from videos where title ilike ${'%'+ search + '%'}`
        } else{
            videos = await db`select * from videos`
        }
        return videos
    }

    async create(video){
        const videoId = randomUUID()
        const {title, decription, duration} = video

        await db`insert into videos (id, title, decription, duration) VALUES (${videoId}, ${title}, ${decription}, ${duration})`
    }
    async update(id, video){
        const {title, decription, duration} = video
        await db`update videos set title =${title}, decription = ${decription}, duration = ${duration} WHERE id = ${id}`

    }
    async delete(id){
        await db`delete from videos where id=${id}`
    }
}