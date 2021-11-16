import { PropertyReferenceSharingFuncsUtils } from '../../../newComponent/types/shared/propertyReferenceSharingFuncs/propertyReferenceSharingFuncsUtils';
import { UpdateContainerComponentDropdownItemNames } from '../updateChildComponent/updateContainerComponentDropdownItemNames';
import { UpdateLinkedComponentsDropdownItemNames } from '../updateChildComponent/updateLinkedComponentsDropdownItemNames';
import { componentTypeToStyleGenerators } from '../../../newComponent/types/componentTypeToStyleGenerators';
import { UpdateLayerDropdownItemNames } from '../updateChildComponent/updateLayerDropdownItemNames';
import { BaseSubcomponentRef, Layer } from '../../../../../../interfaces/componentPreviewStructure';
import { uniqueSubcomponentIdState } from '../../componentGenerator/uniqueSubcomponentIdState';
import { PropertyOverwritables } from '../../../../../../interfaces/newChildComponents';
import { ComponentBuilder } from '../../../newComponent/types/shared/componentBuilder';
import { AddContainerComponent } from '../addChildComponent/add/addContainerComponent';
import { ALIGNED_SECTION_TYPES } from '../../../../../../consts/layerSections.enum';
import { RemoveChildComponent } from '../removeChildComponent/removeChildComponent';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { DEFAULT_STYLES } from '../../../../../../consts/componentStyles.enum';
import { AddLayerComponent } from '../addChildComponent/add/addLayerComponent';
import { COMPONENT_TYPES } from '../../../../../../consts/componentTypes.enum';
import ProcessClassName from '../../componentGenerator/processClassName';
import { CopySubcomponents } from './copySubcomponents';
import JSONUtils from '../../generic/jsonUtils';
import { ComponentOptions } from 'vue';

export class CopyComponent extends ComponentBuilder {

  private static resetPropertiesAddedOnBuild(newComponent: WorkshopComponent, originalPropertyOverwritables: PropertyOverwritables): void {
    newComponent.newChildComponents.propertyOverwritables = originalPropertyOverwritables;
  }

  private static overwritePropertiesAddedOnBuild(newComponent: WorkshopComponent, childType: COMPONENT_TYPES, section: ALIGNED_SECTION_TYPES): void {
    const { propertyOverwritables } = newComponent.newChildComponents;
    if (propertyOverwritables) {
      propertyOverwritables.onBuildProperties = { [childType]: { alignmentSection: section } };
    } else {
      newComponent.newChildComponents.propertyOverwritables = { onBuildProperties: { [childType]: { alignmentSection: section } } };
    }
  }

  private static getAlignedComponent(newLayer: Layer, baseSubcomponent: BaseSubcomponentRef, section: ALIGNED_SECTION_TYPES,
      index: number, newComponent: WorkshopComponent, baseComponents: WorkshopComponent[]): WorkshopComponent {
    if (!newLayer.subcomponent.seedComponent.newChildComponents.childComponentsLockedToLayer) {
      const { type, style } = baseSubcomponent.subcomponent.seedComponent;
      const originalPropertyOverwritables = JSONUtils.deepCopy(newComponent.newChildComponents.propertyOverwritables);
      CopyComponent.overwritePropertiesAddedOnBuild(newComponent, type, section);
      const alignedComponent = AddContainerComponent.add(newComponent, type, style, newLayer.subcomponent.name);
      CopyComponent.resetPropertiesAddedOnBuild(newComponent, originalPropertyOverwritables);
      baseComponents.push(alignedComponent);
      return alignedComponent;
    }
    return newLayer.sections.alignedSections[section][index].subcomponent.seedComponent;
  }

  private static copyAlignedSectionComponents(alignedSectionBaseSubcomponents: BaseSubcomponentRef[], newLayer: Layer, section: ALIGNED_SECTION_TYPES,
      newComponent: WorkshopComponent, baseComponents: WorkshopComponent[]): void {
    alignedSectionBaseSubcomponents.forEach((baseSubcomponent: BaseSubcomponentRef, index: number) => {
      const alignedComponent = CopyComponent.getAlignedComponent(newLayer, baseSubcomponent, section, index, newComponent, baseComponents);
      CopyComponent.copyComponent(alignedComponent, baseSubcomponent.subcomponent.seedComponent);
    });
  }

