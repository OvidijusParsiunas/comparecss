import { NewComponentStyleProperties } from '../../../../../../../consts/newComponentStyleProperties';
import { CustomCss, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { LAYER_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { cardLayerSpecificSettings } from './cardLayerSpecificSettings';
import { LayerBuilder } from './layerBuilder';

function createDefaultLayerCss(): CustomCss {
  return {
    [CSS_PSEUDO_CLASSES.DEFAULT]: {
      position: 'relative',
      height: '50px',
      textAlign: 'left',
      paddingLeft: '20px',
      paddingTop: '0px',
      paddingRight: '0px',
      paddingBottom: '0px',
      borderTopWidth: '1px',
      borderTopStyle: 'solid',
      borderTopColor: '#e9ecef',
      backgroundColor: CSS_PROPERTY_VALUES.INHERIT,
      boxShadow: CSS_PROPERTY_VALUES.UNSET,
      backgroundSize: '100% 100%',
    },
  }
}

function overwriteSubcomponentSpecificSettings(textComponent: WorkshopComponent): void {
  textComponent.subcomponents[textComponent.coreSubcomponentNames.base].subcomponentSpecificSettings = cardLayerSpecificSettings;
}

export const cardLayer: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const newSubcomponentStyle: NewComponentStyleProperties = { baseName,
      baseStyle: LAYER_STYLES.CARD, baseCustomCssFunc: createDefaultLayerCss };
    const layerComponent = LayerBuilder.create(newSubcomponentStyle);
    overwriteSubcomponentSpecificSettings(layerComponent);
    return layerComponent;
  },
};
