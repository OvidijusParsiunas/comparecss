import { CustomCss, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { LAYER_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { layerBase } from './base';

class PlaneLayer extends ComponentBuilder {

  public static setStyle(component: WorkshopComponent): void {
    component.style = LAYER_STYLES.PLAIN;
  }

  private static createDefaultBaseCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        height: '100%',
      },
    };
  }

  public static overwriteCustomCss(component: WorkshopComponent): void {
    component.subcomponents[component.coreSubcomponentNames.base].customCss = PlaneLayer.createDefaultBaseCss();
    component.subcomponents[component.coreSubcomponentNames.base].defaultCss = PlaneLayer.createDefaultBaseCss();
  }
}

export const plainLayer: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const layerComponent = layerBase.createNewComponent(baseName);
    PlaneLayer.overwriteCustomCss(layerComponent);
    PlaneLayer.setStyle(layerComponent);
    return layerComponent;
  },
};
