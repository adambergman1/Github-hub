const iWish = {
  '1dv021': [
    { id: 210633749, name: '1dv607', private: false },
    { id: 208120027, name: '1dv610', private: false }
  ],
  '1dv023': [
    { id: 123, name: '1dv607', private: false },
    { id: 1234, name: '1dv610', private: false }
  ]
}

const repositories = [
  { id: 210633749, name: '1dv607', private: false },
  { id: 208120027, name: '1dv610', private: false }
]
const repos = {}

const isValidKey = value => {
  return (typeof value === 'string' && value.length > 0) || (typeof value === 'number' && Number.isInteger(value))
}

const indexArray = (key, array, property) => {
  return array.reduce((indexed, item) => ({
    ...indexed,
    [item[key]]: isValidKey(property) ? item[property] : item
  }), {})
}

// const indexArray = (key, array) => {
//   return array.reduce((indexed, item) => ({
//     ...indexed,
//     [item[key]]: item
//   }), {})
// }

module.exports = { indexArray }
