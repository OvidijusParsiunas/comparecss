import { ALERT_ANIMATION_EXIT_TYPES, MODAL_ANIMATION_ENTRANCE_TYPES, MODAL_ANIMATION_EXIT_TYPES } from '../../../../../../consts/animationTypes.enum';
import { EntranceAnimation, ExitAnimation } from '../../../../../../interfaces/animations';
import SlideAnimations from './utils/animationInitializers/slideAnimations';
import FadeAnimations from './utils/animationInitializers/fadeAnimations';

type AnimationToFunctionality = {
  [key in MODAL_ANIMATION_ENTRANCE_TYPES]: EntranceAnimation;
} & {
  [key in MODAL_ANIMATION_EXIT_TYPES | ALERT_ANIMATION_EXIT_TYPES]: ExitAnimation;
}

export const animationTypeToFunctionality: AnimationToFunctionality = {
  [MODAL_ANIMATION_ENTRANCE_TYPES.FADE_IN]: FadeAnimations.startEntranceAnimation,
  [MODAL_ANIMATION_ENTRANCE_TYPES.SLIDE_IN]: SlideAnimations.startEntranceAnimation,
  [MODAL_ANIMATION_EXIT_TYPES.FADE_OUT]: FadeAnimations.startExitAnimation,
  [MODAL_ANIMATION_EXIT_TYPES.SLIDE_OUT]: SlideAnimations.startExitAnimation,
  [ALERT_ANIMATION_EXIT_TYPES.FADE_OUT]: FadeAnimations.startExitAnimation,
};
