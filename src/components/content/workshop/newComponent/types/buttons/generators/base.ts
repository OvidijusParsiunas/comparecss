import { CustomCss, CustomFeatures, CustomStaticFeatures, SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SubcomponentTriggers } from '../../../../utils/componentManipulation/utils/subcomponentTriggers';
import { PRIMITIVE_COMPONENTS_BASE_NAMES } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { OtherSubcomponentTriggers } from '../../../../../../../interfaces/otherSubcomponentTriggers';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CoreSubcomponentRefs } from '../../../../../../../interfaces/coreSubcomponentRefs';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { JAVASCRIPT_CLASSES } from '../../../../../../../consts/javascriptClasses.enum';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { ButtonBaseSpecificSettings } from '../settings/buttonBaseSpecificSettings';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { BORDER_STYLES } from '../../../../../../../consts/borderStyles.enum';
import { JsClassesUtils } from '../../shared/jsClasses/jsClassesUtils';
import { inheritedButtonCss } from '../inheritedCss/inheritedCss';
import { ComponentBuilder } from '../../shared/componentBuilder';

class ButtonBase extends ComponentBuilder {

  private static createDefaultButtonJsClasses(): Set<JAVASCRIPT_CLASSES> {
    return new Set([JAVASCRIPT_CLASSES.RIPPLES]);
  }

  public static setPropertyOverwritingExecutables(buttonBaseComponent: WorkshopComponent): void {
    buttonBaseComponent.propertyOverwritingExecutables = [
      JsClassesUtils.assignJsClassesRefToAllSubcomponents.bind(ButtonBase.createDefaultButtonJsClasses())];
  }

  public static setChildComponentsOptions(buttonBaseComponent: WorkshopComponent): void {
    const baseComponentOptions = [PRIMITIVE_COMPONENTS_BASE_NAMES.TEXT, PRIMITIVE_COMPONENTS_BASE_NAMES.ICON];
    const childComponentMaxCount = { max: { [PRIMITIVE_COMPONENTS_BASE_NAMES.TEXT]: 1, [PRIMITIVE_COMPONENTS_BASE_NAMES.ICON]: 1 }};
    ComponentBuilder.setChildComponentsOptionsProperties(buttonBaseComponent,
      baseComponentOptions, baseComponentOptions, childComponentMaxCount);
  }

  private static createOtherSubcomponentTriggersTemplate(): OtherSubcomponentTriggers {
    return SubcomponentTriggers.createOtherSubcomponentTriggersTemplate([SUBCOMPONENT_TYPES.TEXT, SUBCOMPONENT_TYPES.ICON]);
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

  private static createDefaultButtonBaseCustomStaticFeatures(): CustomStaticFeatures {
    return {
      alignedLayerSection: ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.LEFT),
    }
  }

  private static createDefaultButtonBaseCustomFeatures(): CustomFeatures {
    return {
      lastSelectedCssValues: ComponentBuilder.createLastSelectedCssLeftValue(),
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
      customStaticFeatures: ButtonBase.createDefaultButtonBaseCustomStaticFeatures(),
      defaultCustomStaticFeatures: ButtonBase.createDefaultButtonBaseCustomStaticFeatures(),
      otherSubcomponentTriggers: ButtonBase.createOtherSubcomponentTriggersTemplate(),
    };
  }

  public static createBaseComponentCoreSubcomponentRefsTemplate(): CoreSubcomponentRefs {
    return {
      [SUBCOMPONENT_TYPES.BASE]: null,
      [SUBCOMPONENT_TYPES.TEXT]: null,
      [SUBCOMPONENT_TYPES.ICON]: null,
    };
  }

  // WORK 3 - populate like the core subcomponents
  public static addCopyableSubcomponents(buttonComponent: WorkshopComponent): void {
    buttonComponent.sync.copyables = {
      subcomponents: {
        [SUBCOMPONENT_TYPES.BASE]: null,
        [SUBCOMPONENT_TYPES.TEXT]: null,
        [SUBCOMPONENT_TYPES.ICON]: null,
      },
      childComponents: [],
    };
  }
}

export const buttonBase: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const coreSubcomponentRefs = ButtonBase.createBaseComponentCoreSubcomponentRefsTemplate();
    const buttonBaseComponent = ComponentBuilder.createBaseComponent(
      { componentType: COMPONENT_TYPES.BUTTON, baseName, coreSubcomponentRefs }, ButtonBase.createBaseSubcomponent);
    ButtonBaseSpecificSettings.set(buttonBaseComponent);
    ButtonBase.setChildComponentsOptions(buttonBaseComponent);
    ButtonBase.setPropertyOverwritingExecutables(buttonBaseComponent);
    ButtonBase.addCopyableSubcomponents(buttonBaseComponent);
    return buttonBaseComponent;
  },
}
