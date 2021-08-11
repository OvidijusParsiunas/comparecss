import { AlignedLayerSection, SubcomponentProperties, Image, Text, WorkshopComponent, ComponentCenteringInParent, BackdropProperties, Subcomponents } from '../../../../../../interfaces/workshopComponent';
import { DropdownOptionsDisplayStatusUtils } from '../../../utils/dropdownOptionsDisplayStatusUtils/dropdownOptionsDisplayStatusUtils';
import { GENERAL_ANIMATION_CLOSE_TYPES, MODAL_ANIMATION_OPEN_TYPES } from '../../../../../../consts/animationTypes.enum';
import { NewComponentStyleProperties } from '../../../../../../consts/newComponentStyleProperties';
import { ComponentPreviewStructure } from '../../../../../../interfaces/componentPreviewStructure';
import { PARENT_COMPONENT_BASE_NAME } from '../../../../../../consts/baseSubcomponentNames.enum';
import { WorkshopComponentCss } from '../../../../../../interfaces/workshopComponentCss';
import { CoreSubcomponentRefs } from '../../../../../../interfaces/coreSubcomponentRefs';
import { ALIGNED_SECTION_TYPES } from '../../../../../../consts/layerSections.enum';
import { AutoSize, AutoSizeFuncs } from '../../../../../../interfaces/autoSize';
import { DEFAULT_STYLES } from '../../../../../../consts/componentStyles.enum';
import { CloseTriggers } from '../../../../../../interfaces/closeTriggers';
import ReferenceSharingUtils from '../buttons/utils/referenceSharingUtils';
import { Animations } from '../../../../../../interfaces/animations';
import { defaultImage } from './images/default';

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

  protected static createStationaryAnimations({ isBackgroundZoomPresent = false, isBackgroundZoomOn = false, duration = '0.25s' }): Animations {
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

  protected static createComponentCenteringInParent(): ComponentCenteringInParent {
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

  protected static populateReferences(component: WorkshopComponent): void {
    const { coreSubcomponentRefs, subcomponents } = component;
    ReferenceSharingUtils.appendJsClassesRefToAllSubcomponents(coreSubcomponentRefs);
    ReferenceSharingUtils.appendBaseSubcomponentRefToAllChildSubcomponents(coreSubcomponentRefs.base, subcomponents);
    component.referenceSharingExecutables = [ReferenceSharingUtils.appendJsClassesRefToAllSubcomponents];
  }

  private static createEmptyComponentPreviewStructure(baseSubcomponentName: string, isBaseOptional = true): ComponentPreviewStructure {
    const subcomponentDropdownStructure = { [baseSubcomponentName]:
      isBaseOptional ? DropdownOptionsDisplayStatusUtils.createDropdownOptionDisplayStatusReferenceObject() : {} };
    return {
      layeringType: 'vertical',
      layers: [],
      subcomponentDropdownStructure,
      subcomponentNameToDropdownOptionName: {[baseSubcomponentName]: baseSubcomponentName},
    }
  }
  public static createBaseComponent(componentStyle: NewComponentStyleProperties,
      createBaseSubcomponent: (name: string) => SubcomponentProperties, isBaseOptional = true): WorkshopComponent {
    const baseName = componentStyle.baseName || PARENT_COMPONENT_BASE_NAME.BASE;
    const baseSubcomponent = createBaseSubcomponent(baseName);
    const subcomponents = {[baseName]: baseSubcomponent};
    const componentPreviewStructure = ComponentBuilder.createEmptyComponentPreviewStructure(baseName, isBaseOptional);
    const coreSubcomponentRefs: CoreSubcomponentRefs =  { base: baseSubcomponent };
    return {
      type: componentStyle.componentType,
      style: DEFAULT_STYLES.DEFAULT,
      subcomponents,
      activeSubcomponentName: baseName,
      defaultSubcomponentName: baseName,
      componentPreviewStructure,
      className: 'default-class-name',
      coreSubcomponentRefs,
      componentStatus: { isRemoved: false },
    };
  }
}
