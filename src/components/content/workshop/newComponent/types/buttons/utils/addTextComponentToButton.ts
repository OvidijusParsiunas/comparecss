import { UpdateContainerComponentDropdownItemNames } from '../../../../utils/componentManipulation/updateChildComponent/updateContainerComponentDropdownItemNames';
import { AddContainerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addContainerComponent';
import { AddLayerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addLayerComponent';
import { SyncChildComponentUtils } from '../../../../toolbar/options/syncChildComponent/syncChildComponentUtils';
import { CustomCss, Subcomponent, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { HORIZONTAL_ALIGNMENT_SECTIONS } from '../../../../../../../consts/horizontalAlignmentSections';
import { SyncedComponent } from '../../../../toolbar/options/syncChildComponent/syncedComponent';
import { LAYER_STYLES, TEXT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { ComponentBuilder } from '../../shared/componentBuilder';

interface OverwriteTextBaseContext {
  createDefaultTextCss: () => CustomCss;
  overwriteOtherBaseProperties?: (textBaseSubcomponent: Subcomponent) => void;
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

  private static overwriteCustomFeatures(textBaseSubcomponent: Subcomponent): void {
    textBaseSubcomponent.customFeatures.animations = ComponentBuilder.createStationaryAnimations({});
    textBaseSubcomponent.defaultCustomFeatures.animations = ComponentBuilder.createStationaryAnimations({});
  }

  private static overwriteCustomCss(buttonComponent: WorkshopComponent, textComponent: WorkshopComponent,
      createDefaultTextCss: () => CustomCss): void {
    const inSyncParentComponent = SyncChildComponentUtils.getCurrentOrParentComponentThatIsInSync(buttonComponent);
    if (!inSyncParentComponent
      // if button of a dropdown is in sync - but the button that it is synced to does not have text - overwrite
      // SyncedComponent.findChildComponentToSync is called by copyChildPropertiesFromInSyncContainerComponent in createNewComponent earlier and this is called again
      // potential opportunity to use a variable to identify if text is sync to not have to call this again  
      || !SyncedComponent.findChildComponentToSync(textComponent, inSyncParentComponent.sync.componentThisIsSyncedTo, buttonComponent.type)) {
        textComponent.baseSubcomponent.customCss = createDefaultTextCss();
        textComponent.baseSubcomponent.defaultCss = createDefaultTextCss();  
    }
  }

  private static overwriteTextBase(textComponent: WorkshopComponent, buttonComponent: WorkshopComponent): void {
    const { createDefaultTextCss, overwriteOtherBaseProperties } = this as any as OverwriteTextBaseContext;
    const { baseSubcomponent: textBaseSubcomponent } = textComponent;
    AddTextComponentToButton.overwriteCustomCss(buttonComponent, textComponent, createDefaultTextCss);
    AddTextComponentToButton.overwriteCustomFeatures(textBaseSubcomponent);
    AddTextComponentToButton.overwriteButtonTextProperties(textComponent, 'Button');
    overwriteOtherBaseProperties?.(textBaseSubcomponent);
  }

  private static setPropertyOverwritables(buttonComponent: WorkshopComponent, createDefaultTextCss: () => CustomCss,
      overwriteOtherBaseProperties?: (textBaseSubcomponent: Subcomponent) => void): void {
    buttonComponent.childComponentHandlers.onAddOverwritables.postBuildFuncs = {
      [COMPONENT_TYPES.TEXT]: [AddTextComponentToButton.overwriteTextBase
        .bind({ createDefaultTextCss, overwriteOtherBaseProperties } as OverwriteTextBaseContext)],
    };
    buttonComponent.childComponentHandlers.onAddOverwritables.onBuildProperties = {
      [COMPONENT_TYPES.TEXT]: { horizontalSection: HORIZONTAL_ALIGNMENT_SECTIONS.CENTER },
    };
  }

  public static add(buttonComponent: WorkshopComponent, textStyle: TEXT_STYLES, createDefaultTextCss: () => CustomCss,
      overwriteOtherBaseProperties?: (textBaseSubcomponent: Subcomponent) => void): void {
    AddTextComponentToButton.setPropertyOverwritables(buttonComponent, createDefaultTextCss, overwriteOtherBaseProperties);
    AddTextComponentToButton.addTextComponent(buttonComponent, textStyle);
  }
}
