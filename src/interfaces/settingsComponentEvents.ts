import { MODAL_ANIMATION_CLOSE_TYPES, MODAL_ANIMATION_OPEN_TYPES } from '../consts/animationTypes.enum';
import { SUBCOMPONENT_ORDER_DIRECTIONS } from './subcomponentOrderDirections.enum';
import { SubcomponentProperties, WorkshopComponent } from './workshopComponent';
import { ALIGNED_SECTION_TYPES } from '../consts/layerSections.enum';

export type PlayAnimationPreviewEvent = [MODAL_ANIMATION_OPEN_TYPES | MODAL_ANIMATION_CLOSE_TYPES, boolean];

export type RemoveInSyncOptionButton = () => void;

export type ChangeSubcomponentOrderEvent = [SUBCOMPONENT_ORDER_DIRECTIONS, WorkshopComponent];

export type ChangeSubcomponentAlignmentEvent = [ALIGNED_SECTION_TYPES, ALIGNED_SECTION_TYPES, SubcomponentProperties, boolean, boolean];
