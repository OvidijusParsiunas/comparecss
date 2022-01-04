import { ActionsDropdownMouseEventCallbackEvent } from '../../../../../../../interfaces/actionsDropdownsMouseEventCallbacks';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { ICON_TYPES } from '../../../../../../../consts/iconTypes.enum';

export class IconFilterCss {

  public static unsetFilterCss(event: ActionsDropdownMouseEventCallbackEvent): void {
    if (event.triggeredItemName === ICON_TYPES.BASIC) {
      const { customCss } = event.subcomponent;
      customCss[CSS_PSEUDO_CLASSES.DEFAULT].filter = '';
      delete customCss[CSS_PSEUDO_CLASSES.HOVER]?.filter;
      delete customCss[CSS_PSEUDO_CLASSES.CLICK]?.filter;
    }
  }
}
