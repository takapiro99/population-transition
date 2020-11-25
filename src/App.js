import { useEffect, useState } from 'react'
import { getPrefectures } from './lib/api'

const App = () => {
  const [prefectures, setPrefectures] = useState([])
  useEffect(() => {
    getPrefectures()
      .then((data) => {
        // console.log(data)
        setPrefectures(data)
      })
      .catch((err, message) => {
        console.log(err, message)
        alert('都道府県を取得できませんでした')
      })
  }, [])

  return (
    <div className="App">
      <header>
        <h1>人口推移～</h1>
      </header>
      <div className="content">
        {prefectures.length &&
          prefectures.map((pref) => {
            return <span key={pref.prefCode}>{pref.prefName}</span>
          })}
      </div>
    </div>
  )
}

export default App
