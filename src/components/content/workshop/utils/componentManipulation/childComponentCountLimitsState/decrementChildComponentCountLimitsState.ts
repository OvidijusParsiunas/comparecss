import { ChildComponentCountLimitsState } from '../../../../../../interfaces/childComponentCountLimitsState';
import { ChildComponentCountLimitsStateShared } from './childComponentCountLimitsStateShared';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { StringUtils } from '../../generic/stringUtils';

interface ConditionFuncContextValues {
  childComponentCountLimitsState: ChildComponentCountLimitsState;
  removedSubcomponentNamePrefix: string;
}

// no need to check min here because the child component removal button will not be available
export class DecrementChildComponentCountLimitsState extends ChildComponentCountLimitsStateShared {

  private static isChildComponentCountLowerThanMax(): boolean {
    const { childComponentCountLimitsState, removedSubcomponentNamePrefix } = this as any as ConditionFuncContextValues;
    return childComponentCountLimitsState.max?.[removedSubcomponentNamePrefix]
      && childComponentCountLimitsState.current[removedSubcomponentNamePrefix] < childComponentCountLimitsState.max[removedSubcomponentNamePrefix];
  }

  private static decrementCurrentCount(childComponentCountLimitsState: ChildComponentCountLimitsState, removedSubcomponentNamePrefix: string): void {
    childComponentCountLimitsState.current[removedSubcomponentNamePrefix] -= 1;
  }

  public static decrement(parentComponent: WorkshopComponent, removedChildComponentBaseName: string): void {
    // if temp component
    if (!parentComponent || !parentComponent.masterComponent) return;
    const { childComponentCountLimitsState } = parentComponent.childComponentHandlers.addRemoveButtonSuppState || {};
    if (childComponentCountLimitsState) {
      const removedSubcomponentNamePrefix = StringUtils.getFirstWordInString(removedChildComponentBaseName);
      DecrementChildComponentCountLimitsState.decrementCurrentCount(childComponentCountLimitsState, removedSubcomponentNamePrefix);
      ChildComponentCountLimitsStateShared.setAddPreviewDropdownItemStateIfConditionMet(
        DecrementChildComponentCountLimitsState.isChildComponentCountLowerThanMax.bind({ childComponentCountLimitsState, removedSubcomponentNamePrefix } as ConditionFuncContextValues),
        parentComponent, removedSubcomponentNamePrefix, true);
    }
  }
}
