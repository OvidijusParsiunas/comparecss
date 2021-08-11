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
      newComponent.coreSubcomponentRefs.base.newNestedComponentsOptions = parentComponent.newNestedComponentsOptionsRefs.layer;
    }
  }

  private static updateComponentDropdownStructure(parentComponent: WorkshopComponent, activeBaseComponent: WorkshopComponent, newComponent: WorkshopComponent): void {
    const baseName = newComponent.coreSubcomponentRefs.base.name;
    const newComponentDropdownStructure = { [baseName]: { 
      ...DropdownOptionsDisplayStatusUtils.createDropdownOptionDisplayStatusReferenceObject(baseName),
    }};
    const parentComponentDropdownStructure = parentComponent.componentPreviewStructure.subcomponentDropdownStructure;
    JSONUtils.addObjects(parentComponentDropdownStructure, activeBaseComponent.coreSubcomponentRefs.base.name, newComponentDropdownStructure);
  }

  private static addNewSubcomponentToBase(parentComponent: WorkshopComponent, layer: Layer): void {
    parentComponent.componentPreviewStructure.layers.push(layer);
  }

  private static copySiblingSubcomponentCustomProperties(parentComponent: WorkshopComponent, layer: Layer): void {
    if (parentComponent.componentPreviewStructure.layers.length > 0) {
      const siblingSubcomponent = parentComponent.componentPreviewStructure.layers[parentComponent.componentPreviewStructure.layers.length - 1];
      const { customCss, defaultCss, customFeatures, defaultCustomFeatures } = siblingSubcomponent.subcomponentProperties;
      if (parentComponent.areLayersInSyncByDefault) {
        layer.subcomponentProperties.customCss = customCss;
        layer.subcomponentProperties.defaultCss = defaultCss;
        layer.subcomponentProperties.customFeatures = customFeatures;
        layer.subcomponentProperties.defaultCustomFeatures = defaultCustomFeatures;
      } else {
        layer.subcomponentProperties.customCss = JSONUtils.deepCopy(customCss);
        layer.subcomponentProperties.defaultCss = JSONUtils.deepCopy(defaultCss);
        layer.subcomponentProperties.customFeatures = JSONUtils.deepCopy(customFeatures);
        layer.subcomponentProperties.defaultCustomFeatures = JSONUtils.deepCopy(defaultCustomFeatures); 
      }
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
    const baseName = newComponent.coreSubcomponentRefs.base.name;
    const layerSubcomponent = newComponent.subcomponents[baseName];
    const layer: Layer = AddNewLayerComponent.createEmptyLayer(baseName, layerSubcomponent);
    AddNewLayerComponent.copySiblingSubcomponentCustomProperties(parentComponent, layer);
    AddNewLayerComponent.addNewSubcomponentToBase(parentComponent, layer);
  }

  protected static createNewComponent(componentGenerator: ComponentGenerator, activeBaseComponent: WorkshopComponent, baseName?: string,
      overwritePropertiesFunc?: OverwritePropertiesFunc): WorkshopComponent {
    const newComponent = AddNewComponentShared.createNewComponentViaGenerator(componentGenerator, activeBaseComponent, baseName);
    if (overwritePropertiesFunc) overwritePropertiesFunc(newComponent.coreSubcomponentRefs);
    return newComponent;
  }

  public static add(parentComponent: WorkshopComponent, componentStyle: COMPONENT_STYLES, isEditable: boolean,
      overwritePropertiesFunc?: OverwritePropertiesFunc): WorkshopComponent {
    const componentGenerator = componentTypeToStyleGenerators[COMPONENT_TYPES.LAYER][componentStyle];
    const layerName = NestedComponentBaseNamesToStyles.STYLE_TO_LAYER[componentStyle];
    const activeBaseComponent = MultiBaseComponentUtils.getCurrentlyActiveBaseComponent(parentComponent);
    const newComponent = AddNewLayerComponent.createNewComponent(componentGenerator, activeBaseComponent,
      UniqueSubcomponentNameGenerator.generate(layerName), overwritePropertiesFunc);
    JSONUtils.addObjects(parentComponent, 'subcomponents', newComponent.subcomponents);
    AddNewLayerComponent.addNewComponentToComponentPreview(activeBaseComponent, newComponent);
    if (isEditable) AddNewLayerComponent.updateComponentDropdownStructure(parentComponent, activeBaseComponent, newComponent);
    AddNewComponentShared.addNewComponentToSubcomponentNameToDropdownOptionNameMap(parentComponent, newComponent, isEditable);
    AddNewLayerComponent.addNewNestedComponentsOptions(activeBaseComponent, newComponent);
    IncrementNestedComponentCount.increment(activeBaseComponent, layerName, activeBaseComponent.coreSubcomponentRefs.base.name);
    return newComponent;
  }
}
