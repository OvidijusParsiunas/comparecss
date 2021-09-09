import { DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../../interfaces/dropdownOptionDisplayStatus';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';

export class ChildComponentCountShared {
  
  private static enable(newChildComponentsOptions: NestedDropdownStructure, removedSubcomponentNamePrefix: string, isEnabled: boolean): void {
    if (newChildComponentsOptions?.hasOwnProperty(removedSubcomponentNamePrefix)) {
      newChildComponentsOptions[removedSubcomponentNamePrefix] = { [DROPDOWN_OPTION_AUX_DETAILS_REF]: { isEnabled } };
    }
  }

  // When parent component is a container:
  // container components can maintain the count of child component types across all of their layers, hence when a child is added/removed,
  // this change can be reflected in the layer newChildComponentsOptions obejct values
  // however the count of container components cannot affect the ones inside layer components
  protected static setAddPreviewDropdownOptionStateIfConditionMet(conditionFunc: () => boolean,
      parentBaseSubcomponent: SubcomponentProperties, newComponentNamePrefix: string, isEnabled: boolean): void {
    if (conditionFunc()) {
      ChildComponentCountShared.enable(parentBaseSubcomponent.newChildComponentsOptions, newComponentNamePrefix, isEnabled);
      ChildComponentCountShared.enable(parentBaseSubcomponent.seedComponent.newChildComponentsOptionsRefs?.layer,
        newComponentNamePrefix, isEnabled);
    }
  }
}
