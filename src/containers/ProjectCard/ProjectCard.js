import React from 'react'
import { connect } from 'react-redux'
import './ProjectCard.css'
import Palette from '../Palette/Palette'


export const ProjectCard = ({ name, id, palettes }) => {
  const findMatchingPalettes = palettes.filter(palette => {
   return palette.project_id === id
  })
  const displayPalettes = findMatchingPalettes.map((palette, index) => {
    return (
      <Palette
        {...palette}
        key={index}
        className='palette-card'
       />
    )
  })

  return (
    <section className='project-card'>
      <h4 className='project-name'>{name}</h4>
      {displayPalettes}
    </section>
  )
}


export const mapState = (state) => ({
  palettes: state.palettes,
  projects: state.projects
})

export default connect (mapState)(ProjectCard)