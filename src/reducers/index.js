import { combineReducers } from 'redux';
import { projects } from './projects/projects';
import { palettes } from './palettes/palettes';

const rootReducer = combineReducers({
  projects,
  palettes,
});

export default rootReducer;
