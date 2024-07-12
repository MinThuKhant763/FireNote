import React from 'react'

const Navbar = ({getNotes,totalNotes}) => {
  return (
      <section className='nav'>
        <h1 className='logo'>FireNote</h1>
        <p className='submit-btn'>
              Total Notes - <span>{totalNotes}</span>
        </p>
    </section>
  )
}

export default Navbar