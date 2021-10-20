import { subcomponentAndOverlayElementIdsState } from '../../../componentPreview/utils/elements/subcomponentAndOverlayElementIdsState';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponentCss } from '../../../../../../interfaces/workshopComponentCss';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { COMPONENT_TYPES } from '../../../../../../consts/componentTypes.enum';
import { TEXT_SIZE_EVALUATOR_ID } from '../../../../../../consts/elementIds';

export class DropdownMenuAutoWidthUtils {

  private static retrieveIconElementWidth(iconSubcomponent: SubcomponentProperties): number {
    const iconName = iconSubcomponent.name;
    const iconid = subcomponentAndOverlayElementIdsState.getSubcomponentIdViaSubcomponentName(iconName);
    return document.getElementById(iconid).clientWidth;
  }

  private static calculateIconWidth(iconSubcomponent: SubcomponentProperties): number {
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

  private static calculateTextWidth(textSubcomponent: SubcomponentProperties, text: string): number {
    const buttonTextDefaultCss = textSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT];
    const evaluatedTextWidth = DropdownMenuAutoWidthUtils.calculateTextWidthThroughTextSizeEvaluatorElement(buttonTextDefaultCss, text);
    const marginLeft = Number.parseFloat(buttonTextDefaultCss.marginLeft);
    const marginRight = Number.parseFloat(buttonTextDefaultCss.marginRight);
    return marginLeft + marginRight + evaluatedTextWidth;
  }

  private static calculateNewButtonWidth(buttonComponent: WorkshopComponent, longestMenuText: string): string {
    const onCopySubcomponents = buttonComponent.sync.syncables.onCopy.subcomponents;
    const textSubcomponent = onCopySubcomponents[SUBCOMPONENT_TYPES.TEXT];
    const textWidth = textSubcomponent ? DropdownMenuAutoWidthUtils.calculateTextWidth(textSubcomponent, longestMenuText) : 0;
    const iconSubcomponent = onCopySubcomponents[SUBCOMPONENT_TYPES.ICON];
    const iconWidth = iconSubcomponent ? DropdownMenuAutoWidthUtils.calculateIconWidth(iconSubcomponent) : 0;
    const newButtonWidth = textWidth + iconWidth;
    return `${newButtonWidth}px`;
  }

  private static getLongestString(strings: string[]): string {
    return strings.reduce((a, b) =>  a.length > b.length ? a : b);
  } 

  private static getLongestMenuText(menuComponent: WorkshopComponent): string {
    const menuItemTexts = menuComponent.componentPreviewStructure.layers.map((layer) => {      
      return layer.sections.alignedSections.left[0].subcomponentProperties.customStaticFeatures.subcomponentText.text
    });
    return DropdownMenuAutoWidthUtils.getLongestString(menuItemTexts);
  }

  private static setButtonWidth(buttonComponent: WorkshopComponent, menuComponent: WorkshopComponent): void {
    if (buttonComponent.baseSubcomponent?.customFeatures?.autoSize?.width) {
      const longestMenuText = DropdownMenuAutoWidthUtils.getLongestMenuText(menuComponent);
      const totalWidth = DropdownMenuAutoWidthUtils.calculateNewButtonWidth(buttonComponent, longestMenuText);
      buttonComponent.baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].width = totalWidth;
    }
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

  private static setMenuWidth( menuComponent: WorkshopComponent): void {
    const largestItemWidth = DropdownMenuAutoWidthUtils.getLargestItemWidth(menuComponent);
    menuComponent.baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].width = largestItemWidth;
  }

  public static initialiseSelectDropdownButtonWidthViaLargestItem(subcomponentProperties: SubcomponentProperties): void {
    setTimeout(() => {
      const buttonComponent = subcomponentProperties.seedComponent;
      const menuComponent = buttonComponent.linkedComponents.auxiliary[0];
      DropdownMenuAutoWidthUtils.setButtonWidth(buttonComponent, menuComponent); 
    });
  }

  public static setButtonWidthViaButtonChildChange(subcomponentProperties: SubcomponentProperties): void {
    setTimeout(() => {
      // the reason why there is an if statement is because this can get triggered when margin left/right is changed in the button
      if (subcomponentProperties.seedComponent.type === COMPONENT_TYPES.TEXT
          || subcomponentProperties.seedComponent.type === COMPONENT_TYPES.ICON) {
        const buttonComponent = subcomponentProperties.seedComponent.containerComponent;
        const menuComponent = buttonComponent.linkedComponents.auxiliary[0];
        DropdownMenuAutoWidthUtils.setButtonWidth(buttonComponent, menuComponent); 
      }
    });
  }

  public static setDropdownButtonAndMenuWidthsViaItemTextContentChange(itemSubcomponentProperties: SubcomponentProperties): void {
    setTimeout(() => {
      const menuComponent = itemSubcomponentProperties.seedComponent.containerComponent;
      DropdownMenuAutoWidthUtils.setMenuWidth(menuComponent);
      DropdownMenuAutoWidthUtils.setButtonWidth(menuComponent.linkedComponents.base, menuComponent);
    });
  }

  public static setMenuWidthViaMenuItemOrTextChange(subcomponentProperties: SubcomponentProperties): void {
    setTimeout(() => {
      const menuComponent = subcomponentProperties.seedComponent.containerComponent || subcomponentProperties.seedComponent;
      DropdownMenuAutoWidthUtils.setMenuWidth(menuComponent);
    });
  }
}
