import { AlignedSections, BaseSubcomponentRef, Layer } from '../../../../../../interfaces/componentPreviewStructure';
import { UpdateContainerComponentDropdownUtils } from './updateContainerComponentDropdownUtils';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { OptionDataMaps } from '../../../../../../interfaces/updateDropdownOptionNames';
import ComponentTraversalUtils from '../../componentTraversal/componentTraversalUtils';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { UpdateDropdownOptionNamesShared } from './updateDropdownOptionNamesShared';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ActiveComponentUtils } from '../../activeComponent/activeComponentUtils';

export class UpdateGenericComponentDropdownOptionNames extends UpdateDropdownOptionNamesShared {

  private static updateLayerChildOptions(containerComponent: WorkshopComponent, containerDropdownStructure: NestedDropdownStructure,
      alignedSections: AlignedSections, optionDataMaps: OptionDataMaps, overwrittenOptionNames: string[], newDrodpownNames: string[],
      overwrittenDropdownStructures: NestedDropdownStructure): void {
    const alignedSectionsKeys = Object.keys(alignedSections);
    for (let i = 0; i < alignedSectionsKeys.length; i += 1) {
      const section = alignedSections[alignedSectionsKeys[i]];
      for (let j = 0; j < section.length; j += 1) {
        UpdateContainerComponentDropdownUtils.updateOptionNames(containerComponent, optionDataMaps, containerDropdownStructure,
          overwrittenOptionNames, newDrodpownNames, (section[j] as BaseSubcomponentRef).subcomponentProperties.name,
          overwrittenDropdownStructures);
      }
    }
  }

  public static updateViaParentLayerDropdownStructure(containerComponent: WorkshopComponent, containerDropdownStructure: NestedDropdownStructure,
      alignedSections: AlignedSections): void {
    const { optionDataMaps, stateObjects: { overwrittenOptionNames, newDrodpownNames, overwrittenDropdownStructures },
      } = UpdateContainerComponentDropdownUtils.generateOptionUpdateInitializationObjects(containerDropdownStructure);
    UpdateGenericComponentDropdownOptionNames.updateLayerChildOptions(containerComponent, containerDropdownStructure, alignedSections,
      optionDataMaps, overwrittenOptionNames, newDrodpownNames, overwrittenDropdownStructures);
    UpdateContainerComponentDropdownUtils.removeOldOptionNames(overwrittenOptionNames, newDrodpownNames, containerDropdownStructure);
  }

  private static updateViaParentLayerIfOptionFound(masterComponent: WorkshopComponent, subcomponentDropdownStructure: NestedDropdownStructure, layerName: string,
      useArgComponentDropdownStructure: boolean, alignedSections: AlignedSections): boolean {
    const { subcomponentNameToDropdownOptionName } = masterComponent.componentPreviewStructure;
    const activeComponent = useArgComponentDropdownStructure ? masterComponent : ActiveComponentUtils.getActiveContainerComponent(masterComponent);
    const activeComponentName = activeComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name;
    const activeComponentDropdownStructure = subcomponentDropdownStructure[subcomponentNameToDropdownOptionName[activeComponentName]];
    // if there is no dropdown structure for layer, use the parent dropdown structure (e.g. button)
    const nestedStructure = activeComponentDropdownStructure[subcomponentNameToDropdownOptionName[layerName]] || activeComponentDropdownStructure;
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerDropdownStructure(masterComponent, nestedStructure, alignedSections);
    return true;
  }

  public static updateViaParentLayerPreviewStructure({ masterComponent }: WorkshopComponent, layer: Layer,
      useArgComponentStructure = false): void {
    const { subcomponentProperties: { name: layerName }, sections: { alignedSections }} = layer;
    ComponentTraversalUtils.traverseComponentDropdownStructureFromStart(masterComponent,
      UpdateGenericComponentDropdownOptionNames.updateViaParentLayerIfOptionFound, layerName, useArgComponentStructure, alignedSections);
  }
}
