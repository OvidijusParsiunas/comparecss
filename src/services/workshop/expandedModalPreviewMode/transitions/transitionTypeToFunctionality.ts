import { MODAL_TRANSITION_ENTRANCE_TYPES, MODAL_TRANSITION_EXIT_TYPES } from '../../../../consts/modalTransitionTypes.enum';
import { ModalEntranceTransition, ModalExitTransition } from '../../../../interfaces/modalTransitions';
import SlideTransitions from './slideTransitions';
import FadeTransitions from './fadeTransitions';

type ModalTransitionEntranceTypesToSettings = {
  [key in MODAL_TRANSITION_ENTRANCE_TYPES]: ModalEntranceTransition;
} & {
  [key in MODAL_TRANSITION_EXIT_TYPES]: ModalExitTransition;
}

export const transitionTypeToFunctionality: ModalTransitionEntranceTypesToSettings = {
  [MODAL_TRANSITION_ENTRANCE_TYPES.FADE_IN]: FadeTransitions.initiate,
  [MODAL_TRANSITION_ENTRANCE_TYPES.SLIDE_IN]: SlideTransitions.initiate,
  [MODAL_TRANSITION_EXIT_TYPES.FADE_OUT]: FadeTransitions.exit,
  [MODAL_TRANSITION_EXIT_TYPES.SLIDE_OUT]: SlideTransitions.exit,
};
