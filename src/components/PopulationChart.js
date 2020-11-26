import { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts'

/**
 * convert into recharts conpatible interface
 * @param {Array} objectArray - Array of objects
 * @return {Array} - recharts conpatible type
 */
const groupByYear = (objectArray) => {
  return objectArray
    .reduce((acc, obj) => {
      obj.data.forEach((item) => {
        let index = acc.findIndex((i) => i && i.year === item.year)
        if (index === -1) {
          acc.push({ year: item.year })
        }
        // actual index
        index = acc.findIndex((i) => i && i.year === item.year)
        acc[index][obj.pref.prefName] = item.value
      })
      return acc
    }, [])
    .sort((a, b) => a.year - b.year) // sort by year
}

/**
 * generate unique hex color from string
 * @param {String} str - string
 * @return {String} str - hex color code. ex) "#15a081"
 */
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
          <XAxis
            type="number"
            domain={['dataMin', 'dataMax']}
            dataKey="year"
            label={{ value: '[年]', position: 'insideBottomRight', offset: -5 }}
          />
          <YAxis
            label={{
              value: '人口 [万人]',
              angle: -90,
              offset: 80,
              position: 'insideRight'
            }}
            tickFormatter={(v) => v / 10000}
          />
          <Tooltip labelFormatter={(year) => `${year}年`} formatter={(value, name, props) => [`${value}人`, name]} />
          <Legend type="number" domain={['dataMin', 'dataMax']} verticalAlign="top" height={70} />
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
          <ReferenceLine x={new Date().getFullYear()} stroke="#DDD" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PopulationChart
