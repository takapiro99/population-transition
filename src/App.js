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
      <div className="container mainContainer">
        <div className="selectPrefMessage">
          <h4>1. 都道府県を選んでね</h4>
        </div>
        <div className="prefCheckboxContainer">
          {prefectures.length &&
            prefectures.map((pref) => {
              return <PrefectureCheckbox key={pref.prefCode} pref={pref} />
            })}
        </div>
      </div>
      <footer class="page-footer white">
        <div class="footer-copyright">
          <div class="container center grey-text text-darken-4">
            RESAS（地域経済分析システム）を加工して作成
            <br />
            <a class="grey-text text-darken-4 right" href="https://github.com/takapiro99">
              @takapiro99
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
