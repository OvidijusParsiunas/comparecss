import { TraverseComponentViaDropdownStructure } from '../../componentTraversal/traverseComponentViaDropdownStructure';
import { AlignmentSectionToSubcomponents, Layer } from '../../../../../../interfaces/componentPreviewStructure';
import { Subcomponent, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { UpdateContainerComponentDropdownUtils } from './updateContainerComponentDropdownUtils';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { ItemDataMaps } from '../../../../../../interfaces/updateDropdownItemNames';
import { ActiveComponentUtils } from '../../activeComponent/activeComponentUtils';
import { UpdateDropdownItemNamesShared } from './updateDropdownItemNamesShared';

export class UpdateContainerComponentDropdownItemNames extends UpdateDropdownItemNamesShared {

  private static updateLayerChildItems(masterComponent: WorkshopComponent, containerDropdownStructure: NestedDropdownStructure,
      alignmentSectionToSubcomponents: AlignmentSectionToSubcomponents, itemDataMaps: ItemDataMaps, overwrittenItemNames: string[],
      newDrodpownNames: string[], overwrittenDropdownStructures: NestedDropdownStructure): void {
    const alignmentSections = Object.keys(alignmentSectionToSubcomponents);
    for (let i = 0; i < alignmentSections.length; i += 1) {
      const alignmentType = alignmentSectionToSubcomponents[alignmentSections[i]];
      for (let j = 0; j < alignmentType.length; j += 1) {
        UpdateContainerComponentDropdownUtils.updateItemNames(masterComponent, itemDataMaps, containerDropdownStructure,
          overwrittenItemNames, newDrodpownNames, (alignmentType[j] as Subcomponent).name, overwrittenDropdownStructures);
      }
    }
  }

  public static updateViaParentLayerDropdownStructure(masterComponent: WorkshopComponent, containerDropdownStructure: NestedDropdownStructure,
      alignmentSectionToSubcomponents: AlignmentSectionToSubcomponents): void {
    const { itemDataMaps, stateObjects: { overwrittenItemNames, newDrodpownNames, overwrittenDropdownStructures },
      } = UpdateContainerComponentDropdownUtils.generateItemUpdateInitializationObjects(containerDropdownStructure);
    UpdateContainerComponentDropdownItemNames.updateLayerChildItems(masterComponent, containerDropdownStructure, alignmentSectionToSubcomponents,
      itemDataMaps, overwrittenItemNames, newDrodpownNames, overwrittenDropdownStructures);
    UpdateContainerComponentDropdownUtils.removeOldItemNames(overwrittenItemNames, newDrodpownNames, containerDropdownStructure);
  }

  private static updateViaParentLayerIfItemFound(masterComponent: WorkshopComponent, subcomponentDropdownStructure: NestedDropdownStructure, layerName: string,
      useArgComponentDropdownStructure: boolean, alignmentSectionToSubcomponents: AlignmentSectionToSubcomponents): boolean {
    const { subcomponentNameToDropdownItemName } = masterComponent.componentPreviewStructure;
    const activeComponent = useArgComponentDropdownStructure ? masterComponent : ActiveComponentUtils.getActiveContainerComponent(masterComponent);
    const activeComponentName = activeComponent.baseSubcomponent.name;
    const activeComponentDropdownStructure = subcomponentDropdownStructure[subcomponentNameToDropdownItemName[activeComponentName]];
    // if there is no dropdown structure for layer, use the parent dropdown structure (e.g. button)
    const nestedStructure = activeComponentDropdownStructure[subcomponentNameToDropdownItemName[layerName]] || activeComponentDropdownStructure;
    UpdateContainerComponentDropdownItemNames.updateViaParentLayerDropdownStructure(masterComponent, nestedStructure, alignmentSectionToSubcomponents);
    return true;
  }

  public static updateViaParentLayerPreviewStructure({ masterComponent }: WorkshopComponent, layer: Layer,
      useArgComponentStructure = false): void {
    const { subcomponent: { name: layerName }, alignmentSectionToSubcomponents } = layer;
    TraverseComponentViaDropdownStructure.traverseUsingComponent(masterComponent,
      UpdateContainerComponentDropdownItemNames.updateViaParentLayerIfItemFound, layerName, useArgComponentStructure, alignmentSectionToSubcomponents);
  }
}
