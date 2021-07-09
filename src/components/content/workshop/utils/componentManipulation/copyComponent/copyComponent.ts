import { componentTypeToStyleGenerators } from '../../../newComponent/types/componentTypeToStyleGenerators';
import { UpdateGenericComponentNames } from '../updateNestedComponentNames/updateGenericComponentNames';
import { UpdateLayerComponentNames } from '../updateNestedComponentNames/updateLayerComponentNames';
import { Layer, NestedSubcomponent } from '../../../../../../interfaces/componentPreviewStructure';
import { Subcomponents, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { uniqueSubcomponentIdState } from '../../componentGenerator/uniqueSubcomponentIdState';
import { CoreSubcomponentNames } from '../../../../../../interfaces/customSubcomponentNames';
import { AddNewGenericComponent } from '../addNewNestedComponent/add/addNewGenericComponent';
import { AddNewLayerComponent } from '../addNewNestedComponent/add/addNewLayerComponent';
import { ComponentBuilder } from '../../../newComponent/types/shared/componentBuilder';
import { ALIGNED_SECTION_TYPES } from '../../../../../../consts/layerSections.enum';
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

  private static overwriteAlignedLayerSectionProperties(subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames): void {
    const newAlignedSection = this as any as ALIGNED_SECTION_TYPES;
    subcomponents[coreSubcomponentNames.base].customFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(newAlignedSection);
    subcomponents[coreSubcomponentNames.base].defaultCustomFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(newAlignedSection);
  }

  private static copyAlignedSectionComponents(newLayer: Layer, copiedLayer: Layer, newComponent: WorkshopComponent, baseComponentRefs: WorkshopComponent[]): void {
    const { alignedSections } = copiedLayer.sections;
    Object.keys(alignedSections).forEach((section: ALIGNED_SECTION_TYPES) => {
      alignedSections[section].forEach((subcomponent: NestedSubcomponent) => {
        const { type, style } = subcomponent.subcomponentProperties.nestedComponent.ref;
        const newNestedComponent = AddNewGenericComponent.add(
          newComponent, type, style, newLayer.name, [CopyComponent.overwriteAlignedLayerSectionProperties.bind(section)]);
        baseComponentRefs.push(newNestedComponent);
        CopySubcomponents.copyComponentSubcomponents(subcomponent.subcomponentProperties.nestedComponent.ref, newNestedComponent);
      });
    });
  }

  private static copyLayerComponents(newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent, baseComponentRefs: WorkshopComponent[]): void {
    componentBeingCopied.componentPreviewStructure.layers.forEach((layer, index) => {
      const copiedLayerStyle = componentBeingCopied.subcomponents[layer.name].nestedComponent.ref.style;
      const newLayer = AddNewLayerComponent.add(newComponent, copiedLayerStyle, true);
      CopyComponent.copyAlignedSectionComponents(newComponent.componentPreviewStructure.layers[index], layer, newComponent, baseComponentRefs);
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
