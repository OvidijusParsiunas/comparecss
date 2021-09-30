import { PropertyOverwritingExecutablesUtils } from '../../../newComponent/types/shared/propertyOverwritingExecutables/propertyOverwritingExecutablesUtils';
import { UpdateGenericComponentDropdownItemNames } from '../updateChildComponent/updateGenericComponentDropdownItemNames';
import { componentTypeToStyleGenerators } from '../../../newComponent/types/componentTypeToStyleGenerators';
import { UpdateLayerDropdownItemNames } from '../updateChildComponent/updateLayerDropdownItemNames';
import { BaseSubcomponentRef, Layer } from '../../../../../../interfaces/componentPreviewStructure';
import { uniqueSubcomponentIdState } from '../../componentGenerator/uniqueSubcomponentIdState';
import { ComponentBuilder } from '../../../newComponent/types/shared/componentBuilder';
import { AddContainerComponent } from '../addChildComponent/add/addContainerComponent';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { ALIGNED_SECTION_TYPES } from '../../../../../../consts/layerSections.enum';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { DEFAULT_STYLES } from '../../../../../../consts/componentStyles.enum';
import { AddLayerComponent } from '../addChildComponent/add/addLayerComponent';
import ProcessClassName from '../../componentGenerator/processClassName';
import { CopySubcomponents } from './copySubcomponents';
import { ComponentOptions } from 'vue';

export class CopyComponent {

  private static overwriteAlignedLayerSectionProperties(component: WorkshopComponent): void {
    const newAlignedSection = this as any as ALIGNED_SECTION_TYPES;
    component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customStaticFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(newAlignedSection);
    component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].defaultCustomStaticFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(newAlignedSection);
  }

  private static copyAlignedSectionComponents(newLayer: Layer, copiedLayer: Layer, newComponent: WorkshopComponent, baseComponents: WorkshopComponent[]): void {
    const { alignedSections } = copiedLayer.sections;
    Object.keys(alignedSections).forEach((section: ALIGNED_SECTION_TYPES) => {
      alignedSections[section].forEach((subcomponent: BaseSubcomponentRef) => {
        const { type, style } = subcomponent.subcomponentProperties.seedComponent;
        const newChildComponent = AddContainerComponent.add(
          newComponent, type, style, newLayer.subcomponentProperties.name, [CopyComponent.overwriteAlignedLayerSectionProperties.bind(section)]);
        baseComponents.push(newChildComponent);
        CopySubcomponents.copyComponentSubcomponents(subcomponent.subcomponentProperties.seedComponent, newChildComponent);
      });
    });
  }

  private static copyLayerComponents(newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent, baseComponents: WorkshopComponent[]): void {
    componentBeingCopied.componentPreviewStructure.layers.forEach((layer, index) => {
      const copiedLayerStyle = componentBeingCopied.subcomponents[layer.subcomponentProperties.name].seedComponent.style;
      const newLayer = AddLayerComponent.add(newComponent, copiedLayerStyle, true);
      CopyComponent.copyAlignedSectionComponents(newComponent.componentPreviewStructure.layers[index], layer, newComponent, baseComponents);
      UpdateGenericComponentDropdownItemNames.updateViaParentLayerPreviewStructure(newComponent, newComponent.componentPreviewStructure.layers[index]);
      CopySubcomponents.copyComponentSubcomponents(layer.subcomponentProperties.seedComponent, newLayer);
    });
    UpdateLayerDropdownItemNames.update(newComponent, 0);
  }

  private static copySubcomponents(newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent): void {
    const baseComponents: WorkshopComponent[] = [newComponent];
    CopySubcomponents.copyBaseSubcomponent(newComponent, componentBeingCopied);
    CopyComponent.copyLayerComponents(newComponent, componentBeingCopied, baseComponents);
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
}
