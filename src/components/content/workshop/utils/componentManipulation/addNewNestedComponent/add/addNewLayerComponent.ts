import { DropdownOptionsDisplayStatusUtils } from '../../../dropdownOptionsDisplayStatusUtils/dropdownOptionsDisplayStatusUtils';
import { componentTypeToStyleGenerators } from '../../../../newComponent/types/componentTypeToStyleGenerators';
import { OverwritePropertiesFunc } from '../../../../../../../interfaces/overwriteSubcomponentPropertiesFunc';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { UniqueSubcomponentNameGenerator } from '../../../componentGenerator/uniqueSubcomponentNameGenerator';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections.enum';
import { IncrementNestedComponentCount } from '../../nestedComponentCount/incrementNestedComponentCount';
import { AlignedSections, Layer } from '../../../../../../../interfaces/componentPreviewStructure';
import { MultiBaseComponentUtils } from '../../../multiBaseComponent/multiBaseComponentUtils';
import { NestedComponentBaseNamesToStyles } from '../utils/nestedComponentBaseNamesToStyles';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { COMPONENT_STYLES } from '../../../../../../../consts/componentStyles.enum';
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

  private static updateComponentDropdownStructure(parentComponent: WorkshopComponent, activeBaseComponent: WorkshopComponent, newComponent: WorkshopComponent): void {
    const { base: newComponentBaseName } = newComponent.coreSubcomponentNames;
    const newComponentDropdownStructure = { [newComponentBaseName]: { 
      ...DropdownOptionsDisplayStatusUtils.createDropdownOptionDisplayStatusReferenceObject(newComponentBaseName),
    }};
    const parentComponentDropdownStructure = parentComponent.componentPreviewStructure.subcomponentDropdownStructure;
    JSONUtils.addObjects(parentComponentDropdownStructure, activeBaseComponent.coreSubcomponentNames.base, newComponentDropdownStructure);
  }

  private static addNewSubcomponentToBase(parentComponent: WorkshopComponent, layer: Layer): void {
    parentComponent.componentPreviewStructure.layers.push(layer);
  }

  private static copySiblingSubcomponentCustomCss(parentComponent: WorkshopComponent, layer: Layer): void {
    if (parentComponent.componentPreviewStructure.layers.length > 0) {
      const siblingSubcomponent = parentComponent.componentPreviewStructure.layers[parentComponent.componentPreviewStructure.layers.length - 1];
      const { customCss, defaultCss } = siblingSubcomponent.subcomponentProperties;
      layer.subcomponentProperties.customCss = parentComponent.areLayersInSyncByDefault ? customCss : JSONUtils.deepCopy(customCss);
      layer.subcomponentProperties.defaultCss = parentComponent.areLayersInSyncByDefault ? defaultCss : JSONUtils.deepCopy(defaultCss);
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

  protected static addNewComponentToComponentPreview(parentComponent: WorkshopComponent, newComponent: WorkshopComponent): void {
    const { base: newComponentBaseName } = newComponent.coreSubcomponentNames;
    const layerSubcomponent = newComponent.subcomponents[newComponentBaseName];
    const layer: Layer = AddNewLayerComponent.createEmptyLayer(newComponentBaseName, layerSubcomponent);
    AddNewLayerComponent.copySiblingSubcomponentCustomCss(parentComponent, layer);
    AddNewLayerComponent.addNewSubcomponentToBase(parentComponent, layer);
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
    const layerName = NestedComponentBaseNamesToStyles.STYLE_TO_LAYER[componentStyle];
    const newComponent = AddNewLayerComponent.createNewComponent(componentGenerator, UniqueSubcomponentNameGenerator.generate(layerName), overwritePropertiesFunc);
    const activeBaseComponent = MultiBaseComponentUtils.getCurrentlyActiveBaseComponent(parentComponent);
    JSONUtils.addObjects(parentComponent, 'subcomponents', newComponent.subcomponents);
    AddNewLayerComponent.addNewComponentToComponentPreview(activeBaseComponent, newComponent);
    if (isEditable) AddNewLayerComponent.updateComponentDropdownStructure(parentComponent, activeBaseComponent, newComponent);
    AddNewComponentShared.addNewComponentToSubcomponentNameToDropdownOptionNameMap(parentComponent, newComponent, isEditable);
    AddNewLayerComponent.addNewNestedComponentsOptions(activeBaseComponent, newComponent);
    IncrementNestedComponentCount.increment(activeBaseComponent, layerName, activeBaseComponent.coreSubcomponentNames.base);
    return newComponent;
  }
}
