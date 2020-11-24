import { useEffect } from 'react'
import { getPrefectures } from './lib/api'

function App() {
  useEffect(() => {
    getPrefectures().then((res) => {
      console.log(res)
    })
  }, [])
  return (
    <div className="App">
      <header>
        <h1>人口推移～</h1>
        <div className="content"></div>
      </header>
    </div>
  )
}

export default App
