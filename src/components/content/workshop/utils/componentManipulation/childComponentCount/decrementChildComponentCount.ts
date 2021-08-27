import { ChildComponentCount } from '../../../../../../interfaces/childComponentCount';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ChildComponentCountShared } from './childComponentCountShared';
import { StringUtils } from '../../generic/stringUtils';

interface ConditionFuncContextValues {
  childComponentCount: ChildComponentCount;
  removeSubcomponentNamePrefix: string;
}

export class DecrementChildComponentCount extends ChildComponentCountShared {

  private static isChildComponentCountLowerThanMax(): boolean {
    const { childComponentCount, removeSubcomponentNamePrefix } = this as any as ConditionFuncContextValues;
    return childComponentCount.max[removeSubcomponentNamePrefix]
      && childComponentCount.current[removeSubcomponentNamePrefix] < childComponentCount.max[removeSubcomponentNamePrefix];
  }

  private static decrementCurrentCount(childComponentCount: ChildComponentCount, removeSubcomponentNamePrefix: string): void {
    childComponentCount.current[removeSubcomponentNamePrefix] -= 1;
  }

  public static decrement(parentComponent: WorkshopComponent, removedSubomponentBaseName: string): void {
    // if temp component
    if (!parentComponent || !parentComponent.masterComponent) return;
    const { childComponentCount } = parentComponent;
    if (childComponentCount) {
      const removeSubcomponentNamePrefix = StringUtils.getFirstWordInString(removedSubomponentBaseName);
      DecrementChildComponentCount.decrementCurrentCount(childComponentCount, removeSubcomponentNamePrefix);
      ChildComponentCountShared.setAddPreviewDropdownOptionStateIfConditionMet(
        DecrementChildComponentCount.isChildComponentCountLowerThanMax.bind({ childComponentCount, removeSubcomponentNamePrefix } as ConditionFuncContextValues),
        parentComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE], 
        removeSubcomponentNamePrefix, true);
    }
  }
}
