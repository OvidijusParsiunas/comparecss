import { CustomStaticFeatures, Subcomponent } from '../../../../../../../interfaces/workshopComponent';

export class SelectButtonUtils {

  private static unselectCurrentButton(customStaticFeatures: CustomStaticFeatures): void {
    customStaticFeatures.selectedChildComponent.baseSubcomponent.customStaticFeatures.isCurrentlySelected = false;
  }

  private static setNewSelectedComponentOnButtonGroup(buttonBaseSubcomponent: Subcomponent): void {
    const { customStaticFeatures } = buttonBaseSubcomponent.seedComponent.containerComponent.baseSubcomponent;
    SelectButtonUtils.unselectCurrentButton(customStaticFeatures);
    customStaticFeatures.selectedChildComponent = buttonBaseSubcomponent.seedComponent;
  }

  public static select(buttonBaseSubcomponent: Subcomponent): void {
    SelectButtonUtils.setNewSelectedComponentOnButtonGroup(buttonBaseSubcomponent);
    buttonBaseSubcomponent.customStaticFeatures.isCurrentlySelected = true;
  }
}
