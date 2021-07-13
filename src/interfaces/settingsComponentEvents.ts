import { MODAL_ANIMATION_CLOSE_TYPES, MODAL_ANIMATION_OPEN_TYPES } from '../consts/animationTypes.enum';
import { SUBCOMPONENT_MOVE_DIRECTIONS } from './subcomponentMoveDirections.enum';
import { WorkshopComponent } from './workshopComponent';

export type PlayAnimationPreviewEvent = [MODAL_ANIMATION_OPEN_TYPES | MODAL_ANIMATION_CLOSE_TYPES, boolean];

export type RemoveInSyncOptionButton = () => void;

export type MoveSubcomponentEvent = [SUBCOMPONENT_MOVE_DIRECTIONS, WorkshopComponent];
