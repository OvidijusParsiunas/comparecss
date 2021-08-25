import { DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../../interfaces/dropdownOptionDisplayStatus';
import { Subcomponents, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ChildComponentCount } from '../../../../../../interfaces/childComponentCount';

export class DecrementChildComponentCount {

  private static disableAddPreviewDropdownOptionIfAtMax(childComponentCount: ChildComponentCount, subcomponents: Subcomponents,
      newComponentBaseName: string, parentSubcomponentName: string): void {
    if (childComponentCount.max[newComponentBaseName]
        && childComponentCount.current[newComponentBaseName] < childComponentCount.max[newComponentBaseName]) {
      subcomponents[parentSubcomponentName].newChildComponentsOptions[newComponentBaseName] = { [DROPDOWN_OPTION_AUX_DETAILS_REF]: { isEnabled: true } };
    }
  }

  private static decrementCurrentCount(childComponentCount: ChildComponentCount, newComponentBaseName: string): void {
    childComponentCount.current[newComponentBaseName] -= 1;
  }

  public static decrement(parentComponent: WorkshopComponent, newComponentBaseName: string, parentSubcomponentName: string): void {
    const { childComponentCount, masterComponent: { subcomponents } } = parentComponent;
    if (childComponentCount) {
      DecrementChildComponentCount.decrementCurrentCount(childComponentCount, newComponentBaseName);
      DecrementChildComponentCount.disableAddPreviewDropdownOptionIfAtMax(childComponentCount, subcomponents,
        newComponentBaseName, parentSubcomponentName);
    }
  }
}
