import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { UniqueSubcomponentNameGenerator } from '../../../componentGenerator/uniqueSubcomponentNameGenerator';
import { NewImportedComponentProperties } from '../../../../../../../interfaces/addNewSubcomponent';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { EntityDisplayStatusUtils } from '../../../entityDisplayStatus/entityDisplayStatusUtils';
import { ImportedComponentGenerator } from '../../../importComponent/importedComponentGenerator';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { Layer } from '../../../../../../../interfaces/componentPreviewStructure';
import { layer } from '../../../../newComponent/types/layers/properties/layer';
import PreviewStructure from '../../../componentGenerator/previewStructure';
import { AddNewSubcomponentShared } from './addNewSubcomponentShared';

export class AddNewLayerSubcomponent extends AddNewSubcomponentShared {

  private static readonly componentTypeToGenerator: { [key in SUBCOMPONENT_TYPES]?: ComponentGenerator } = {
    [SUBCOMPONENT_TYPES.LAYER]: layer,
  }

  private static updateComponentPreviewStructure(currentlySelectedComponent: WorkshopComponent, newSubcomponentProperties: NewImportedComponentProperties,
      layerBaseSubcomponent: SubcomponentProperties): void {
    currentlySelectedComponent.componentPreviewStructure.subcomponentDropdownStructure[CORE_SUBCOMPONENTS_NAMES.BASE] = {
      ...currentlySelectedComponent.componentPreviewStructure.subcomponentDropdownStructure[CORE_SUBCOMPONENTS_NAMES.BASE],
      [newSubcomponentProperties.baseName]: { 
        ...EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(layerBaseSubcomponent.subcomponentDisplayStatus),
      },
    }
  }

  private static addNewSubcomponentToBase(currentlySelectedComponent: WorkshopComponent, layer: Layer): void {
    currentlySelectedComponent.componentPreviewStructure.layers.push(layer);
  }

  private static createNewImportedComponent(parentSubcomponentType: SUBCOMPONENT_TYPES): NewImportedComponentProperties {
    const baseName = UniqueSubcomponentNameGenerator.generate(
      AddNewSubcomponentShared.subcomponentTypeToName[parentSubcomponentType]);
    const subcomponents = ImportedComponentGenerator.createImportedComponentSubcomponents(
      AddNewLayerSubcomponent.componentTypeToGenerator[parentSubcomponentType], baseName);
    return { baseName, subcomponents }
  }

  private static addNewSubcomponentToComponentPreview(currentlySelectedComponent: WorkshopComponent, newSubcomponentProperties: NewImportedComponentProperties): void {
    const layerSubcomponent = newSubcomponentProperties.subcomponents[newSubcomponentProperties.baseName];
    const layer: Layer = PreviewStructure.createEmptyLayer(newSubcomponentProperties.baseName, layerSubcomponent);
    AddNewLayerSubcomponent.addNewSubcomponentToBase(currentlySelectedComponent, layer);
    AddNewLayerSubcomponent.updateComponentPreviewStructure(currentlySelectedComponent, newSubcomponentProperties, layerSubcomponent);
  }

  public static add(currentlySelectedComponent: WorkshopComponent): NewImportedComponentProperties {
    // WORK1: should layer3 be changed to something else or would the options adjust depending on layer depth
    const newLayerSubcomponent = AddNewLayerSubcomponent.createNewImportedComponent(SUBCOMPONENT_TYPES.LAYER);
    AddNewSubcomponentShared.addNewSubcomponentsToExistingSubcomponents(currentlySelectedComponent, newLayerSubcomponent.subcomponents);
    AddNewLayerSubcomponent.addNewSubcomponentToComponentPreview(currentlySelectedComponent, newLayerSubcomponent);
    return newLayerSubcomponent;
  }
}
