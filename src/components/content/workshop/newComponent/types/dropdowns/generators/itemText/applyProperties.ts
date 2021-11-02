import { CustomCss, CustomFeatures, CustomStaticFeatures, WorkshopComponent } from '../../../../../../../../interfaces/workshopComponent';
import { SetTextSubcomponentPropertiesContext } from '../../../layers/generators/dropdownItem';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../../consts/layerSections.enum';
import { Layer } from '../../../../../../../../interfaces/componentPreviewStructure';
import { DEFAULT_TEXT } from '../../../../../../../../consts/defaultText';
import { ComponentBuilder } from '../../../shared/componentBuilder';
import { SetUtils } from '../../../../../utils/generic/setUtils';
import JSONUtils from '../../../../../utils/generic/jsonUtils';
import { ITEM_TEXT_OPTIONS } from './itemTextOptions';

export class ApplyDropdownMenuItemTextProperties extends ComponentBuilder {
  
  private static setTextProperties(customStaticFeatures: CustomStaticFeatures, menuComponent: WorkshopComponent): void {
    const { itemTextOptionIndex } = menuComponent.baseSubcomponent.customStaticFeatures.dropdownMenuData;
    const newDropdownText = ITEM_TEXT_OPTIONS[itemTextOptionIndex];
    customStaticFeatures.subcomponentText = ComponentBuilder.createText(newDropdownText);
    customStaticFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.LEFT);
  }

  private static addMenuJsClassesToText(menuComponent: WorkshopComponent, textComponent: WorkshopComponent): void {
    const { jsClasses: menuJsClasses } = menuComponent.baseSubcomponent.customStaticFeatures;
    const { customStaticFeatures: textCustomStaticFeatures } = textComponent.baseSubcomponent;
    if (menuJsClasses) {
      if (!textCustomStaticFeatures.jsClasses) textCustomStaticFeatures.jsClasses = new Set();
      SetUtils.addSetsToSet(textCustomStaticFeatures.jsClasses, menuJsClasses);
    }
  }

  private static overwriteTextCustomStaticFeatures(menuComponent: WorkshopComponent, textComponent: WorkshopComponent): void {
    ApplyDropdownMenuItemTextProperties.addMenuJsClassesToText(menuComponent, textComponent);
    // used to prevent text option index from getting incremented when previewing a temporary item
    if (textComponent.baseSubcomponent.customStaticFeatures.subcomponentText.text === DEFAULT_TEXT) {
      ApplyDropdownMenuItemTextProperties.setTextProperties(textComponent.baseSubcomponent.customStaticFeatures, menuComponent);
      ApplyDropdownMenuItemTextProperties.setTextProperties(textComponent.baseSubcomponent.defaultCustomStaticFeatures, menuComponent); 
    }
  }

  private static updateItemsOfComponentsSyncedToThis(menuComponent: WorkshopComponent, textComponent: WorkshopComponent): void {
    (menuComponent.linkedComponents.base.paddingComponent?.sync.componentsSyncedToThis || []).forEach((component: WorkshopComponent) => {
      const { layers } = component.paddingComponentChild.linkedComponents.auxiliary[0].componentPreviewStructure;
      if (layers.length > 0) {
        JSONUtils.copyPropertiesThatExistInTarget(
          layers[0].sections.alignedSections.left[0].subcomponentProperties.customCss, textComponent.baseSubcomponent.customCss);
      }
    });
  }

  private static createDefaultTextCustomFeatures(): CustomFeatures {
    return {
      autoSize: ComponentBuilder.createAutoSize(true, true),
    };
  }

  private static overwriteTextCustomFeatures(textComponent: WorkshopComponent): void {
    textComponent.baseSubcomponent.customFeatures = ApplyDropdownMenuItemTextProperties.createDefaultTextCustomFeatures();
    textComponent.baseSubcomponent.defaultCustomFeatures = ApplyDropdownMenuItemTextProperties.createDefaultTextCustomFeatures();
  }

  private static copyTextFromComponentThisIsSyncedTo(componentThisIsSyncedTo: WorkshopComponent, textComponent: WorkshopComponent, createDefaultTextStyling: () => CustomCss): void {
    const { layers } = componentThisIsSyncedTo.paddingComponentChild.linkedComponents.auxiliary[0].componentPreviewStructure;
    const textSubcomponent = layers.length > 0
      ? layers[0].sections.alignedSections.left[0].subcomponentProperties.customCss
      : createDefaultTextStyling();
    textComponent.baseSubcomponent.customCss = textSubcomponent;
    textComponent.baseSubcomponent.defaultCss = createDefaultTextStyling();
  }

  private static overwriteTextCustomCss(menuComponent: WorkshopComponent, textComponent: WorkshopComponent, createDefaultTextStyling: () => CustomCss): void {
    const { componentThisIsSyncedTo } = menuComponent.linkedComponents.base.paddingComponent?.sync || {};
    if (componentThisIsSyncedTo) {
      ApplyDropdownMenuItemTextProperties.copyTextFromComponentThisIsSyncedTo(componentThisIsSyncedTo, textComponent, createDefaultTextStyling);
    } else {
      textComponent.baseSubcomponent.customCss = createDefaultTextStyling();
      textComponent.baseSubcomponent.defaultCss = createDefaultTextStyling();
    }
  }

  private static overwriteTextComponent(menuComponent: WorkshopComponent, textComponent: WorkshopComponent, createDefaultTextStyling: () => CustomCss): void {
    ApplyDropdownMenuItemTextProperties.overwriteTextCustomCss(menuComponent, textComponent, createDefaultTextStyling);
    ApplyDropdownMenuItemTextProperties.overwriteTextCustomFeatures(textComponent);
    ApplyDropdownMenuItemTextProperties.updateItemsOfComponentsSyncedToThis(menuComponent, textComponent);
  }

  private static copyTextFromSiblingItem(activeBaseComponentLayers: Layer[], textComponent: WorkshopComponent): void {
    const siblingDropdownItem = activeBaseComponentLayers[activeBaseComponentLayers.length - 2];
    const { baseSubcomponent: textSubcomponentToBeCopied } = siblingDropdownItem.subcomponentProperties.seedComponent
      .newChildComponents.childComponentsLockedToLayer[0];
    textComponent.baseSubcomponent.customCss = textSubcomponentToBeCopied.customCss;
    textComponent.baseSubcomponent.defaultCss = textSubcomponentToBeCopied.defaultCss;
    textComponent.baseSubcomponent.customFeatures = textSubcomponentToBeCopied.customFeatures;
    textComponent.baseSubcomponent.defaultCustomFeatures = textSubcomponentToBeCopied.defaultCustomFeatures;
  }

  public static apply(textComponent: WorkshopComponent): void {
    const { menuComponent, createDefaultTextStyling } = this as unknown as SetTextSubcomponentPropertiesContext;
    const { layers: activeBaseComponentLayers } = menuComponent.componentPreviewStructure;
    if (activeBaseComponentLayers.length > 1) {
      ApplyDropdownMenuItemTextProperties.copyTextFromSiblingItem(activeBaseComponentLayers, textComponent);
    } else {
      ApplyDropdownMenuItemTextProperties.overwriteTextComponent(menuComponent, textComponent, createDefaultTextStyling);
    }
    ApplyDropdownMenuItemTextProperties.overwriteTextCustomStaticFeatures(menuComponent, textComponent);
  }
}