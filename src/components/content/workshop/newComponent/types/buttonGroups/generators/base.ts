import { DisplayInFrontOfSiblings } from '../../../../utils/componentManipulation/displayInFrontOfSiblings/displayInFrontOfSiblingsUtils';
import { CustomCss, CustomFeatures, Subcomponent, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { AddLayerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addLayerComponent';
import { SyncChildComponentUtils } from '../../../../toolbar/options/syncChildComponent/syncChildComponentUtils';
import { ButtonGroupButtonDisplayInFrontOfSiblings } from '../utils/buttonGroupButtonDisplayInFrontOfSiblings';
import { uniqueSubcomponentIdState } from '../../../../utils/componentGenerator/uniqueSubcomponentIdState';
import { ComponentGenerator, PresetProperties } from '../../../../../../../interfaces/componentGenerator';
import { BUTTON_COMPONENTS_BASE_NAMES } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { ButtonGroupButtonSpecificSettings } from '../settings/buttonGroupButtonSpecificSettings';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { ButtonGroupStylePropertiesUtils } from '../utils/buttonGroupStylePropertiesUtils';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { ButtonGroupCompositionAPIUtils } from '../utils/buttonGroupCompositionAPIUtils';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { inheritedBaseChildCss } from '../../shared/childCss/inheritedBaseChildCss';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { inheritedCardBaseCss } from '../../cards/inheritedCss/inheritedCardCss';
import { LAYER_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { SETTINGS_TYPES } from '../../../../../../../consts/settingsTypes.enum';
import { BORDER_STYLES } from '../../../../../../../consts/borderStyles.enum';
import { ButtonGroupGenericUtils } from '../utils/buttonGroupGenericUtils';
import { ButtonGroupBorderUtils } from '../utils/buttonGroupBorderUtils';
import { ComponentBuilder } from '../../shared/componentBuilder';

class ButtonGroupBase extends ComponentBuilder {

  public static setOverwriteCssForSyncedComponent(buttonComponent: WorkshopComponent): void {
    if (SyncChildComponentUtils.getCurrentOrParentComponentThatIsInSync(buttonComponent)) {
      ButtonGroupCompositionAPIUtils.setOverwriteCssForSyncedComponent(buttonComponent);
    }
  }

  public static setDisplayInFrontOfSiblingsContainerState(buttonGroupBaseComponent: WorkshopComponent): void {
    buttonGroupBaseComponent.baseSubcomponent.customStaticFeatures = {
      displayInFrontOfSiblingsContainerState: {
        highestZIndex: 0,
        numberOfCurrentlyHighlightedButtons: 0,
        conditionalFunc: ButtonGroupButtonDisplayInFrontOfSiblings.shouldComponentBeMovedToFront,
      },
    };
  }

  private static onComponentDisplayFunc(buttonGroupBaseComponent: WorkshopComponent): void {
    const buttonComponents = ButtonGroupGenericUtils.getAllButtonComponents(buttonGroupBaseComponent);
    const firstButton = buttonComponents[0];
    ButtonGroupStylePropertiesUtils.setButtonGroupHeightViaButtonProperties(firstButton, buttonGroupBaseComponent);
    ButtonGroupStylePropertiesUtils.setButtonGroupBorderRadiusViaButtonProperties(firstButton, buttonGroupBaseComponent);
    ButtonGroupBase.setOverwriteCssForSyncedComponent(firstButton);
  }

  public static setOnComponentDisplayFunc(buttonGroupBaseComponent: WorkshopComponent): void {
    buttonGroupBaseComponent.onComponentDisplayFunc = ButtonGroupBase.onComponentDisplayFunc;
  }

  private static setWidthViaRange(subcomponent: Subcomponent, cssProperty: string): void {
    // subcomponent is button component base
    if (cssProperty === 'height' || cssProperty === 'paddingTop' || cssProperty === 'paddingBottom') {
      ButtonGroupStylePropertiesUtils.setButtonGroupHeightViaButtonProperties(subcomponent.seedComponent,
      subcomponent.seedComponent.containerComponent);
    } else if (cssProperty === 'borderRightWidth') {
      const { borderRightWidth } = subcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT];
      subcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderLeftWidth = borderRightWidth;
    } else if (cssProperty === 'borderTopWidth') {
      const borderTopWidth = subcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderTopWidth;
      subcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderBottomWidth = borderTopWidth;
      const buttonComponent = subcomponent.seedComponent;
      ButtonGroupStylePropertiesUtils.setButtonGroupHeightViaButtonProperties(buttonComponent, buttonComponent.containerComponent);
    } else if (cssProperty === 'borderRadius') {
      const borderRadius = subcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderRadius;
      // this is used to get a curve for the button group base
      subcomponent.seedComponent.containerComponent.baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderRadius = borderRadius;
    }
  }

  public static setTriggerFuncOnSettingChange(dropdownMenuBaseComponent: WorkshopComponent): void {
    dropdownMenuBaseComponent.triggerFuncOnSettingChange = {
      [SETTINGS_TYPES.RANGE]: ButtonGroupBase.setWidthViaRange,
    };
  }

  public static setOnChildComponentRemovalFunc(buttonGroupComponent: WorkshopComponent): void {
    buttonGroupComponent.childComponentHandlers.onRemoveFunc = ButtonGroupBorderUtils.setBorderProperties;
  }

  public static addLayerAndSetSiblingChildComponentsAutoSynced(buttonGroupBaseComponent: WorkshopComponent): void {
    const layerComponent = AddLayerComponent.add(buttonGroupBaseComponent, LAYER_STYLES.PLAIN, false);
    layerComponent.sync.siblingChildComponentsAutoSynced = { siblingComponentTypes: {} };
  }

  private static setButtonGroupOnFirstNewChildButton(buttonComponent: WorkshopComponent, buttonGroupComponent: WorkshopComponent): void {
    if (buttonGroupComponent.componentPreviewStructure.layers[0]
        .alignmentSectionToComponents[ButtonGroupGenericUtils.INDIVIDUAL_BUTTON_ALIGNED_SECTION].length === 1) {
      ButtonGroupStylePropertiesUtils.setButtonGroupHeightViaButtonProperties(buttonComponent, buttonGroupComponent);
      ButtonGroupStylePropertiesUtils.setButtonGroupBorderRadiusViaButtonProperties(buttonComponent, buttonGroupComponent);
    }
  }

  private static setDisplayInFrontOfSiblingsState(buttonComponent: WorkshopComponent): void {
    buttonComponent.baseSubcomponent.customStaticFeatures.displayInFrontOfSiblingsState = { zIndex: DisplayInFrontOfSiblings.MIN_Z_INDEX };
  }

  private static offSyncExecutableFunc(buttonComponent: WorkshopComponent, isPermanentSync: boolean): void {
    if (isPermanentSync) {
      ButtonGroupCompositionAPIUtils.unsetOverwriteCssForSyncedComponent(buttonComponent);
    }
  }

  private static onSyncExecutableFunc(buttonComponent: WorkshopComponent, isPermanentSync: boolean): void {
    if (isPermanentSync) {
      ButtonGroupCompositionAPIUtils.setOverwriteCssForSyncedComponent(buttonComponent);
      ButtonGroupStylePropertiesUtils.setButtonGroupHeightViaButtonProperties(buttonComponent, buttonComponent.containerComponent);
      ButtonGroupStylePropertiesUtils.setButtonGroupBorderRadiusViaButtonProperties(buttonComponent, buttonComponent.containerComponent);
    }
  }

  private static setTemporarySyncExecutables(buttonComponent: WorkshopComponent): void {
    buttonComponent.sync.syncExecutables = {
      on: ButtonGroupBase.onSyncExecutableFunc,
      off: ButtonGroupBase.offSyncExecutableFunc,
    };
  }

  private static setComponentToRemovable(buttonComponent: WorkshopComponent): void {
    buttonComponent.baseSubcomponent.isRemovable = true;
  }

  public static setPropertyOverwritables(buttonGroupComponent: WorkshopComponent): void {
    buttonGroupComponent.childComponentHandlers.onAddOverwritables = {
      postBuildFuncs: {
        [COMPONENT_TYPES.BUTTON]: [
          ButtonGroupBase.setComponentToRemovable,
          ButtonGroupBase.setTemporarySyncExecutables,
          ButtonGroupBase.setDisplayInFrontOfSiblingsState,
          ButtonGroupBase.setButtonGroupOnFirstNewChildButton,
          ButtonGroupBorderUtils.setBorderProperties,
          ButtonGroupButtonSpecificSettings.set,
        ],
      },
      onBuildProperties: {
        [COMPONENT_TYPES.BUTTON]: { horizontalSection: ButtonGroupGenericUtils.INDIVIDUAL_BUTTON_ALIGNED_SECTION },
      },
    };
  }

  public static setChildComponentsItems(buttonGroupBaseComponent: WorkshopComponent): void {
    const baseComponentItems = [BUTTON_COMPONENTS_BASE_NAMES.BUTTON];
    const childComponentMinCount = { min: { [BUTTON_COMPONENTS_BASE_NAMES.BUTTON]: 1 }};
    ComponentBuilder.setNewChildComponentsItemsProperties(buttonGroupBaseComponent,
      baseComponentItems, baseComponentItems, childComponentMinCount);
  }

  private static createDefaultCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        color: '#004085',
        backgroundColor: 'unset',
        borderColor: '#b8daff',
        borderTopWidth: '0px',
        borderRightWidth: '0px',
        borderLeftWidth: '0px',
        borderBottomWidth: '0px',
        borderStyle: BORDER_STYLES.SOLID,
        borderRadius: '0px',
        width: 'auto',
        height: '50px',
        boxSizing: CSS_PROPERTY_VALUES.UNSET,
        fontSize: '16px',
        boxShadow: CSS_PROPERTY_VALUES.UNSET,
        fontFamily: '"Poppins", sans-serif',
        textAlign: 'left',
        marginTop: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        marginBottom: '0px',
      },
    };
  }

  private static createDefaultCustomFeatures(): CustomFeatures {
    return {
      animations: ComponentBuilder.createDisplayAnimationsProperties(),
    };
  }

  public static createBaseSubcomponent(name: string): Subcomponent {
    return {
      name,
      subcomponentType: SUBCOMPONENT_TYPES.BASE,
      customCss: ButtonGroupBase.createDefaultCss(),
      defaultCss: ButtonGroupBase.createDefaultCss(),
      activeCssPseudoClassesDropdownItem: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClassesDropdownItem: CSS_PSEUDO_CLASSES.DEFAULT,
      activeCssPseudoClassViaUserAction: CSS_PSEUDO_CLASSES.DEFAULT,
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
    ButtonGroupBase.setDisplayInFrontOfSiblingsContainerState(buttonGroupBaseComponent);
    // AlertBaseSpecificSettings.set(alertBaseComponent);
    return buttonGroupBaseComponent;
  },
}
