import { CustomCss, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { cardLayerSpecificSettings } from '../settings/cardLayerSpecificSettings';
import { LAYER_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { layerBase } from './base';

class CardLayer extends ComponentBuilder {

  public static setStyle(component: WorkshopComponent): void {
    component.style = LAYER_STYLES.CARD;
  }

  private static createDefaultLayerCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        position: 'relative',
        height: '50px',
        textAlign: 'left',
        paddingLeft: '20px',
        paddingTop: '0px',
        paddingRight: '0px',
        paddingBottom: '0px',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: '#e9ecef',
        backgroundColor: CSS_PROPERTY_VALUES.INHERIT,
        boxShadow: CSS_PROPERTY_VALUES.UNSET,
        backgroundSize: '100% 100%',
      },
    };
  }

  private static overwriteCustomCss(component: WorkshopComponent): void {
    component.subcomponents[component.coreSubcomponentNames.base].customCss = CardLayer.createDefaultLayerCss();
    component.subcomponents[component.coreSubcomponentNames.base].defaultCss = CardLayer.createDefaultLayerCss();
  }

  private static overwriteSubcomponentSpecificSettings(component: WorkshopComponent): void {
    component.subcomponents[component.coreSubcomponentNames.base].subcomponentSpecificSettings = cardLayerSpecificSettings;
  }

  public static overwrite(component: WorkshopComponent): void {
    CardLayer.overwriteCustomCss(component);
    CardLayer.overwriteSubcomponentSpecificSettings(component);
  }
}

export const cardLayer: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const layerComponent = layerBase.createNewComponent(baseName);
    CardLayer.overwrite(layerComponent);
    CardLayer.setStyle(layerComponent);
    return layerComponent;
  },
};
