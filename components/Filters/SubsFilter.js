import React from 'react'

const SubsFilter = ({ subsLists, selectedSubs, setSelectedSubs }) => {
  let subs = [...selectedSubs]
  const handleSubs = (subId) => {
    if (subId) {
      if (subs?.includes(subId)) {
        const foundElementIndex = selectedSubs.indexOf(subId)
        subs.splice(foundElementIndex, 1)
        setSelectedSubs((prevState) => ({ ...prevState, selectedSubs: subs }))
      } else {
        subs?.push(subId)
        setSelectedSubs((prevState) => ({ ...prevState, selectedSubs: subs }))
      }
    }
  }

  console.log('hey selected subs', selectedSubs)
  return (
    <div style={{ width: '100%', display: 'flex', gap: '4px' }}>
      {subsLists?.map((s) => (
        <div
          key={s._id}
          className={
            subs.includes(s._id) ? 'badge bg-primary' : 'badge bg-secondary'
          }
          onClick={() => handleSubs(s._id)}
          style={{
            cursor: 'pointer',
          }}
        >
          {s.name}
        </div>
      ))}
    </div>
  )
}

export default SubsFilter
