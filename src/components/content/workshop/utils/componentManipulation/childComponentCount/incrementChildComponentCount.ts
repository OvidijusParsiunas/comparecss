import { DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../../interfaces/dropdownOptionDisplayStatus';
import { Subcomponents, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ChildComponentCount } from '../../../../../../interfaces/childComponentCount';

export class IncrementChildComponentCount {

  private static disableAddPreviewDropdownOptionIfAtMax(childComponentCount: ChildComponentCount, subcomponents: Subcomponents,
      childComponentBaseName: string, parentSubcomponentName: string): void {
    if (childComponentCount.max[childComponentBaseName]
        && childComponentCount.current[childComponentBaseName] >= childComponentCount.max[childComponentBaseName]) {
      subcomponents[parentSubcomponentName].newChildComponentsOptions[childComponentBaseName] = { [DROPDOWN_OPTION_AUX_DETAILS_REF]: { isEnabled: false } };
    }
  }

  private static incrementCurrentCount(childComponentCount: ChildComponentCount, childComponentBaseName: string): void {
    if (childComponentCount.current === undefined) {
      childComponentCount.current = { [childComponentBaseName]: 1 }; 
    } else if (childComponentCount.current[childComponentBaseName] === undefined) {
      childComponentCount.current[childComponentBaseName] = 1 ; 
    } else {
      childComponentCount.current[childComponentBaseName] += 1;
    }
  }

  public static increment(parentComponent: WorkshopComponent, childComponentBaseName: string, parentSubcomponentName: string): void {
    const { childComponentCount, subcomponents } = parentComponent;
    if (childComponentCount) {
      IncrementChildComponentCount.incrementCurrentCount(childComponentCount, childComponentBaseName);
      IncrementChildComponentCount.disableAddPreviewDropdownOptionIfAtMax(childComponentCount, subcomponents,
        childComponentBaseName, parentSubcomponentName);
    }
  }
}
