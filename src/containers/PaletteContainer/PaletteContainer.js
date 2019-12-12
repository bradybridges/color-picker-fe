import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PaletteColorItem from '../PaletteColorItem/PaletteColorItem';
import './PaletteContainer.css';

export class PaletteContainer extends Component {
  renderColorItems = () => {
    const { tempPalette } = this.props;
    return tempPalette.map((color, i) => {
      return <PaletteColorItem key={`${color}${i}`} color={color.color} isLocked={color.isLocked} />
    });
  }

  render() {
    return (
      <section className="palette-container">
        {this.renderColorItems()}
      </section>
    );
  }
}

export const mapState = (state) => ({
  tempPalette: state.tempPalette,
});

export default connect(mapState)(PaletteContainer);

PaletteContainer.propTypes = {
  tempPalette: PropTypes.array.isRequired,
};
