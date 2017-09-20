'use strict'

const mysql = require('mysql')

const nutrientDB = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'usda_nutrients'
})

const queries = {
  getSuggestions: `SELECT *
            FROM quick_macros
            WHERE food_name
            LIKE ?
            LIMIT 10`,
}

module.exports = {
  getSuggestions: (text, callback) => {
    nutrientDB.query(
      queries.getSuggestions,
      ['%' + text + '%'],
      (error, rows) => {
        if(!error) {
          callback(true, rows.map(row => {
            console.log(row)
            return {
              foodName: row['food_name'],
              macros: row.macros,
            }
          }))
        }
        else {
          console.log(error)
          callback(false)
        }
      })
  },
}
