const isValidKey = value => {
  return (typeof value === 'string' && value.length > 0) || (typeof value === 'number' && Number.isInteger(value))
}

export const indexArray = (key, array, property) => {
  return array.reduce((indexed, item) => ({
    ...indexed,
    [item[key]]: isValidKey(property) ? item[property] : item
  }), {})
}

export default indexArray
