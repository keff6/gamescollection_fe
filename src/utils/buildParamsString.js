export const buildParamsString = (paramsObj = null) => {
  if(!paramsObj) return '';

  let paramsString = '?';
  const params = Object.keys(paramsObj)
  for(let param of params) {
    paramsString += `${param}=${encodeURIComponent(paramsObj[param])}&`
  }
  paramsString.slice(0, -1)
  return paramsString.slice(0, -1)
}