import { NESTED_SUBCOMPONENTS_BASE_NAMES, PARENT_SUBCOMPONENT_NAME } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { NewComponentProperties, OverwritePropertiesFunc } from '../../../../../../../interfaces/addNewSubcomponent';
import { componentTypeToStyleGenerators } from '../../../../newComponent/types/componentTypeToStyleGenerators';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { UniqueSubcomponentNameGenerator } from '../../../componentGenerator/uniqueSubcomponentNameGenerator';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections.enum';
import { AlignedSections, Layer } from '../../../../../../../interfaces/componentPreviewStructure';
import { EntityDisplayStatusUtils } from '../../../entityDisplayStatus/entityDisplayStatusUtils';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { COMPONENT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { AddNewNestedComponentShared } from './addNewNestedComponentShared';
import { JsUtils } from '../../../../../../../services/jsUtils/jsUtils';

export class AddNewLayerComponent extends AddNewNestedComponentShared {

  private static updateComponentPreviewStructure(parentComponent: WorkshopComponent, newSubcomponentProperties: NewComponentProperties,
      layerBaseSubcomponent: SubcomponentProperties): void {
    const newNestedDropdownStructure = { [newSubcomponentProperties.baseName]: { 
      ...EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(layerBaseSubcomponent.subcomponentDisplayStatus),
    }};
    const parentSubcomponentObject = parentComponent.componentPreviewStructure.subcomponentDropdownStructure;
    JsUtils.addObjects(parentSubcomponentObject, PARENT_SUBCOMPONENT_NAME.BASE, newNestedDropdownStructure);
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

  private static addNewSubcomponentToComponentPreview(parentComponent: WorkshopComponent, newSubcomponentProperties: NewComponentProperties,
      isEditable: boolean): void {
    const layerSubcomponent = newSubcomponentProperties.subcomponents[newSubcomponentProperties.baseName];
    const layer: Layer = AddNewLayerComponent.createEmptyLayer(newSubcomponentProperties.baseName, layerSubcomponent);
    AddNewLayerComponent.addNewSubcomponentToBase(parentComponent, layer);
    if (isEditable) {
      AddNewLayerComponent.updateComponentPreviewStructure(parentComponent, newSubcomponentProperties, layerSubcomponent);
    }
  }

  protected static createNewComponent(parentComponent: WorkshopComponent, componentGenerator: ComponentGenerator,
      overwritePropertiesFunc?: OverwritePropertiesFunc): NewComponentProperties {
    const baseName = `${UniqueSubcomponentNameGenerator.generate(NESTED_SUBCOMPONENTS_BASE_NAMES.LAYER)} ${parentComponent.componentPreviewStructure.layers.length + 1}`;
    const subcomponents = AddNewNestedComponentShared.createNewComponentSubcomponents(componentGenerator, baseName);
    const { coreSubcomponentNames } = subcomponents[baseName].nestedComponent.ref;
    if (overwritePropertiesFunc) overwritePropertiesFunc(subcomponents, coreSubcomponentNames);
    return { baseName, subcomponents };
  }

  public static add(parentComponent: WorkshopComponent, componentStyle: COMPONENT_STYLES, isEditable: boolean,
      overwritePropertiesFunc?: OverwritePropertiesFunc): NewComponentProperties {
    const componentGenerator = componentTypeToStyleGenerators[COMPONENT_TYPES.LAYER][componentStyle];
    const newLayerSubcomponent = AddNewLayerComponent.createNewComponent(parentComponent, componentGenerator,
      overwritePropertiesFunc);
    JsUtils.addObjects(parentComponent, 'subcomponents', newLayerSubcomponent.subcomponents);
    AddNewLayerComponent.addNewSubcomponentToComponentPreview(parentComponent, newLayerSubcomponent, isEditable);
    return newLayerSubcomponent;
  }
}
