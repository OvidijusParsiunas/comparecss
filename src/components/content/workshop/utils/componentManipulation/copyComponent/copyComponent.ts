import { PropertyOverwritingExecutablesUtils } from '../../../newComponent/types/shared/propertyOverwritingExecutables/propertyOverwritingExecutablesUtils';
import { UpdateGenericComponentDropdownItemNames } from '../updateChildComponent/updateGenericComponentDropdownItemNames';
import { UpdatePaddingComponentDropdownItemNames } from '../updateChildComponent/updatePaddingComponentDropdownItemNames';
import { componentTypeToStyleGenerators } from '../../../newComponent/types/componentTypeToStyleGenerators';
import { UpdateLayerDropdownItemNames } from '../updateChildComponent/updateLayerDropdownItemNames';
import { BaseSubcomponentRef, Layer } from '../../../../../../interfaces/componentPreviewStructure';
import { uniqueSubcomponentIdState } from '../../componentGenerator/uniqueSubcomponentIdState';
import { ComponentBuilder } from '../../../newComponent/types/shared/componentBuilder';
import { AddContainerComponent } from '../addChildComponent/add/addContainerComponent';
import { ALIGNED_SECTION_TYPES } from '../../../../../../consts/layerSections.enum';
import { RemoveChildComponent } from '../removeChildComponent/removeChildComponent';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { DEFAULT_STYLES } from '../../../../../../consts/componentStyles.enum';
import { AddLayerComponent } from '../addChildComponent/add/addLayerComponent';
import ProcessClassName from '../../componentGenerator/processClassName';
import { CopySubcomponents } from './copySubcomponents';
import { ComponentOptions } from 'vue';

export class CopyComponent {

  private static overwriteAlignedLayerSectionProperties(component: WorkshopComponent): void {
    const newAlignedSection = this as any as ALIGNED_SECTION_TYPES;
    component.baseSubcomponent.customStaticFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(newAlignedSection);
    component.baseSubcomponent.defaultCustomStaticFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(newAlignedSection);
  }

  private static removeAlignedSectionComponents(newLayer: Layer, newComponent: WorkshopComponent, section: ALIGNED_SECTION_TYPES): void {
    const diff = newLayer.sections.alignedSections[section].length;
    const temp = newComponent.masterComponent.activeSubcomponentName;
    for (let i = 0; i < diff; i += 1) {
      newComponent.masterComponent.activeSubcomponentName = newLayer.sections.alignedSections[section][newLayer.sections.alignedSections[section].length - 1].subcomponentProperties.seedComponent.activeSubcomponentName;
      RemoveChildComponent.remove(newComponent.masterComponent);
    }
    newComponent.masterComponent.activeSubcomponentName = temp;
  }

  private static copyAlignedSectionComponents(newLayer: Layer, copiedLayer: Layer, newComponent: WorkshopComponent, baseComponents: WorkshopComponent[]): void {
    const { alignedSections } = copiedLayer.sections;
    const temp = newComponent.masterComponent.activeSubcomponentName;
    newComponent.masterComponent.activeSubcomponentName = newComponent
        .masterComponent.componentPreviewStructure.subcomponentNameToDropdownItemName[newLayer.subcomponentProperties.seedComponent.activeSubcomponentName]
      ? newLayer.subcomponentProperties.seedComponent.activeSubcomponentName
      : newComponent.activeSubcomponentName;
    Object.keys(alignedSections).forEach((section: ALIGNED_SECTION_TYPES) => {
      if (!newLayer.subcomponentProperties.seedComponent.childComponentsLockedToLayer) {
        CopyComponent.removeAlignedSectionComponents(newLayer, newComponent, section);
      }
      alignedSections[section].forEach((subcomponent: BaseSubcomponentRef, index) => {
        let newChildComponent = null;
        if (!newLayer.subcomponentProperties.seedComponent.childComponentsLockedToLayer) {
          const { type, style } = subcomponent.subcomponentProperties.seedComponent;
          newChildComponent = AddContainerComponent.add(
            newComponent, type, style, newLayer.subcomponentProperties.name, [CopyComponent.overwriteAlignedLayerSectionProperties.bind(section)]);
          baseComponents.push(newChildComponent);
        } else {
          newChildComponent = newLayer.sections.alignedSections[section][index].subcomponentProperties.seedComponent;
        }
        CopyComponent.copyComponent(newChildComponent, subcomponent.subcomponentProperties.seedComponent);
      });
    });
    newComponent.masterComponent.activeSubcomponentName = temp;
  }

  private static isLayerEditable(componentBeingCopied: WorkshopComponent, layer: Layer): boolean {
    return !!componentBeingCopied.masterComponent.componentPreviewStructure.subcomponentNameToDropdownItemName[
      layer.subcomponentProperties.seedComponent.activeSubcomponentName];
  }

  private static createNewLayer(newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent, layer: Layer): void {
    const copiedLayerStyle = layer.subcomponentProperties.seedComponent.style;
    const isEditable = CopyComponent.isLayerEditable(componentBeingCopied, layer);
    const newLayer = AddLayerComponent.add(newComponent, copiedLayerStyle, isEditable);
    newLayer.childComponentsLockedToLayer?.add(newLayer, newComponent);
  }

  private static copyLayerComponent(layer: Layer, index: number, newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent,
      baseComponents: WorkshopComponent[]): number {
    const existantNewComponentLayer = newComponent.componentPreviewStructure.layers[index];
    if (!existantNewComponentLayer) CopyComponent.createNewLayer(newComponent, componentBeingCopied, layer);
    const newLayerPreviewComponent = newComponent.componentPreviewStructure.layers[index];
    CopyComponent.copyAlignedSectionComponents(newLayerPreviewComponent, layer, newComponent, baseComponents);
    UpdateGenericComponentDropdownItemNames.updateViaParentLayerPreviewStructure(newComponent, newLayerPreviewComponent);
    CopySubcomponents.copy(newLayerPreviewComponent.subcomponentProperties.seedComponent.baseSubcomponent, layer.subcomponentProperties);
    return !existantNewComponentLayer ? index : -1;
  }

  private static removeLayerComponent(masterComponent: WorkshopComponent, layers: Layer[]): void {
    masterComponent.activeSubcomponentName = layers[layers.length - 1].subcomponentProperties.seedComponent.activeSubcomponentName;
    RemoveChildComponent.remove(masterComponent);
  }

  // new components with base should not have layers to begin with so in the future this method may not be required
  private static removeLayerComponents(newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent): void {
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
    CopyComponent.removeLayerComponents(newComponent, componentBeingCopied);
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
    UpdatePaddingComponentDropdownItemNames.updatePaddingComponentChildren(newComponent.paddingComponentChild);
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
    PropertyOverwritingExecutablesUtils.executePropertyOverwritingExecutables(...baseComponents);
  }

  public static copy(optionsComponent: ComponentOptions, componentBeingCopied: WorkshopComponent): WorkshopComponent {
    // used here as button builders do not inherently reset the unique id
    uniqueSubcomponentIdState.resetUniqueId();
    const newComponent = componentTypeToStyleGenerators[componentBeingCopied.type][DEFAULT_STYLES.BASE].createNewComponent();
    CopyComponent.copyComponent(newComponent, componentBeingCopied);
    newComponent.className = ProcessClassName.addPostfixIfClassNameTaken(newComponent.className,
      (optionsComponent.components as undefined as WorkshopComponent[]), '-copy');
    return newComponent;
  }
}
