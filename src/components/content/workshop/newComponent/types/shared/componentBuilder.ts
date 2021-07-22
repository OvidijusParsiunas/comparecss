import { AlignedLayerSection, AutoSize, SubcomponentProperties, Image, Text, WorkshopComponent, ComponentCenteringInParent, BackdropProperties, Subcomponents } from '../../../../../../interfaces/workshopComponent';
import { DropdownOptionsDisplayStatusUtils } from '../../../utils/dropdownOptionsDisplayStatusUtils/dropdownOptionsDisplayStatusUtils';
import { GENERAL_ANIMATION_CLOSE_TYPES, MODAL_ANIMATION_OPEN_TYPES } from '../../../../../../consts/animationTypes.enum';
import { NewComponentStyleProperties } from '../../../../../../consts/newComponentStyleProperties';
import { ComponentPreviewStructure } from '../../../../../../interfaces/componentPreviewStructure';
import { PARENT_COMPONENT_BASE_NAME } from '../../../../../../consts/baseSubcomponentNames.enum';
import { CoreSubcomponentNames } from '../../../../../../interfaces/customSubcomponentNames';
import { WorkshopComponentCss } from '../../../../../../interfaces/workshopComponentCss';
import { ALIGNED_SECTION_TYPES } from '../../../../../../consts/layerSections.enum';
import { DEFAULT_STYLES } from '../../../../../../consts/componentStyles.enum';
import { CloseTriggers } from '../../../../../../interfaces/closeTriggers';
import { Animations } from '../../../../../../interfaces/animations';
import { defaultImage } from './images/default';

export class ComponentBuilder {

  public static createAlignedLayerSection(section: ALIGNED_SECTION_TYPES): AlignedLayerSection {
    return { section };
  }

  protected static createLastSelectedCssLeftValue(pixels = '0px'): WorkshopComponentCss {
    return { left: pixels };
  }

  protected static createAutoSize(isWidthAuto: boolean, isHeightAuto: boolean): AutoSize {
    return {
      width: isWidthAuto,
      height: isHeightAuto,
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

  protected static createStaticFadeAnimation(duration = '0.25s'): Animations {
    return {
      stationary: {
        fade: {
          duration,
        }
      }
    };
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

  private static createEmptyComponentPreviewStructure(subcomponents: Subcomponents, baseSubcomponentName: string,
      isBaseOptional = true): ComponentPreviewStructure {
    const subcomponentDropdownStructure = { [baseSubcomponentName]:
      isBaseOptional ? DropdownOptionsDisplayStatusUtils.createDropdownOptionDisplayStatusReferenceObject() : {} };
    return {
      baseSubcomponentProperties: subcomponents[baseSubcomponentName],
      layeringType: 'vertical',
      layers: [],
      subcomponentDropdownStructure,
      subcomponentNameToDropdownOptionName: {[baseSubcomponentName]: baseSubcomponentName},
    }
  }

  public static createBaseComponent(componentStyle: NewComponentStyleProperties,
      createBaseSubcomponent: (componentStyle: NewComponentStyleProperties) => SubcomponentProperties, isBaseOptional = true): WorkshopComponent {
    const coreSubcomponentNames: CoreSubcomponentNames = { base: componentStyle.baseName || PARENT_COMPONENT_BASE_NAME.BASE };
    const subcomponents = {[coreSubcomponentNames.base]: createBaseSubcomponent(componentStyle)};
    const componentPreviewStructure = ComponentBuilder.createEmptyComponentPreviewStructure(subcomponents, coreSubcomponentNames.base, isBaseOptional);
    return {
      type: componentStyle.componentType,
      style: DEFAULT_STYLES.DEFAULT,
      subcomponents,
      activeSubcomponentName: coreSubcomponentNames.base,
      defaultSubcomponentName: coreSubcomponentNames.base,
      componentPreviewStructure,
      className: 'default-class-name',
      coreSubcomponentNames,
      componentStatus: { isRemoved: false },
    };
  }
}
