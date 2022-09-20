const db = require('../dbConfig/init');

module.exports = class Complete {
    constructor(data) {
        this.data = data.date
        this.habitId = data.habit_id
    }

    static findByHabitId(id){
        return new Promise (async (resolve, reject) => {
            try {
                let completionDates = await db.query(`SELECT date FROM completed WHERE habit_id = $1;`, [ id ]);
                if(!!completionDates.rows.length){
                    resolve (completionDates.rows.map(a => new Complete(a)))
                } else {
                    reject('Completion dates not found for this habit');
                }
            } catch (err) {
                reject('Incorrect format');
            };
        });
    };

    // delete dates along with achivement (tue)
    // destroy(){
    //     return new Promise(async(resolve, reject) => {
    //         try {
    //             const result = await db.query(`DELETE date FROM completed WHERE id = $1 RETURNING id`, [ this.id ]);
    //             resolve(`Achievements ${result.id} was deleted`)
    //         } catch (err) {
    //             reject('Achievements could not be deleted')
    //         }
    //     })   
    // }



}
