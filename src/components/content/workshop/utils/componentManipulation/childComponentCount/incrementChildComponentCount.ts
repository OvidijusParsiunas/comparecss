import { DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../../interfaces/dropdownOptionDisplayStatus';
import { Subcomponents, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ChildComponentCount } from '../../../../../../interfaces/childComponentCount';

export class IncrementChildComponentCount {

  private static disableAddPreviewDropdownOptionIfAtMax(childComponentCount: ChildComponentCount, subcomponents: Subcomponents,
      newComponentBaseName: string, encapsulatingComponentName: string): void {
    if (childComponentCount.max[newComponentBaseName]
        && childComponentCount.current[newComponentBaseName] >= childComponentCount.max[newComponentBaseName]) {
      subcomponents[encapsulatingComponentName].newChildComponentsOptions[newComponentBaseName] = { [DROPDOWN_OPTION_AUX_DETAILS_REF]: { isEnabled: false } };
    }
  }

  private static incrementCurrentCount(childComponentCount: ChildComponentCount, newComponentBaseName: string): void {
    if (childComponentCount.current === undefined) {
      childComponentCount.current = { [newComponentBaseName]: 1 }; 
    } else if (childComponentCount.current[newComponentBaseName] === undefined) {
      childComponentCount.current[newComponentBaseName] = 1 ; 
    } else {
      childComponentCount.current[newComponentBaseName] += 1;
    }
  }

  // WORK1: rename active component parent (structure that does not allow layers) to base?
  // rename encapsulating component name to parent component
  public static increment(activeComponentParent: WorkshopComponent, newComponentBaseName: string, encapsulatingComponentName: string): void {
    console.log(encapsulatingComponentName);
    console.log(activeComponentParent);
    const { childComponentCount, subcomponents } = activeComponentParent;
    if (childComponentCount) {
      IncrementChildComponentCount.incrementCurrentCount(childComponentCount, newComponentBaseName);
      IncrementChildComponentCount.disableAddPreviewDropdownOptionIfAtMax(childComponentCount, subcomponents,
        newComponentBaseName, encapsulatingComponentName);
    }
  }
}
