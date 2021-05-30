import { ALERT_ANIMATION_EXIT_TYPES, MODAL_ANIMATION_ENTRANCE_TYPES, MODAL_ANIMATION_EXIT_TYPES } from '../../../../../../consts/animationTypes.enum';
import { EntranceAnimation, ExitAnimation } from '../../../../../../interfaces/animations';
import SlideAnimations from './animationInitializers/slideAnimations';
import FadeAnimations from './animationInitializers/fadeAnimations';

type AnimationToFunctionality = {
  [key in MODAL_ANIMATION_ENTRANCE_TYPES]: EntranceAnimation;
} & {
  [key in MODAL_ANIMATION_EXIT_TYPES | ALERT_ANIMATION_EXIT_TYPES]: ExitAnimation;
}

export const animationTypeToFunctionality: AnimationToFunctionality = {
  [MODAL_ANIMATION_ENTRANCE_TYPES.FADE_IN]: FadeAnimations.startModalEntranceAnimation,
  [MODAL_ANIMATION_ENTRANCE_TYPES.SLIDE_IN]: SlideAnimations.startModalEntranceAnimation,
  [MODAL_ANIMATION_EXIT_TYPES.FADE_OUT]: FadeAnimations.startModalExitAnimation,
  [MODAL_ANIMATION_EXIT_TYPES.SLIDE_OUT]: SlideAnimations.startModalExitAnimation,
  [ALERT_ANIMATION_EXIT_TYPES.FADE_OUT]: FadeAnimations.startModalExitAnimation,
};
