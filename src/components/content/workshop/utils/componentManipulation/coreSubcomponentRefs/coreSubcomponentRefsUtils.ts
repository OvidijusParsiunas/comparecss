import { CoreSubcomponentRefs } from '../../../../../../interfaces/coreSubcomponentRefs';
import { SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';

export class CoreSubcomponentRefsUtils {

  public static getActiveRefKeys(coreSubcomponentRefs: CoreSubcomponentRefs): string[] {
    return Object.keys(coreSubcomponentRefs || {})
      .filter((coreSubcomponentKey) => coreSubcomponentRefs[coreSubcomponentKey]);
  }

  public static getActiveRefsArray(coreSubcomponentRefs: CoreSubcomponentRefs): SubcomponentProperties[] {
    return CoreSubcomponentRefsUtils.getActiveRefKeys(coreSubcomponentRefs || {})
      .map((coreSubcomponentKey) => coreSubcomponentRefs[coreSubcomponentKey]);
  }
}
