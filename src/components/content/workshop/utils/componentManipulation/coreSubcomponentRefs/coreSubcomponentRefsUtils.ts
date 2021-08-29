import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { CoreSubcomponentRefs } from '../../../../../../interfaces/coreSubcomponentRefs';

export class CoreSubcomponentRefsUtils {

  public static getActiveRefKeys(coreSubcomponentRefs: CoreSubcomponentRefs): string[] {
    return Object.keys(coreSubcomponentRefs || {})
      .filter((subcomponentType) => coreSubcomponentRefs[subcomponentType]);
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
