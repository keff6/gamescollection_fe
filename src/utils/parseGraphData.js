import { GRAPH_COLORS } from "./constants";


export const parsePieGraphData = (inData = null) => {
  if(!inData) return []

  const result = []
  let index = 0
  for(let key in inData) {
    const current = {
      name: key,
      value: +inData[key],
      fill: GRAPH_COLORS[index]
    }
    result.push(current)
    index++
  }

  return result
}

export const parseTimelineGraphData = (inData = null, withoutYear = false) => {
  if(!inData) return []

  const result = inData.map((item) => ({
    name: withoutYear ? item.console : `${item.year} - ${item.console}`,
    value: item.total_games,
  }))

  return result
}

