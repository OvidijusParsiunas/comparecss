import { TraverseComponentViaDropdownStructure } from '../../componentTraversal/traverseComponentViaDropdownStructure';
import { AlignmentSectionToComponents, Layer } from '../../../../../../interfaces/componentPreviewStructure';
import { HORIZONTAL_ALIGNMENT_SECTIONS } from '../../../../../../consts/horizontalAlignmentSections';
import { UpdateContainerComponentDropdownUtils } from './updateContainerComponentDropdownUtils';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { ItemDataMaps } from '../../../../../../interfaces/updateDropdownItemNames';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ActiveComponentUtils } from '../../activeComponent/activeComponentUtils';
import { UpdateDropdownItemNamesShared } from './updateDropdownItemNamesShared';

export class UpdateContainerComponentDropdownItemNames extends UpdateDropdownItemNamesShared {

  private static updateLayerChildItems(masterComponent: WorkshopComponent, containerDropdownStructure: NestedDropdownStructure,
      alignmentSectionToComponents: AlignmentSectionToComponents, itemDataMaps: ItemDataMaps, overwrittenItemNames: string[],
      newDrodpownNames: string[], overwrittenDropdownStructures: NestedDropdownStructure): void {
    const alignmentSections = Object.keys(alignmentSectionToComponents);
    for (let i = 0; i < alignmentSections.length; i += 1) {
      const components = alignmentSectionToComponents[alignmentSections[i] as HORIZONTAL_ALIGNMENT_SECTIONS];
      for (let j = 0; j < components.length; j += 1) {
        UpdateContainerComponentDropdownUtils.updateItemNames(masterComponent, itemDataMaps, containerDropdownStructure,
          overwrittenItemNames, newDrodpownNames, components[j].baseSubcomponent.name, overwrittenDropdownStructures);
      }
    }
  }

  public static updateViaParentLayerDropdownStructure(masterComponent: WorkshopComponent, containerDropdownStructure: NestedDropdownStructure,
      alignmentSectionToComponents: AlignmentSectionToComponents): void {
    const { itemDataMaps, stateObjects: { overwrittenItemNames, newDrodpownNames, overwrittenDropdownStructures },
      } = UpdateContainerComponentDropdownUtils.generateItemUpdateInitializationObjects(containerDropdownStructure);
    UpdateContainerComponentDropdownItemNames.updateLayerChildItems(masterComponent, containerDropdownStructure, alignmentSectionToComponents,
      itemDataMaps, overwrittenItemNames, newDrodpownNames, overwrittenDropdownStructures);
    UpdateContainerComponentDropdownUtils.removeOldItemNames(overwrittenItemNames, newDrodpownNames, containerDropdownStructure);
  }

  private static updateViaParentLayerIfItemFound(masterComponent: WorkshopComponent, subcomponentDropdownStructure: NestedDropdownStructure, layerName: string,
      useArgComponentDropdownStructure: boolean, alignedComponents: AlignmentSectionToComponents): boolean {
    const { subcomponentNameToDropdownItemName } = masterComponent.componentPreviewStructure;
    const activeComponent = useArgComponentDropdownStructure ? masterComponent : ActiveComponentUtils.getActiveContainerComponent(masterComponent);
    const activeComponentName = activeComponent.baseSubcomponent.name;
    const activeComponentDropdownStructure = subcomponentDropdownStructure[subcomponentNameToDropdownItemName[activeComponentName]];
    // if there is no dropdown structure for layer, use the parent dropdown structure (e.g. button)
    const nestedStructure = activeComponentDropdownStructure[subcomponentNameToDropdownItemName[layerName]] || activeComponentDropdownStructure;
    UpdateContainerComponentDropdownItemNames.updateViaParentLayerDropdownStructure(masterComponent, nestedStructure, alignedComponents);
    return true;
  }

  public static updateViaParentLayerPreviewStructure({ masterComponent }: WorkshopComponent, layer: Layer,
      useArgComponentStructure = false): void {
    const { subcomponent: { name: layerName }, alignmentSectionToComponents: alignedComponents } = layer;
    TraverseComponentViaDropdownStructure.traverseUsingComponent(masterComponent,
      UpdateContainerComponentDropdownItemNames.updateViaParentLayerIfItemFound, layerName, useArgComponentStructure, alignedComponents);
  }
}
