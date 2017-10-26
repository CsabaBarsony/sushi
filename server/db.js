'use strict'

const mysql = require('mysql')

const nutrientDB = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'usda_nutrients'
})

const db = {
  queries: {
    macros: (text) => {
      const foodSearches = text.replace(/\s/g, '').split(',')
      let result = 'select name, macros from macros '
      foodSearches.forEach((s, i) => result += (i === 0 ? 'where ' : ' and ') + 'name like \'%' + s + '%\'')
      result += ' limit 10'

      return result
    },
  },
  macros: (text, callback) => {
    nutrientDB.query(
      db.queries.macros(text),
      [],
      (error, rows) => {
        if(!error) {
          callback(true, rows.map(row => {
            return {
              name: row.name,
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

module.exports = db
