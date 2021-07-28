import { DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../../interfaces/dropdownOptionDisplayStatus';
import { Subcomponents, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { NestedComponentCount } from '../../../../../../interfaces/nestedComponentCount';

export class IncrementNestedComponentCount {

  private static disableAddPreviewDropdownOptionIfAtMax(nestedComponentCount: NestedComponentCount, subcomponents: Subcomponents,
      nestedComponentBaseName: string, parentSubcomponentName: string): void {
    if (nestedComponentCount.max[nestedComponentBaseName]
        && nestedComponentCount.current[nestedComponentBaseName] >= nestedComponentCount.max[nestedComponentBaseName]) {
      subcomponents[parentSubcomponentName].newNestedComponentsOptions[nestedComponentBaseName] = { [DROPDOWN_OPTION_AUX_DETAILS_REF]: { isEnabled: false } };
    }
  }

  private static incrementCurrentCount(nestedComponentCount: NestedComponentCount, nestedComponentBaseName: string): void {
    if (nestedComponentCount.current === undefined) {
      nestedComponentCount.current = { [nestedComponentBaseName]: 1 }; 
    } else if (nestedComponentCount.current[nestedComponentBaseName] === undefined) {
      nestedComponentCount.current[nestedComponentBaseName] = 1 ; 
    } else {
      nestedComponentCount.current[nestedComponentBaseName] += 1;
    }
  }

  public static increment(parentComponent: WorkshopComponent, nestedComponentBaseName: string, parentSubcomponentName: string): void {
    const { nestedComponentCount, subcomponents } = parentComponent;
    if (nestedComponentCount) {
      IncrementNestedComponentCount.incrementCurrentCount(nestedComponentCount, nestedComponentBaseName);
      IncrementNestedComponentCount.disableAddPreviewDropdownOptionIfAtMax(nestedComponentCount, subcomponents,
        nestedComponentBaseName, parentSubcomponentName);
    }
  }
}
