import { CustomCss, SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { TEXT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { inheritedCloseTextCss } from '../inheritedCss/inheritedCloseTextCss';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { textBase } from './base';

class CloseButtonText extends ComponentBuilder {

  public static setStyle(component: WorkshopComponent): void {
    component.style = TEXT_STYLES.CLOSE_BUTTON;
  }

  private static createDefaultTextCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        top: '50%',
        width: 'max-content',
        color: '#ff0000',
        userSelect: 'none',
        overflow: CSS_PROPERTY_VALUES.UNSET,
        fontSize: '18px',
        fontFamily: '"Poppins", sans-serif',
        backgroundColor: CSS_PROPERTY_VALUES.INHERIT,
        fontWeight: '300',
        paddingTop: '1px',
        paddingBottom: '0px',
        paddingLeft: '0px',
        paddingRight: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        transition: CSS_PROPERTY_VALUES.UNSET,
        outline: 'none',
        left: '0px',
      },
    }
  }
  
  private static overwriteCustomFeatures(subcomponent: SubcomponentProperties): void {
    subcomponent.customFeatures.alignedLayerSection.section = ALIGNED_SECTION_TYPES.CENTER;
    subcomponent.defaultCustomFeatures.alignedLayerSection.section = ALIGNED_SECTION_TYPES.CENTER;
    subcomponent.customFeatures.animations = ComponentBuilder.createStationaryAnimations({});
    subcomponent.defaultCustomFeatures.animations = ComponentBuilder.createStationaryAnimations({});
  }

  private static overwriteCustomCss(subcomponent: SubcomponentProperties): void {
    subcomponent.customCss = CloseButtonText.createDefaultTextCss();
    subcomponent.defaultCss = CloseButtonText.createDefaultTextCss();
  }

  private static overwriteInheritedCss(subcomponent: SubcomponentProperties): void {
    subcomponent.inheritedCss = inheritedCloseTextCss;
  }

  public static overwriteBase(component: WorkshopComponent): void {
    const baseSubcomponent = component.coreSubcomponentRefs.base;
    CloseButtonText.overwriteInheritedCss(baseSubcomponent);
    CloseButtonText.overwriteCustomCss(baseSubcomponent);
    CloseButtonText.overwriteCustomFeatures(baseSubcomponent);
  }
}

export const closeButtonText: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const closeButtonTextComponent =  textBase.createNewComponent(baseName);
    CloseButtonText.overwriteBase(closeButtonTextComponent)
    CloseButtonText.setStyle(closeButtonTextComponent)
    return closeButtonTextComponent;
  },
};
