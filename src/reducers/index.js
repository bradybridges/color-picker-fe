import { combineReducers } from 'redux';
import { projects } from './projects/projects';
import { palettes } from './palettes/palettes';
import { tempPalette } from './tempPalette/tempPalette';

const rootReducer = combineReducers({
  projects,
  palettes,
  tempPalette,
});

export default rootReducer;
