import { GENERAL_ANIMATION_CLOSE_TYPES, MODAL_ANIMATION_OPEN_TYPES, MODAL_ANIMATION_CLOSE_TYPES } from '../../../../../../consts/animationTypes.enum';
import { OpenAnimation, CloseAnimation } from '../../../../../../interfaces/animations';
import SlideAnimations from './utils/animationInitializers/slideAnimations';
import FadeAnimations from './utils/animationInitializers/fadeAnimations';

type AnimationToFunctionality = {
  [key in MODAL_ANIMATION_OPEN_TYPES]: OpenAnimation;
} & {
  [key in MODAL_ANIMATION_CLOSE_TYPES | GENERAL_ANIMATION_CLOSE_TYPES]: CloseAnimation;
}

export const animationTypeToFunctionality: AnimationToFunctionality = {
  [MODAL_ANIMATION_OPEN_TYPES.FADE_IN]: FadeAnimations.startOpenAnimation,
  [MODAL_ANIMATION_OPEN_TYPES.SLIDE_IN]: SlideAnimations.startOpenAnimation,
  [MODAL_ANIMATION_CLOSE_TYPES.FADE_OUT]: FadeAnimations.startCloseAnimation,
  [MODAL_ANIMATION_CLOSE_TYPES.SLIDE_OUT]: SlideAnimations.startCloseAnimation,
  [GENERAL_ANIMATION_CLOSE_TYPES.FADE_OUT]: FadeAnimations.startCloseAnimation,
};
