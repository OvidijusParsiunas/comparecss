import { PropertyReferenceSharingFuncsUtils } from '../../../newComponent/types/shared/propertyReferenceSharingFuncs/propertyReferenceSharingFuncsUtils';
import { UpdateContainerComponentDropdownItemNames } from '../updateChildComponent/updateContainerComponentDropdownItemNames';
import { UpdateLinkedComponentsDropdownItemNames } from '../updateChildComponent/updateLinkedComponentsDropdownItemNames';
import { ParentBasedPresetProperties, PropertyOverwritables } from '../../../../../../interfaces/newChildComponents';
import { masterComponentTypeToStyleGenerators } from '../../../newComponent/types/componentTypeToStyleGenerators';
import { HORIZONTAL_ALIGNMENT_SECTIONS } from '../../../../../../consts/horizontalAlignmentSections';
import { UpdateLayerDropdownItemNames } from '../updateChildComponent/updateLayerDropdownItemNames';
import { uniqueSubcomponentIdState } from '../../componentGenerator/uniqueSubcomponentIdState';
import { ComponentBuilder } from '../../../newComponent/types/shared/componentBuilder';
import { AddContainerComponent } from '../addChildComponent/add/addContainerComponent';
import { RemoveChildComponent } from '../removeChildComponent/removeChildComponent';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { DEFAULT_STYLES } from '../../../../../../consts/componentStyles.enum';
import { COMPONENT_TYPES } from '../../../../../../consts/componentTypes.enum';
import { Layer } from '../../../../../../interfaces/componentPreviewStructure';
import { AddLayerComponent } from '../addChildComponent/add/addLayerComponent';
import ProcessClassName from '../../componentGenerator/processClassName';
import { CopySubcomponents } from './copySubcomponents';
import JSONUtils from '../../generic/jsonUtils';
import { ComponentOptions } from 'vue';

export class CopyComponent extends ComponentBuilder {

  private static resetPropertiesAddedOnBuild(newParentComponent: WorkshopComponent, originalPropertyOverwritables: PropertyOverwritables): void {
    newParentComponent.newChildComponents.propertyOverwritables = originalPropertyOverwritables;
  }

  private static setNewChildPropertyOverwritables(newParentComponent: WorkshopComponent, childType: COMPONENT_TYPES, section: HORIZONTAL_ALIGNMENT_SECTIONS): void {
    const parentBasedPresetProperties: ParentBasedPresetProperties = { horizontalSection: section };
    const { newChildComponents } = newParentComponent;
    if (!newChildComponents.propertyOverwritables) {
      newChildComponents.propertyOverwritables = { onBuildProperties: { [childType]: parentBasedPresetProperties } };
    } else {
      newChildComponents.propertyOverwritables.onBuildProperties = { [childType]: parentBasedPresetProperties };
    }
  }

  private static createOrGetLockedComponentInAlignmentSection(newLayer: Layer, alignedComponent: WorkshopComponent, section: HORIZONTAL_ALIGNMENT_SECTIONS,
      index: number, newParentComponent: WorkshopComponent, newComponents: WorkshopComponent[]): WorkshopComponent {
    if (newLayer.subcomponent.seedComponent.newChildComponents.childComponentsLockedToLayer) {
      return newLayer.alignmentSectionToComponents[section][index];
    }
    const { type, style } = alignedComponent;
    const originalPropertyOverwritables = JSONUtils.deepCopy(newParentComponent.newChildComponents.propertyOverwritables);
    CopyComponent.setNewChildPropertyOverwritables(newParentComponent, type, section);
    const newAlignedComponent = AddContainerComponent.add(newParentComponent, type, style, newLayer.subcomponent.name);
    CopyComponent.resetPropertiesAddedOnBuild(newParentComponent, originalPropertyOverwritables);
    newComponents.push(newAlignedComponent);
    return newAlignedComponent;
  }

