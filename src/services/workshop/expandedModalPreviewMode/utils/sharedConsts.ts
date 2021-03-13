import { TransitionProperties } from '../../../../interfaces/transitionProperties';

export const OPACITY_INVISIBLE = '0';
export const OPACITY_VISIBLE = '1';
export const ALL_PROPERTIES = 'all';
export const OPACITY_PROPERTY = 'opacity';
export const UNSET = 'unset';
export const LINEAR_SPEED_TRANSITION = 'linear';
export const MODE_TOGGLE_FADE_TRANSITION_DURATION_MILLISECONDS = 150;
export const MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS = `${MODE_TOGGLE_FADE_TRANSITION_DURATION_MILLISECONDS / 1000}s`;
export const TOOLBAR_FADE_TRANSITION_DURATION_MILLISECONDS = 150;
export const TOOLBAR_FADE_TRANSITION_DURATION_SECONDS = `${TOOLBAR_FADE_TRANSITION_DURATION_MILLISECONDS / 1000}s`;
export const INITIAL_EXPANDED_MODAL_TRANSITION_VALUES: TransitionProperties = {
  transitionProperty: OPACITY_PROPERTY,
  transitionTimingFunction: LINEAR_SPEED_TRANSITION,
};