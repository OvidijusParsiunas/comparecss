import { SubcomponentProperties } from '../../../../../interfaces/workshopComponent';

export default class SubcomponentDisplayUtils {

  public static isSubcomponentDisplayed(subcomponentProperties: SubcomponentProperties): boolean {
    return !subcomponentProperties.subcomponentDisplayStatus
      || subcomponentProperties.subcomponentDisplayStatus.isDisplayed
      || subcomponentProperties.subcomponentDisplayStatus.displayOverlayOnly;
  }
}