  private static copyComponentsInAlignmentSection(alignedComponents: WorkshopComponent[], newLayer: Layer, section: HORIZONTAL_ALIGNMENT_SECTIONS,
      newParentComponent: WorkshopComponent, newComponents: WorkshopComponent[]): void {
    alignedComponents.forEach((component: WorkshopComponent, index: number) => {
      const alignedComponent = CopyComponent.createOrGetLockedComponentInAlignmentSection(newLayer, component, section, index,
        newParentComponent, newComponents);
      CopyComponent.copyComponent(alignedComponent, component);
    });
  }

  // new components with base style should not have populated aligned sections so in the future this method will not be required
  private static removeAllComponentsInAlignmentSection(section: HORIZONTAL_ALIGNMENT_SECTIONS, newLayer: Layer, newParentComponent: WorkshopComponent): void {
    const defaultActiveSubcomponentName = newParentComponent.masterComponent.activeSubcomponentName;
    const alignmentSectionComponents = newLayer.alignmentSectionToComponents[section];
    const originalComponentsLength = alignmentSectionComponents.length;
    for (let i = 0; i < originalComponentsLength; i += 1) {
      newParentComponent.masterComponent.activeSubcomponentName = alignmentSectionComponents[alignmentSectionComponents.length - 1].activeSubcomponentName;
      RemoveChildComponent.remove(newParentComponent.masterComponent);
    }
    newParentComponent.masterComponent.activeSubcomponentName = defaultActiveSubcomponentName;
  }

  private static setActiveSubcomponentNameForAlignmentSectionComponents(newLayer: Layer, isLayerEditable: boolean, newParentComponent: WorkshopComponent): string {
    const defaultActiveSubcomponentName = newParentComponent.masterComponent.activeSubcomponentName;
    newParentComponent.masterComponent.activeSubcomponentName = isLayerEditable
      ? newLayer.subcomponent.seedComponent.activeSubcomponentName
      : newParentComponent.activeSubcomponentName;
    return defaultActiveSubcomponentName;
  }

  private static copyComponentsInAlignmentSections(newLayer: Layer, copiedLayer: Layer, isLayerEditable: boolean, newParentComponent: WorkshopComponent,
      newComponents: WorkshopComponent[]): void {
    const { alignmentSectionToComponents } = copiedLayer;
    const defaultActiveSubcomponentName = CopyComponent.setActiveSubcomponentNameForAlignmentSectionComponents(newLayer, isLayerEditable, newParentComponent);
    Object.keys(alignmentSectionToComponents).forEach((section: HORIZONTAL_ALIGNMENT_SECTIONS) => {
      if (!newLayer.subcomponent.seedComponent.newChildComponents.childComponentsLockedToLayer) {
        CopyComponent.removeAllComponentsInAlignmentSection(section, newLayer, newParentComponent);
      }
      CopyComponent.copyComponentsInAlignmentSection(alignmentSectionToComponents[section], newLayer, section, newParentComponent, newComponents);
    });
    newParentComponent.masterComponent.activeSubcomponentName = defaultActiveSubcomponentName;
  }

  private static createNewLayer(layer: Layer, newParentComponent: WorkshopComponent, isEditable: boolean): void {
    const copiedLayerStyle = layer.subcomponent.seedComponent.style;
    AddLayerComponent.add(newParentComponent, copiedLayerStyle, isEditable);
  }

  private static isLayerEditable(componentBeingCopied: WorkshopComponent, layer: Layer): boolean {
    return !!componentBeingCopied.masterComponent.componentPreviewStructure.subcomponentNameToDropdownItemName[
      layer.subcomponent.seedComponent.activeSubcomponentName];
  }

  private static copyLayerComponent(layer: Layer, index: number, newParentComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent,
      newComponents: WorkshopComponent[]): number {
    const existantNewComponentLayer = newParentComponent.componentPreviewStructure.layers[index];
    const isEditable = CopyComponent.isLayerEditable(componentBeingCopied, layer);
    if (!existantNewComponentLayer) CopyComponent.createNewLayer(layer, newParentComponent, isEditable);
    const newLayerPreviewComponent = newParentComponent.componentPreviewStructure.layers[index];
    CopyComponent.copyComponentsInAlignmentSections(newLayerPreviewComponent, layer, isEditable, newParentComponent, newComponents);
    UpdateContainerComponentDropdownItemNames.updateViaParentLayerPreviewStructure(newParentComponent, newLayerPreviewComponent);
    CopySubcomponents.copy(newLayerPreviewComponent.subcomponent.seedComponent.baseSubcomponent, layer.subcomponent);
    PropertyReferenceSharingFuncsUtils.executePropertyReferenceSharingFuncs(true, 'layer', newLayerPreviewComponent.subcomponent.seedComponent);
    return !existantNewComponentLayer ? index : -1;
  }

