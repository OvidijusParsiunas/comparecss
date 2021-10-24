import { UpdateContainerComponentDropdownItemNames } from '../../../../utils/componentManipulation/updateChildComponent/updateContainerComponentDropdownItemNames';
import { AddContainerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addContainerComponent';
import { CustomCss, SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { AddLayerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addLayerComponent';
import { SyncChildComponentUtils } from '../../../../toolbar/options/syncChildComponent/syncChildComponentUtils';
import { LAYER_STYLES, TEXT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { ComponentBuilder } from '../../shared/componentBuilder';

interface OverwriteTextBaseContext {
  createDefaultTextCss: () => CustomCss;
  overwriteOtherBaseProperties?: (textBaseSubcomponent: SubcomponentProperties) => void;
}

export class AddTextComponentToButton extends ComponentBuilder {

  private static addTextComponent(buttonComponent: WorkshopComponent, textStyle: TEXT_STYLES): void {
    const layerComponent = AddLayerComponent.add(buttonComponent, LAYER_STYLES.PLAIN, false);
    AddContainerComponent.add(buttonComponent, COMPONENT_TYPES.TEXT, textStyle, layerComponent.baseSubcomponent.name);
    UpdateContainerComponentDropdownItemNames.updateViaParentLayerPreviewStructure(buttonComponent, buttonComponent.componentPreviewStructure.layers[0]);
  }

  private static overwriteButtonTextProperties(textComponent: WorkshopComponent, textContent: string): void {
    textComponent.baseSubcomponent.customStaticFeatures.subcomponentText.text = textContent;
    textComponent.baseSubcomponent.defaultCustomStaticFeatures.subcomponentText.text = textContent;
    textComponent.baseSubcomponent.isRemovable = true;
  }

  private static overwriteCustomFeatures(textBaseSubcomponent: SubcomponentProperties): void {
    textBaseSubcomponent.customFeatures.animations = ComponentBuilder.createStationaryAnimations({});
    textBaseSubcomponent.defaultCustomFeatures.animations = ComponentBuilder.createStationaryAnimations({});
  }

  private static overwriteCustomCss(buttonComponent: WorkshopComponent, textBaseSubcomponent: SubcomponentProperties,
      createDefaultTextCss: () => CustomCss): void {
    if (!SyncChildComponentUtils.getCurrentOrParentComponentThatIsInSync(buttonComponent)) {
      textBaseSubcomponent.customCss = createDefaultTextCss();
      textBaseSubcomponent.defaultCss = createDefaultTextCss(); 
    }
  }

  private static overwriteTextBase(textComponent: WorkshopComponent, buttonComponent: WorkshopComponent): void {
    const { createDefaultTextCss, overwriteOtherBaseProperties } = this as any as OverwriteTextBaseContext;
    const { baseSubcomponent: textBaseSubcomponent } = textComponent;
    AddTextComponentToButton.overwriteCustomCss(buttonComponent, textBaseSubcomponent, createDefaultTextCss);
    AddTextComponentToButton.overwriteCustomFeatures(textBaseSubcomponent);
    AddTextComponentToButton.overwriteButtonTextProperties(textComponent, 'Button');
    overwriteOtherBaseProperties?.(textBaseSubcomponent);
  }

  private static setPropertyOverwritables(buttonComponent: WorkshopComponent, createDefaultTextCss: () => CustomCss,
      overwriteOtherBaseProperties?: (textBaseSubcomponent: SubcomponentProperties) => void): void {
    buttonComponent.newChildComponents.propertyOverwritables.postBuildFuncs = {
      [COMPONENT_TYPES.TEXT]: [AddTextComponentToButton.overwriteTextBase
        .bind({ createDefaultTextCss, overwriteOtherBaseProperties } as OverwriteTextBaseContext)],
    };
    buttonComponent.newChildComponents.propertyOverwritables.onBuildProperties = {
      [COMPONENT_TYPES.TEXT]: { alignmentSection: ALIGNED_SECTION_TYPES.CENTER },
    };
  }

  public static add(buttonComponent: WorkshopComponent, textStyle: TEXT_STYLES, createDefaultTextCss: () => CustomCss,
      overwriteOtherBaseProperties?: (textBaseSubcomponent: SubcomponentProperties) => void): void {
    AddTextComponentToButton.setPropertyOverwritables(buttonComponent, createDefaultTextCss, overwriteOtherBaseProperties);
    AddTextComponentToButton.addTextComponent(buttonComponent, textStyle);
  }
}
