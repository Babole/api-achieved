const db = require('../dbConfig/init');

const User = require('./User')

module.exports = class Habit {
    constructor(data) {
        this.id = data.id
        this.description = data.description
        this.userId = data.user_id
    }

    static findById(id){
        return new Promise (async (resolve, reject) => {
            try {
                let habitData = await db.query(`SELECT * FROM habits WHERE id = $1;`, [ id ]);
                resolve (new Habit(habitData.rows[0]))
            } catch (err) {
                reject('Habit not found');
            };
        });
    };

    static findByUserId(id){
        return new Promise (async (resolve, reject) => {
            try {
                let habitData = await db.query(`SELECT * FROM habits WHERE user_id = $1;`, [ id ]);
                if(!!habitData.rows.length){
                    resolve (habitData.rows.map(a => new Habit(a)))
                } else {
                    reject('User has no habits');
                }
            } catch (err) {
                reject('Incorrect format');
            };
        });
    };

    static create(habit){
        return new Promise (async (resolve, reject) => {
            try {
                let habitData = await db.query(`INSERT INTO habits (description,user_id) VALUES ($1,$2) RETURNING *;`, [ habit.description, habit.user_id]);
                resolve (new Habit(habitData.rows[0]));
            } catch (err) {
                reject('Habit could not be created');
            };
        });
    };

    destroy(){
        return new Promise(async(resolve, reject) => {
            try {
                const result = await db.query(`DELETE FROM habits WHERE id = $1 RETURNING id`, [ this.id ]);
                resolve(`Habit ${result.id} was deleted`)
            } catch (err) {
                reject('Habit could not be deleted')
            };
        });  
    };
}

