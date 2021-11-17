import { MODAL_ANIMATION_CLOSE_TYPES, MODAL_ANIMATION_OPEN_TYPES } from '../consts/animationTypes.enum';
import { HORIZONTAL_ALIGNMENT_SECTIONS } from '../consts/horizontalAlignmentSections';
import { SUBCOMPONENT_ORDER_DIRECTIONS } from './subcomponentOrderDirections.enum';
import { WorkshopComponent } from './workshopComponent';

export type PlayAnimationPreviewEvent = [MODAL_ANIMATION_OPEN_TYPES | MODAL_ANIMATION_CLOSE_TYPES, boolean];

export type RemoveInSyncOptionButton = () => void;

export type ChangeSubcomponentOrderEvent = [SUBCOMPONENT_ORDER_DIRECTIONS, WorkshopComponent];

export type RemoveChildComponentEvent = [boolean, boolean?];

export type ChangeSubcomponentAlignmentEvent = [HORIZONTAL_ALIGNMENT_SECTIONS, HORIZONTAL_ALIGNMENT_SECTIONS, WorkshopComponent, boolean];
