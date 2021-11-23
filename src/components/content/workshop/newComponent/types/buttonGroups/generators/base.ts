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
import { ButtonGroupHeightUtils } from '../utils/buttonGroupHeightUtils';
import { ComponentBuilder } from '../../shared/componentBuilder';

class ButtonGroupBase extends ComponentBuilder {

  private static readonly DEFAULT_MARGIN_LEFT = '-2px';

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
    ButtonGroupHeightUtils.setButtonGroupHeightViaButtonProperties(firstButton, firstButton.containerComponent);
    ButtonGroupBase.setOverwriteCssForSyncedComponent(firstButton);
  }

  public static setOnComponentDisplayFunc(buttonGroupBaseComponent: WorkshopComponent): void {
    buttonGroupBaseComponent.onComponentDisplayFunc = ButtonGroupBase.onComponentDisplayFunc;
  }

  private static setWidthViaRange(subcomponent: Subcomponent, cssProperty: string): void {
    if (cssProperty === 'height' || cssProperty === 'paddingTop' || cssProperty === 'paddingBottom') {
      // subcomponent is from button component
      ButtonGroupHeightUtils.setButtonGroupHeightViaButtonProperties(subcomponent.seedComponent,
        subcomponent.seedComponent.containerComponent);
    } else if (cssProperty === 'borderLeftWidth') {
      // subcomponent is from button component
      const borderLeftWidth = subcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderLeftWidth;
      // setting to -2px due to chrome bug where there is a white horizontal border when top/bottom borders are set with 0px < widths
      subcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].marginLeft = borderLeftWidth === '0px' ? '-2px' : `-${borderLeftWidth}`;
      subcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderRightWidth = borderLeftWidth;
    } else if (cssProperty === 'borderTopWidth') {
      // subcomponent is from button component
      const borderTopWidth = subcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderTopWidth;
      subcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderBottomWidth = borderTopWidth;
    } else if (cssProperty === 'borderRadius') {
      // subcomponent is from button component
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
    buttonGroupComponent.onChildComponentRemovalFunc = ButtonGroupBorderUtils.setBorderClasses;
  }

  public static addLayerAndSetSiblingChildComponentsAutoSynced(buttonGroupBaseComponent: WorkshopComponent): void {
    const layerComponent = AddLayerComponent.add(buttonGroupBaseComponent, LAYER_STYLES.PLAIN, false);
    layerComponent.sync.siblingChildComponentsAutoSynced = { siblingComponentTypes: {} };
  }

  private static setButtonGroupOnFirstNewChildButton(buttonComponent: WorkshopComponent, buttonGroupComponent: WorkshopComponent): void {
    if (buttonGroupComponent.componentPreviewStructure.layers[0]
        .alignmentSectionToComponents[ButtonGroupGenericUtils.INDIVIDUAL_BUTTON_ALIGNED_SECTION].length === 1) {
      ButtonGroupHeightUtils.setButtonGroupHeightViaButtonProperties(buttonComponent, buttonGroupComponent);
    }
  }

  private static setDisplayInFrontOfSiblingsState(buttonComponent: WorkshopComponent): void {
    buttonComponent.baseSubcomponent.customStaticFeatures.displayInFrontOfSiblingsState = { zIndex: DisplayInFrontOfSiblings.MIN_Z_INDEX };
  }

  private static syncExecutableFunc(buttonComponent: WorkshopComponent, isPermanentSync: boolean): void {
    if (isPermanentSync) {
      ButtonGroupCompositionAPIUtils.setOverwriteCssForSyncedComponent(buttonComponent);
    } else {
      ButtonGroupHeightUtils.setButtonGroupHeightViaButtonProperties(buttonComponent, buttonComponent.containerComponent);
    }
  }

  private static setTemporarySyncExecutables(buttonComponent: WorkshopComponent): void {
    buttonComponent.sync.syncExecutables = {
      on: ButtonGroupBase.syncExecutableFunc,
      off: ButtonGroupBase.syncExecutableFunc,
    };
  }

  private static setComponentToRemovable(buttonComponent: WorkshopComponent): void {
    buttonComponent.baseSubcomponent.isRemovable = true;
  }

  private static setMarginLeft(buttonComponent: WorkshopComponent): void {
    ComponentBuilder.setCustomAndDefaultCssProperty(buttonComponent.baseSubcomponent, CSS_PSEUDO_CLASSES.DEFAULT, 'marginLeft', ButtonGroupBase.DEFAULT_MARGIN_LEFT);
  }

  public static setPropertyOverwritables(buttonGroupComponent: WorkshopComponent): void {
    buttonGroupComponent.newChildComponents.propertyOverwritables = {
      postBuildFuncs: {
        [COMPONENT_TYPES.BUTTON]: [
          ButtonGroupBase.setMarginLeft,
          ButtonGroupBase.setComponentToRemovable,
          ButtonGroupBase.setTemporarySyncExecutables,
          ButtonGroupBase.setDisplayInFrontOfSiblingsState,
          ButtonGroupBase.setButtonGroupOnFirstNewChildButton,
          ButtonGroupBorderUtils.setBorderClasses,
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
    // WORK 2 - create a min and have a minimum number of buttonas as 1
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

  public static createBaseSubcomponent(name: string): Subcomponent {
    return {
      name,
      subcomponentType: SUBCOMPONENT_TYPES.BASE,
      customCss: ButtonGroupBase.createDefaultCss(),
      defaultCss: ButtonGroupBase.createDefaultCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      userSelectedPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
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
