import { TraverseComponentViaDropdownStructure } from '../../componentTraversal/traverseComponentViaDropdownStructure';
import { AlignedSections, BaseSubcomponentRef, Layer } from '../../../../../../interfaces/componentPreviewStructure';
import { UpdateContainerComponentDropdownUtils } from './updateContainerComponentDropdownUtils';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { ItemDataMaps } from '../../../../../../interfaces/updateDropdownItemNames';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ActiveComponentUtils } from '../../activeComponent/activeComponentUtils';
import { UpdateDropdownItemNamesShared } from './updateDropdownItemNamesShared';

export class UpdateGenericComponentDropdownItemNames extends UpdateDropdownItemNamesShared {

  private static updateLayerChildItems(masterComponent: WorkshopComponent, containerDropdownStructure: NestedDropdownStructure,
      alignedSections: AlignedSections, itemDataMaps: ItemDataMaps, overwrittenItemNames: string[], newDrodpownNames: string[],
      overwrittenDropdownStructures: NestedDropdownStructure): void {
    const alignedSectionsKeys = Object.keys(alignedSections);
    for (let i = 0; i < alignedSectionsKeys.length; i += 1) {
      const section = alignedSections[alignedSectionsKeys[i]];
      for (let j = 0; j < section.length; j += 1) {
        UpdateContainerComponentDropdownUtils.updateItemNames(masterComponent, itemDataMaps, containerDropdownStructure,
          overwrittenItemNames, newDrodpownNames, (section[j] as BaseSubcomponentRef).subcomponentProperties.name,
          overwrittenDropdownStructures);
      }
    }
  }

  public static updateViaParentLayerDropdownStructure(masterComponent: WorkshopComponent, containerDropdownStructure: NestedDropdownStructure,
      alignedSections: AlignedSections): void {
    const { itemDataMaps, stateObjects: { overwrittenItemNames, newDrodpownNames, overwrittenDropdownStructures },
      } = UpdateContainerComponentDropdownUtils.generateItemUpdateInitializationObjects(containerDropdownStructure);
    UpdateGenericComponentDropdownItemNames.updateLayerChildItems(masterComponent, containerDropdownStructure, alignedSections,
      itemDataMaps, overwrittenItemNames, newDrodpownNames, overwrittenDropdownStructures);
    UpdateContainerComponentDropdownUtils.removeOldItemNames(overwrittenItemNames, newDrodpownNames, containerDropdownStructure);
  }

  private static updateViaParentLayerIfItemFound(masterComponent: WorkshopComponent, subcomponentDropdownStructure: NestedDropdownStructure, layerName: string,
      useArgComponentDropdownStructure: boolean, alignedSections: AlignedSections): boolean {
    const { subcomponentNameToDropdownItemName } = masterComponent.componentPreviewStructure;
    const activeComponent = useArgComponentDropdownStructure ? masterComponent : ActiveComponentUtils.getActiveContainerComponent(masterComponent);
    const activeComponentName = activeComponent.baseSubcomponent.name;
    const activeComponentDropdownStructure = subcomponentDropdownStructure[subcomponentNameToDropdownItemName[activeComponentName]];
    // if there is no dropdown structure for layer, use the parent dropdown structure (e.g. button)
    const nestedStructure = activeComponentDropdownStructure[subcomponentNameToDropdownItemName[layerName]] || activeComponentDropdownStructure;
    UpdateGenericComponentDropdownItemNames.updateViaParentLayerDropdownStructure(masterComponent, nestedStructure, alignedSections);
    return true;
  }

  public static updateViaParentLayerPreviewStructure({ masterComponent }: WorkshopComponent, layer: Layer,
      useArgComponentStructure = false): void {
    const { subcomponentProperties: { name: layerName }, sections: { alignedSections }} = layer;
    TraverseComponentViaDropdownStructure.traverseUsingComponent(masterComponent,
      UpdateGenericComponentDropdownItemNames.updateViaParentLayerIfItemFound, layerName, useArgComponentStructure, alignedSections);
  }
}
