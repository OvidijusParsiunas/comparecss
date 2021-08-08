import { subcomponentAndOverlayElementIdsState } from '../../options/subcomponentSelectMode/subcomponentAndOverlayElementIdsState';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponentCss } from '../../../../../../interfaces/workshopComponentCss';
import { COMPONENT_TYPES } from '../../../../../../consts/componentTypes.enum';

export class DropdownMenuAutoWidthUtils {

  private static calculateNewWidth(maxTextWidth: number, { paddingLeft, paddingRight }: WorkshopComponentCss): string {
    return `${maxTextWidth + Number.parseFloat(paddingLeft) + Number.parseFloat(paddingRight)}px`;
  }

  private static getFirstLayerDefaultCss(auxiliaryComponent: WorkshopComponent): WorkshopComponentCss {
    return auxiliaryComponent.componentPreviewStructure.layers[0].subcomponentProperties.customCss[CSS_PSEUDO_CLASSES.DEFAULT];
  }

  private static getTextWidths(auxiliaryComponent: WorkshopComponent): number[] {
    return auxiliaryComponent.componentPreviewStructure.layers.map((layer) => {
      const subcomponentId = subcomponentAndOverlayElementIdsState.getSubcomponentIdViaSubcomponentName(layer.sections.alignedSections.left[0].name);
      return document.getElementById(subcomponentId).clientWidth;
    });
  }
  
  private static set(auxiliaryComponent: WorkshopComponent, callback?: (newValue: string) => void): void {
    const textWidths = DropdownMenuAutoWidthUtils.getTextWidths(auxiliaryComponent);
    const maxTextWidth = Math.max(...textWidths);
    const firstLayerDefaultCss = DropdownMenuAutoWidthUtils.getFirstLayerDefaultCss(auxiliaryComponent);
    const newWidth = DropdownMenuAutoWidthUtils.calculateNewWidth(maxTextWidth, firstLayerDefaultCss);
    if (callback) {
      callback(newWidth);
    } else {
      auxiliaryComponent.subcomponents[auxiliaryComponent.coreSubcomponentNames.base].customCss[CSS_PSEUDO_CLASSES.DEFAULT].width = newWidth;
    }
  }

  private static canNewWidthBeSet(subcomponentProperties: SubcomponentProperties): boolean {
    const { type, subcomponents, coreSubcomponentNames } = subcomponentProperties.parentAuxiliaryComponent || {};
    return type === COMPONENT_TYPES.DROPDOWN_MENU && subcomponents[coreSubcomponentNames.base].customFeatures.autoSize?.width;
  }

  public static setWidth(subcomponentProperties: SubcomponentProperties, callback?: (newValue: string) => void): void {
    if (DropdownMenuAutoWidthUtils.canNewWidthBeSet(subcomponentProperties)) {
      setTimeout(() => DropdownMenuAutoWidthUtils.set(subcomponentProperties.parentAuxiliaryComponent, callback));
    }
  }
}
