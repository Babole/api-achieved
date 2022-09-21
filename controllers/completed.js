const Complete = require ('../models/Complete')

async function show(req, res) {
    try {
        const completionDates = await Complete.findByHabitId(parseInt(req.params.id))
        res.status(200).json(completionDates)
    } catch (err) {
        res.status(404).json({err})
    }
}

async function create (req, res) {
    try {
        const completionDate = await Complete.create(req.body);
        res.status(201).json(completionDate)
    } catch (err) {
        res.status(422).json({err})
    }
}

module.exports = { show, create }
