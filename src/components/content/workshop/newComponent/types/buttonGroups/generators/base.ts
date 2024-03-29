import { AutoSyncedSiblingComponentUtils } from '../../../../utils/componentManipulation/autoSyncedSiblingComponentUtils/autoSyncedSiblingComponentUtils';
import { CustomCss, CustomFeatures, CustomStaticFeatures, Subcomponent, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { DisplayInFrontOfSiblings } from '../../../../utils/componentManipulation/displayInFrontOfSiblings/displayInFrontOfSiblingsUtils';
import { SelectedChildComponentUtils } from '../../../../utils/componentManipulation/selectedChildComponent/selectedChildComponentUtils';
import { ButtonGroupOverwriteCssForSyncedComponentUtils } from '../utils/buttonGroupOverwriteCssForSyncedComponentUtils';
import { DisplayInFrontOfSiblingsContainerState } from '../../../../../../../interfaces/displayInFrontOfSiblingsState';
import { AddLayerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addLayerComponent';
import { SyncChildComponentUtils } from '../../../../toolbar/options/syncChildComponent/syncChildComponentUtils';
import { ButtonGroupButtonDisplayInFrontOfSiblings } from '../utils/buttonGroupButtonDisplayInFrontOfSiblings';
import { SELECT_CHILD_COMPONENT_STYLE_OPTIONS } from '../../../../../../../interfaces/selectedChildComponent';
import { uniqueSubcomponentIdState } from '../../../../utils/componentGenerator/uniqueSubcomponentIdState';
import { ComponentGenerator, PresetProperties } from '../../../../../../../interfaces/componentGenerator';
import { BUTTON_COMPONENTS_BASE_NAMES } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { ButtonGroupButtonSpecificSettings } from '../settings/buttonGroupButtonSpecificSettings';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { ButtonGroupStylePropertiesUtils } from '../utils/buttonGroupStylePropertiesUtils';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { inheritedBaseChildCss } from '../../shared/childCss/inheritedBaseChildCss';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { inheritedCardBaseCss } from '../../cards/inheritedCss/inheritedCardCss';
import { LAYER_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { BORDER_STYLES } from '../../../../../../../consts/borderStyles.enum';
import { ButtonGroupGenericUtils } from '../utils/buttonGroupGenericUtils';
import { ButtonGroupBorderUtils } from '../utils/buttonGroupBorderUtils';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { TriggerFuncs } from '../settings/triggerFuncs';

class ButtonGroupBase extends ComponentBuilder {

  private static setOverwriteCssForSyncedComponent(buttonComponent: WorkshopComponent): void {
    if (SyncChildComponentUtils.getCurrentOrParentComponentThatIsInSync(buttonComponent)) {
      ButtonGroupOverwriteCssForSyncedComponentUtils.setOverwriteCssForSyncedComponent(buttonComponent, 'overwriteCssForSyncedComponent');
    }
  }

  private static onComponentDisplayFunc(buttonGroupBaseComponent: WorkshopComponent): void {
    const buttonComponents = ButtonGroupGenericUtils.getAllButtonComponents(buttonGroupBaseComponent);
    const firstButton = buttonComponents[0];
    ButtonGroupStylePropertiesUtils.setButtonGroupHeightViaButtonProperties(firstButton, buttonGroupBaseComponent);
    ButtonGroupStylePropertiesUtils.setButtonGroupBorderRadiusViaButtonProperties(firstButton, buttonGroupBaseComponent);
    ButtonGroupBase.setOverwriteCssForSyncedComponent(firstButton);
  }

  public static setComponentSwitchFuncs(buttonGroupBaseComponent: WorkshopComponent): void {
    buttonGroupBaseComponent.componentSwitchFuncs = {
      onDisplay: ButtonGroupBase.onComponentDisplayFunc,
      onLeave: SelectedChildComponentUtils.unselectChildViaContainerIfSelected,
    };
  }

  public static setOnChildComponentRemovalFunc(buttonGroupComponent: WorkshopComponent): void {
    buttonGroupComponent.childComponentHandlers.onRemoveFunc = ButtonGroupBorderUtils.setBorderProperties;
  }

  public static addLayerAndSetSiblingChildComponentsAutoSynced(buttonGroupBaseComponent: WorkshopComponent): void {
    const layerComponent = AddLayerComponent.add(buttonGroupBaseComponent, LAYER_STYLES.PLAIN, false);
    layerComponent.sync.siblingChildComponentsAutoSynced = { siblingComponentTypes: {} };
  }

  private static setSelectComponentObj(childComponent: WorkshopComponent, containerArg: WorkshopComponent): void {
    const container = this as any as WorkshopComponent || containerArg;
    ComponentBuilder.populateComponentAndChildrenWithSelectComponentObj(childComponent, container);
  }

  private static setButtonChildPropertyOverwritables(buttonComponent: WorkshopComponent): void {
    const buttonGroupComponent = this as any as WorkshopComponent;
    buttonComponent.childComponentHandlers.onAddOverwritables = {
      postBuildFuncs: {
        [COMPONENT_TYPES.TEXT]: {
          completeOnly: [
            ButtonGroupBase.setSelectComponentObj.bind(buttonGroupComponent),
          ],
        },
        [COMPONENT_TYPES.ICON]: {
          completeOnly: [
            ButtonGroupBase.setSelectComponentObj.bind(buttonGroupComponent),
          ],
        },
      },
    };
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
      const buttonComponents = ButtonGroupGenericUtils.getAllButtonComponents(buttonComponent.containerComponent);
      if (buttonComponents[0] === buttonComponent) ButtonGroupOverwriteCssForSyncedComponentUtils.unsetOverwriteCssForSyncedComponent(buttonComponent);
    } else {
      const siblingChildComponentsAutoSynced = AutoSyncedSiblingComponentUtils.getParentLayerSiblingChildComponentsAutoSyncedObject(buttonComponent);
      delete siblingChildComponentsAutoSynced.tempOverwriteCssForSyncedComponent;
    }
  }

  private static onSyncExecutableFunc(buttonComponent: WorkshopComponent, isPermanentSync: boolean): void {
    if (isPermanentSync) {
      AutoSyncedSiblingComponentUtils.moveTempOverwriteCssForSyncedComponentToPerm(buttonComponent);
      ButtonGroupStylePropertiesUtils.setButtonGroupHeightViaButtonProperties(buttonComponent, buttonComponent.containerComponent);
      ButtonGroupStylePropertiesUtils.setButtonGroupBorderRadiusViaButtonProperties(buttonComponent, buttonComponent.containerComponent);
    } else {
      ButtonGroupOverwriteCssForSyncedComponentUtils.setOverwriteCssForSyncedComponent(buttonComponent, 'tempOverwriteCssForSyncedComponent');
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

  private static setButtonMouseEvents(buttonComponent: WorkshopComponent): void {
    buttonComponent.baseSubcomponent.customFeatures.mouseEventCallbacks = {
      click: SelectedChildComponentUtils.select,
    };
  }

  public static setPropertyOverwritables(buttonGroupComponent: WorkshopComponent): void {
    buttonGroupComponent.childComponentHandlers.onAddOverwritables = {
      postBuildFuncs: {
        [COMPONENT_TYPES.BUTTON]: {
          tempAndComplete: [
            ButtonGroupBase.setDisplayInFrontOfSiblingsState,
            ButtonGroupBase.setButtonGroupOnFirstNewChildButton,
            ButtonGroupBorderUtils.setBorderProperties,
          ],
          completeOnly: [
            ButtonGroupBase.setButtonMouseEvents,
            ButtonGroupBase.setComponentToRemovable,
            ButtonGroupBase.setTemporarySyncExecutables,
            ButtonGroupBase.setButtonChildPropertyOverwritables.bind(buttonGroupComponent),
            ButtonGroupBase.setSelectComponentObj,
            TriggerFuncs.setTriggerFuncOnButtonSettingChange,
            ButtonGroupButtonSpecificSettings.set,
          ],
        },
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

  private static createDisplayInFrontOfSiblingsContainerState(): DisplayInFrontOfSiblingsContainerState {
    return {
      highestZIndex: 0,
      numberOfCurrentlyHighlightedButtons: 0,
      conditionalFunc: ButtonGroupButtonDisplayInFrontOfSiblings.shouldComponentBeMovedToFront,
    };
  }

  private static createDefaultCustomStaticFeatures(): CustomStaticFeatures {
    return {
      displayInFrontOfSiblingsContainerState: ButtonGroupBase.createDisplayInFrontOfSiblingsContainerState(),
      selectComponent: ComponentBuilder.createSelectComponentContainer(SELECT_CHILD_COMPONENT_STYLE_OPTIONS.Hover),
    };
  }

  private static createDefaultCustomFeatures(): CustomFeatures {
    return {
      animations: ComponentBuilder.createDisplayAnimationsProperties(),
    };
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
      customStaticFeatures: ButtonGroupBase.createDefaultCustomStaticFeatures(),
      defaultCustomStaticFeatures: ButtonGroupBase.createDefaultCustomStaticFeatures(),
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
    ButtonGroupBase.setComponentSwitchFuncs(buttonGroupBaseComponent);
    // AlertBaseSpecificSettings.set(alertBaseComponent);
    return buttonGroupBaseComponent;
  },
}
