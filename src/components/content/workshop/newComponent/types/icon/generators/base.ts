import { CustomCss, CustomFeatures, SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { DROPDOWN_ARROW_ICON_TYPES } from '../../../../../../../consts/dropdownArrowIcons';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { BORDER_STYLES } from '../../../../../../../consts/borderStyles.enum';
import { IconSpecificSettings } from '../settings/iconSpecificSettings';
import { inheritedTextCss } from '../inheritedCss/inheritedTextCss';
import { ComponentBuilder } from '../../shared/componentBuilder';

export class IconBase extends ComponentBuilder {

  private static createTextCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        top: '50%',
        width: '10px',
        fontWeight: '400',
        fontFamily: '"Poppins", sans-serif',
        fontSize: '16px',
        color: '#ffffff',
        textAlign: 'left',
        backgroundColor: CSS_PROPERTY_VALUES.INHERIT,
        paddingTop: '0px',
        paddingBottom: '0px',
        paddingLeft: '0px',
        paddingRight: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        marginTop: '0px',
        marginBottom: '0px',
        height: '80px',
        borderWidth: '0px',
        borderColor: '#1779ba',
        borderStyle: BORDER_STYLES.SOLID,
        borderRightWidth: '0px',
        borderLeftWidth: '0px',
        transition: CSS_PROPERTY_VALUES.UNSET,
        outline: 'none',
        left: '0px',
      },
    };
  }

  public static changeIconFunc(subcomponentProperties: SubcomponentProperties, newValue: string): void {
    subcomponentProperties.customFeatures.icon.isComponentDisplayed = false;
    subcomponentProperties.customFeatures.icon.name = newValue;
    setTimeout(() => {
      subcomponentProperties.customFeatures.icon.isComponentDisplayed = true;
    });
  }

  private static createDefaultTextCustomFeatures(): CustomFeatures {
    return {
      autoSize: ComponentBuilder.createAutoSize(true, false),
      alignedLayerSection: ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.CENTER),
      // WORK1: shoudn't need changeIconFunc
      icon: { name: DROPDOWN_ARROW_ICON_TYPES.CARET, isComponentDisplayed: true, changeIconFunc: IconBase.changeIconFunc },
    };
  }

  public static createBaseSubcomponent(name: string): SubcomponentProperties {
    return {
      name,
      subcomponentType: SUBCOMPONENT_TYPES.ICON,
      customCss: IconBase.createTextCss(),
      defaultCss: IconBase.createTextCss(),
      inheritedCss: inheritedTextCss,
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      customFeatures: IconBase.createDefaultTextCustomFeatures(),
      defaultCustomFeatures: IconBase.createDefaultTextCustomFeatures(),
    };
  }
}

export const iconBase: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const iconBaseComponent = ComponentBuilder.createBaseComponent(
      { componentType: COMPONENT_TYPES.ICON, baseName }, IconBase.createBaseSubcomponent);
    IconSpecificSettings.set(iconBaseComponent);
    return iconBaseComponent;
  },
}
