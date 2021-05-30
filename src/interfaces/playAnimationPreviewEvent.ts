import { MODAL_ANIMATION_OPEN_TYPES, MODAL_ANIMATION_CLOSE_TYPES } from '../consts/animationTypes.enum';

export type PlayAnimationPreviewEvent = [MODAL_ANIMATION_OPEN_TYPES | MODAL_ANIMATION_CLOSE_TYPES, boolean];
