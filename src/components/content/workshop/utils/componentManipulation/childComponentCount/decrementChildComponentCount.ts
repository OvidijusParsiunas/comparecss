import { ChildComponentCount } from '../../../../../../interfaces/childComponentCount';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ChildComponentCountShared } from './childComponentCountShared';
import { StringUtils } from '../../generic/stringUtils';

interface ConditionFuncContextValues {
  childComponentCount: ChildComponentCount;
  removedSubcomponentNamePrefix: string;
}

export class DecrementChildComponentCount extends ChildComponentCountShared {

  private static isChildComponentCountLowerThanMax(): boolean {
    const { childComponentCount, removedSubcomponentNamePrefix } = this as any as ConditionFuncContextValues;
    return childComponentCount.max[removedSubcomponentNamePrefix]
      && childComponentCount.current[removedSubcomponentNamePrefix] < childComponentCount.max[removedSubcomponentNamePrefix];
  }

  private static decrementCurrentCount(childComponentCount: ChildComponentCount, removedSubcomponentNamePrefix: string): void {
    childComponentCount.current[removedSubcomponentNamePrefix] -= 1;
  }

  public static decrement(parentComponent: WorkshopComponent, removedChildComponentBaseName: string): void {
    // if temp component
    if (!parentComponent || !parentComponent.masterComponent) return;
    const { childComponentCount } = parentComponent;
    if (childComponentCount) {
      const removedSubcomponentNamePrefix = StringUtils.getFirstWordInString(removedChildComponentBaseName);
      DecrementChildComponentCount.decrementCurrentCount(childComponentCount, removedSubcomponentNamePrefix);
      ChildComponentCountShared.setAddPreviewDropdownItemStateIfConditionMet(
        DecrementChildComponentCount.isChildComponentCountLowerThanMax.bind({ childComponentCount, removedSubcomponentNamePrefix } as ConditionFuncContextValues),
        parentComponent.baseSubcomponent, 
        removedSubcomponentNamePrefix, true);
    }
  }
}
