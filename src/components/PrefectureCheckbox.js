import { useState } from 'react'

const PrefectureCheckbox = ({ pref, checkPref, uncheckPref }) => {
  const [checked, setChecked] = useState(false)

  const handleCheck = (e) => {
    setChecked(e.target.checked)
    if (e.target.checked) {
      checkPref(pref)
    } else {
      uncheckPref(pref)
    }
  }

  return (
    <div className="prefCheckbox">
      <label>
        <input type="checkbox" value={checked} onChange={handleCheck} />
        <span>{pref.prefName}</span>
      </label>
    </div>
  )
}

export default PrefectureCheckbox
