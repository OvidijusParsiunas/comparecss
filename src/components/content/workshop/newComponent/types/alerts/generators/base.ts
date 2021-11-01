import { CustomCss, CustomFeatures, SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { BUTTON_COMPONENTS_BASE_NAMES, PRIMITIVE_COMPONENTS_BASE_NAMES } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { uniqueSubcomponentIdState } from '../../../../utils/componentGenerator/uniqueSubcomponentIdState';
import { ComponentGenerator, PresetProperties } from '../../../../../../../interfaces/componentGenerator';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { inheritedBaseChildCss } from '../../shared/childCss/inheritedBaseChildCss';
import { AlertBaseSpecificSettings } from '../settings/alertBaseSpecificSettings';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { inheritedCardBaseCss } from '../../cards/inheritedCss/inheritedCardCss';
import { BORDER_STYLES } from '../../../../../../../consts/borderStyles.enum';
import { ComponentBuilder } from '../../shared/componentBuilder';

class AlertBase extends ComponentBuilder {

  private static setComponentToRemovable(component: WorkshopComponent): void {
    component.baseSubcomponent.isRemovable = true;
  }

  public static setPropertyOverwritables(alertComponent: WorkshopComponent): void {
    alertComponent.newChildComponents.propertyOverwritables = {
      postBuildFuncs: {
        [COMPONENT_TYPES.TEXT]: [AlertBase.setComponentToRemovable],
        [COMPONENT_TYPES.BUTTON]: [AlertBase.setComponentToRemovable],
      },
      onBuildProperties: {
        [COMPONENT_TYPES.TEXT]: { alignmentSection: ALIGNED_SECTION_TYPES.CENTER },
        [COMPONENT_TYPES.BUTTON]: { alignmentSection: ALIGNED_SECTION_TYPES.RIGHT },
      },
    };
  }

  public static setChildComponentsItems(alertBaseComponent: WorkshopComponent): void {
    const baseComponentItems = [PRIMITIVE_COMPONENTS_BASE_NAMES.TEXT, BUTTON_COMPONENTS_BASE_NAMES.CLOSE];
    const childComponentMaxCount = { max: { [BUTTON_COMPONENTS_BASE_NAMES.CLOSE]: 1 }};
    ComponentBuilder.setNewChildComponentsItemsProperties(alertBaseComponent,
      baseComponentItems, baseComponentItems, childComponentMaxCount);
  }

  private static createDefaultCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        color: '#004085',
        backgroundColor: '#cce5ff',
        borderColor: '#b8daff',
        borderWidth: '1px',
        borderStyle: BORDER_STYLES.SOLID,
        borderRadius: '4px',
        width: '400px',
        height: '50px',
        boxSizing: CSS_PROPERTY_VALUES.UNSET,
        fontSize: '16px',
        boxShadow: CSS_PROPERTY_VALUES.UNSET,
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '0px',
        paddingBottom: '0px',
        fontFamily: '"Poppins", sans-serif',
        textAlign: 'left',
      },
    };
  }

  private static createDefaultCustomFeatures(): CustomFeatures {
    return {
      animations: ComponentBuilder.createDisplayAnimationsProperties(),
    };
  }

  public static createBaseSubcomponent(name: string): SubcomponentProperties {
    return {
      name,
      subcomponentType: SUBCOMPONENT_TYPES.BASE,
      customCss: AlertBase.createDefaultCss(),
      defaultCss: AlertBase.createDefaultCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      inheritedCss: inheritedCardBaseCss,
      childCss: inheritedBaseChildCss,
      customFeatures: AlertBase.createDefaultCustomFeatures(),
      defaultCustomFeatures: AlertBase.createDefaultCustomFeatures(),
    };
  }
}

export const alertBase: ComponentGenerator = {
  createNewComponent(presetProperties: PresetProperties): WorkshopComponent {
    uniqueSubcomponentIdState.resetUniqueId();
    presetProperties.componentType = COMPONENT_TYPES.ALERT;
    const alertBaseComponent = ComponentBuilder.createBaseComponent(presetProperties, AlertBase.createBaseSubcomponent, false);
    AlertBase.setChildComponentsItems(alertBaseComponent);
    AlertBase.setPropertyOverwritables(alertBaseComponent);
    AlertBaseSpecificSettings.set(alertBaseComponent);
    return alertBaseComponent;
  },
}
