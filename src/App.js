import { useEffect, useState } from 'react'
import PrefectureCheckbox from './components/PrefectureCheckbox'
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
      <nav>
        <div className="nav-wrapper blue darken-2">
          <a href="#_" className="brand-logo center">
            人口推移～
          </a>
        </div>
      </nav>
      <div className="container selectPrefMessage">
        <h4>1. 都道府県を選んでね</h4>
      </div>
      <div className="container prefCheckboxContainer">
        {prefectures.length &&
          prefectures.map((pref) => {
            return <PrefectureCheckbox key={pref.prefCode} pref={pref} />
          })}
      </div>
    </div>
  )
}

export default App
