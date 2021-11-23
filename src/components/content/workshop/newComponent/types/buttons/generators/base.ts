import { CustomCss, CustomFeatures, CustomStaticFeatures, Subcomponent, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SubcomponentTriggers } from '../../../../utils/componentManipulation/utils/subcomponentTriggers';
import { ComponentGenerator, PresetProperties } from '../../../../../../../interfaces/componentGenerator';
import { PRIMITIVE_COMPONENTS_BASE_NAMES } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { HORIZONTAL_ALIGNMENT_SECTIONS } from '../../../../../../../consts/horizontalAlignmentSections';
import { OtherSubcomponentTriggers } from '../../../../../../../interfaces/otherSubcomponentTriggers';
import { SyncedComponent } from '../../../../toolbar/options/syncChildComponent/syncedComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { JsClassesReferences, JsClassesUtils } from '../../shared/jsClasses/jsClassesUtils';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { JAVASCRIPT_CLASSES } from '../../../../../../../consts/javascriptClasses.enum';
import { ButtonBaseSpecificSettings } from '../settings/buttonBaseSpecificSettings';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { SETTINGS_TYPES } from '../../../../../../../consts/settingsTypes.enum';
import { BORDER_STYLES } from '../../../../../../../consts/borderStyles.enum';
import { inheritedButtonCss } from '../inheritedCss/inheritedCss';
import { ComponentBuilder } from '../../shared/componentBuilder';

class ButtonBase extends ComponentBuilder {

  // WORK 2 - create button component, increase its border and switch back to button group - the base height and width will be bigger
  // this is set for the purposes of button group button
  // WORK 2 - fix base (also overlay)
  private static setWidthViaRange(subcomponent: Subcomponent, cssProperty: string): void {
    if (cssProperty === 'borderWidth') {
      subcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderLeftWidth = subcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderWidth;
      subcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderTopWidth = subcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderWidth;
      subcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderRightWidth = subcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderWidth;
      subcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderBottomWidth = subcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderWidth;
    }
  }

  public static setTriggerFuncOnSettingChange(buttonComponent: WorkshopComponent): void {
    buttonComponent.triggerFuncOnSettingChange = {
      [SETTINGS_TYPES.RANGE]: ButtonBase.setWidthViaRange,
    };
  }

  // border width should set border left, border right, border top, border bottom
  public static setSyncableComponents(buttonComponent: WorkshopComponent): void {
    const uniqueComponents = {
      [COMPONENT_TYPES.BUTTON]: buttonComponent,
      [COMPONENT_TYPES.TEXT]: null,
      [COMPONENT_TYPES.ICON]: null,
     };
    buttonComponent.sync.syncables = ComponentBuilder.createSyncablesObjectUsingSubcomponents(uniqueComponents, [], buttonComponent);
  }

  private static createDefaultButtonJsClasses(): JsClassesReferences {
    return { defaultJsClasses: new Set([JAVASCRIPT_CLASSES.RIPPLES]), defaultStaticJsClasses: new Set([]) };
  }

  public static setPropertyReferenceSharingFuncs(buttonBaseComponent: WorkshopComponent): void {
    buttonBaseComponent.newChildComponents.propertyOverwritables = {
      propertyReferenceSharingFuncs: {
        container: [JsClassesUtils.assignJsClassesRefToAllSubcomponents.bind(ButtonBase.createDefaultButtonJsClasses())],
      },
    };
  }

  public static setChildComponentsItems(buttonBaseComponent: WorkshopComponent): void {
    const baseComponentItems = [PRIMITIVE_COMPONENTS_BASE_NAMES.TEXT, PRIMITIVE_COMPONENTS_BASE_NAMES.ICON];
    const childComponentMaxCount = { max: { [PRIMITIVE_COMPONENTS_BASE_NAMES.TEXT]: 1, [PRIMITIVE_COMPONENTS_BASE_NAMES.ICON]: 1 }};
    ComponentBuilder.setNewChildComponentsItemsProperties(buttonBaseComponent,
      baseComponentItems, baseComponentItems, childComponentMaxCount);
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
        // this is set for the purposes of button group button
        borderBottomWidth: '0px',
        borderRightWidth: '0px',
        borderTopWidth: '0px',
        borderLeftWidth: '0px',
      },
      [CSS_PSEUDO_CLASSES.HOVER]: {
        backgroundColor: '#ff0000',
        boxShadow: CSS_PROPERTY_VALUES.INHERIT,
        borderColor: CSS_PROPERTY_VALUES.INHERIT,
      },
      [CSS_PSEUDO_CLASSES.CLICK]: {
        backgroundColor: '#409441',
        boxShadow: CSS_PROPERTY_VALUES.INHERIT,
        borderColor: CSS_PROPERTY_VALUES.INHERIT,
      },
    };
  }

  private static createDefaultButtonBaseCustomStaticFeatures(): CustomStaticFeatures {
    return {
      alignment: ComponentBuilder.createHorizontalAlignmentSection(HORIZONTAL_ALIGNMENT_SECTIONS.LEFT),
    }
  }

  private static createDefaultButtonBaseCustomFeatures(): CustomFeatures {
    return {
      lastSelectedCssValues: ComponentBuilder.createLastSelectedCssLeftValue(),
      animations: ComponentBuilder.createStationaryAnimations({}),
    };
  }

  public static createBaseSubcomponent(name: string): Subcomponent {
    return {
      name,
      subcomponentType: SUBCOMPONENT_TYPES.BUTTON,
      customCss: ButtonBase.createDefaultBaseCss(),
      defaultCss: ButtonBase.createDefaultBaseCss(),
      activeCssPseudoClassesDropdownItem: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClassesDropdownItem: CSS_PSEUDO_CLASSES.DEFAULT,
      activeCssPseudoClassViaUserAction: CSS_PSEUDO_CLASSES.DEFAULT,
      tempCustomCss: new Set(['transition']),
      inheritedCss: inheritedButtonCss,
      customFeatures: ButtonBase.createDefaultButtonBaseCustomFeatures(),
      defaultCustomFeatures: ButtonBase.createDefaultButtonBaseCustomFeatures(),
      customStaticFeatures: ButtonBase.createDefaultButtonBaseCustomStaticFeatures(),
      defaultCustomStaticFeatures: ButtonBase.createDefaultButtonBaseCustomStaticFeatures(),
      otherSubcomponentTriggers: ButtonBase.createOtherSubcomponentTriggersTemplate(),
    };
  }
}

export const buttonBase: ComponentGenerator = {
  createNewComponent(presetProperties: PresetProperties): WorkshopComponent {
    presetProperties.componentType = COMPONENT_TYPES.BUTTON;
    const buttonBaseComponent = ButtonBase.createBaseComponent(presetProperties, ButtonBase.createBaseSubcomponent);
    ButtonBaseSpecificSettings.set(buttonBaseComponent);
    ButtonBase.setChildComponentsItems(buttonBaseComponent);
    ButtonBase.setPropertyReferenceSharingFuncs(buttonBaseComponent);
    ButtonBase.setSyncableComponents(buttonBaseComponent);
    ButtonBase.setTriggerFuncOnSettingChange(buttonBaseComponent);
    if (presetProperties.paddingComponent) SyncedComponent.addParentComponentSyncableContainerComponentsToChild(
      buttonBaseComponent, presetProperties.paddingComponent);
    return buttonBaseComponent;
  },
}
