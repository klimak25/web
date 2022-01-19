const Router = require('express')
const router = new Router()
const pool = require('../db')

router.get('/', async (req, res) => {
    try {
      const todos = await pool.query('SELECT * FROM avecode')
      res.status(200).json(todos.rows)
    } catch (e) {
      console.log(e)
      res.status(500).json({
        message: 'Server error'
      })
    }
  })

  module.exports = router
  