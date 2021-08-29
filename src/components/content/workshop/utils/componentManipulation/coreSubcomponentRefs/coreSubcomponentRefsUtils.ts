import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { CoreSubcomponentRefs } from '../../../../../../interfaces/coreSubcomponentRefs';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';

export class CoreSubcomponentRefsUtils {

  public static getActiveRefKeys(coreSubcomponentRefs: CoreSubcomponentRefs): SUBCOMPONENT_TYPES[] {
    return Object.keys(coreSubcomponentRefs || {})
      .filter((subcomponentType) => coreSubcomponentRefs[subcomponentType]) as unknown as SUBCOMPONENT_TYPES[];
  }

  public static getActiveRefsArray(coreSubcomponentRefs: CoreSubcomponentRefs): SubcomponentProperties[] {
    return CoreSubcomponentRefsUtils.getActiveRefKeys(coreSubcomponentRefs || {})
      .map((subcomponentType) => coreSubcomponentRefs[subcomponentType]);
  }

  public static executeReferenceSharingExecutables(...components: WorkshopComponent[]): void {
    components.forEach((component) => {
      const { referenceSharingExecutables, coreSubcomponentRefs } = component;
      (referenceSharingExecutables || []).forEach((executable) => executable(coreSubcomponentRefs));
    });
  }
}
