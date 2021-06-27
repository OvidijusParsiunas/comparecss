import { SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent';
import { CopyComponentShared } from './copyComponentShared';

export class CopyExistingSubcomponent extends CopyComponentShared {
  
  public static copy(newSubcomponent: SubcomponentProperties, copiedSubcomponent: SubcomponentProperties): void {
    if (copiedSubcomponent.nestedComponent?.inSync) {
      CopyComponentShared.copyInSyncSubcomponent(copiedSubcomponent.nestedComponent, newSubcomponent, copiedSubcomponent);
    } else {
      CopyComponentShared.copySubcomponentProperties(newSubcomponent, copiedSubcomponent);
    }
  }
}
