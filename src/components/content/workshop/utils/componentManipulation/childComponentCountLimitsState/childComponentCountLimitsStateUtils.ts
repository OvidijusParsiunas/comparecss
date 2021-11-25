import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';

export class ChildComponentCountLimitStateUtils {

  public static isCurrentCountHigherThanMin(component: WorkshopComponent): boolean {
    const { childComponentCountLimitsState } = component.newChildComponents.addRemoveFunctionality || {};
    if (!childComponentCountLimitsState || childComponentCountLimitsState.min === undefined) return true;
    const { min, current } = component.newChildComponents.addRemoveFunctionality.childComponentCountLimitsState;
    const { type } = component;
    return min[type] < current[type];
  }
}
