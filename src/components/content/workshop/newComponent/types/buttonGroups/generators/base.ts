import { CustomCss, CustomFeatures, SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { AddLayerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addLayerComponent';
import { uniqueSubcomponentIdState } from '../../../../utils/componentGenerator/uniqueSubcomponentIdState';
import { ComponentGenerator, PresetProperties } from '../../../../../../../interfaces/componentGenerator';
import { BUTTON_COMPONENTS_BASE_NAMES } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
// import { AlertBaseSpecificSettings } from '../settings/alertBaseSpecificSettings';
import { inheritedBaseChildCss } from '../../shared/childCss/inheritedBaseChildCss';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { inheritedCardBaseCss } from '../../cards/inheritedCss/inheritedCardCss';
import { LAYER_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { SETTINGS_TYPES } from '../../../../../../../consts/settingsTypes.enum';
import { BORDER_STYLES } from '../../../../../../../consts/borderStyles.enum';
import { ButtonGroupGenericUtils } from '../utils/buttonGroupGenericUtils';
import { ButtonGroupBorderUtils } from '../utils/buttonGroupBorderUtils';
import { ButtonGroupHeightUtils } from '../utils/buttonGroupHeightUtils';
import { ComponentBuilder } from '../../shared/componentBuilder';

class ButtonGroupBase extends ComponentBuilder {

  private static onComponentDisplayFunc(buttonGroupBaseComponent: WorkshopComponent): void {
    const buttonComponents = ButtonGroupGenericUtils.getAllButtonComponents(buttonGroupBaseComponent);
    const firstButton = buttonComponents[0];
    ButtonGroupHeightUtils.setButtonGroupHeightViaButtonProperties(firstButton, firstButton.containerComponent);
  }

  public static setOnComponentDisplayFunc(buttonGroupBaseComponent: WorkshopComponent): void {
    buttonGroupBaseComponent.onComponentDisplayFunc = ButtonGroupBase.onComponentDisplayFunc;
  }

  private static setWidthViaRange(subcomponentProperties: SubcomponentProperties, cssProperty: string): void {
    if (cssProperty === 'height' || cssProperty === 'paddingTop' || cssProperty === 'paddingBottom') {
      // subcomponentProperties is from button component
      ButtonGroupHeightUtils.setButtonGroupHeightViaButtonProperties(subcomponentProperties.seedComponent,
        subcomponentProperties.seedComponent.containerComponent);
    } else if (cssProperty === 'borderLeftWidth') {
      // subcomponentProperties is from button component
      const borderLeftWidth = subcomponentProperties.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderLeftWidth;
      subcomponentProperties.customCss[CSS_PSEUDO_CLASSES.DEFAULT].marginLeft = `-${borderLeftWidth}`;
      subcomponentProperties.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderRightWidth = borderLeftWidth;
    } else if (cssProperty === 'borderTopWidth') {
      // subcomponentProperties is from button component
      const borderTopWidth = subcomponentProperties.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderTopWidth;
      subcomponentProperties.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderBottomWidth = borderTopWidth;
    } else if (cssProperty === 'borderRadius') {
      // subcomponentProperties is from button component
      const borderRadius = subcomponentProperties.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderRadius;
      // this is used to get a curve for the button group base
      subcomponentProperties.seedComponent.containerComponent.baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderRadius = borderRadius;
    }
  }

  public static setTriggerFuncOnSettingChange(dropdownMenuBaseComponent: WorkshopComponent): void {
    dropdownMenuBaseComponent.triggerFuncOnSettingChange = {
      [SETTINGS_TYPES.RANGE]: ButtonGroupBase.setWidthViaRange,
    };
  }

  public static setOnChildComponentRemovalFunc(buttonGroupComponent: WorkshopComponent): void {
    buttonGroupComponent.onChildComponentRemovalFunc = ButtonGroupBorderUtils.setBorderClasses;
  }

  public static addLayerAndSetSiblingChildComponentsAutoSynced(buttonGroupBaseComponent: WorkshopComponent): void {
    const layerComponent = AddLayerComponent.add(buttonGroupBaseComponent, LAYER_STYLES.PLAIN, false);
    layerComponent.sync.siblingChildComponentsAutoSynced = { siblingSubcomponentTypes: {} };
  }

  private static setButtonGroupOnFirstNewChildButton(buttonComponent: WorkshopComponent, buttonGroupComponent: WorkshopComponent): void {
    if (buttonGroupComponent.componentPreviewStructure.layers[0].sections
        .alignedSections[ButtonGroupGenericUtils.BUTTONS_ALIGNED_SECTION_TYPE].length === 1) {
      ButtonGroupHeightUtils.setButtonGroupHeightViaButtonProperties(buttonComponent, buttonGroupComponent);
    }
  }

  private static onTemporarySyncExecutableFunc(buttonComponent: WorkshopComponent): void {
    ButtonGroupHeightUtils.setButtonGroupHeightViaButtonProperties(buttonComponent, buttonComponent.containerComponent);
  }

  private static setTemporarySyncExecutables(buttonComponent: WorkshopComponent): void {
    buttonComponent.sync.temporarySyncExecutables = {
      on: ButtonGroupBase.onTemporarySyncExecutableFunc,
      off: ButtonGroupBase.onTemporarySyncExecutableFunc,
    }
  }

  private static setComponentToRemovable(buttonComponent: WorkshopComponent): void {
    buttonComponent.baseSubcomponent.isRemovable = true;
  }

  public static setPropertyOverwritables(buttonGroupComponent: WorkshopComponent): void {
    buttonGroupComponent.newChildComponents.propertyOverwritables = {
      postBuildFuncs: {
        [COMPONENT_TYPES.BUTTON]: [
          ButtonGroupBase.setComponentToRemovable,
          ButtonGroupBorderUtils.setBorderClasses,
          ButtonGroupBorderUtils.setDefaultBorderProperties,
          ButtonGroupBase.setTemporarySyncExecutables,
          ButtonGroupBase.setButtonGroupOnFirstNewChildButton],
      },
      onBuildProperties: {
        [COMPONENT_TYPES.BUTTON]: { alignmentSection: ButtonGroupGenericUtils.BUTTONS_ALIGNED_SECTION_TYPE },
      },
    };
  }

  public static setChildComponentsItems(buttonGroupBaseComponent: WorkshopComponent): void {
    const baseComponentItems = [BUTTON_COMPONENTS_BASE_NAMES.BUTTON];
    // WORK 2 - creat a min and have a minimum number of buttonas as 1
    // const childComponentMaxCount = { max: { [BUTTON_COMPONENTS_BASE_NAMES.BUTTON]: 1 }};
    ComponentBuilder.setNewChildComponentsItemsProperties(buttonGroupBaseComponent,
      baseComponentItems, baseComponentItems);
  }

  private static createDefaultCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        color: '#004085',
        backgroundColor: 'unset',
        borderColor: '#b8daff',
        borderWidth: '0px',
        borderStyle: BORDER_STYLES.SOLID,
        borderRadius: '0px',
        width: 'auto',
        height: '50px',
        boxSizing: CSS_PROPERTY_VALUES.UNSET,
        fontSize: '16px',
        boxShadow: CSS_PROPERTY_VALUES.UNSET,
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
      customCss: ButtonGroupBase.createDefaultCss(),
      defaultCss: ButtonGroupBase.createDefaultCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      inheritedCss: inheritedCardBaseCss,
      childCss: inheritedBaseChildCss,
      customFeatures: ButtonGroupBase.createDefaultCustomFeatures(),
      defaultCustomFeatures: ButtonGroupBase.createDefaultCustomFeatures(),
    };
  }
}

export const buttonGroupBase: ComponentGenerator = {
  createNewComponent(presetProperties: PresetProperties): WorkshopComponent {
    uniqueSubcomponentIdState.resetUniqueId();
    presetProperties.componentType = COMPONENT_TYPES.BUTTON_GROUP;
    const buttonGroupBaseComponent = ComponentBuilder.createBaseComponent(presetProperties, ButtonGroupBase.createBaseSubcomponent, false);
    ButtonGroupBase.setChildComponentsItems(buttonGroupBaseComponent);
    ButtonGroupBase.setPropertyOverwritables(buttonGroupBaseComponent);
    ButtonGroupBase.addLayerAndSetSiblingChildComponentsAutoSynced(buttonGroupBaseComponent);
    ButtonGroupBase.setOnChildComponentRemovalFunc(buttonGroupBaseComponent);
    ButtonGroupBase.setTriggerFuncOnSettingChange(buttonGroupBaseComponent);
    ButtonGroupBase.setOnComponentDisplayFunc(buttonGroupBaseComponent);
    // AlertBaseSpecificSettings.set(alertBaseComponent);
    return buttonGroupBaseComponent;
  },
}
