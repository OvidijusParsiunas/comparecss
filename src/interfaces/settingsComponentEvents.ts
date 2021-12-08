import { MODAL_ANIMATION_CLOSE_TYPES, MODAL_ANIMATION_OPEN_TYPES } from '../consts/animationTypes.enum';
import { WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES } from '../consts/workshopToolbarOptionButtonNames.enum';
import { CHANGE_COMPONENT_ORDER_DIRECTIONS } from './changeComponentOrderDirections.enum';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../consts/workshopToolbarOptionTypes.enum';
import { HORIZONTAL_ALIGNMENT_SECTIONS } from '../consts/horizontalAlignmentSections';
import { WorkshopComponent } from './workshopComponent';

export type PlayAnimationPreviewEvent = [MODAL_ANIMATION_OPEN_TYPES | MODAL_ANIMATION_CLOSE_TYPES, boolean];

export type RemoveInSyncOptionButton = () => void;

export type RemoveChildComponentEvent = [boolean, boolean?];

export type ChangeChildComponentOrderEvent = [CHANGE_COMPONENT_ORDER_DIRECTIONS, WorkshopComponent];

export type ChangeChildComponentAlignmentEvent = [HORIZONTAL_ALIGNMENT_SECTIONS, HORIZONTAL_ALIGNMENT_SECTIONS, WorkshopComponent, boolean];

export type SettingsRefreshEvent = { optionButtonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES, optionType: WORKSHOP_TOOLBAR_OPTION_TYPES };
