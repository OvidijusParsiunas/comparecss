import { TransitionProperties } from '../../../../../../../interfaces/transitionProperties';

export const OPACITY_INVISIBLE = '0';
export const OPACITY_VISIBLE = '1';
export const ALL_PROPERTIES = 'all';
export const OPACITY_PROPERTY = 'opacity';
export const UNSET = 'unset';
export const POINTER_EVENTS_NONE = 'none';
export const POINTER_EVENTS_REMOVE = '';
export const LINEAR_SPEED_TRANSITION = 'linear';
export const ELEMENT_CSS_CHANGE_MILLISECONDS = 10;
export const MODE_TOGGLE_FADE_ANIMATION_DURATION_MILLISECONDS = 150;
export const MODE_TOGGLE_FADE_ANIMATION_DURATION_SECONDS = `${MODE_TOGGLE_FADE_ANIMATION_DURATION_MILLISECONDS / 1000}s`;
export const TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS = 150;
export const TOOLBAR_FADE_ANIMATION_DURATION_SECONDS = `${TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS / 1000}s`;
export enum CLASSLIST_METHODS { ADD = 'add', REMOVE = 'remove' }
export enum SET_METHODS { ADD = 'add', REMOVE = 'delete' }
export const INITIAL_ANIMATION_PROPERTIES: TransitionProperties = {
  transitionProperty: OPACITY_PROPERTY,
  transitionTimingFunction: LINEAR_SPEED_TRANSITION,
};
