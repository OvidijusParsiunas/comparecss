import { CustomCss, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
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

  public static overwriteBaseCustomCss(component: WorkshopComponent): void {
    component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customCss = PlaneLayer.createDefaultBaseCss();
    component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].defaultCss = PlaneLayer.createDefaultBaseCss();
  }
}

export const plainLayer: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const layerComponent = layerBase.createNewComponent(baseName);
    PlaneLayer.overwriteBaseCustomCss(layerComponent);
    PlaneLayer.setStyle(layerComponent);
    return layerComponent;
  },
};
