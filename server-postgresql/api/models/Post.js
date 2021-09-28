const db = require ('../dbConfig')

class Tele {
    constructor(data){
        this.id = data.id;
        this.title = data.title;
        this.author = data.author;
        this.messagePost = data.messagePost;
        console.log(data.author)
        console.log("message: " + data.messagePost)
    };

    static findById (id) {
        return new Promise (async (resolve, reject) => {
            try {
                let teleData = await db.query(`SELECT * FROM telegraph WHERE id = $1;`, [ id ]);
                let post = new Tele(teleData.rows[0]);
                console.log("post" + post)
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

    


    static create(title, author, messagePost){
        return new Promise (async (resolve, reject) => {
            try {
                let postData = await db.query(`INSERT INTO telegraph (title, author, messagePost) VALUES ($1, $2, $3) RETURNING *;`, [ title, author, messagePost ]);
                let newPost = new Tele(postData.rows[0]);
                resolve (newPost);
            } catch (err) {
                reject('Error creating post');
            }
        });
    }

//     update() {
//         return new Promise (async (resolve, reject) => {
//             try {
//                 let updatedDogData = await db.query(`UPDATE dogs SET age = age + 1 WHERE id = $1 RETURNING *;`, [ this.id ]);
//                 let updatedDog = new Dog(updatedDogData.rows[0]);
//                 resolve (updatedDog);
//             } catch (err) {
//                 reject('Error updating dog');
//             }
//         });
//     }

//     destroy(){
//         return new Promise(async(resolve, reject) => {
//             try {
//                 await db.query(`DELETE FROM dogs WHERE id = $1;`, [ this.id ]);
//                 resolve('Dog was deleted')
//             } catch (err) {
//                 reject('Dog could not be deleted')
//             }
//         })
//     }

 }

module.exports = Tele;