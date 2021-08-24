import { DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../../interfaces/dropdownOptionDisplayStatus';
import { Subcomponents, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ChildComponentCount } from '../../../../../../interfaces/childComponentCount';

export class DecrementChildComponentCount {

  private static disableAddPreviewDropdownOptionIfAtMax(childComponentCount: ChildComponentCount, subcomponents: Subcomponents,
      childComponentBaseName: string, parentSubcomponentName: string): void {
    if (childComponentCount.max[childComponentBaseName]
        && childComponentCount.current[childComponentBaseName] < childComponentCount.max[childComponentBaseName]) {
      subcomponents[parentSubcomponentName].newChildComponentsOptions[childComponentBaseName] = { [DROPDOWN_OPTION_AUX_DETAILS_REF]: { isEnabled: true } };
    }
  }

  private static decrementCurrentCount(childComponentCount: ChildComponentCount, childComponentBaseName: string): void {
    childComponentCount.current[childComponentBaseName] -= 1;
  }

  public static decrement(parentComponent: WorkshopComponent, childComponentBaseName: string, parentSubcomponentName: string): void {
    const { childComponentCount } = parentComponent;
    const { subcomponents } = parentComponent.masterComponentRef;
    if (childComponentCount) {
      DecrementChildComponentCount.decrementCurrentCount(childComponentCount, childComponentBaseName);
      DecrementChildComponentCount.disableAddPreviewDropdownOptionIfAtMax(childComponentCount, subcomponents,
        childComponentBaseName, parentSubcomponentName);
    }
  }
}
