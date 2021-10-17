import { AlignedLayerSection, BackdropProperties, ComponentCenteringInScreen, Image, SubcomponentProperties, Text, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { DropdownItemsDisplayStatusUtils } from '../../../utils/dropdownItemsDisplayStatusUtils/dropdownItemsDisplayStatusUtils';
import { BASE_SUBCOMPONENT_NAMES, MASTER_SUBCOMPONENT_BASE_NAME } from '../../../../../../consts/baseSubcomponentNames.enum';
import { GENERAL_ANIMATION_CLOSE_TYPES, MODAL_ANIMATION_OPEN_TYPES } from '../../../../../../consts/animationTypes.enum';
import { SubcomponentTypeToProperties } from '../../../../../../interfaces/subcomponentTypeToProperties';
import { DROPDOWN_MENU_INDEX_ALIGNMENT } from '../../../../../../consts/dropdownMenuAlignment.enum';
import { ComponentPreviewStructure } from '../../../../../../interfaces/componentPreviewStructure';
import { DropdownFeatures, SelectDropdown } from '../../../../../../interfaces/dropdownFeatures';
import { WorkshopComponentCss } from '../../../../../../interfaces/workshopComponentCss';
import { DropdownUtils } from '../../../utils/componentManipulation/utils/dropdownUtils';
import { ChildComponentCount } from '../../../../../../interfaces/childComponentCount';
import { SelectDropdownUtils } from '../dropdowns/selectDropdown/selectDropdownUtils';
import { JAVASCRIPT_CLASSES } from '../../../../../../consts/javascriptClasses.enum';
import { ALIGNED_SECTION_TYPES } from '../../../../../../consts/layerSections.enum';
import { PresetProperties } from '../../../../../../interfaces/componentGenerator';
import { AutoSize, AutoSizeFuncs } from '../../../../../../interfaces/autoSize';
import { DEFAULT_STYLES } from '../../../../../../consts/componentStyles.enum';
import { CloseTriggers } from '../../../../../../interfaces/closeTriggers';
import { Animations } from '../../../../../../interfaces/animations';
import { Sync, Syncables } from '../../../../../../interfaces/sync';
import { defaultImage } from './images/default';

interface StationaryAnimationsArgs {
  isBackgroundZoomPresent?: boolean;
  isBackgroundZoomOn?: boolean;
  duration?: string;
}

// TO-DO should be using a builder pattern
export class ComponentBuilder {

  protected static createAlignedLayerSection(section: ALIGNED_SECTION_TYPES): AlignedLayerSection {
    return { section };
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

  protected static createText(text = 'Text'): Text {
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
      componentChildItems: BASE_SUBCOMPONENT_NAMES[], childComponentCount: ChildComponentCount): void {
    component.newChildComponents = {
      sharedDropdownItemsRefs: { layer: DropdownUtils.generateDropdownStructure(layerChildItems) },
      dropdownItems: DropdownUtils.generateDropdownStructure(componentChildItems) };
    component.childComponentCount = childComponentCount;
  }

  protected static createSyncablesObjectUsingSubcomponents(syncableSubcomponents: SubcomponentTypeToProperties,
      childComponents: WorkshopComponent[] = [], componentThatCanBeSynced?: WorkshopComponent): Syncables {
    const syncables: Syncables = {
      onCopy: {
        subcomponents: syncableSubcomponents,
        childComponents, 
      },
      containerComponents: [],
    };
    if (componentThatCanBeSynced) syncables.containerComponents.push(componentThatCanBeSynced);
    return syncables;
  }

  protected static addJsClasses(subcomponent: SubcomponentProperties, javascriptClass: JAVASCRIPT_CLASSES): void {
    if (!subcomponent.customFeatures.jsClasses) {
      subcomponent.customFeatures.jsClasses = new Set();
      subcomponent.defaultCustomFeatures.jsClasses = new Set();
    }
    subcomponent.customFeatures.jsClasses.add(javascriptClass);
    subcomponent.defaultCustomFeatures.jsClasses.add(javascriptClass);
  }

  private static createSelectDropdownProperties(): SelectDropdown {
    return {
      enabled: false,
      callback: SelectDropdownUtils.setSelectDropdownText,
    };
  }

  protected static createDopdownFeatures(selectDropdown: SelectDropdown, indexAlignment?: DROPDOWN_MENU_INDEX_ALIGNMENT): DropdownFeatures {
    return {
      select: selectDropdown || ComponentBuilder.createSelectDropdownProperties(),
      indexAlignment,
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

  private static createComponent(presetProperties: PresetProperties, baseSubcomponent: SubcomponentProperties,
      isBaseOptional = true): WorkshopComponent {
    const baseName = baseSubcomponent.name;
    const subcomponents = { [baseName]: baseSubcomponent };
    const componentPreviewStructure = ComponentBuilder.createEmptyComponentPreviewStructure(baseName, isBaseOptional);
    return {
      type: presetProperties.componentType,
      style: DEFAULT_STYLES.DEFAULT,
      subcomponents,
      activeSubcomponentName: baseName,
      defaultSubcomponentName: baseName,
      componentPreviewStructure,
      className: 'default-class-name',
      componentStatus: { isRemoved: false },
      sync: ComponentBuilder.createEmptySyncObject(),
      baseSubcomponent: baseSubcomponent,
      newChildComponents: {},
    };
  }
  
  private static alignBase(baseSubcomponent: SubcomponentProperties, alignedSection: ALIGNED_SECTION_TYPES): void {
    if (baseSubcomponent.customStaticFeatures) {
      baseSubcomponent.customStaticFeatures.alignedLayerSection = { section: alignedSection };
    } else {
      baseSubcomponent.customStaticFeatures = { alignedLayerSection: { section: alignedSection } };
    }
  }

  public static createBaseComponent(presetProperties: PresetProperties,
      createBaseSubcomponent: (name: string) => SubcomponentProperties, isBaseOptional = true): WorkshopComponent {
    const baseName = presetProperties.baseName || MASTER_SUBCOMPONENT_BASE_NAME.BASE;
    const baseSubcomponent = createBaseSubcomponent(baseName);
    if (presetProperties.alignmentSection) ComponentBuilder.alignBase(baseSubcomponent, presetProperties.alignmentSection);
    const baseComponent = ComponentBuilder.createComponent(presetProperties, baseSubcomponent, isBaseOptional);
    baseSubcomponent.seedComponent = baseComponent;
    baseComponent.masterComponent = baseComponent;
    return baseComponent;
  }
}
