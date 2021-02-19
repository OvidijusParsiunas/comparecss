import { MODAL_TRANSITION_ENTRANCE_TYPES, MODAL_TRANSITION_EXIT_TYPES } from '../consts/modalTransitionTypes.enum';

export type PlayPreviewTransitionAnimationEvent = [MODAL_TRANSITION_ENTRANCE_TYPES | MODAL_TRANSITION_EXIT_TYPES, boolean];
