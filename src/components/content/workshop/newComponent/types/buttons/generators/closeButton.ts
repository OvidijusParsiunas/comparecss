import { CustomCss, Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { NewComponentStyleProperties } from '../../../../../../../consts/newComponentStyleProperties';
import { CoreSubcomponentNames } from '../../../../../../../interfaces/customSubcomponentNames';
import { BUTTON_STYLES, TEXT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { CLOSE_BUTTON_X_TEXT } from '../../../../../../../consts/closeButtonXText';
import { ButtonBuilder } from './buttonBuilder';

function createDefaultBaseCss(): CustomCss {
  return {
    [CSS_PSEUDO_CLASSES.DEFAULT]: {
      height: '18px',
      width: '17px',
      borderRadius: '15px',
      cursor: 'pointer',
      boxSizing: CSS_PROPERTY_VALUES.UNSET,
      boxShadow: CSS_PROPERTY_VALUES.UNSET,
      borderWidth: '0px',
      borderStyle: 'solid',
      borderColor: '#000000',
      backgroundColor: CSS_PROPERTY_VALUES.INHERIT,
      outline: 'none',
      paddingTop: '0px',
      paddingLeft: '0px',
      paddingRight: '0px',
      paddingBottom: '0px',
      marginRight: '5px',
      transition: CSS_PROPERTY_VALUES.UNSET,
      left: '0px',
    }
  }
}

function overwriteButtonTextProperties(subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames): void {
  subcomponents[coreSubcomponentNames.base].customStaticFeatures.subcomponentText.text = CLOSE_BUTTON_X_TEXT;
  subcomponents[coreSubcomponentNames.base].customStaticFeatures.subcomponentText.text = CLOSE_BUTTON_X_TEXT;
}

export const closeButton: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const componentStyle: NewComponentStyleProperties = { baseName, baseStyle: BUTTON_STYLES.CLOSE,
      baseCustomCssFunc: createDefaultBaseCss, overwriteLayersProperties: [{ text: [{style: TEXT_STYLES.CLOSE_BUTTON, func: overwriteButtonTextProperties}]}] };
    return ButtonBuilder.create(componentStyle);
  },
};
