import { subcomponentAndOverlayElementIdsState } from '../../options/subcomponentSelectMode/subcomponentAndOverlayElementIdsState';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponentCss } from '../../../../../../interfaces/workshopComponentCss';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { SyncedComponent } from '../../options/copyChildComponent/syncedComponent';
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

  private static setComponentWidths(buttonComponent: WorkshopComponent, menuComponent: WorkshopComponent): void {
    const { customFeatures } = buttonComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    if (customFeatures.autoSize?.width) {
      const width = DropdownMenuAutoWidthUtils.getLargestItemWidth(menuComponent);
      buttonComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customCss[CSS_PSEUDO_CLASSES.DEFAULT].width = width;
      menuComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customCss[CSS_PSEUDO_CLASSES.DEFAULT].width = width;
    }
  }

  private static dereferenceBaseIfInSync(baseComponent: WorkshopComponent): void {
    if (baseComponent.linkedComponents.base.sync.syncedComponent) {
      SyncedComponent.toggleSubcomponentSync(baseComponent.linkedComponents.base, false);
    }
  }

  public static setWidth(subcomponentProperties: SubcomponentProperties): void {
    setTimeout(() => {
      const seedComponent = subcomponentProperties.seedComponent?.containerComponent || subcomponentProperties.seedComponent;
      if (seedComponent.type === COMPONENT_TYPES.DROPDOWN_MENU) {
        DropdownMenuAutoWidthUtils.dereferenceBaseIfInSync(seedComponent);
        DropdownMenuAutoWidthUtils.setComponentWidths(seedComponent.linkedComponents.base, seedComponent);
        // activated by clicking select option on the button
      } else if (seedComponent.type === COMPONENT_TYPES.DROPDOWN) {
        // when active component is dropdown base, by setting the width - settings component dereferences sync automatically
        DropdownMenuAutoWidthUtils.setComponentWidths(seedComponent, seedComponent.linkedComponents.auxiliary[0]);
      }
    });
  }
}
