import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SelectDropdownUtils } from '../selectDropdown/selectDropdownUtils';

export class DropdownRefreshUtils {
  
  private static onComponentLeave(cardBaseComponent: WorkshopComponent): void {
    SelectDropdownUtils.refreshAllDropdowns(cardBaseComponent, true);
  }

  public static setOnComponentLeaveFunc(baseComponent: WorkshopComponent): void {
    baseComponent.componentSwitchFuncs = {
      onLeave: DropdownRefreshUtils.onComponentLeave,
    };
  }
}
