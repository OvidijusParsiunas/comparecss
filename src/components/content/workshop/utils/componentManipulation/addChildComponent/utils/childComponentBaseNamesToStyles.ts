import { BUTTON_COMPONENTS_BASE_NAMES, LAYER_COMPONENTS_BASE_NAMES, CHILD_COMPONENTS_BASE_NAMES } from '../../../../../../../consts/baseSubcomponentNames.enum'
import { BUTTON_STYLES, COMPONENT_STYLES, DEFAULT_STYLES, LAYER_STYLES } from '../../../../../../../consts/componentStyles.enum'
import JSONUtils from '../../../generic/jsonUtils';

export class ChildComponentBaseNamesToStyles {
  
  public static readonly LAYER_TO_STYLE: { [key in LAYER_COMPONENTS_BASE_NAMES]: COMPONENT_STYLES } = {
    [LAYER_COMPONENTS_BASE_NAMES.LAYER]: LAYER_STYLES.CARD,
    [LAYER_COMPONENTS_BASE_NAMES.DROPDOWN_MENU_ITEM]: LAYER_STYLES.DROPDOWN_ITEM,
  };

  public static readonly STYLE_TO_LAYER: { [key in LAYER_STYLES]: LAYER_COMPONENTS_BASE_NAMES } = {
    ...JSONUtils.reverseMap(ChildComponentBaseNamesToStyles.LAYER_TO_STYLE),
    [LAYER_STYLES.PLAIN]: LAYER_COMPONENTS_BASE_NAMES.LAYER,
  };
  
  public static genericToStyle(newComponentBaseName: CHILD_COMPONENTS_BASE_NAMES): COMPONENT_STYLES {
    return newComponentBaseName === BUTTON_COMPONENTS_BASE_NAMES.CLOSE ? BUTTON_STYLES.CLOSE : DEFAULT_STYLES.DEFAULT;
  }
}
