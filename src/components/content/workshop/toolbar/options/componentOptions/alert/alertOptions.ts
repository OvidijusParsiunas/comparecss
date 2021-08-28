import { SubcomponentTypeToOptions } from '../../../../../../../interfaces/subcomponentTypeToOptions';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { TEXT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { Options } from '../../../../../../../interfaces/options';
import { closeButtonTextOptions } from '../text/closeButtonText';
import { closeButtonOptions } from '../button/closeButton';
import { textOptions } from '../text/text';
import { alertBaseOptions } from './base';

export class AlertOptions {

  private static readonly STATIC_ALERT_OPTIONS: SubcomponentTypeToOptions = {
    [SUBCOMPONENT_TYPES.BASE]: alertBaseOptions as Options,
    [SUBCOMPONENT_TYPES.BUTTON]: closeButtonOptions as Options,
  }

  private static getTextOptions(component: WorkshopComponent): Options {
    const subcomponentStyle = component.subcomponents[component.activeSubcomponentName].seedComponent.style;
    if (subcomponentStyle === TEXT_STYLES.CLOSE_BUTTON) {
      return closeButtonTextOptions as Options;
    }
    return textOptions as Options;
  }

  public static getAlertOptions(subcomponentType: SUBCOMPONENT_TYPES, component: WorkshopComponent): Options {
    if (subcomponentType === SUBCOMPONENT_TYPES.TEXT) {
      return AlertOptions.getTextOptions(component);
    }
    return AlertOptions.STATIC_ALERT_OPTIONS[subcomponentType];
  }
}
