const db = require('../dbConfig/init');

module.exports = class User {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.password = data.password
        this.streak = data.streak
        this.last_update = data.last_update

    };

    static get all(){ 
        return new Promise (async (resolve, reject) => {
            try {
                const result = await db.query(`SELECT * FROM users;`)
                const users = result.rows.map(u => new User(u))
                resolve(users);
            } catch (err) {
                reject("Error retrieving users")
            }
        })
    };

    static create(user){
        return new Promise (async (resolve, reject) => {
            try {
                const new_streak = 0
                let userData = await db.query(`INSERT INTO users (name,password,streak,last_update) VALUES ($1,$2,$3,$4) RETURNING *;`, [ user.name, user.password, new_streak, user.last_update ]);
                resolve(userData.rows[0]);
            } catch (err) {
                reject('User could not be created');
            };
        });
    };

    static findByUsername(username) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await db.query(`SELECT * FROM users WHERE name = $1;`, [username]);
                let user = new User(result.rows[0])
                resolve(user)
            } catch (err) {
                reject(`Error retrieving user ${err}`);
            }

        });
    }

    static updateUser(data) {
        return new Promise(async (resolve, reject) => {
            try {
                let update = await db.query(`UPDATE users SET ${data.column_to_change} = $1 WHERE id = ${data.user_id} RETURNING *;`, [ data.value ]);
                let user = new User(update.rows[0])
                resolve(user)
            } catch (err) {
                reject(`Error retrieving user ${err}`);
            } 
        })
    }


}
