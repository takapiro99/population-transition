const PrefectureCheckbox = ({ pref }) => {
  console.log(pref)
  return (
    <div className='prefCheckbox'>
      <label>
        <input type="checkbox" />
        <span>{pref.prefName}</span>
      </label>
    </div>
  )
}

export default PrefectureCheckbox
