export const parseOptions = (rawArray = [], value = "", label = "") => {
  return rawArray.map(item => ({
    value: item[value].toString(),
    label: item[label].toString(),
  }))
}