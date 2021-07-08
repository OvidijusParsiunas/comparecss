import { componentTypeToStyleGenerators } from '../../../newComponent/types/componentTypeToStyleGenerators';
import { UpdateGenericComponentNames } from '../updateNestedComponentNames/updateGenericComponentNames';
import { UpdateLayerComponentNames } from '../updateNestedComponentNames/updateLayerComponentNames';
import { Subcomponents, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { uniqueSubcomponentIdState } from '../../componentGenerator/uniqueSubcomponentIdState';
import { CoreSubcomponentNames } from '../../../../../../interfaces/customSubcomponentNames';
import { AddNewGenericComponent } from '../addNewNestedComponent/add/addNewGenericComponent';
import { AddNewLayerComponent } from '../addNewNestedComponent/add/addNewLayerComponent';
import { DEFAULT_STYLES } from '../../../../../../consts/componentStyles.enum';
import { Layer } from '../../../../../../interfaces/componentPreviewStructure';
import ProcessClassName from '../../componentGenerator/processClassName';
import { CopySubcomponents } from './copySubcomponents';
import { ComponentOptions } from 'vue';

export default class CopyComponent {

  private static executeReferenceSharingExecutables(baseComponentRefs: WorkshopComponent[], newComponent: WorkshopComponent): void {
    baseComponentRefs.forEach((nestedComponentRef) => {
      const { coreSubcomponentNames, referenceSharingExecutables } = nestedComponentRef;
      (referenceSharingExecutables || []).forEach((executable: (subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames) => void) => {
        executable(newComponent.subcomponents, coreSubcomponentNames);
      });
    });
  }

  private static copyAlignedSectionComponents(oldLayer: Layer, newLayer: Layer, newComponent: WorkshopComponent, baseComponentRefs: WorkshopComponent[]): void {
    Object.keys(oldLayer.sections.alignedSections).forEach((section) => {
      oldLayer.sections.alignedSections[section].forEach((subcomponent) => {
        const { type, style} = subcomponent.subcomponentProperties.nestedComponent.ref as WorkshopComponent;
        const layerName = newLayer.name;
        const newNestedComponent = AddNewGenericComponent.add(newComponent, type, style, layerName);
        baseComponentRefs.push(newNestedComponent);
        CopySubcomponents.copyComponentSubcomponents(subcomponent.subcomponentProperties.nestedComponent.ref, newNestedComponent);
      });
    });
  }

  private static copyLayerComponents(newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent, baseComponentRefs: WorkshopComponent[]): void {
    componentBeingCopied.componentPreviewStructure.layers.forEach((layer, index) => {
      const newLayerStyle = componentBeingCopied.subcomponents[layer.name].nestedComponent.ref.style;
      const newLayer = AddNewLayerComponent.add(newComponent, newLayerStyle, true);
      CopyComponent.copyAlignedSectionComponents(layer, newComponent.componentPreviewStructure.layers[index], newComponent, baseComponentRefs);
      UpdateGenericComponentNames.updateViaLayerObject(newComponent, newComponent.componentPreviewStructure.layers[index]);
      CopySubcomponents.copyComponentSubcomponents(layer.subcomponentProperties.nestedComponent.ref, newLayer);
    });
    UpdateLayerComponentNames.update(newComponent, 1);
  }

  private static copySubcomponents(newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent): void {
    const baseComponentRefs: WorkshopComponent[] = [];
    CopySubcomponents.copyBaseSubcomponent(newComponent, componentBeingCopied);
    CopyComponent.copyLayerComponents(newComponent, componentBeingCopied, baseComponentRefs);
    CopyComponent.executeReferenceSharingExecutables(baseComponentRefs, newComponent);
  }

  public static copyComponent(optionsComponent: ComponentOptions, componentBeingCopied: WorkshopComponent): WorkshopComponent {
    // used here as button builders do not inherently reset the unique id
    uniqueSubcomponentIdState.resetUniqueId();
    const newComponent = componentTypeToStyleGenerators[componentBeingCopied.type][DEFAULT_STYLES.BASE].createNewComponent();
    CopyComponent.copySubcomponents(newComponent, componentBeingCopied);
    newComponent.className = ProcessClassName.addPostfixIfClassNameTaken(newComponent.className,
      (optionsComponent.components as undefined as WorkshopComponent[]), '-copy');
    return newComponent;
  }
}
