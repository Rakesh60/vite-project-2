import React from 'react'
import MyContext from './myContext'


function myState(props) {
    const name="Rakesh"
  return (
    <MyContext.Provider value={{name}}>
      {props.children}
    </MyContext.Provider>
  )
}

export default myState
