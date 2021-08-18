import { DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../../interfaces/dropdownOptionDisplayStatus';
import { Subcomponents, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { NestedComponentCount } from '../../../../../../interfaces/nestedComponentCount';

export class DecrementNestedComponentCount {

  private static disableAddPreviewDropdownOptionIfAtMax(nestedComponentCount: NestedComponentCount, subcomponents: Subcomponents,
      nestedComponentBaseName: string, parentSubcomponentName: string): void {
    if (nestedComponentCount.max[nestedComponentBaseName]
        && nestedComponentCount.current[nestedComponentBaseName] < nestedComponentCount.max[nestedComponentBaseName]) {
      subcomponents[parentSubcomponentName].newNestedComponentsOptions[nestedComponentBaseName] = { [DROPDOWN_OPTION_AUX_DETAILS_REF]: { isEnabled: true } };
    }
  }

  private static decrementCurrentCount(nestedComponentCount: NestedComponentCount, nestedComponentBaseName: string): void {
    nestedComponentCount.current[nestedComponentBaseName] -= 1;
  }

  public static decrement(activeNestedComponent: WorkshopComponent, nestedComponentBaseName: string, parentSubcomponentName: string): void {
    // the auxiliary component's nested components currently all referto the auxiliary base
    const { nestedComponentCount, subcomponents } = activeNestedComponent.auxiliaryComponent || activeNestedComponent;
    if (nestedComponentCount) {
      DecrementNestedComponentCount.decrementCurrentCount(nestedComponentCount, nestedComponentBaseName);
      DecrementNestedComponentCount.disableAddPreviewDropdownOptionIfAtMax(nestedComponentCount, subcomponents,
        nestedComponentBaseName, parentSubcomponentName);
    }
  }
}
