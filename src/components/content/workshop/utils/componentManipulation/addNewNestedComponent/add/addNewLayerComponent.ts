import { NESTED_SUBCOMPONENTS_BASE_NAMES, PARENT_SUBCOMPONENT_NAME } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { DropdownOptionsDisplayStatusUtils } from '../../../dropdownOptionsDisplayStatusUtils/dropdownOptionsDisplayStatusUtils';
import { componentTypeToStyleGenerators } from '../../../../newComponent/types/componentTypeToStyleGenerators';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { UniqueSubcomponentNameGenerator } from '../../../componentGenerator/uniqueSubcomponentNameGenerator';
import { OverwritePropertiesFunc } from '../../../../../../../interfaces/overwriteSubcomponentPropertiesFunc';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections.enum';
import { UpdateLayerComponentNames } from '../../updateNestedComponentNames/updateLayerComponentNames';
import { AlignedSections, Layer } from '../../../../../../../interfaces/componentPreviewStructure';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { COMPONENT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { AddNewNestedComponentShared } from './addNewNestedComponentShared';
import { JsUtils } from '../../../../../../../services/jsUtils/jsUtils';

export class AddNewLayerComponent extends AddNewNestedComponentShared {

  private static updateComponentDropdownStructure(parentComponent: WorkshopComponent, newComponentBaseName: string): void {
    const newComponentDropdownStructure = { [newComponentBaseName]: { 
      ...DropdownOptionsDisplayStatusUtils.createDropdownOptionDisplayStatusReferenceObject(),
    }};
    const parentComponentDropdownStructure = parentComponent.componentPreviewStructure.subcomponentDropdownStructure;
    JsUtils.addObjects(parentComponentDropdownStructure, PARENT_SUBCOMPONENT_NAME.BASE, newComponentDropdownStructure);
  }

  private static addNewSubcomponentToBase(parentComponent: WorkshopComponent, layer: Layer): void {
    parentComponent.componentPreviewStructure.layers.push(layer);
  }

  private static createEmptyAlignedSections(): AlignedSections {
    return {
      [ALIGNED_SECTION_TYPES.LEFT]: [],
      [ALIGNED_SECTION_TYPES.CENTER]: [],
      [ALIGNED_SECTION_TYPES.RIGHT]: [],
    }
  }

  private static createEmptyLayer(layerName: string, layerSubcomponent: SubcomponentProperties): Layer {
    const layerSections = layerSubcomponent.layerSectionsType === LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS
      ? AddNewLayerComponent.createEmptyAlignedSections() : [];
    return {
      name: layerName,
      subcomponentProperties: layerSubcomponent,
      sections: {
        [layerSubcomponent.layerSectionsType]: layerSections,
      }
    };
  }

  private static addNewComponentToComponentPreview(parentComponent: WorkshopComponent, newComponent: WorkshopComponent,
      isEditable: boolean): void {
    const { base: newComponentBaseName } = newComponent.coreSubcomponentNames;
    const layerSubcomponent = newComponent.subcomponents[newComponentBaseName];
    const layer: Layer = AddNewLayerComponent.createEmptyLayer(newComponentBaseName, layerSubcomponent);
    AddNewLayerComponent.addNewSubcomponentToBase(parentComponent, layer);
    if (isEditable) {
      AddNewLayerComponent.updateComponentDropdownStructure(parentComponent, newComponentBaseName);
    }
  }

  protected static createNewComponent(componentGenerator: ComponentGenerator, overwritePropertiesFunc?: OverwritePropertiesFunc): WorkshopComponent {
    const baseName = UniqueSubcomponentNameGenerator.generate(NESTED_SUBCOMPONENTS_BASE_NAMES.LAYER);
    const subcomponents = AddNewNestedComponentShared.createNewComponentSubcomponents(componentGenerator, baseName);
    const { coreSubcomponentNames } = subcomponents[baseName].nestedComponent.ref;
    if (overwritePropertiesFunc) overwritePropertiesFunc(subcomponents, coreSubcomponentNames);
    return subcomponents[baseName].nestedComponent.ref;
  }

  public static add(parentComponent: WorkshopComponent, componentStyle: COMPONENT_STYLES, isEditable: boolean,
      overwritePropertiesFunc?: OverwritePropertiesFunc): WorkshopComponent {
    const componentGenerator = componentTypeToStyleGenerators[COMPONENT_TYPES.LAYER][componentStyle];
    const newLayerComponent = AddNewLayerComponent.createNewComponent(componentGenerator, overwritePropertiesFunc);
    JsUtils.addObjects(parentComponent, 'subcomponents', newLayerComponent.subcomponents);
    AddNewLayerComponent.addNewComponentToComponentPreview(parentComponent, newLayerComponent, isEditable);
    // WORK2: check if this is needed
    const { coreSubcomponentNames: { base }, componentPreviewStructure: { subcomponentDropdownStructure } } = parentComponent;
    const layerComponents = subcomponentDropdownStructure[base];
    const layerComponentsNames = Object.keys(layerComponents);
    const newIndex = layerComponentsNames.length - 1 === 1 ? layerComponentsNames.length - 1 : layerComponentsNames.length;
    UpdateLayerComponentNames.update(parentComponent, newIndex);
    return newLayerComponent;
  }
}
