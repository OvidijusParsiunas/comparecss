import { CHILD_COMPONENT_TYPES, COMPONENT_TYPES, MASTER_COMPONENT_TYPES } from '../../../../../consts/componentTypes.enum'
import { ComponentStyleToGenerator } from '../../../../../interfaces/componentStyleToGenerator';
import { buttonGroupStyleToGenerator } from './buttonGroups/buttonGroupStyleToGenerator';
import { dropdownStyleToGenerator } from './dropdowns/dropdownStyleToGenerator';
import { buttonStyleToGenerator } from './buttons/buttonStyleToGenerator';
import { alertStyleToGenerator } from './alerts/alertStyleToGenerator';
import { modalStyleToGenerator } from './modals/modalStyleToGenerator';
import { layerStyleToGenerator } from './layers/layerStyleToGenerator';
import { imageStyleToGenerator } from './image/imageStyleToGenerator';
import { cardStyleToGenerator } from './cards/cardStyleToGenerator';
import { textStyleToGenerator } from './text/textStyleToGenerator';
import { iconStyleToGenerator } from './icon/iconStyleToGenerator';

type MasterComponentTypeToStyleGenerators = {
  [key in MASTER_COMPONENT_TYPES]: ComponentStyleToGenerator;
};

export const masterComponentTypeToStyleGenerators: MasterComponentTypeToStyleGenerators = {
  [COMPONENT_TYPES.MODAL]: modalStyleToGenerator,
  [COMPONENT_TYPES.CARD]: cardStyleToGenerator,
  [COMPONENT_TYPES.BUTTON]: buttonStyleToGenerator,
  [COMPONENT_TYPES.BUTTON_GROUP]: buttonGroupStyleToGenerator,
  [COMPONENT_TYPES.ALERT]: alertStyleToGenerator,
  [COMPONENT_TYPES.DROPDOWN]: dropdownStyleToGenerator,
};

type ChildComponentTypeToStyleGenerators = {
  [key in CHILD_COMPONENT_TYPES]: ComponentStyleToGenerator;
};

export const childComponentTypeToStyleGenerators: ChildComponentTypeToStyleGenerators = {
  [COMPONENT_TYPES.LAYER]: layerStyleToGenerator,
  [COMPONENT_TYPES.BUTTON]: buttonStyleToGenerator,
  [COMPONENT_TYPES.TEXT]: textStyleToGenerator,
  [COMPONENT_TYPES.IMAGE]: imageStyleToGenerator,
  [COMPONENT_TYPES.ICON]: iconStyleToGenerator,
  [COMPONENT_TYPES.DROPDOWN]: dropdownStyleToGenerator,
};
