import { CustomCss, SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { TEXT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { textBase } from './base';

class ButtonText extends ComponentBuilder {

  public static setStyle(component: WorkshopComponent): void {
    component.style = TEXT_STYLES.BUTTON;
  }

  private static createDefaultTextCss(): CustomCss {
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
        marginTop: '0px',
        marginBottom: '0px',
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
  
  private static overwriteCustomFeatures(subcomponent: SubcomponentProperties): void {
    subcomponent.customFeatures.alignedLayerSection.section = ALIGNED_SECTION_TYPES.CENTER;
    subcomponent.defaultCustomFeatures.alignedLayerSection.section = ALIGNED_SECTION_TYPES.CENTER;
    subcomponent.customFeatures.animations = ComponentBuilder.createStaticFadeAnimation();
    subcomponent.defaultCustomFeatures.animations = ComponentBuilder.createStaticFadeAnimation();
  }

  private static overwriteCustomCss(subcomponent: SubcomponentProperties): void {
    subcomponent.customCss = ButtonText.createDefaultTextCss();
    subcomponent.defaultCss = ButtonText.createDefaultTextCss();
  }

  private static overwriteSubcomponentProperties(subcomponent: SubcomponentProperties): void {
    subcomponent.isTriggeredByAnotherSubcomponent = true;
    subcomponent.tempCustomCss = new Set(['transition']);
  }

  public static overwriteBase(component: WorkshopComponent): void {
    const baseSubcomponent = component.subcomponents[component.coreSubcomponentNames.base];
    ButtonText.overwriteCustomCss(baseSubcomponent);
    ButtonText.overwriteCustomFeatures(baseSubcomponent);
    ButtonText.overwriteSubcomponentProperties(baseSubcomponent);
  }
}

export const buttonText: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const closeButtonTextComponent = textBase.createNewComponent(baseName);
    ButtonText.overwriteBase(closeButtonTextComponent);
    ButtonText.setStyle(closeButtonTextComponent);
    return closeButtonTextComponent;
  },
};
