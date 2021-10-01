import { CustomCss, CustomFeatures, CustomStaticFeatures, SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { CardLayerSpecificSettings } from '../settings/cardLayerSpecificSettings';
import { LAYER_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { BORDER_STYLES } from '../../../../../../../consts/borderStyles.enum';
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
        borderBottomStyle: BORDER_STYLES.SOLID,
        borderBottomColor: '#e9ecef',
        backgroundColor: CSS_PROPERTY_VALUES.INHERIT,
        boxShadow: CSS_PROPERTY_VALUES.UNSET,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
      },
    };
  }

  private static createDefaultLayerCustomStaticFeatures(): CustomStaticFeatures {
    return {
      image: ComponentBuilder.createImage(false),
    };
  }

  private static overwriteCustomStaticFeatures(baseSubcomponent: SubcomponentProperties): void {
    baseSubcomponent.customStaticFeatures = CardLayer.createDefaultLayerCustomStaticFeatures();
    baseSubcomponent.defaultCustomStaticFeatures = CardLayer.createDefaultLayerCustomStaticFeatures();
  }

  private static createDefaultCustomFeatures(): CustomFeatures {
    return {
      animations: ComponentBuilder.createStationaryAnimations({isBackgroundZoomPresent: true, isBackgroundZoomOn: false}),
    };
  }

  private static createCustomFeatures(baseSubcomponent: SubcomponentProperties): void {
    baseSubcomponent.customFeatures = CardLayer.createDefaultCustomFeatures();
    baseSubcomponent.defaultCustomFeatures = CardLayer.createDefaultCustomFeatures();
  }

  private static overwriteCustomCss(baseSubcomponent: SubcomponentProperties): void {
    baseSubcomponent.customCss = CardLayer.createDefaultLayerCss();
    baseSubcomponent.defaultCss = CardLayer.createDefaultLayerCss();
  }

  public static overwriteBase(component: WorkshopComponent): void {
    const { baseSubcomponent }  = component;
    CardLayer.overwriteCustomCss(baseSubcomponent);
    CardLayer.createCustomFeatures(baseSubcomponent);
    CardLayer.overwriteCustomStaticFeatures(baseSubcomponent);
  }
}

export const cardLayer: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const layerComponent = layerBase.createNewComponent(baseName);
    CardLayer.overwriteBase(layerComponent);
    CardLayer.setStyle(layerComponent);
    CardLayerSpecificSettings.set(layerComponent);
    return layerComponent;
  },
};
