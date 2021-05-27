import { MODAL_ANIMATION_ENTRANCE_TYPES, MODAL_ANIMATION_EXIT_TYPES } from '../consts/animationTypes.enum';

export type PlayModalAnimationPreviewEvent = [MODAL_ANIMATION_ENTRANCE_TYPES | MODAL_ANIMATION_EXIT_TYPES, boolean];
