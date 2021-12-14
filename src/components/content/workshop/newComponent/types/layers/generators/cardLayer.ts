import { CustomCss, CustomFeatures, CustomStaticFeatures, Subcomponent, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ComponentGenerator, PresetProperties } from '../../../../../../../interfaces/componentGenerator';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { CardLayerSpecificSettings } from '../settings/cardLayerSpecificSettings';
import { LAYER_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { BORDER_STYLES } from '../../../../../../../consts/borderStyles.enum';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { layerBase } from './base';

class CardLayer extends ComponentBuilder {

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
      image: ComponentBuilder.createImage(false, false),
    };
  }

  private static overwriteCustomStaticFeatures(baseSubcomponent: Subcomponent): void {
    baseSubcomponent.customStaticFeatures = CardLayer.createDefaultLayerCustomStaticFeatures();
    baseSubcomponent.defaultCustomStaticFeatures = CardLayer.createDefaultLayerCustomStaticFeatures();
  }

  private static createDefaultCustomFeatures(): CustomFeatures {
    return {
      animations: ComponentBuilder.createStationaryAnimations({isBackgroundZoomPresent: true, isBackgroundZoomOn: false}),
    };
  }

  private static createCustomFeatures(baseSubcomponent: Subcomponent): void {
    baseSubcomponent.customFeatures = CardLayer.createDefaultCustomFeatures();
    baseSubcomponent.defaultCustomFeatures = CardLayer.createDefaultCustomFeatures();
  }

  private static overwriteCustomCss(baseSubcomponent: Subcomponent): void {
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
  createNewComponent(presetProperties: PresetProperties): WorkshopComponent {
    const layerComponent = layerBase.createNewComponent({ ...presetProperties, componentStyle: LAYER_STYLES.CARD });
    CardLayer.overwriteBase(layerComponent);
    CardLayerSpecificSettings.set(layerComponent);
    return layerComponent;
  },
};
