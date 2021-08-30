import { UpdateGenericComponentDropdownOptionNames } from '../updateChildComponent/updateGenericComponentDropdownOptionNames';
import { componentTypeToStyleGenerators } from '../../../newComponent/types/componentTypeToStyleGenerators';
import { UpdateLayerDropdownOptionNames } from '../updateChildComponent/updateLayerDropdownOptionNames';
import { Layer, BaseSubcomponentRef } from '../../../../../../interfaces/componentPreviewStructure';
import { AddNewContainerComponent } from '../addNewChildComponent/add/addNewContainerComponent';
import { uniqueSubcomponentIdState } from '../../componentGenerator/uniqueSubcomponentIdState';
import { CoreSubcomponentRefsUtils } from '../coreSubcomponentRefs/coreSubcomponentRefsUtils';
import { CoreSubcomponentRefs } from '../../../../../../interfaces/coreSubcomponentRefs';
import { AddNewLayerComponent } from '../addNewChildComponent/add/addNewLayerComponent';
import { ComponentBuilder } from '../../../newComponent/types/shared/componentBuilder';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { ALIGNED_SECTION_TYPES } from '../../../../../../consts/layerSections.enum';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { DEFAULT_STYLES } from '../../../../../../consts/componentStyles.enum';
import ProcessClassName from '../../componentGenerator/processClassName';
import { CopySubcomponents } from './copySubcomponents';
import { ComponentOptions } from 'vue';

export default class CopyComponent {

  private static overwriteAlignedLayerSectionProperties(coreSubcomponentRefs: CoreSubcomponentRefs): void {
    const newAlignedSection = this as any as ALIGNED_SECTION_TYPES;
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(newAlignedSection);
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].defaultCustomFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(newAlignedSection);
  }

  private static copyAlignedSectionComponents(newLayer: Layer, copiedLayer: Layer, newComponent: WorkshopComponent, baseComponents: WorkshopComponent[]): void {
    const { alignedSections } = copiedLayer.sections;
    Object.keys(alignedSections).forEach((section: ALIGNED_SECTION_TYPES) => {
      alignedSections[section].forEach((subcomponent: BaseSubcomponentRef) => {
        const { type, style } = subcomponent.subcomponentProperties.seedComponent;
        const newChildComponent = AddNewContainerComponent.add(
          newComponent, type, style, newLayer.subcomponentProperties.name, [CopyComponent.overwriteAlignedLayerSectionProperties.bind(section)]);
        baseComponents.push(newChildComponent);
        CopySubcomponents.copyComponentSubcomponents(subcomponent.subcomponentProperties.seedComponent, newChildComponent);
      });
    });
  }

  private static copyLayerComponents(newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent, baseComponents: WorkshopComponent[]): void {
    componentBeingCopied.componentPreviewStructure.layers.forEach((layer, index) => {
      const copiedLayerStyle = componentBeingCopied.subcomponents[layer.subcomponentProperties.name].seedComponent.style;
      const newLayer = AddNewLayerComponent.add(newComponent, copiedLayerStyle, true);
      CopyComponent.copyAlignedSectionComponents(newComponent.componentPreviewStructure.layers[index], layer, newComponent, baseComponents);
      UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(newComponent, newComponent.componentPreviewStructure.layers[index]);
      CopySubcomponents.copyComponentSubcomponents(layer.subcomponentProperties.seedComponent, newLayer);
    });
    UpdateLayerDropdownOptionNames.update(newComponent, 0);
  }

  private static copySubcomponents(newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent): void {
    const baseComponents: WorkshopComponent[] = [newComponent];
    CopySubcomponents.copyBaseSubcomponent(newComponent, componentBeingCopied);
    CopyComponent.copyLayerComponents(newComponent, componentBeingCopied, baseComponents);
    CoreSubcomponentRefsUtils.executeReferenceSharingExecutables(...baseComponents);
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
