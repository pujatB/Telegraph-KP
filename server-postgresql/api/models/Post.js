const db = require ('../dbConfig')

class Tele {
    constructor(data){
        this.id = data.id;
        this.title = data.title;
        this.author = data.author;
        this.story = data.story;
    };

    static findById (id) {
        return new Promise (async (resolve, reject) => {
            try {
                let teleData = await db.query(`SELECT * FROM telegraph WHERE id = $1;`, [ id ]);
                let post = new Tele(teleData.rows[0]);
                resolve (post);
            } catch (err) {
                reject('Post not found');
            }
        });
    }
    static get all() {
        return new Promise (async (resolve, reject) => {
            try {
                const postsData = await db.query(`SELECT * FROM telegraph;`)
                const posts = postsData.rows.map(d => new Tele(d))
                resolve(posts);
            } catch (err) {
                reject("Error retrieving posts")
            }
        })
    }

    


    static create(title, author, story){
        return new Promise (async (resolve, reject) => {
            try {
                let postData = await db.query(`INSERT INTO telegraph (title, author, story) VALUES ($1, $2, $3) RETURNING *;`, [ title, author, story ]);
                let newPost = new Tele(postData.rows[0]);
                resolve (newPost);
            } catch (err) {
                reject('Error creating post');
            }
        });
    }



 }

module.exports = Tele;