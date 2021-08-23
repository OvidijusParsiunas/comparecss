import { UpdateGenericComponentDropdownOptionNames } from '../updateNestedComponentNames/updateGenericComponentDropdownOptionNames';
import { UpdateLayerDropdownOptionNames } from '../updateNestedComponentNames/updateLayerDropdownOptionNames';
import { componentTypeToStyleGenerators } from '../../../newComponent/types/componentTypeToStyleGenerators';
import { Layer, NestedComponent } from '../../../../../../interfaces/componentPreviewStructure';
import { uniqueSubcomponentIdState } from '../../componentGenerator/uniqueSubcomponentIdState';
import { CoreSubcomponentRefsUtils } from '../coreSubcomponentRefs/coreSubcomponentRefsUtils';
import { AddNewGenericComponent } from '../addNewNestedComponent/add/addNewGenericComponent';
import { CoreSubcomponentRefs } from '../../../../../../interfaces/coreSubcomponentRefs';
import { AddNewLayerComponent } from '../addNewNestedComponent/add/addNewLayerComponent';
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

  private static copyAlignedSectionComponents(newLayer: Layer, copiedLayer: Layer, newComponent: WorkshopComponent, baseComponentRefs: WorkshopComponent[]): void {
    const { alignedSections } = copiedLayer.sections;
    Object.keys(alignedSections).forEach((section: ALIGNED_SECTION_TYPES) => {
      alignedSections[section].forEach((subcomponent: NestedComponent) => {
        const { type, style } = subcomponent.subcomponentProperties.seedComponent.ref;
        const newNestedComponent = AddNewGenericComponent.add(
          newComponent, type, style, newLayer.name, [CopyComponent.overwriteAlignedLayerSectionProperties.bind(section)]);
        baseComponentRefs.push(newNestedComponent);
        CopySubcomponents.copyComponentSubcomponents(subcomponent.subcomponentProperties.seedComponent.ref, newNestedComponent);
      });
    });
  }

  private static copyLayerComponents(newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent, baseComponentRefs: WorkshopComponent[]): void {
    componentBeingCopied.componentPreviewStructure.layers.forEach((layer, index) => {
      const copiedLayerStyle = componentBeingCopied.subcomponents[layer.name].seedComponent.ref.style;
      const newLayer = AddNewLayerComponent.add(newComponent, copiedLayerStyle, true);
      CopyComponent.copyAlignedSectionComponents(newComponent.componentPreviewStructure.layers[index], layer, newComponent, baseComponentRefs);
      UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(newComponent, newComponent.componentPreviewStructure.layers[index]);
      CopySubcomponents.copyComponentSubcomponents(layer.subcomponentProperties.seedComponent.ref, newLayer);
    });
    UpdateLayerDropdownOptionNames.update(newComponent, 0);
  }

  private static copySubcomponents(newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent): void {
    const baseComponentRefs: WorkshopComponent[] = [];
    CopySubcomponents.copyBaseSubcomponent(newComponent, componentBeingCopied);
    CopyComponent.copyLayerComponents(newComponent, componentBeingCopied, baseComponentRefs);
    CoreSubcomponentRefsUtils.executeReferenceSharingExecutables(...baseComponentRefs);
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
