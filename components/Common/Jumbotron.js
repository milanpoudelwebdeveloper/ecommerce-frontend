import React from 'react'
import Typewriter from 'typewriter-effect'

const Jumbotron = ({ text }) => {
  return (
    <div
      className="jumbotron text-danger h1 font-weight-bold text-center"
      style={{ padding: '50px', background: '#E9ECEF' }}
    >
      <Typewriter
        options={{ loop: true }}
        onInit={(typewriter) => {
          typewriter
            .typeString(text.length > 0 ? text : 'Loading')
            .pauseFor(2500)
            .deleteAll()
            .start()
        }}
      />
    </div>
  )
}

export default Jumbotron
