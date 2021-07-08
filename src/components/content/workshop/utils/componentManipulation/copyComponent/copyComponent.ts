import { componentTypeToStyleGenerators } from '../../../newComponent/types/componentTypeToStyleGenerators';
import { UpdateGenericComponentNames } from '../updateNestedComponentNames/updateGenericComponentNames';
import { UpdateLayerComponentNames } from '../updateNestedComponentNames/updateLayerComponentNames';
import { Subcomponents, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { uniqueSubcomponentIdState } from '../../componentGenerator/uniqueSubcomponentIdState';
import { CoreSubcomponentNames } from '../../../../../../interfaces/customSubcomponentNames';
import { AddNewGenericComponent } from '../addNewNestedComponent/add/addNewGenericComponent';
import { AddNewLayerComponent } from '../addNewNestedComponent/add/addNewLayerComponent';
import { DEFAULT_STYLES } from '../../../../../../consts/componentStyles.enum';
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

  private static createPlaneComponents(newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent, baseComponentRefs: WorkshopComponent[]): void {
    CopySubcomponents.copyBaseSubcomponent(newComponent.subcomponents[newComponent.coreSubcomponentNames.base],
      componentBeingCopied.subcomponents[componentBeingCopied.coreSubcomponentNames.base]);
    componentBeingCopied.componentPreviewStructure.layers.forEach((layer, index) => {
      const newLayerStyle = componentBeingCopied.subcomponents[layer.name].nestedComponent.ref.style;
      const newLayer = AddNewLayerComponent.add(newComponent, newLayerStyle, true);
      Object.keys(layer.sections.alignedSections).forEach((section) => {
        layer.sections.alignedSections[section].forEach((subcomponent) => {
          const { type, style} = subcomponent.subcomponentProperties.nestedComponent.ref as WorkshopComponent;
          let layerName = newComponent.componentPreviewStructure.layers[index].name;
          const newNestedComponent = AddNewGenericComponent.add(newComponent, type, style, layerName);
          baseComponentRefs.push(newNestedComponent);
          CopySubcomponents.copyComponentSubcomponents(subcomponent.subcomponentProperties.nestedComponent.ref, newNestedComponent);
        });
      });
      const { name, sections: { alignedSections }} = newComponent.componentPreviewStructure.layers[index];
      const { subcomponentDropdownStructure } = newComponent.componentPreviewStructure;
      const parentComponentBaseName = Object.keys(subcomponentDropdownStructure)[0];
      const nestedComponents = subcomponentDropdownStructure[parentComponentBaseName][name];
      UpdateGenericComponentNames.update(newComponent, nestedComponents, alignedSections);
      CopySubcomponents.copyComponentSubcomponents(layer.subcomponentProperties.nestedComponent.ref, newLayer);
    });
    UpdateLayerComponentNames.update(newComponent, 1);
  }

  private static copySubcomponents(newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent): void {
    const baseComponentRefs: WorkshopComponent[] = [];
    CopyComponent.createPlaneComponents(newComponent, componentBeingCopied, baseComponentRefs);
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
