import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';

export class ChildComponentCountLimitStateUtils {

  public static isCurrentCountHigherThanMin(component: WorkshopComponent): boolean {
    const { containerComponent: { childComponentHandlers: { addRemoveButtonSuppState } }, type } = component;
    const { childComponentCountLimitsState } = addRemoveButtonSuppState || {};
    if (!childComponentCountLimitsState || childComponentCountLimitsState.min === undefined) return true;
    const { min, current } = childComponentCountLimitsState;
    return min[type] < current[type];
  }
}
