import { DROPDOWN_ITEM_AUX_DETAILS_REF } from '../../../../../../interfaces/dropdownItemDisplayStatus';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';

export class ChildComponentCountLimitsStateShared {
  
  private static setItemState(drpopdownItems: NestedDropdownStructure, removedSubcomponentNamePrefix: string, isEnabled: boolean): void {
    if (drpopdownItems?.hasOwnProperty(removedSubcomponentNamePrefix)) {
      drpopdownItems[removedSubcomponentNamePrefix] = { [DROPDOWN_ITEM_AUX_DETAILS_REF]: { isEnabled } };
    }
  }

  // When parent component is a container:
  // container components can maintain the count of child component types across all of their layers, hence when a child is added/removed,
  // this change can be reflected in the layer drpopdownItems obejct values
  // however the count of container components cannot affect the ones inside layer components
  protected static setAddPreviewDropdownItemStateIfConditionMet(conditionFunc: () => boolean,
      parentComponent: WorkshopComponent, newComponentNamePrefix: string, isEnabled: boolean): void {
    if (conditionFunc()) {
      const { newChildComponents: { addRemoveFunctionality: { dropdownItems, sharedDropdownItemsRefs } } } = parentComponent;
      ChildComponentCountLimitsStateShared.setItemState(dropdownItems, newComponentNamePrefix, isEnabled);
      ChildComponentCountLimitsStateShared.setItemState(sharedDropdownItemsRefs?.layer, newComponentNamePrefix, isEnabled);
    }
  }
}
