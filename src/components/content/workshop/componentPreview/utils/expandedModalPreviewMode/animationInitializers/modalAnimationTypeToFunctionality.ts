import { MODAL_ANIMATION_ENTRANCE_TYPES, MODAL_ANIMATION_EXIT_TYPES } from '../../../../../../../consts/modalAnimationTypes.enum';
import { ModalEntranceAnimation, ModalExitAnimation } from '../../../../../../../interfaces/modalAnimations';
import SlideAnimations from './slideAnimations';
import FadeAnimations from './fadeAnimations';

type ModalAnimationEntranceTypesToSettings = {
  [key in MODAL_ANIMATION_ENTRANCE_TYPES]: ModalEntranceAnimation;
} & {
  [key in MODAL_ANIMATION_EXIT_TYPES]: ModalExitAnimation;
}

export const modalAnimationTypeToFunctionality: ModalAnimationEntranceTypesToSettings = {
  [MODAL_ANIMATION_ENTRANCE_TYPES.FADE_IN]: FadeAnimations.startModalEntranceAnimation,
  [MODAL_ANIMATION_ENTRANCE_TYPES.SLIDE_IN]: SlideAnimations.startModalEntranceAnimation,
  [MODAL_ANIMATION_EXIT_TYPES.FADE_OUT]: FadeAnimations.startModalExitAnimation,
  [MODAL_ANIMATION_EXIT_TYPES.SLIDE_OUT]: SlideAnimations.startModalExitAnimation,
};
