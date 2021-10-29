import { ChildComponentCountLimitsState } from '../../../../../../interfaces/childComponentCountLimitsState';
import { ChildComponentCountLimitsStateShared } from './childComponentCountLimitsStateShared';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';

interface ConditionFuncContextValues {
  childComponentCountLimitsState: ChildComponentCountLimitsState;
  newComponentNamePrefix: string;
}

export class IncrementChildComponentCountLimitsState extends ChildComponentCountLimitsStateShared {

  private static isChildComponentCountAtMax(): boolean {
    const { childComponentCountLimitsState, newComponentNamePrefix } = this as any as ConditionFuncContextValues;
    return childComponentCountLimitsState.max[newComponentNamePrefix]
      && childComponentCountLimitsState.current[newComponentNamePrefix] >= childComponentCountLimitsState.max[newComponentNamePrefix];
  }

  private static incrementCurrentCount(childComponentCountLimitsState: ChildComponentCountLimitsState, newComponentNamePrefix: string): void {
    if (childComponentCountLimitsState.current === undefined) {
      childComponentCountLimitsState.current = { [newComponentNamePrefix]: 1 }; 
    } else if (childComponentCountLimitsState.current[newComponentNamePrefix] === undefined) {
      childComponentCountLimitsState.current[newComponentNamePrefix] = 1; 
    } else {
      childComponentCountLimitsState.current[newComponentNamePrefix] += 1;
    }
  }

  public static increment(parentComponent: WorkshopComponent, newComponentNamePrefix: string): void {
    const { childComponentCountLimitsState: childComponentCountLimitsState } = parentComponent.newChildComponents?.dropdown || {};
    if (childComponentCountLimitsState) {
      IncrementChildComponentCountLimitsState.incrementCurrentCount(childComponentCountLimitsState, newComponentNamePrefix);
      ChildComponentCountLimitsStateShared.setAddPreviewDropdownItemStateIfConditionMet(
        IncrementChildComponentCountLimitsState.isChildComponentCountAtMax.bind({ childComponentCountLimitsState, newComponentNamePrefix } as ConditionFuncContextValues),
        parentComponent, newComponentNamePrefix, false);
    }
  }
}
