import { subcomponentAndOverlayElementIdsState } from '../../../componentPreview/utils/elements/subcomponentAndOverlayElementIdsState';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponentCss } from '../../../../../../interfaces/workshopComponentCss';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { COMPONENT_TYPES } from '../../../../../../consts/componentTypes.enum';

export class DropdownMenuAutoWidthUtils {

  // not doing a ratio for font weight because it does not scale linearly e.g. 100 is the same as 500 and 600 is the same as 700, but 800 is not same as 600
  private static calculateButtonWidth(menuComponent: WorkshopComponent, largestTextWidth: number): string {
    const buttonTextFontSize = menuComponent.linkedComponents.base.sync.syncables.onCopy.subcomponents[SUBCOMPONENT_TYPES.TEXT]
      .customCss[CSS_PSEUDO_CLASSES.DEFAULT].fontSize;
    const menuItemTextFontSize = menuComponent.componentPreviewStructure.layers[0].sections.alignedSections.left[0].subcomponentProperties
      .customCss[CSS_PSEUDO_CLASSES.DEFAULT].fontSize;
    const buttonTextFontSizeNumber = Number.parseFloat(buttonTextFontSize);
    const menuItemTextFontSizeNumber = Number.parseFloat(menuItemTextFontSize);
    const buttonToMenuItemTextFontSizeRatio = buttonTextFontSizeNumber / menuItemTextFontSizeNumber;
    return `${largestTextWidth * buttonToMenuItemTextFontSizeRatio}px`;
  }

  private static calculateTotalWidth(largestTextWidth: number, { paddingLeft, paddingRight }: WorkshopComponentCss): string {
    return `${largestTextWidth + Number.parseFloat(paddingLeft) + Number.parseFloat(paddingRight)}px`;
  }

  private static getFirstItemDefaultClassCustomCss(menuComponent: WorkshopComponent): WorkshopComponentCss {
    return menuComponent.componentPreviewStructure.layers[0].subcomponentProperties.customCss[CSS_PSEUDO_CLASSES.DEFAULT];
  }

  private static getItemTextWidths(menuComponent: WorkshopComponent): number[] {
    return menuComponent.componentPreviewStructure.layers.map((layer) => {
      const subcomponentId = subcomponentAndOverlayElementIdsState.getSubcomponentIdViaSubcomponentName(
        layer.sections.alignedSections.left[0].subcomponentProperties.name);
      return document.getElementById(subcomponentId).clientWidth;
    });
  }

  private static getLargestTextWidth(menuComponent: WorkshopComponent): number {
    const itemTextWidths = DropdownMenuAutoWidthUtils.getItemTextWidths(menuComponent);
    return Math.max(...itemTextWidths);
  }

  private static getLargestItemWidth(menuComponent: WorkshopComponent): string {
    const largestTextWidth = DropdownMenuAutoWidthUtils.getLargestTextWidth(menuComponent);
    const firstItemDefaultClassCustomCss = DropdownMenuAutoWidthUtils.getFirstItemDefaultClassCustomCss(menuComponent);
    return DropdownMenuAutoWidthUtils.calculateTotalWidth(largestTextWidth, firstItemDefaultClassCustomCss);
  }

  private static setButtonWidth(buttonComponent: WorkshopComponent, menuComponent: WorkshopComponent): void {
    if (buttonComponent.baseSubcomponent?.customFeatures?.autoSize?.width) {
      // should be longest text
      const largestTextWidth = DropdownMenuAutoWidthUtils.getLargestTextWidth(menuComponent);
      // should add current button text properties to longest text
      const newButtonWidth = DropdownMenuAutoWidthUtils.calculateButtonWidth(menuComponent, largestTextWidth);
      // take icon into consideration
      buttonComponent.baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].width = newButtonWidth;
    }
  }

  private static unsetMenuElementDisplayNoneProperty(menuComponent: WorkshopComponent): void {
    const subcomponentId = subcomponentAndOverlayElementIdsState.getSubcomponentIdViaSubcomponentName(menuComponent.baseSubcomponent.name);
    const element = document.getElementById(subcomponentId);
    if (element.style.display === 'none') element.style.display = '';
  }

  private static setMenuWidth(containerComponent: WorkshopComponent, menuComponent: WorkshopComponent): void {
    const largestItemWidth = DropdownMenuAutoWidthUtils.getLargestItemWidth(menuComponent);
    containerComponent.baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].width = largestItemWidth;
  }

  public static setWidth(subcomponentProperties: SubcomponentProperties): void {
    setTimeout(() => {
      // activated by changing padding on dropdown menu item or changing dropdown menu item text
      const containerComponent = subcomponentProperties.seedComponent?.containerComponent || subcomponentProperties.seedComponent;
      if (containerComponent.type === COMPONENT_TYPES.DROPDOWN_MENU) {
        DropdownMenuAutoWidthUtils.setMenuWidth(containerComponent, containerComponent);
        DropdownMenuAutoWidthUtils.setButtonWidth(containerComponent.linkedComponents.base, containerComponent);
        // activated by clicking the 'Largest Item Text' option on the button or changing its children fontSize option
      } else if (containerComponent.type === COMPONENT_TYPES.BUTTON) {
        const menuComponent = containerComponent.linkedComponents.auxiliary[0];
        DropdownMenuAutoWidthUtils.unsetMenuElementDisplayNoneProperty(menuComponent);
        DropdownMenuAutoWidthUtils.setButtonWidth(containerComponent, menuComponent);
      }
    });
  }
}
