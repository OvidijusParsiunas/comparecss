import { ComponentGenerator, PresetProperties } from '../../../../../../../interfaces/componentGenerator';
import { CustomCss, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
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
    component.baseSubcomponent.customCss = PlaneLayer.createDefaultBaseCss();
    component.baseSubcomponent.defaultCss = PlaneLayer.createDefaultBaseCss();
  }
}

export const plainLayer: ComponentGenerator = {
  createNewComponent(presetProperties: PresetProperties): WorkshopComponent {
    const layerComponent = layerBase.createNewComponent(presetProperties);
    PlaneLayer.overwriteBaseCustomCss(layerComponent);
    PlaneLayer.setStyle(layerComponent);
    return layerComponent;
  },
};
