import { randomUUID } from 'node:crypto';

export class DatabaseMemory {

    #videos = new Map();

    list(search) {
        return Array.from(this.#videos.entries())
        .map((videoArray)=>{
            const id = videoArray[0];
            const data = videoArray[1];
            return { id, ...data };
        }).filter((video) => {
            if (!search) {
                return true;
            }
            return video.title.toLowerCase().includes(search.toLowerCase()) ||
                   video.description.toLowerCase().includes(search.toLowerCase());
        }
        );
    }

    create(video) {
        const videoId = randomUUID();

        this.#videos.set(videoId,video);
    }

    update(id, video) {
        if (this.#videos.has(id)) {
            this.#videos.set(id, video);
        } else {
            throw new Error(`Video with ID ${id} does not exist.`);
        }
    }

    delete(id) {
        if (this.#videos.has(id)) {
            this.#videos.delete(id);
        } else {
            throw new Error(`Video with ID ${id} does not exist.`);
        }
    }

    findAll() {
        return Array.from(this.#videos.entries()).map((videoArray)=>{
            const id = videoArray[0];
            const data = videoArray[1];
            return { id, ...data };
        });
    }
}
