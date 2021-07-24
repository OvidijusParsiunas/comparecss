import { CustomCss, CustomFeatures, SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../../../interfaces/dropdownOptionDisplayStatus';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { ButtonBaseSpecificSettings } from '../settings/buttonBaseSpecificSettings';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { inheritedButtonCss } from '../inheritedCss/inheritedCss';
import { ComponentBuilder } from '../../shared/componentBuilder';

class ButtonBase extends ComponentBuilder {

  private static createDefaultBaseCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        borderRadius: '0px',
        borderWidth: '0px',
        borderColor: '#1779ba',
        backgroundColor: '#1779ba',
        borderStyle: 'solid',
        boxShadow: CSS_PROPERTY_VALUES.UNSET,
        outline: 'none',
        paddingTop: '0px',
        paddingBottom: '0px',
        paddingLeft: '12px',
        paddingRight: '12px',
        marginLeft: '0px',
        marginTop: '0px',
        marginRight: '0px',
        marginBottom: '0px',
        width: '40px',
        height: '38px',
        boxSizing: 'content-box',
        color: '#ffffff',
        fontSize: '14px',
        fontFamily: '"Helvetica Neue", Helvetica, Roboto, Arial, sans-serif',
        transition: CSS_PROPERTY_VALUES.UNSET,
      },
      [CSS_PSEUDO_CLASSES.HOVER]: {
        backgroundColor: '#ff0000',
      },
      [CSS_PSEUDO_CLASSES.CLICK]: {
        backgroundColor: '#409441',
      },
    }
  }

  private static createDefaultButtonBaseCustomFeatures(): CustomFeatures {
    return {
      lastSelectedCssValues: ComponentBuilder.createLastSelectedCssLeftValue(),
      alignedLayerSection: ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.LEFT),
      animations: ComponentBuilder.createStationaryAnimations({}),
    };
  }

  public static createBaseSubcomponent(): SubcomponentProperties {
    return {
      subcomponentType: SUBCOMPONENT_TYPES.BUTTON,
      customCss: ButtonBase.createDefaultBaseCss(),
      defaultCss: ButtonBase.createDefaultBaseCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      tempCustomCss: new Set(['transition']),
      inheritedCss: inheritedButtonCss,
      customFeatures: ButtonBase.createDefaultButtonBaseCustomFeatures(),
      defaultCustomFeatures: ButtonBase.createDefaultButtonBaseCustomFeatures(),
    };
  }

  public static cleanBaseDropdownIfNotNested(buttonComponent: WorkshopComponent, baseName?: string): void {
    if (!baseName) {
      const { componentPreviewStructure, coreSubcomponentNames } = buttonComponent;
      const buttonBaseCustomponent = componentPreviewStructure.subcomponentDropdownStructure[coreSubcomponentNames.base];
      delete buttonBaseCustomponent[DROPDOWN_OPTION_AUX_DETAILS_REF];
    }
  }
}

export const buttonBase: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const buttonBaseComponent = ComponentBuilder.createBaseComponent(
      { componentType: COMPONENT_TYPES.BUTTON, baseName }, ButtonBase.createBaseSubcomponent);
    ButtonBaseSpecificSettings.set(buttonBaseComponent);
    ButtonBase.cleanBaseDropdownIfNotNested(buttonBaseComponent, baseName);
    return buttonBaseComponent;
  },
}