  // new components with base style should not have populated aligned sections so in the future this method will not be required
  private static removeAllAlignedSectionComponents(section: ALIGNED_SECTION_TYPES, newLayer: Layer, newComponent: WorkshopComponent): void {
    const defaultActiveSubcomponentName = newComponent.masterComponent.activeSubcomponentName;
    const alignedSectionComponents = newLayer.sections.alignedSections[section];
    const originalComponentsLength = alignedSectionComponents.length;
    for (let i = 0; i < originalComponentsLength; i += 1) {
      newComponent.masterComponent.activeSubcomponentName = alignedSectionComponents[alignedSectionComponents.length - 1]
        .subcomponent.seedComponent.activeSubcomponentName;
      RemoveChildComponent.remove(newComponent.masterComponent);
    }
    newComponent.masterComponent.activeSubcomponentName = defaultActiveSubcomponentName;
  }

  private static setActiveSubcomponentNameForAlignedSectionComponents(newLayer: Layer, isLayerEditable: boolean, newComponent: WorkshopComponent): string {
    const defaultActiveSubcomponentName = newComponent.masterComponent.activeSubcomponentName;
    newComponent.masterComponent.activeSubcomponentName = isLayerEditable
      ? newLayer.subcomponent.seedComponent.activeSubcomponentName
      : newComponent.activeSubcomponentName;
    return defaultActiveSubcomponentName;
  }

  private static copyAlignedSectionsComponents(newLayer: Layer, copiedLayer: Layer, isLayerEditable: boolean, newComponent: WorkshopComponent,
      baseComponents: WorkshopComponent[]): void {
    const { alignedSections } = copiedLayer.sections;
    const defaultActiveSubcomponentName = CopyComponent.setActiveSubcomponentNameForAlignedSectionComponents(newLayer, isLayerEditable, newComponent);
    Object.keys(alignedSections).forEach((section: ALIGNED_SECTION_TYPES) => {
      if (!newLayer.subcomponent.seedComponent.newChildComponents.childComponentsLockedToLayer) {
        CopyComponent.removeAllAlignedSectionComponents(section, newLayer, newComponent);
      }
      CopyComponent.copyAlignedSectionComponents(alignedSections[section], newLayer, section, newComponent, baseComponents);
    });
    newComponent.masterComponent.activeSubcomponentName = defaultActiveSubcomponentName;
  }

  private static createNewLayer(layer: Layer, newComponent: WorkshopComponent, isEditable: boolean): void {
    const copiedLayerStyle = layer.subcomponent.seedComponent.style;
    AddLayerComponent.add(newComponent, copiedLayerStyle, isEditable);
  }

  private static isLayerEditable(componentBeingCopied: WorkshopComponent, layer: Layer): boolean {
    return !!componentBeingCopied.masterComponent.componentPreviewStructure.subcomponentNameToDropdownItemName[
      layer.subcomponent.seedComponent.activeSubcomponentName];
  }

  private static copyLayerComponent(layer: Layer, index: number, newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent,
      baseComponents: WorkshopComponent[]): number {
    const existantNewComponentLayer = newComponent.componentPreviewStructure.layers[index];
    const isEditable = CopyComponent.isLayerEditable(componentBeingCopied, layer);
    if (!existantNewComponentLayer) CopyComponent.createNewLayer(layer, newComponent, isEditable);
    const newLayerPreviewComponent = newComponent.componentPreviewStructure.layers[index];
    CopyComponent.copyAlignedSectionsComponents(newLayerPreviewComponent, layer, isEditable, newComponent, baseComponents);
    UpdateContainerComponentDropdownItemNames.updateViaParentLayerPreviewStructure(newComponent, newLayerPreviewComponent);
    CopySubcomponents.copy(newLayerPreviewComponent.subcomponent.seedComponent.baseSubcomponent, layer.subcomponent);
    PropertyReferenceSharingFuncsUtils.executePropertyReferenceSharingFuncs(true, 'layer', newLayerPreviewComponent.subcomponent.seedComponent);
    return !existantNewComponentLayer ? index : -1;
  }

