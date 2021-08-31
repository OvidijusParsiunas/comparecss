import { subcomponentAndOverlayElementIdsState } from '../../options/subcomponentSelectMode/subcomponentAndOverlayElementIdsState';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponentCss } from '../../../../../../interfaces/workshopComponentCss';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { COMPONENT_TYPES } from '../../../../../../consts/componentTypes.enum';

export class DropdownMenuAutoWidthUtils {

  private static calculateTotalWidth(maxTextWidth: number, { paddingLeft, paddingRight }: WorkshopComponentCss): string {
    return `${maxTextWidth + Number.parseFloat(paddingLeft) + Number.parseFloat(paddingRight)}px`;
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

  private static getLargestItemWidth(menuComponent: WorkshopComponent): string {
    const itemTextWidths = DropdownMenuAutoWidthUtils.getItemTextWidths(menuComponent);
    const maxItemTextWidth = Math.max(...itemTextWidths);
    const firstItemDefaultClassCustomCss = DropdownMenuAutoWidthUtils.getFirstItemDefaultClassCustomCss(menuComponent);
    return DropdownMenuAutoWidthUtils.calculateTotalWidth(maxItemTextWidth, firstItemDefaultClassCustomCss);
  }

  private static setContainerComponentWidthViaLargestItem(containerComponent: WorkshopComponent, menuComponent: WorkshopComponent): void {
    const width = DropdownMenuAutoWidthUtils.getLargestItemWidth(menuComponent);
    containerComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customCss[CSS_PSEUDO_CLASSES.DEFAULT].width = width;
  }

  private static setButtonWidth(buttonComponent: WorkshopComponent, menuComponent: WorkshopComponent): void {
    if (buttonComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE]?.customFeatures?.autoSize?.width) {
      DropdownMenuAutoWidthUtils.setContainerComponentWidthViaLargestItem(buttonComponent, menuComponent);
    }
  }

  public static setWidth(subcomponentProperties: SubcomponentProperties): void {
    setTimeout(() => {
      // activated by changing padding on dropdown menu item or changing dropdown menu item text
      const containerComponent = subcomponentProperties.seedComponent?.containerComponent || subcomponentProperties.seedComponent;
      if (containerComponent.type === COMPONENT_TYPES.DROPDOWN_MENU) {
        DropdownMenuAutoWidthUtils.setContainerComponentWidthViaLargestItem(containerComponent, containerComponent);
        // activated by clicking select option on the button
      } else if (containerComponent.type === COMPONENT_TYPES.DROPDOWN) {
        DropdownMenuAutoWidthUtils.setButtonWidth(containerComponent, containerComponent.linkedComponents.auxiliary[0]);
      }
    });
  }
}
