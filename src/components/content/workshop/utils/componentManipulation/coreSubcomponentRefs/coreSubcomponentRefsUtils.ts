import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { CoreSubcomponentRefs } from '../../../../../../interfaces/coreSubcomponentRefs';

export class CoreSubcomponentRefsUtils {

  public static getActiveRefKeys(coreSubcomponentRefs: CoreSubcomponentRefs): string[] {
    return Object.keys(coreSubcomponentRefs || {})
      .filter((coreSubcomponentKey) => coreSubcomponentRefs[coreSubcomponentKey]);
  }

  public static getActiveRefsArray(coreSubcomponentRefs: CoreSubcomponentRefs): SubcomponentProperties[] {
    return CoreSubcomponentRefsUtils.getActiveRefKeys(coreSubcomponentRefs || {})
      .map((coreSubcomponentKey) => coreSubcomponentRefs[coreSubcomponentKey]);
  }

  public static executeReferenceSharingExecutables(...components: WorkshopComponent[]): void {
    components.forEach((nestedComponentRef) => {
      const { referenceSharingExecutables, coreSubcomponentRefs } = nestedComponentRef;
      (referenceSharingExecutables || []).forEach((executable) => executable(coreSubcomponentRefs));
    });
  }
}
