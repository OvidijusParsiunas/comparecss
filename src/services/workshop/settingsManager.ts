import { WorkshopComponent, SubcomponentProperties } from '../../interfaces/workshopComponent';
import { SUB_COMPONENT_CSS_MODES } from '../../consts/subcomponentCssModes.enum';

export default class SettingsManager {

  private static resetCss(subcomponentProperties: SubcomponentProperties, activeMode: SUB_COMPONENT_CSS_MODES): void {
    subcomponentProperties.customCss[activeMode] = { ...subcomponentProperties.initialCss[activeMode] };
  }

  static resetComponentProperties(component: WorkshopComponent, activeMode: SUB_COMPONENT_CSS_MODES): void {
    const { subcomponents, subcomponentsActiveMode } = component;
    this.resetCss(subcomponents[subcomponentsActiveMode], activeMode);
  }
}
  