  private static removeLayerComponent(masterComponent: WorkshopComponent, layers: Layer[]): void {
    masterComponent.activeSubcomponentName = layers[layers.length - 1].subcomponent.seedComponent.activeSubcomponentName;
    RemoveChildComponent.remove(masterComponent);
  }

  // new components with base style should not have layers so in the future this method will not be required
  private static removeExcessLayerComponents(newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent): void {
    const newExistingLayers = newComponent.componentPreviewStructure.layers;
    const copiedLayers = componentBeingCopied.componentPreviewStructure.layers;
    if (copiedLayers.length < newExistingLayers.length) {
      const newMasterComponent = newComponent.masterComponent;
      const defaultActiveSubcomponentName = newMasterComponent.activeSubcomponentName;
      const lengthDiff = newExistingLayers.length - copiedLayers.length;
      for (let i = 0; i < lengthDiff; i += 1) {
        CopyComponent.removeLayerComponent(newMasterComponent, newExistingLayers);
      }
      newMasterComponent.activeSubcomponentName = defaultActiveSubcomponentName;
    }
  }

  private static copyLayerComponents(newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent, baseComponents: WorkshopComponent[]): void {
    CopyComponent.removeExcessLayerComponents(newComponent, componentBeingCopied);
    let indexToUpdate = -1;
    const defaultActiveSubcomponentName = newComponent.masterComponent.activeSubcomponentName;
    newComponent.masterComponent.activeSubcomponentName = newComponent.activeSubcomponentName;
    componentBeingCopied.componentPreviewStructure.layers.forEach((layer, index) => {
      const indexOfNewLayer = CopyComponent.copyLayerComponent(layer, index, newComponent, componentBeingCopied, baseComponents);
      if (indexToUpdate === -1 && indexOfNewLayer !== -1) indexToUpdate = index;
    });
    if (indexToUpdate > -1) UpdateLayerDropdownItemNames.update(newComponent, indexToUpdate);
    newComponent.masterComponent.activeSubcomponentName = defaultActiveSubcomponentName;
  }

  private static copyAuxiliaryComponents(newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent): void {
    newComponent.linkedComponents.auxiliary?.forEach((auxiliaryComponent, index) => {
      CopyComponent.copyComponent(auxiliaryComponent, componentBeingCopied.linkedComponents.auxiliary[index]);
    });
  }

  private static copyPaddingComponentChild(newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent): void {
    CopyComponent.copyComponent(newComponent.paddingComponentChild, componentBeingCopied.paddingComponentChild);
    UpdateLinkedComponentsDropdownItemNames.update(newComponent.paddingComponentChild);
  }

  // could not use parent first preview structure traversal as upon dynamically creating child components the subcomponents
  // hold references with seed component, however those woild be overwritten as such traversal calls
  // copyComponent for every subcomponent
  // could not do child first traversal because some children do not exist for the new component
  private static copyComponent(newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent): void {
    const baseComponents: WorkshopComponent[] = [newComponent];
    CopySubcomponents.copy(newComponent.baseSubcomponent, componentBeingCopied.baseSubcomponent);
    CopyComponent.copyLayerComponents(newComponent, componentBeingCopied, baseComponents);
    if (newComponent.paddingComponentChild) CopyComponent.copyPaddingComponentChild(newComponent, componentBeingCopied);
    if (newComponent.linkedComponents?.auxiliary) CopyComponent.copyAuxiliaryComponents(newComponent, componentBeingCopied);
    PropertyReferenceSharingFuncsUtils.executePropertyReferenceSharingFuncs(true, 'container', ...baseComponents);
  }

  public static copy(optionsComponent: ComponentOptions, componentBeingCopied: WorkshopComponent): WorkshopComponent {
    // used here as button builders do not inherently reset the unique id
    uniqueSubcomponentIdState.resetUniqueId();
    const newComponent = componentTypeToStyleGenerators[componentBeingCopied.type][DEFAULT_STYLES.BASE].createNewComponent({});
    CopyComponent.copyComponent(newComponent, componentBeingCopied);
    newComponent.className = ProcessClassName.addPostfixIfClassNameTaken(newComponent.className,
      (optionsComponent.components as undefined as WorkshopComponent[]), '-copy');
    newComponent.activeSubcomponentName = newComponent.defaultSubcomponentName;
    return newComponent;
  }
}
