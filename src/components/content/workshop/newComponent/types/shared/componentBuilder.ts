import { AlignedLayerSection, BackdropProperties, ComponentCenteringInScreen, Image, SubcomponentProperties, Text, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { DropdownItemsDisplayStatusUtils } from '../../../utils/dropdownItemsDisplayStatusUtils/dropdownItemsDisplayStatusUtils';
import { BASE_SUBCOMPONENT_NAMES, MASTER_SUBCOMPONENT_BASE_NAME } from '../../../../../../consts/baseSubcomponentNames.enum';
import { GENERAL_ANIMATION_CLOSE_TYPES, MODAL_ANIMATION_OPEN_TYPES } from '../../../../../../consts/animationTypes.enum';
import { NewComponentStyleProperties } from '../../../../../../consts/newComponentStyleProperties';
import { ComponentPreviewStructure } from '../../../../../../interfaces/componentPreviewStructure';
import { CoreSubcomponentRefs } from '../../../../../../interfaces/coreSubcomponentRefs';
import { WorkshopComponentCss } from '../../../../../../interfaces/workshopComponentCss';
import { DropdownUtils } from '../../../utils/componentManipulation/utils/dropdownUtils';
import { ChildComponentCount } from '../../../../../../interfaces/childComponentCount';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { Syncables, SyncableSubcomponents } from '../../../../../../interfaces/sync';
import { ALIGNED_SECTION_TYPES } from '../../../../../../consts/layerSections.enum';
import { AutoSize, AutoSizeFuncs } from '../../../../../../interfaces/autoSize';
import { DEFAULT_STYLES } from '../../../../../../consts/componentStyles.enum';
import { CloseTriggers } from '../../../../../../interfaces/closeTriggers';
import { Animations } from '../../../../../../interfaces/animations';
import { defaultImage } from './images/default';

interface StationaryAnimationsArgs {
  isBackgroundZoomPresent?: boolean;
  isBackgroundZoomOn?: boolean;
  duration?: string;
}

// TO-DO should be using a builder pattern
export class ComponentBuilder {

  public static createAlignedLayerSection(section: ALIGNED_SECTION_TYPES): AlignedLayerSection {
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

  protected static setChildComponentsItemsProperties(component: WorkshopComponent, layerComponentsItems: BASE_SUBCOMPONENT_NAMES[],
      newChildComponentsItems: BASE_SUBCOMPONENT_NAMES[], childComponentCount: ChildComponentCount): void {
    const layerComponentItemsStructure = DropdownUtils.generateDropdownStructure(layerComponentsItems);
    const newChildComponentsItemsStructure = DropdownUtils.generateDropdownStructure(newChildComponentsItems);
    component.newChildComponentsItemsRefs = { layer: layerComponentItemsStructure };
    component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].newChildComponentsItems = newChildComponentsItemsStructure;
    component.childComponentCount = childComponentCount;
  }

  protected static createSyncablesObjectUsingSubcomponents(syncableSubcomponents: SyncableSubcomponents): Syncables {
    return {
      subcomponents: syncableSubcomponents,
      childComponents: [],
    };
  }

  private static createCoreSubcomponentRefs(baseSubcomponent: SubcomponentProperties, coreSubcomponentRefs: CoreSubcomponentRefs): CoreSubcomponentRefs {
    if (coreSubcomponentRefs) {
      coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE] = baseSubcomponent;
      return coreSubcomponentRefs;
    }
    return { [SUBCOMPONENT_TYPES.BASE]: baseSubcomponent };
  }

  private static createEmptyComponentPreviewStructure(baseSubcomponentName: string, isBaseOptional = true): ComponentPreviewStructure {
    const subcomponentDropdownStructure = { [baseSubcomponentName]:
      isBaseOptional ? DropdownItemsDisplayStatusUtils.createDropdownItemDisplayStatusReferenceObject() : {} };
    return {
      layeringType: 'vertical',
      layers: [],
      subcomponentDropdownStructure,
      subcomponentNameToDropdownItemName: { [baseSubcomponentName]: baseSubcomponentName },
    }
  }

  // WORK1: refactor
  // WORK1 - should use protected access modifier
  public static createBaseComponent(componentStyle: NewComponentStyleProperties,
      createBaseSubcomponent: (name: string) => SubcomponentProperties, isBaseOptional = true): WorkshopComponent {
    const baseName = componentStyle.baseName || MASTER_SUBCOMPONENT_BASE_NAME.BASE;
    const baseSubcomponent = createBaseSubcomponent(baseName);
    const subcomponents = { [baseName]: baseSubcomponent };
    const componentPreviewStructure = ComponentBuilder.createEmptyComponentPreviewStructure(baseName, isBaseOptional);
    const coreSubcomponentRefs = ComponentBuilder.createCoreSubcomponentRefs(baseSubcomponent, componentStyle.coreSubcomponentRefs);
    const baseComponent: WorkshopComponent = {
      type: componentStyle.componentType,
      style: DEFAULT_STYLES.DEFAULT,
      subcomponents,
      activeSubcomponentName: baseName,
      defaultSubcomponentName: baseName,
      componentPreviewStructure,
      className: 'default-class-name',
      coreSubcomponentRefs,
      componentStatus: { isRemoved: false },
      sync: { componentThisIsSyncedTo: null, componentsSyncedToThis: new Set() },
    };
    baseSubcomponent.seedComponent = baseComponent;
    baseComponent.masterComponent = baseComponent;
    return baseComponent;
  }
}
