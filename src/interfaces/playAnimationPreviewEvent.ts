import { MODAL_ANIMATION_ENTRANCE_TYPES, MODAL_ANIMATION_EXIT_TYPES } from '../consts/animationTypes.enum';

export type PlayAnimationPreviewEvent = [MODAL_ANIMATION_ENTRANCE_TYPES | MODAL_ANIMATION_EXIT_TYPES, boolean];
