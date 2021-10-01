import { ChildComponentCount } from '../../../../../../interfaces/childComponentCount';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ChildComponentCountShared } from './childComponentCountShared';

interface ConditionFuncContextValues {
  childComponentCount: ChildComponentCount;
  newComponentNamePrefix: string;
}

export class IncrementChildComponentCount extends ChildComponentCountShared {

  private static isChildComponentCountAtMax(): boolean {
    const { childComponentCount, newComponentNamePrefix } = this as any as ConditionFuncContextValues;
    return childComponentCount.max[newComponentNamePrefix]
      && childComponentCount.current[newComponentNamePrefix] >= childComponentCount.max[newComponentNamePrefix];
  }

  private static incrementCurrentCount(childComponentCount: ChildComponentCount, newComponentNamePrefix: string): void {
    if (childComponentCount.current === undefined) {
      childComponentCount.current = { [newComponentNamePrefix]: 1 }; 
    } else if (childComponentCount.current[newComponentNamePrefix] === undefined) {
      childComponentCount.current[newComponentNamePrefix] = 1; 
    } else {
      childComponentCount.current[newComponentNamePrefix] += 1;
    }
  }

  public static increment(parentComponent: WorkshopComponent, newComponentNamePrefix: string): void {
    const { childComponentCount } = parentComponent;
    if (childComponentCount) {
      IncrementChildComponentCount.incrementCurrentCount(childComponentCount, newComponentNamePrefix);
      ChildComponentCountShared.setAddPreviewDropdownItemStateIfConditionMet(
        IncrementChildComponentCount.isChildComponentCountAtMax.bind({ childComponentCount, newComponentNamePrefix } as ConditionFuncContextValues),
        parentComponent.baseSubcomponent, 
        newComponentNamePrefix, false);
    }
  }
}
