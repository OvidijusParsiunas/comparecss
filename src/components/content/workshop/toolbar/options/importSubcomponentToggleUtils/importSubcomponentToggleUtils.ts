import { SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
import JSONManipulation from './../../../../../../services/workshop/jsonManipulation';

export default class ImportSubcomponentToggleUtils {

  public static toggleSubcomponentInSync(activeSubcomponent: SubcomponentProperties): void {
    if (activeSubcomponent.importedComponent.inSync) {
    activeSubcomponent.customCss = JSONManipulation.deepCopy(activeSubcomponent.customCss);
    activeSubcomponent.customFeatures = JSONManipulation.deepCopy(activeSubcomponent.customFeatures);
    }
    activeSubcomponent.importedComponent.inSync = !activeSubcomponent.importedComponent.inSync;
  }
}
