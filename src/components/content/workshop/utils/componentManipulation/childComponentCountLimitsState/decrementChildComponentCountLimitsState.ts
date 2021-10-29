import { ChildComponentCountLimitsState } from '../../../../../../interfaces/childComponentCountLimitsState';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ChildComponentCountLimitsStateShared } from './childComponentCountLimitsStateShared';
import { StringUtils } from '../../generic/stringUtils';

interface ConditionFuncContextValues {
  childComponentLimitsState: ChildComponentCountLimitsState;
  removedSubcomponentNamePrefix: string;
}

export class DecrementChildComponentCountLimitsState extends ChildComponentCountLimitsStateShared {

  private static isChildComponentCountLowerThanMax(): boolean {
    const { childComponentLimitsState, removedSubcomponentNamePrefix } = this as any as ConditionFuncContextValues;
    return childComponentLimitsState.max[removedSubcomponentNamePrefix]
      && childComponentLimitsState.current[removedSubcomponentNamePrefix] < childComponentLimitsState.max[removedSubcomponentNamePrefix];
  }

  private static decrementCurrentCount(childComponentLimitsState: ChildComponentCountLimitsState, removedSubcomponentNamePrefix: string): void {
    childComponentLimitsState.current[removedSubcomponentNamePrefix] -= 1;
  }

  public static decrement(parentComponent: WorkshopComponent, removedChildComponentBaseName: string): void {
    // if temp component
    if (!parentComponent || !parentComponent.masterComponent) return;
    const { childComponentCountLimitsState: childComponentLimitsState } = parentComponent.newChildComponents?.dropdown || {};
    if (childComponentLimitsState) {
      const removedSubcomponentNamePrefix = StringUtils.getFirstWordInString(removedChildComponentBaseName);
      DecrementChildComponentCountLimitsState.decrementCurrentCount(childComponentLimitsState, removedSubcomponentNamePrefix);
      ChildComponentCountLimitsStateShared.setAddPreviewDropdownItemStateIfConditionMet(
        DecrementChildComponentCountLimitsState.isChildComponentCountLowerThanMax.bind({ childComponentLimitsState, removedSubcomponentNamePrefix } as ConditionFuncContextValues),
        parentComponent, removedSubcomponentNamePrefix, true);
    }
  }
}
