import { CoreSubcomponentRefs } from '../../../../../../interfaces/coreSubcomponentRefs';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';

export class CoreSubcomponentRefsUtils {

  public static getActiveRefKeys(coreSubcomponentRefs: CoreSubcomponentRefs): SUBCOMPONENT_TYPES[] {
    return Object.keys(coreSubcomponentRefs || {})
      .filter((subcomponentType) => coreSubcomponentRefs[subcomponentType]) as unknown as SUBCOMPONENT_TYPES[];
  }
}
