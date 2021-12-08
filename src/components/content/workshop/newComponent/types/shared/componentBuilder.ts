import { Alignment, BackdropProperties, ComponentCenteringInScreen, Image, Subcomponent, Text, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { DropdownItemsDisplayStatusUtils } from '../../../utils/dropdownItemsDisplayStatusUtils/dropdownItemsDisplayStatusUtils';
import { BASE_SUBCOMPONENT_NAMES, MASTER_SUBCOMPONENT_BASE_NAME } from '../../../../../../consts/baseSubcomponentNames.enum';
import { GENERAL_ANIMATION_CLOSE_TYPES, MODAL_ANIMATION_OPEN_TYPES } from '../../../../../../consts/animationTypes.enum';
import { ChildComponentCountLimitsState } from '../../../../../../interfaces/childComponentCountLimitsState';
import { DROPDOWN_MENU_Z_INDEX_ALIGNMENT } from '../../../../../../consts/dropdownMenuAlignment.enum';
import { HORIZONTAL_ALIGNMENT_SECTIONS } from '../../../../../../consts/horizontalAlignmentSections';
import { ComponentPreviewStructure } from '../../../../../../interfaces/componentPreviewStructure';
import { ComponentTypeToProperties } from '../../../../../../interfaces/componentTypeToProperties';
import { DropdownFeatures, SelectDropdown } from '../../../../../../interfaces/dropdownFeatures';
import { CSS_PSEUDO_CLASSES } from '../../../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponentCss } from '../../../../../../interfaces/workshopComponentCss';
import { DropdownUtils } from '../../../utils/componentManipulation/utils/dropdownUtils';
import { SelectDropdownUtils } from '../dropdowns/selectDropdown/selectDropdownUtils';
import { SelectComponent } from '../../../../../../interfaces/selectedChildComponent';
import { JAVASCRIPT_CLASSES } from '../../../../../../consts/javascriptClasses.enum';
import { PresetProperties } from '../../../../../../interfaces/componentGenerator';
import { AutoSize, AutoSizeFuncs } from '../../../../../../interfaces/autoSize';
import { DEFAULT_STYLES } from '../../../../../../consts/componentStyles.enum';
import { CloseTriggers } from '../../../../../../interfaces/closeTriggers';
import { Animations } from '../../../../../../interfaces/animations';
import { Sync, Syncables } from '../../../../../../interfaces/sync';
import { DEFAULT_TEXT } from '../../../../../../consts/defaultText';
import { defaultImage } from './images/default';

interface StationaryAnimationsArgs {
  isBackgroundZoomPresent?: boolean;
  isBackgroundZoomOn?: boolean;
  duration?: string;
}

// TO-DO should be using a builder pattern
export class ComponentBuilder {

  protected static createHorizontalAlignmentSection(horizontalSection: HORIZONTAL_ALIGNMENT_SECTIONS): Alignment {
    return { horizontalSection };
  }

  protected static createLastSelectedCssLeftValue(pixels = '0px'): WorkshopComponentCss {
    return { left: pixels };
  }

  protected static createAutoSize(isWidthAuto: boolean, isHeightAuto: boolean, AutoSizeFuncs?: AutoSizeFuncs): AutoSize {
    const { widthCalculationFunc, heightCalucationFunc } = AutoSizeFuncs || {};
    return {
      width: isWidthAuto,
      height: isHeightAuto,
      widthCalculationFunc,
      heightCalucationFunc,
    };
  }

  protected static createText(text = DEFAULT_TEXT): Text {
    return { text };
  }

  protected static createImage(addDefault = true): Image {
    return {
      name: addDefault ? 'default' : null,
      data: addDefault ? defaultImage : null,
      size: true,
    }
  }

  protected static createDisplayAnimationsProperties(closeAnimationType = GENERAL_ANIMATION_CLOSE_TYPES.FADE_OUT,
      openAnimationType?: MODAL_ANIMATION_OPEN_TYPES.FADE_IN): Animations {
    const animations: Animations = {
      display: {
        close: {
          type: closeAnimationType,
          duration: '0.25s',
        },
      }
    };
    if (openAnimationType) {
      animations.display.open = {
        type: openAnimationType,
        duration: '0.3s',
        delay: '0.15s',
      };
    }
    return animations;
  }

  protected static createStationaryAnimations(
      { isBackgroundZoomPresent = false, isBackgroundZoomOn = false, duration = '0.25s' }: StationaryAnimationsArgs): Animations {
    const stationaryAnimations: Animations = {
      stationary: {
        fade: {
          duration,
        },
      }
    };
    if (isBackgroundZoomPresent) stationaryAnimations.stationary.backgroundZoom = { isOn: isBackgroundZoomOn, zoomLevels: '120% 120%' };
    return stationaryAnimations;
  }

  protected static createComponentCenteringInParent(): ComponentCenteringInScreen {
    return {
      vertical: true,
      horizontal: true,
    };
  }

  protected static createBackdropProperties(): BackdropProperties {
    return {
      color: '#6d6d6dcc',
      alpha: 0.8,
      openAnimationDuration: {
        currentValue: '0.45s',
        lastSelectedValue: '0.45s',
        isAuto: true,
      },
      opacity: 0,
      visible: false,
    };
  }

  protected static createComponentCloseTriggerProperties(): CloseTriggers {
    return {
      enter: false,
      escape: false,
      backdrop: false,
    };
  }

  protected static setNewChildComponentsItemsProperties(component: WorkshopComponent, layerChildItems: BASE_SUBCOMPONENT_NAMES[],
      componentChildItems: BASE_SUBCOMPONENT_NAMES[], childComponentCountLimitsState?: ChildComponentCountLimitsState): void {
    component.childComponentHandlers = {
      addRemoveButtonSuppState: {
        sharedDropdownItemsRefs: { layer: DropdownUtils.generateDropdownStructure(layerChildItems) },
        dropdownItems: DropdownUtils.generateDropdownStructure(componentChildItems),
      }
    };
    if (childComponentCountLimitsState) component.childComponentHandlers.addRemoveButtonSuppState.childComponentCountLimitsState = childComponentCountLimitsState;
  }

  protected static createSyncablesObjectUsingSubcomponents(uniqueComponents: ComponentTypeToProperties,
      repeatedComponents: WorkshopComponent[] = [], componentThatCanBeSynced?: WorkshopComponent): Syncables {
    const syncables: Syncables = {
      onSyncComponents: {
        uniqueComponents,
        repeatedComponents, 
      },
      containerComponents: [],
    };
    if (componentThatCanBeSynced) syncables.containerComponents.push(componentThatCanBeSynced);
    return syncables;
  }

  protected static addJsClasses(subcomponent: Subcomponent, featureType: 'customFeatures'|'customStaticFeatures',
      javascriptClass: JAVASCRIPT_CLASSES): void {
    const defaultFeatureType = featureType === 'customFeatures' ? 'defaultCustomFeatures' : 'defaultCustomStaticFeatures';
    if (!subcomponent[featureType]) {
      subcomponent[featureType] = {};
      subcomponent[defaultFeatureType] = {};
    }
    if (!subcomponent[featureType].jsClasses) {
      subcomponent[featureType].jsClasses = new Set();
      subcomponent[defaultFeatureType].jsClasses = new Set();
    }
    subcomponent[featureType].jsClasses.add(javascriptClass);
    subcomponent[defaultFeatureType].jsClasses.add(javascriptClass);
  }

  protected static setCustomAndDefaultCssProperty<T extends keyof WorkshopComponentCss>(subcomponent: Subcomponent,
      cssPseudoClass: CSS_PSEUDO_CLASSES, cssProperty: T, value: WorkshopComponentCss[T]): void {
    subcomponent.customCss[cssPseudoClass][cssProperty] = value;
    subcomponent.defaultCss[cssPseudoClass][cssProperty] = value;
  }

  protected static createSelectComponentChild(childComponents: WorkshopComponent[], container: WorkshopComponent): void {
    childComponents.forEach((childComponent) => {
      childComponent.baseSubcomponent.customStaticFeatures.selectComponent = {
        child: {
          isSelected: false,
          containerSelectComponentObj: container.baseSubcomponent.customStaticFeatures.selectComponent.container,
        },
      };
    });
  }

  protected static createSelectComponentContainer(): SelectComponent {
    return {
      container: {
        isModeActive: true,
        selectedComponent: null,
        activeCssPseudoClass: CSS_PSEUDO_CLASSES.HOVER,
      },
    };
  }

  private static toggleSelectDropdownTypeSetting(subcomponent: Subcomponent): void {
    SelectDropdownUtils.setSelectDropdownText(subcomponent);
    if (!subcomponent.customFeatures.dropdown.select.enabled) {
      SelectDropdownUtils.setSelectDropdownAutoWidthToOff(subcomponent);
    }
  }

  private static createSelectDropdownProperties(): SelectDropdown {
    return {
      enabled: false,
      callback: ComponentBuilder.toggleSelectDropdownTypeSetting,
    };
  }

  protected static createDopdownFeatures(selectDropdown: SelectDropdown, zIndexAlignment?: DROPDOWN_MENU_Z_INDEX_ALIGNMENT): DropdownFeatures {
    return {
      select: selectDropdown || ComponentBuilder.createSelectDropdownProperties(),
      zIndexAlignment,
    };
  }

  private static createEmptySyncObject(): Sync {
    return { componentThisIsSyncedTo: null, componentsSyncedToThis: new Set(), syncables: { containerComponents: [] } };
  }

  private static createEmptyComponentPreviewStructure(baseSubcomponentName: string, isBaseOptional = true): ComponentPreviewStructure {
    const subcomponentDropdownStructure = { [baseSubcomponentName]:
      isBaseOptional ? DropdownItemsDisplayStatusUtils.createDropdownItemDisplayStatusReferenceObject() : {} };
    return {
      layeringType: 'vertical',
      layers: [],
      subcomponentDropdownStructure,
      subcomponentNameToDropdownItemName: { [baseSubcomponentName]: baseSubcomponentName },
    };
  }

  private static createComponent(presetProperties: PresetProperties, baseSubcomponent: Subcomponent,
      isBaseOptional = true): WorkshopComponent {
    const baseName = baseSubcomponent.name;
    const subcomponents = { [baseName]: baseSubcomponent };
    const componentPreviewStructure = ComponentBuilder.createEmptyComponentPreviewStructure(baseName, isBaseOptional);
    return {
      type: presetProperties.componentType,
      style: presetProperties.componentStyle || DEFAULT_STYLES.DEFAULT,
      subcomponents,
      activeSubcomponentName: baseName,
      defaultSubcomponentName: baseName,
      componentPreviewStructure,
      className: 'default-class-name',
      componentStatus: { isRemoved: false },
      sync: ComponentBuilder.createEmptySyncObject(),
      baseSubcomponent: baseSubcomponent,
      childComponentHandlers: {},
    };
  }
  
  private static setAlignmentInParent(baseSubcomponent: Subcomponent, horizontalSection: HORIZONTAL_ALIGNMENT_SECTIONS): void {
    if (baseSubcomponent.customStaticFeatures) {
      baseSubcomponent.customStaticFeatures.alignment = { horizontalSection };
      baseSubcomponent.defaultCustomStaticFeatures.alignment = { horizontalSection };
    } else {
      baseSubcomponent.customStaticFeatures = { alignment: { horizontalSection } };
      baseSubcomponent.defaultCustomStaticFeatures = { alignment: { horizontalSection } };
    }
  }

  public static createBaseComponent(presetProperties: PresetProperties,
      createBaseSubcomponent: (name: string) => Subcomponent, isBaseOptional = true): WorkshopComponent {
    const baseName = presetProperties.baseName || MASTER_SUBCOMPONENT_BASE_NAME.BASE;
    const baseSubcomponent = createBaseSubcomponent(baseName);
    if (presetProperties.horizontalSection) ComponentBuilder.setAlignmentInParent(baseSubcomponent, presetProperties.horizontalSection);
    const baseComponent = ComponentBuilder.createComponent(presetProperties, baseSubcomponent, isBaseOptional);
    baseSubcomponent.seedComponent = baseComponent;
    baseComponent.masterComponent = baseComponent;
    return baseComponent;
  }
}
