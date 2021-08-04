import { NESTED_COMPONENTS_BASE_NAMES, PARENT_COMPONENT_BASE_NAME } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { DropdownOptionsDisplayStatusUtils } from '../../../dropdownOptionsDisplayStatusUtils/dropdownOptionsDisplayStatusUtils';
import { componentTypeToStyleGenerators } from '../../../../newComponent/types/componentTypeToStyleGenerators';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { UniqueSubcomponentNameGenerator } from '../../../componentGenerator/uniqueSubcomponentNameGenerator';
import { OverwritePropertiesFunc } from '../../../../../../../interfaces/overwriteSubcomponentPropertiesFunc';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections.enum';
import { IncrementNestedComponentCount } from '../../nestedComponentCount/incrementNestedComponentCount';
import { AlignedSections, Layer } from '../../../../../../../interfaces/componentPreviewStructure';
import { COMPONENT_STYLES, LAYER_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { AddNewComponentShared } from './addNewComponentShared';
import JSONUtils from '../../../generic/jsonUtils';

export class AddNewLayerComponent extends AddNewComponentShared {

  private static addNewNestedComponentsOptions(parentComponent: WorkshopComponent, newComponent: WorkshopComponent): void {
    if (parentComponent.newNestedComponentsOptionsRefs?.layer) {
      newComponent.subcomponents[newComponent.coreSubcomponentNames.base]
        .newNestedComponentsOptions = parentComponent.newNestedComponentsOptionsRefs.layer;
    }
  }

  private static updateComponentDropdownStructure(parentComponent: WorkshopComponent, newComponent: WorkshopComponent): void {
    const { base: newComponentBaseName } = newComponent.coreSubcomponentNames;
    const newComponentDropdownStructure = { [newComponentBaseName]: { 
      ...DropdownOptionsDisplayStatusUtils.createDropdownOptionDisplayStatusReferenceObject(newComponentBaseName),
    }};
    const parentComponentDropdownStructure = parentComponent.componentPreviewStructure.subcomponentDropdownStructure;
    JSONUtils.addObjects(parentComponentDropdownStructure, parentComponent.coreSubcomponentNames.base, newComponentDropdownStructure);
  }

  private static addNewSubcomponentToBase(parentComponent: WorkshopComponent, layer: Layer): void {
    parentComponent.componentPreviewStructure.layers.push(layer);
  }

  private static copySiblingSubcomponentCustomCss(parentComponent: WorkshopComponent, layer: Layer): void {
    // WORK1: needs work
    if (parentComponent.componentPreviewStructure.layers.length > 0) {
      const siblingSubcomponent = parentComponent.componentPreviewStructure.layers[parentComponent.componentPreviewStructure.layers.length - 1];
      const { customCss, defaultCss, nestedComponent } = siblingSubcomponent.subcomponentProperties;
      layer.subcomponentProperties.customCss = customCss;
      layer.subcomponentProperties.defaultCss = defaultCss;
    }
  }

  private static createEmptyAlignedSections(): AlignedSections {
    return {
      [ALIGNED_SECTION_TYPES.LEFT]: [],
      [ALIGNED_SECTION_TYPES.CENTER]: [],
      [ALIGNED_SECTION_TYPES.RIGHT]: [],
    };
  }

  private static createEmptyLayer(layerName: string, layerSubcomponent: SubcomponentProperties): Layer {
    const layerSections = layerSubcomponent.layerSectionsType === LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS
      ? AddNewLayerComponent.createEmptyAlignedSections() : [];
    return {
      name: layerName,
      subcomponentProperties: layerSubcomponent,
      sections: {
        [layerSubcomponent.layerSectionsType]: layerSections,
      },
    };
  }

  protected static addNewComponentToComponentPreview(parentComponent: WorkshopComponent, newComponent: WorkshopComponent, isAuxiliaryComponent = false): void {
    const { base: newComponentBaseName } = newComponent.coreSubcomponentNames;
    const layerSubcomponent = newComponent.subcomponents[newComponentBaseName];
    const layer: Layer = AddNewLayerComponent.createEmptyLayer(newComponentBaseName, layerSubcomponent);
    // WORK1: find a better way
    AddNewLayerComponent.copySiblingSubcomponentCustomCss(isAuxiliaryComponent ? parentComponent.auxiliaryComponent : parentComponent, layer);
    AddNewLayerComponent.addNewSubcomponentToBase(isAuxiliaryComponent ? parentComponent.auxiliaryComponent : parentComponent, layer);
  }

  protected static createNewComponent(componentGenerator: ComponentGenerator, baseName?: string,
      overwritePropertiesFunc?: OverwritePropertiesFunc): WorkshopComponent {
    const subcomponents = AddNewComponentShared.createNewComponentSubcomponents(componentGenerator, baseName);
    const { coreSubcomponentNames } = subcomponents[baseName].nestedComponent.ref;
    if (overwritePropertiesFunc) overwritePropertiesFunc(subcomponents, coreSubcomponentNames);
    return subcomponents[baseName].nestedComponent.ref;
  }

  public static add(parentComponent: WorkshopComponent, componentStyle: COMPONENT_STYLES, isEditable: boolean,
      overwritePropertiesFunc?: OverwritePropertiesFunc): WorkshopComponent {
    const componentGenerator = componentTypeToStyleGenerators[COMPONENT_TYPES.LAYER][componentStyle];
    // WORK1: find a better way
    const layerName = componentStyle === LAYER_STYLES.DROPDOWN_ITEM
      ? NESTED_COMPONENTS_BASE_NAMES.DROPDOWN_MENU_ITEM : NESTED_COMPONENTS_BASE_NAMES.LAYER;
    const newComponent = AddNewLayerComponent.createNewComponent(componentGenerator, UniqueSubcomponentNameGenerator.generate(layerName), overwritePropertiesFunc);
    JSONUtils.addObjects(parentComponent, 'subcomponents', newComponent.subcomponents);
    AddNewLayerComponent.addNewComponentToComponentPreview(parentComponent, newComponent, parentComponent.type !== COMPONENT_TYPES.DROPDOWN_MENU && LAYER_STYLES.DROPDOWN_ITEM === componentStyle);
    if (isEditable) AddNewLayerComponent.updateComponentDropdownStructure(parentComponent, newComponent);
    AddNewComponentShared.addNewComponentToSubcomponentNameToDropdownOptionNameMap(parentComponent, newComponent, isEditable);
    AddNewLayerComponent.addNewNestedComponentsOptions(parentComponent, newComponent);
    IncrementNestedComponentCount.increment(parentComponent, layerName, parentComponent.coreSubcomponentNames.base);
    return newComponent;
  }
}
