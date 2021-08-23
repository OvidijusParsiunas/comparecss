import { UpdateDropdownOptionNamesShared } from '../../../../utils/componentManipulation/updateNestedComponentNames/updateDropdownOptionNamesShared';
import { CustomCss, CustomFeatures, SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { PRIMITIVE_COMPONENTS_BASE_NAMES } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CoreSubcomponentRefs } from '../../../../../../../interfaces/coreSubcomponentRefs';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { ButtonBaseSpecificSettings } from '../settings/buttonBaseSpecificSettings';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { BORDER_STYLES } from '../../../../../../../consts/borderStyles.enum';
import { inheritedButtonCss } from '../inheritedCss/inheritedCss';
import { ComponentBuilder } from '../../shared/componentBuilder';

class ButtonBase extends ComponentBuilder {

  public static setNestedComponentsOptions(buttonBaseComponent: WorkshopComponent): void {
    const baseComponentOptions = UpdateDropdownOptionNamesShared.generateDropdownStructure([
      PRIMITIVE_COMPONENTS_BASE_NAMES.TEXT, PRIMITIVE_COMPONENTS_BASE_NAMES.ICON]);
    buttonBaseComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].newNestedComponentsOptions = baseComponentOptions;
    buttonBaseComponent.newNestedComponentsOptionsRefs = { layer: baseComponentOptions };
    buttonBaseComponent.nestedComponentCount = {
      max: { [PRIMITIVE_COMPONENTS_BASE_NAMES.TEXT]: 1, [PRIMITIVE_COMPONENTS_BASE_NAMES.ICON]: 1 }};
  }

  private static createOtherSubcomponentsToTriggerTemplate(): CoreSubcomponentRefs {
    return { [SUBCOMPONENT_TYPES.TEXT]: null, [SUBCOMPONENT_TYPES.ICON]: null };
  }

  private static createDefaultBaseCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        borderRadius: '0px',
        borderWidth: '0px',
        borderColor: '#1779ba',
        backgroundColor: '#1779ba',
        borderStyle: BORDER_STYLES.SOLID,
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

  public static createBaseSubcomponent(name: string): SubcomponentProperties {
    return {
      name,
      subcomponentType: SUBCOMPONENT_TYPES.BUTTON,
      customCss: ButtonBase.createDefaultBaseCss(),
      defaultCss: ButtonBase.createDefaultBaseCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      tempCustomCss: new Set(['transition']),
      inheritedCss: inheritedButtonCss,
      customFeatures: ButtonBase.createDefaultButtonBaseCustomFeatures(),
      defaultCustomFeatures: ButtonBase.createDefaultButtonBaseCustomFeatures(),
      otherSubcomponentsToTrigger: ButtonBase.createOtherSubcomponentsToTriggerTemplate(),
    };
  }

  public static createBaseComponentCoreSubcomponentRefsTemplate(): CoreSubcomponentRefs {
    return {
      [SUBCOMPONENT_TYPES.BASE]: null,
      [SUBCOMPONENT_TYPES.TEXT]: null,
      [SUBCOMPONENT_TYPES.ICON]: null,
    }
  }
}

export const buttonBase: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const coreSubcomponentRefs = ButtonBase.createBaseComponentCoreSubcomponentRefsTemplate();
    const buttonBaseComponent = ComponentBuilder.createBaseComponent(
      { componentType: COMPONENT_TYPES.BUTTON, baseName, coreSubcomponentRefs }, ButtonBase.createBaseSubcomponent);
    ButtonBaseSpecificSettings.set(buttonBaseComponent);
    ButtonBase.setNestedComponentsOptions(buttonBaseComponent);
    return buttonBaseComponent;
  },
}
