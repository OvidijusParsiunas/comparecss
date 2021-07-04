import { NewComponentStyleProperties } from '../../../../../../../consts/newComponentStyleProperties';
import { CustomCss, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { TEXT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { TextBuilder } from './textBuilder';

function createDefaultTextCss(): CustomCss {
  return {
    [CSS_PSEUDO_CLASSES.DEFAULT]: {
      top: '50%',
      width: 'max-content',
      userSelect: 'none',
      overflow: CSS_PROPERTY_VALUES.UNSET,
      fontSize: '14px',
      fontFamily: '"Helvetica Neue", Helvetica, Roboto, Arial, sans-serif',
      backgroundColor: CSS_PROPERTY_VALUES.INHERIT,
      color: '#ffffff',
      fontWeight: '400',
      paddingTop: '0px',
      paddingBottom: '0px',
      paddingLeft: '0px',
      paddingRight: '0px',
      marginLeft: '0px',
      marginRight: '0px',
      transition: CSS_PROPERTY_VALUES.UNSET,
      outline: 'none',
      left: '0px',
    },
    [CSS_PSEUDO_CLASSES.HOVER]: {
      color: CSS_PROPERTY_VALUES.INHERIT,
    },
    [CSS_PSEUDO_CLASSES.CLICK]: {
      color: CSS_PROPERTY_VALUES.INHERIT,
    },
  }
}

function overwriteAlignment(textComponent: WorkshopComponent): void {
  textComponent.subcomponents[textComponent.coreSubcomponentNames.base].customFeatures.alignedLayerSection.section = ALIGNED_SECTION_TYPES.CENTER;
  textComponent.subcomponents[textComponent.coreSubcomponentNames.base].defaultCustomFeatures.alignedLayerSection.section = ALIGNED_SECTION_TYPES.CENTER;
}

function overwriteSubcomponentProperties(textComponent: WorkshopComponent): void {
  textComponent.subcomponents[textComponent.coreSubcomponentNames.base].isTriggeredByAnotherSubcomponent = true;
  textComponent.subcomponents[textComponent.coreSubcomponentNames.base].mouseEventTransitionDuration = '0.25s';
  textComponent.subcomponents[textComponent.coreSubcomponentNames.base].tempCustomCss = new Set(['transition']);
}

export const buttonText: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const componentStyle: NewComponentStyleProperties = { baseName, baseStyle: TEXT_STYLES.BUTTON,
      baseCustomCssFunc: createDefaultTextCss };
    const buttonTextComponent =  TextBuilder.create(componentStyle);
    overwriteAlignment(buttonTextComponent);
    overwriteSubcomponentProperties(buttonTextComponent);
    return buttonTextComponent;
  },
};
