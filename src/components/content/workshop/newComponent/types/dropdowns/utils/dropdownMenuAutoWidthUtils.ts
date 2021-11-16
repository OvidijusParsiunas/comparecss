import { subcomponentAndOverlayElementIdsState } from '../../../../componentPreview/utils/elements/subcomponentAndOverlayElementIdsState';
import { Subcomponent, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponentCss } from '../../../../../../../interfaces/workshopComponentCss';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { TEXT_SIZE_EVALUATOR_ID } from '../../../../../../../consts/elementIds';

export class DropdownMenuAutoWidthUtils {

  private static retrieveIconElementWidth(iconSubcomponent: Subcomponent): number {
    const iconName = iconSubcomponent.name;
    const iconid = subcomponentAndOverlayElementIdsState.getSubcomponentIdViaSubcomponentName(iconName);
    return document.getElementById(iconid).clientWidth;
  }

  private static calculateIconWidth(iconSubcomponent: Subcomponent): number {
    const iconDefaultCss = iconSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT];
    const iconMarginLeft = Number.parseFloat(iconDefaultCss.marginLeft);
    const iconMarginRight = Number.parseFloat(iconDefaultCss.marginRight);
    const iconWidth = DropdownMenuAutoWidthUtils.retrieveIconElementWidth(iconSubcomponent);
    return iconMarginLeft + iconMarginRight + iconWidth;
  }

  private static calculateTextWidthThroughTextSizeEvaluatorElement(buttonTextDefaultCss: WorkshopComponentCss, text: string): number {
    const sizeEvaluatorElement = document.getElementById(TEXT_SIZE_EVALUATOR_ID);
    sizeEvaluatorElement.innerText = text;
    sizeEvaluatorElement.style.fontSize = buttonTextDefaultCss.fontSize;
    sizeEvaluatorElement.style.fontWeight = buttonTextDefaultCss.fontWeight;
    sizeEvaluatorElement.style.fontFamily = buttonTextDefaultCss.fontFamily;
    return sizeEvaluatorElement.clientWidth;
  }

  private static calculateTextWidth(textSubcomponent: Subcomponent, text: string): number {
    const buttonTextDefaultCss = textSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT];
    const evaluatedTextWidth = DropdownMenuAutoWidthUtils.calculateTextWidthThroughTextSizeEvaluatorElement(buttonTextDefaultCss, text);
    const marginLeft = Number.parseFloat(buttonTextDefaultCss.marginLeft);
    const marginRight = Number.parseFloat(buttonTextDefaultCss.marginRight);
    return marginLeft + marginRight + evaluatedTextWidth;
  }

  private static calculateNewButtonWidth(buttonComponent: WorkshopComponent, longestMenuText: string): string {
    const uniqueComponents = buttonComponent.sync.syncables.onCopy.uniqueComponents;
    const textSubcomponent = uniqueComponents[COMPONENT_TYPES.TEXT].baseSubcomponent;
    const textWidth = textSubcomponent ? DropdownMenuAutoWidthUtils.calculateTextWidth(textSubcomponent, longestMenuText) : 0;
    const iconSubcomponent = uniqueComponents[COMPONENT_TYPES.ICON].baseSubcomponent;
    const iconWidth = iconSubcomponent ? DropdownMenuAutoWidthUtils.calculateIconWidth(iconSubcomponent) : 0;
    const newButtonWidth = textWidth + iconWidth;
    return `${newButtonWidth}px`;
  }

  private static getLongestString(strings: string[]): string {
    return strings.reduce((a, b) =>  a.length > b.length ? a : b);
  }

  private static getLongestMenuText(menuComponent: WorkshopComponent): string {
    const menuItemTexts = menuComponent.componentPreviewStructure.layers.map((layer) => {      
      return layer.sections.alignedSections.left[0].subcomponent.customStaticFeatures.subcomponentText.text
    });
    return DropdownMenuAutoWidthUtils.getLongestString(menuItemTexts);
  }

  public static setButtonWidth(buttonComponent: WorkshopComponent, menuComponent: WorkshopComponent): void {
    setTimeout(() => {
      if (buttonComponent.baseSubcomponent?.customFeatures?.autoSize?.width) {
        const longestMenuText = DropdownMenuAutoWidthUtils.getLongestMenuText(menuComponent);
        const totalWidth = DropdownMenuAutoWidthUtils.calculateNewButtonWidth(buttonComponent, longestMenuText);
        buttonComponent.baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].width = totalWidth;
      }
    });
  }

  private static calculateTotalWidth(largestTextWidth: number, { paddingLeft, paddingRight }: WorkshopComponentCss): string {
    return `${largestTextWidth + Number.parseFloat(paddingLeft) + Number.parseFloat(paddingRight)}px`;
  }

  private static getFirstItemDefaultClassCustomCss(menuComponent: WorkshopComponent): WorkshopComponentCss {
    return menuComponent.componentPreviewStructure.layers[0].subcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT];
  }

  private static getItemTextWidths(menuComponent: WorkshopComponent): number[] {
    return menuComponent.componentPreviewStructure.layers.map((layer) => {
      const subcomponentId = subcomponentAndOverlayElementIdsState.getSubcomponentIdViaSubcomponentName(
        layer.sections.alignedSections.left[0].subcomponent.name);
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

  public static setMenuWidth(menuComponent: WorkshopComponent): void {
    setTimeout(() => {
      if (menuComponent.componentPreviewStructure.layers.length > 0) {
        const largestItemWidth = DropdownMenuAutoWidthUtils.getLargestItemWidth(menuComponent);
        menuComponent.baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].width = largestItemWidth;  
      }
    });
  }

  // itemComponent is used in order to adhere to the PropertyOverwritableFunc type
  public static updateButtonAndMenuWidth(itemComponent: WorkshopComponent, menuComponent: WorkshopComponent): void {
    const subcomponentId = subcomponentAndOverlayElementIdsState.getSubcomponentIdViaSubcomponentName(
      menuComponent.baseSubcomponent.name);
    if (!document.getElementById(subcomponentId)) return;
    DropdownMenuAutoWidthUtils.setMenuWidth(menuComponent);
    DropdownMenuAutoWidthUtils.setButtonWidth(menuComponent.linkedComponents.base, menuComponent);
  }
}
