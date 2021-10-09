import { DropdownItemsDisplayStatusUtils } from '../../../dropdownItemsDisplayStatusUtils/dropdownItemsDisplayStatusUtils';
import { TraverseComponentViaDropdownStructure } from '../../../componentTraversal/traverseComponentViaDropdownStructure';
import { componentTypeToStyleGenerators } from '../../../../newComponent/types/componentTypeToStyleGenerators';
import { OverwritePropertiesFunc } from '../../../../../../../interfaces/overwriteSubcomponentPropertiesFunc';
import { UniqueSubcomponentNameGenerator } from '../../../componentGenerator/uniqueSubcomponentNameGenerator';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections.enum';
import { IncrementChildComponentCount } from '../../childComponentCount/incrementChildComponentCount';
import { AlignedSections, Layer } from '../../../../../../../interfaces/componentPreviewStructure';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { ChildComponentBaseNamesToStyles } from '../utils/childComponentBaseNamesToStyles';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ActiveComponentUtils } from '../../../activeComponent/activeComponentUtils';
import { COMPONENT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { AddComponentShared } from './addComponentShared';
import JSONUtils from '../../../generic/jsonUtils';

export class AddLayerComponent extends AddComponentShared {

  private static addNewChildComponentsItems(containerComponent: WorkshopComponent, newComponent: WorkshopComponent): void {
    if (containerComponent.newChildComponents?.sharedDropdownItemsRefs?.layer) {
      newComponent.newChildComponents = { dropdownItems: containerComponent.newChildComponents.sharedDropdownItemsRefs.layer };
    }
  }

  private static updateDropdownStructureIfItemFound(containerComponent: WorkshopComponent, dropdownStructure: NestedDropdownStructure,
      newComponent: WorkshopComponent, masterComponent: WorkshopComponent): boolean {
    const newComponentBaseName = newComponent.baseSubcomponent.name;
    const newComponentDropdownStructure = { [newComponentBaseName]: { 
      ...DropdownItemsDisplayStatusUtils.createDropdownItemDisplayStatusReferenceObject(newComponentBaseName),
    }};
    const { subcomponentNameToDropdownItemName } = masterComponent.componentPreviewStructure;
    const containerComponentBaseName = containerComponent.baseSubcomponent.name;
    Object.assign(dropdownStructure[subcomponentNameToDropdownItemName[containerComponentBaseName]], newComponentDropdownStructure);
    return true;
  }

  private static addNewSubcomponentToBase(containerComponent: WorkshopComponent, layer: Layer): void {
    containerComponent.componentPreviewStructure.layers.push(layer);
  }

  private static copySiblingSubcomponentCustomProperties(containerComponent: WorkshopComponent, layer: Layer): void {
    if (containerComponent.componentPreviewStructure.layers.length > 0) {
      const siblingSubcomponent = containerComponent.componentPreviewStructure.layers[containerComponent.componentPreviewStructure.layers.length - 1];
      const { customCss, defaultCss, customFeatures, defaultCustomFeatures } = siblingSubcomponent.subcomponentProperties;
      if (containerComponent.areLayersInSyncByDefault) {
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

  private static createEmptyLayer(newComponent: WorkshopComponent): Layer {
    const baseName = newComponent.baseSubcomponent.name;
    const baseSubcomponent = newComponent.subcomponents[baseName];
    const layerSections = baseSubcomponent.layerSectionsType === LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS
      ? AddLayerComponent.createEmptyAlignedSections() : [];
    return {
      subcomponentProperties: baseSubcomponent,
      sections: {
        [baseSubcomponent.layerSectionsType]: layerSections,
      },
    };
  }

  protected static addNewComponentToComponentPreview(containerComponent: WorkshopComponent, newComponent: WorkshopComponent): void {
    const layer: Layer = AddLayerComponent.createEmptyLayer(newComponent);
    AddLayerComponent.copySiblingSubcomponentCustomProperties(containerComponent, layer);
    AddLayerComponent.addNewSubcomponentToBase(containerComponent, layer);
  }

  // masterComponent is relative to the current container component that the new component is being added to:
  // e.g. when creating a button within a card, upon adding text to a button - the master component to text is the button,
  // as the button is then added to the card - all of its subcomponents including text have card set as their master component
  // when adding text/icon to an existing button - it uses its container's master ref (button pointing to card),
  // hence its masterComponentRef property is going to point towards the card component
  protected static createNewComponent(componentGenerator: ComponentGenerator, masterComponent: WorkshopComponent, baseName?: string,
      overwritePropertiesFunc?: OverwritePropertiesFunc): WorkshopComponent {
    const newComponent = AddComponentShared.createNewComponentViaGenerator(componentGenerator, masterComponent, baseName);
    if (overwritePropertiesFunc) overwritePropertiesFunc(newComponent);
    return newComponent;
  }

  public static add(containerComponent: WorkshopComponent, componentStyle: COMPONENT_STYLES, isEditable: boolean,
      overwritePropertiesFunc?: OverwritePropertiesFunc): WorkshopComponent {
    const componentGenerator = componentTypeToStyleGenerators[COMPONENT_TYPES.LAYER][componentStyle];
    const layerName = ChildComponentBaseNamesToStyles.STYLE_TO_LAYER[componentStyle];
    const { higherComponentContainer, masterComponent } = ActiveComponentUtils.getHigherLevelComponents(containerComponent);
    const newComponent = AddLayerComponent.createNewComponent(componentGenerator, masterComponent,
      UniqueSubcomponentNameGenerator.generate(layerName), overwritePropertiesFunc);
    AddComponentShared.populateMasterComponentWithNewSubcomponents(masterComponent, newComponent.subcomponents);
    AddLayerComponent.addNewComponentToComponentPreview(higherComponentContainer, newComponent);
    if (isEditable) TraverseComponentViaDropdownStructure.traverseUsingComponent(containerComponent,
      AddLayerComponent.updateDropdownStructureIfItemFound, newComponent, masterComponent);
    AddComponentShared.addNewSubcomponentNameInContainerDropdownItemNameMap(masterComponent, newComponent, isEditable);
    AddLayerComponent.addNewChildComponentsItems(higherComponentContainer, newComponent);
    IncrementChildComponentCount.increment(higherComponentContainer, layerName);
    AddComponentShared.cleanSubcomponentProperties(newComponent);
    newComponent.containerComponent = higherComponentContainer;
    return newComponent;
  }
}
