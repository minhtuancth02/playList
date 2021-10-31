import React from 'react'
import './styles.css'


function Note({ children }) {
   return (
      <div className='note'>
         { children }
      </div>
   )
}

export default Note