  private static removeLayerComponent(masterComponent: WorkshopComponent, layers: Layer[]): void {
    masterComponent.activeSubcomponentName = layers[layers.length - 1].subcomponent.seedComponent.activeSubcomponentName;
    RemoveChildComponent.remove(masterComponent);
  }

  // new components with base style should not have layers so in the future this method will not be required
  private static removeExcessLayerComponents(newParentComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent): void {
    const newExistingLayers = newParentComponent.componentPreviewStructure.layers;
    const copiedLayers = componentBeingCopied.componentPreviewStructure.layers;
    if (copiedLayers.length < newExistingLayers.length) {
      const newMasterComponent = newParentComponent.masterComponent;
      const defaultActiveSubcomponentName = newMasterComponent.activeSubcomponentName;
      const lengthDiff = newExistingLayers.length - copiedLayers.length;
      for (let i = 0; i < lengthDiff; i += 1) {
        CopyComponent.removeLayerComponent(newMasterComponent, newExistingLayers);
      }
      newMasterComponent.activeSubcomponentName = defaultActiveSubcomponentName;
    }
  }

  private static copyLayerComponents(newParentComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent, newComponents: WorkshopComponent[]): void {
    CopyComponent.removeExcessLayerComponents(newParentComponent, componentBeingCopied);
    let indexToUpdate = -1;
    const defaultActiveSubcomponentName = newParentComponent.masterComponent.activeSubcomponentName;
    newParentComponent.masterComponent.activeSubcomponentName = newParentComponent.activeSubcomponentName;
    componentBeingCopied.componentPreviewStructure.layers.forEach((layer, index) => {
      const indexOfNewLayer = CopyComponent.copyLayerComponent(layer, index, newParentComponent, componentBeingCopied, newComponents);
      if (indexToUpdate === -1 && indexOfNewLayer !== -1) indexToUpdate = index;
    });
    if (indexToUpdate > -1) UpdateLayerDropdownItemNames.update(newParentComponent, indexToUpdate);
    newParentComponent.masterComponent.activeSubcomponentName = defaultActiveSubcomponentName;
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
  // hold references to seed component, however those would be overwritten as such traversal calls
  // copyComponent for every subcomponent
  // could not do child first traversal because some children do not exist for the new component
  private static copyComponent(newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent): void {
    const newComponents: WorkshopComponent[] = [newComponent];
    CopySubcomponents.copy(newComponent.baseSubcomponent, componentBeingCopied.baseSubcomponent);
    CopyComponent.copyLayerComponents(newComponent, componentBeingCopied, newComponents);
    if (newComponent.paddingComponentChild) CopyComponent.copyPaddingComponentChild(newComponent, componentBeingCopied);
    if (newComponent.linkedComponents?.auxiliary) CopyComponent.copyAuxiliaryComponents(newComponent, componentBeingCopied);
    PropertyReferenceSharingFuncsUtils.executePropertyReferenceSharingFuncs(true, 'container', ...newComponents);
  }

  public static copy(optionsComponent: ComponentOptions, componentBeingCopied: WorkshopComponent): WorkshopComponent {
    // used here as button builders do not inherently reset the unique id
    uniqueSubcomponentIdState.resetUniqueId();
    const newComponent = masterComponentTypeToStyleGenerators[componentBeingCopied.type][DEFAULT_STYLES.BASE].createNewComponent({});
    CopyComponent.copyComponent(newComponent, componentBeingCopied);
    newComponent.className = ProcessClassName.addPostfixIfClassNameTaken(newComponent.className,
      (optionsComponent.components as undefined as WorkshopComponent[]), '-copy');
    newComponent.activeSubcomponentName = newComponent.defaultSubcomponentName;
    return newComponent;
  }
}
