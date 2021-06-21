import { NewComponentProperties, OverwritePropertiesFunc } from '../../../../../../../interfaces/addNewSubcomponent';
import { componentTypeToStyleGenerators } from '../../../../newComponent/types/componentTypeToStyleGenerators';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { UniqueSubcomponentNameGenerator } from '../../../componentGenerator/uniqueSubcomponentNameGenerator';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { EntityDisplayStatusUtils } from '../../../entityDisplayStatus/entityDisplayStatusUtils';
import { ImportedComponentGenerator } from '../../../importComponent/importedComponentGenerator';
import { NEW_COMPONENT_STYLES } from '../../../../../../../consts/newComponentStyles.enum';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { Layer } from '../../../../../../../interfaces/componentPreviewStructure';
import PreviewStructure from '../../../componentGenerator/previewStructure';
import { JsUtils } from '../../../../../../../services/jsUtils/jsUtils';

export class AddNewLayerSubcomponent {

  private static updateComponentPreviewStructure(parentComponent: WorkshopComponent, newSubcomponentProperties: NewComponentProperties,
      layerBaseSubcomponent: SubcomponentProperties): void {
    const newNestedDropdownStructure = { [newSubcomponentProperties.baseName]: { 
      ...EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(layerBaseSubcomponent.subcomponentDisplayStatus),
    }};
    const parentSubcomponentObject = parentComponent.componentPreviewStructure.subcomponentDropdownStructure;
    JsUtils.addObjects(parentSubcomponentObject, CORE_SUBCOMPONENTS_NAMES.BASE, newNestedDropdownStructure);
  }

  private static addNewSubcomponentToBase(parentComponent: WorkshopComponent, layer: Layer): void {
    parentComponent.componentPreviewStructure.layers.push(layer);
  }

  private static addNewSubcomponentToComponentPreview(parentComponent: WorkshopComponent, newSubcomponentProperties: NewComponentProperties,
      isEditable: boolean): void {
    const layerSubcomponent = newSubcomponentProperties.subcomponents[newSubcomponentProperties.baseName];
    const layer: Layer = PreviewStructure.createEmptyLayer(newSubcomponentProperties.baseName, layerSubcomponent);
    AddNewLayerSubcomponent.addNewSubcomponentToBase(parentComponent, layer);
    if (isEditable) {
      AddNewLayerSubcomponent.updateComponentPreviewStructure(parentComponent, newSubcomponentProperties, layerSubcomponent);
    }
  }

  protected static createNewImportedComponent(parentComponent: WorkshopComponent, componentGenerator: ComponentGenerator,
      overwritePropertiesFunc?: OverwritePropertiesFunc): NewComponentProperties {
    const baseName = `${UniqueSubcomponentNameGenerator.generate(CORE_SUBCOMPONENTS_NAMES.LAYER)} ${parentComponent.componentPreviewStructure.layers.length + 1}`;
    const subcomponents = ImportedComponentGenerator.createImportedComponentSubcomponents(componentGenerator, baseName);
    const { subcomponentNames } = subcomponents[baseName].importedComponent.componentRef;
    if (overwritePropertiesFunc) overwritePropertiesFunc(subcomponents, subcomponentNames);
    return { baseName, subcomponents };
  }

  public static add(parentComponent: WorkshopComponent, componentStyle: NEW_COMPONENT_STYLES, isEditable: boolean,
      overwritePropertiesFunc?: OverwritePropertiesFunc): NewComponentProperties {
    const componentGenerator = componentTypeToStyleGenerators[NEW_COMPONENT_TYPES.LAYER][componentStyle];
    const newLayerSubcomponent = AddNewLayerSubcomponent.createNewImportedComponent(parentComponent, componentGenerator,
      overwritePropertiesFunc);
    JsUtils.addObjects(parentComponent, 'subcomponents', newLayerSubcomponent.subcomponents);
    AddNewLayerSubcomponent.addNewSubcomponentToComponentPreview(parentComponent, newLayerSubcomponent, isEditable);
    return newLayerSubcomponent;
  }
}
