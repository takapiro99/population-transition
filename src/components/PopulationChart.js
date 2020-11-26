import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const groupByYear = (objectArray) => {
  return objectArray
    .reduce((acc, obj) => {
      obj.data.forEach((item) => {
        let index = acc.findIndex((i) => i && i.year === item.year)
        if (index === -1) {
          acc.push({ year: item.year })
        }
        index = acc.findIndex((i) => i && i.year === item.year)
        acc[index][obj.pref.prefName] = item.value
      })
      return acc
    }, [])
    .sort((a, b) => a.year - b.year)
}

var stringToColour = (str) => {
  var hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  var colour = '#'
  for (let i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff
    colour += ('00' + value.toString(16)).substr(-2)
  }
  return colour
}

const PopulationChart = ({ rawData }) => {
  const [chartData, setChartData] = useState([])
  useEffect(() => setChartData(groupByYear(rawData)), [rawData])

  if (!chartData.length) {
    return <div>1. から都道府県を選んでね！</div>
  }

  return (
    <div id="chartContainer">
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 6,
            left: 30,
            bottom: 50
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" label={{ value: '[年]', position: 'insideBottomRight', offset: -5 }} />
          <YAxis label={{ value: '人口 [人]', angle: -90, offset: 80, position: 'insideRight' }} />
          <Tooltip/>
          <Legend verticalAlign="top" height={70}/>
          {rawData.map((item) => {
            return (
              <Line
                key={item.pref.prefName}
                type="monotone"
                dataKey={item.pref.prefName}
                stroke={stringToColour(item.pref.prefName)}
								strokeWidth={2}
								isAnimationActive={false}
              />
            )
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PopulationChart
