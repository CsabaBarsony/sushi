const assert = require('assert')
const db = require('./db')

describe('DB\'s getSuggestions should' , () => {
  it('create query with 1 food name', () => {
    const text = 'cheese'
    const result = 'select name, macros from macros where name like \'%cheese%\' limit 10'
    assert.equal(db.queries.macros(text), result)
  })

  it('create query with 2 food name', () => {
    const text = 'cheese, cottage'
    const result = 'select name, macros from macros where name like \'%cheese%\' and name like \'%cottage%\' limit 10'
    assert.equal(db.queries.macros(text), result)
  })

  it('create query with 3 food name', () => {
    const text = 'cheese, cottage, creamed'
    const result = 'select name, macros from macros where name like \'%cheese%\' and name like \'%cottage%\' and name like \'%creamed%\' limit 10'
    assert.equal(db.queries.macros(text), result)
  })
})