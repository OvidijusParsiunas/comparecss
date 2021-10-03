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
        CopyComponent.copySubcomponents(newChildComponent, subcomponent.subcomponentProperties.seedComponent);
      });
    });
    newComponent.masterComponent.activeSubcomponentName = temp;
  }

  // new components with base should not have layers to begin with so in the future this method may not be required
  private static removeLayerComponents(newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent): void {
    if (componentBeingCopied.componentPreviewStructure.layers.length < newComponent.componentPreviewStructure.layers.length) {
      const diff = newComponent.componentPreviewStructure.layers.length - componentBeingCopied.componentPreviewStructure.layers.length;
      for (let i = 0; i < diff; i += 1) {
        const temp = newComponent.masterComponent.activeSubcomponentName;
        newComponent.masterComponent.activeSubcomponentName = newComponent.componentPreviewStructure.layers[
          newComponent.componentPreviewStructure.layers.length - 1].subcomponentProperties.seedComponent.activeSubcomponentName;
        RemoveChildComponent.remove(newComponent.masterComponent);
        newComponent.masterComponent.activeSubcomponentName = temp;
      }
    }
  }

  private static copyLayerComponents(newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent, baseComponents: WorkshopComponent[]): void {
    CopyComponent.removeLayerComponents(newComponent, componentBeingCopied);
    let indexToUpdate = -1;
    const temp = newComponent.masterComponent.activeSubcomponentName;
    newComponent.masterComponent.activeSubcomponentName = newComponent.activeSubcomponentName;
    componentBeingCopied.componentPreviewStructure.layers.forEach((layer, index) => {
      const copiedLayerStyle = layer.subcomponentProperties.seedComponent.style;
      const isPresent = newComponent.componentPreviewStructure.layers[index];
      const isEditable = !!componentBeingCopied.masterComponent.componentPreviewStructure.subcomponentNameToDropdownItemName[layer.subcomponentProperties.seedComponent.activeSubcomponentName];
      const newLayer = isPresent
        ? newComponent.componentPreviewStructure.layers[index].subcomponentProperties.seedComponent
        : AddLayerComponent.add(newComponent, copiedLayerStyle, isEditable);
      if (!isPresent) {
        newLayer.childComponentsLockedToLayer?.add(newLayer, newComponent);
      }
      CopyComponent.copyAlignedSectionComponents(newComponent.componentPreviewStructure.layers[index], layer, newComponent, baseComponents);
      UpdateGenericComponentDropdownItemNames.updateViaParentLayerPreviewStructure(newComponent, newComponent.componentPreviewStructure.layers[index]);
      CopySubcomponents.copy(newLayer.baseSubcomponent, layer.subcomponentProperties);
      if (!isPresent && indexToUpdate === -1) indexToUpdate = index;
    });
    if (indexToUpdate > -1) {
      UpdateLayerDropdownItemNames.update(newComponent, indexToUpdate);
    }
    newComponent.masterComponent.activeSubcomponentName = temp;
  }

  // could not copy subcomponents by parent first preview structure traversal as upon dynamically creating child components
  // the subcomponents hold references with seed component, however those woild be overwritten as such traversal calls
  // copySubcomponents for every subcomponent
  // could not do child first traversal because some children do not exist for the new component
  private static copySubcomponents(newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent): void {
    // TraverseComponentViaPreviewStructureParentFirst.traverse(CopyComponent.callback, componentBeingCopied, newComponent);
    const baseComponents: WorkshopComponent[] = [newComponent];
    CopySubcomponents.copy(newComponent.baseSubcomponent, componentBeingCopied.baseSubcomponent);
    CopyComponent.copyLayerComponents(newComponent, componentBeingCopied, baseComponents);
    if (newComponent.paddingComponentChild) {
      CopyComponent.copySubcomponents(newComponent.paddingComponentChild, componentBeingCopied.paddingComponentChild);
      UpdatePaddingComponentDropdownItemNames.updatePaddingComponentChildren(newComponent.paddingComponentChild);
    }
    newComponent.linkedComponents?.auxiliary?.forEach((auxiliaryComponent, index) => {
      CopyComponent.copySubcomponents(auxiliaryComponent, componentBeingCopied.linkedComponents.auxiliary[index]);
    });
    PropertyOverwritingExecutablesUtils.executePropertyOverwritingExecutables(...baseComponents);
  }

  public static copyComponent(optionsComponent: ComponentOptions, componentBeingCopied: WorkshopComponent): WorkshopComponent {
    // WORK2: copy auxiliary component and shared customCss
    // used here as button builders do not inherently reset the unique id
    uniqueSubcomponentIdState.resetUniqueId();
    const newComponent = componentTypeToStyleGenerators[componentBeingCopied.type][DEFAULT_STYLES.BASE].createNewComponent();
    CopyComponent.copySubcomponents(newComponent, componentBeingCopied);
    newComponent.className = ProcessClassName.addPostfixIfClassNameTaken(newComponent.className,
      (optionsComponent.components as undefined as WorkshopComponent[]), '-copy');
    return newComponent;
  }

  // private static callback(state: SubcomponentPreviewTraversalState, secondComponentState: SubcomponentPreviewTraversalState): SubcomponentPreviewTraversalState {
  //   if (state.subcomponentProperties.seedComponent.componentPreviewStructure.layers.length < secondComponentState?.subcomponentProperties.seedComponent.componentPreviewStructure.layers.length) {
  //     const diff = secondComponentState.subcomponentProperties.seedComponent.componentPreviewStructure.layers.length - state.subcomponentProperties.seedComponent.componentPreviewStructure.layers.length;
  //     for (let i = 0; i < diff; i += 1) {
  //       secondComponentState.subcomponentProperties.seedComponent.masterComponent.activeSubcomponentName = secondComponentState.subcomponentProperties.seedComponent.componentPreviewStructure.layers[
  //         secondComponentState.subcomponentProperties.seedComponent.componentPreviewStructure.layers.length - 1].subcomponentProperties.seedComponent.activeSubcomponentName;
  //       RemoveChildComponent.remove(secondComponentState.subcomponentProperties.seedComponent.masterComponent);
  //     }
  //   } else if (state.subcomponentProperties.seedComponent.componentPreviewStructure.layers.length > secondComponentState?.subcomponentProperties.seedComponent.componentPreviewStructure.layers.length) {
  //     const initialLength = secondComponentState.subcomponentProperties.seedComponent.componentPreviewStructure.layers.length;
  //     const diff = state.subcomponentProperties.seedComponent.componentPreviewStructure.layers.length - initialLength;
  //     for (let i = 0; i < diff; i += 1) {
  //       secondComponentState.subcomponentProperties.seedComponent.masterComponent.activeSubcomponentName = secondComponentState.subcomponentProperties.seedComponent.activeSubcomponentName;
  //       const layer = state.subcomponentProperties.seedComponent.componentPreviewStructure.layers[0];
  //       const newLayer = AddLayerComponent.add(secondComponentState.subcomponentProperties.seedComponent, layer.subcomponentProperties.seedComponent.style, true);
  //       newLayer.childComponentsLockedToLayer?.add(newLayer, secondComponentState.subcomponentProperties.seedComponent);
  //       // UpdateGenericComponentDropdownItemNames.updateViaParentLayerPreviewStructure(secondComponentState.parentComponent, secondComponentState.parentComponent.componentPreviewStructure.layers[state.index]);
  //     }
  //     UpdateLayerDropdownItemNames.update(secondComponentState.subcomponentProperties.seedComponent, initialLength);
  //   }
  //   if (state.subcomponentProperties.seedComponent.type === COMPONENT_TYPES.LAYER) {
  //     const { alignedSections } = state.layers[state.index].sections;
  //     let updated = false;
  //     Object.keys(alignedSections).forEach((section: ALIGNED_SECTION_TYPES) => {
  //       alignedSections[section].forEach((subcomponent: BaseSubcomponentRef, index: number) => {
  //         if (!secondComponentState.layers[state.index].sections.alignedSections[section][index]) {
  //           const { type, style } = subcomponent.subcomponentProperties.seedComponent;
  //           const newChildComponent = AddContainerComponent.add(
  //             secondComponentState.parentComponent, type, style, secondComponentState.layers[state.index].subcomponentProperties.name, [CopyComponent.overwriteAlignedLayerSectionProperties.bind(section)]);
  //           // baseComponents.push(newChildComponent);
  //           CopySubcomponents.copyExistingSubcomponentProperties(newChildComponent.baseSubcomponent, state.layers[state.index].sections.alignedSections[section][index].subcomponentProperties);
  //           PropertyOverwritingExecutablesUtils.executePropertyOverwritingExecutables(newChildComponent);
  //           updated = true;
  //         }
  //       });
  //     });
  //     if (updated) UpdateGenericComponentDropdownItemNames.updateViaParentLayerPreviewStructure(secondComponentState.parentComponent, secondComponentState.layers[state.index]);
  //   }
  //   CopySubcomponents.copyExistingSubcomponentProperties(secondComponentState.subcomponentProperties, state.subcomponentProperties);
  //   PropertyOverwritingExecutablesUtils.executePropertyOverwritingExecutables(secondComponentState.subcomponentProperties.seedComponent);
  //   return state;
  // }
}
