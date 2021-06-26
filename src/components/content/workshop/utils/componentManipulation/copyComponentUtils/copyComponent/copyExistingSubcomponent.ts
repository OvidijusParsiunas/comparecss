import { SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent';
import { CopyComponentShared } from './copyComponentShared';

export class CopyExistingSubcomponent extends CopyComponentShared {
  
  public static copy(newSubcomponent: SubcomponentProperties, copiedSubcomponent: SubcomponentProperties): void {
    if (copiedSubcomponent.importedComponent?.inSync) {
      CopyComponentShared.copyInSyncSubcomponent(copiedSubcomponent.importedComponent, newSubcomponent, copiedSubcomponent);
    } else {
      CopyComponentShared.copySubcomponentProperties(newSubcomponent, copiedSubcomponent);
    }
  }
}
