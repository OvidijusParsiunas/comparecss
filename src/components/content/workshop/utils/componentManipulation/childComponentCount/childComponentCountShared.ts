import { DROPDOWN_ITEM_AUX_DETAILS_REF } from '../../../../../../interfaces/dropdownItemDisplayStatus';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';

export class ChildComponentCountShared {
  
  private static enable(newChildComponentsItems: NestedDropdownStructure, removedSubcomponentNamePrefix: string, isEnabled: boolean): void {
    if (newChildComponentsItems?.hasOwnProperty(removedSubcomponentNamePrefix)) {
      newChildComponentsItems[removedSubcomponentNamePrefix] = { [DROPDOWN_ITEM_AUX_DETAILS_REF]: { isEnabled } };
    }
  }

  // When parent component is a container:
  // container components can maintain the count of child component types across all of their layers, hence when a child is added/removed,
  // this change can be reflected in the layer newChildComponentsItems obejct values
  // however the count of container components cannot affect the ones inside layer components
  protected static setAddPreviewDropdownItemStateIfConditionMet(conditionFunc: () => boolean,
      parentBaseSubcomponent: SubcomponentProperties, newComponentNamePrefix: string, isEnabled: boolean): void {
    if (conditionFunc()) {
      ChildComponentCountShared.enable(parentBaseSubcomponent.newChildComponentsItems, newComponentNamePrefix, isEnabled);
      ChildComponentCountShared.enable(parentBaseSubcomponent.seedComponent.newChildComponentsItemsRefs?.layer,
        newComponentNamePrefix, isEnabled);
    }
  }
}
