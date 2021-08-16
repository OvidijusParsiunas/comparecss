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

  private static getFirstItemDefaultClassCustomCss(auxiliaryComponent: WorkshopComponent): WorkshopComponentCss {
    return auxiliaryComponent.componentPreviewStructure.layers[0].subcomponentProperties.customCss[CSS_PSEUDO_CLASSES.DEFAULT];
  }

  private static getItemTextWidths(auxiliaryComponent: WorkshopComponent): number[] {
    return auxiliaryComponent.componentPreviewStructure.layers.map((layer) => {
      const subcomponentId = subcomponentAndOverlayElementIdsState.getSubcomponentIdViaSubcomponentName(layer.sections.alignedSections.left[0].name);
      return document.getElementById(subcomponentId).clientWidth;
    });
  }

  private static getLargestItemWidth(auxiliaryComponent: WorkshopComponent): string {
    const itemTextWidths = DropdownMenuAutoWidthUtils.getItemTextWidths(auxiliaryComponent);
    const maxItemTextWidth = Math.max(...itemTextWidths);
    const firstItemDefaultClassCustomCss = DropdownMenuAutoWidthUtils.getFirstItemDefaultClassCustomCss(auxiliaryComponent);
    return DropdownMenuAutoWidthUtils.calculateTotalWidth(maxItemTextWidth, firstItemDefaultClassCustomCss);
  }

  private static setComponentWidths(coreBaseComponent: WorkshopComponent, auxiliaryComponent: WorkshopComponent): void {
    const { customFeatures } = coreBaseComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    if (customFeatures.autoSize?.width) {
      const width = DropdownMenuAutoWidthUtils.getLargestItemWidth(coreBaseComponent.auxiliaryComponent);
      // WORK2: use actual dropdown structure to get icon subcomponent name
      coreBaseComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customCss[CSS_PSEUDO_CLASSES.DEFAULT].width = width;
      auxiliaryComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customCss[CSS_PSEUDO_CLASSES.DEFAULT].width = width;
    }
  }

  public static setWidth(subcomponentProperties: SubcomponentProperties): void {
    setTimeout(() => {
      const { parentBaseComponentRef } = subcomponentProperties;
      if (parentBaseComponentRef.type === COMPONENT_TYPES.DROPDOWN_MENU) {
        DropdownMenuAutoWidthUtils.setComponentWidths(parentBaseComponentRef.coreBaseComponent, parentBaseComponentRef);
        // activated by clicking select on the button
      } else if (parentBaseComponentRef.type === COMPONENT_TYPES.DROPDOWN) {
        DropdownMenuAutoWidthUtils.setComponentWidths(parentBaseComponentRef, parentBaseComponentRef.auxiliaryComponent);
      }
    });
  }
}
