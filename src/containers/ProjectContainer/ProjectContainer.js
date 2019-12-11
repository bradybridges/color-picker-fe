import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './ProjectContainer.css';
import ProjectCard from '../ProjectCard/ProjectCard';


export const ProjectContainer = ({ projects }) => {
  const displayProjectCards = projects.map((project, index) => {
    return (
      <ProjectCard
        {...project}
        key={index}
        className='project'
      />
    );
  });

  return (
    <section className='project-container'>
      {displayProjectCards}
    </section>
  );
};

export const mapState = (state) => ({
  projects: state.projects,
});

export default connect(mapState)(ProjectContainer);

ProjectContainer.propTypes = {
  projects: PropTypes.array.isRequired,
};
