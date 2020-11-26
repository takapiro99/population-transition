import { useEffect, useState } from 'react'
import PrefectureCheckbox from './components/PrefectureCheckbox'
import PopulationChart from './components/PopulationChart'
import { getPopulation, getPrefectures } from './lib/api'

const App = () => {
  const [prefectures, setPrefectures] = useState([])
  const [selectedPrefectures, setSelectedPrefectures] = useState([])

  useEffect(() => {
    getPrefectures()
      .then((data) => setPrefectures(data))
      .catch((err) => {
        console.error(err)
        alert('都道府県を取得できませんでした。更新してみてね')
      })
  }, [])

  const checkPref = (pref) => {
    getPopulation(pref).then((data) => {
      setSelectedPrefectures([...selectedPrefectures, data])
    })
  }

  const uncheckPref = (pref) => {
    setSelectedPrefectures(selectedPrefectures.filter((item) => item.pref.prefCode !== pref.prefCode))
  }

  return (
    <div className="App">
      <nav>
        <div className="nav-wrapper blue darken-2">
          <a href="#_" className="brand-logo center">
            人口推移～
          </a>
        </div>
      </nav>
      <div className="container mainContainer">
        <div className="selectPrefMessage">
          <h4>1. 都道府県を選んでね</h4>
        </div>
        <div className="prefCheckboxContainer">
          {prefectures.length
            ? prefectures.map((pref) => {
                return (
                  <PrefectureCheckbox key={pref.prefCode} pref={pref} checkPref={checkPref} uncheckPref={uncheckPref} />
                )
              })
            : 'loading screen'}
        </div>
        <div className="selectPrefMessage">
          <h4>2. 人口推移を見よう！</h4>
        </div>
        <PopulationChart />
      </div>
      <footer className="page-footer white">
        <div className="footer-copyright">
          <div className="container center grey-text text-darken-4">
            <a href="https://opendata.resas-portal.go.jp/" className="blue-text text-darken-3">
              RESAS（地域経済分析システム）
            </a>
            を加工して作成
            <br />
            <a className="blue-text text-darken-3 right" href="https://github.com/takapiro99">
              @takapiro99
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
