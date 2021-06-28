import { AlignedLayerSection, AutoSize, SubcomponentProperties, Image, Text, WorkshopComponent, Animations, ComponentCenteringInParent, BackdropProperties } from '../../../../../../interfaces/workshopComponent';
import { GENERAL_ANIMATION_CLOSE_TYPES, MODAL_ANIMATION_OPEN_TYPES } from '../../../../../../consts/animationTypes.enum';
import { NewComponentStyleProperties } from '../../../../../../consts/newComponentStyleProperties';
import { CustomSubcomponentNames } from '../../../../../../interfaces/customSubcomponentNames';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../consts/coreSubcomponentNames.enum';
import { WorkshopComponentCss } from '../../../../../../interfaces/workshopComponentCss';
import { ALIGNED_SECTION_TYPES } from '../../../../../../consts/layerSections.enum';
import PreviewStructure from '../../../utils/componentGenerator/previewStructure';
import { DEFAULT_STYLE } from '../../../../../../consts/componentStyles.enum';
import { CloseTriggers } from '../../../../../../interfaces/closeTriggers';
import { defaultImage } from './images/default';

export class ComponentBuilder {

  protected static createAlignedLayerSection(section: ALIGNED_SECTION_TYPES): AlignedLayerSection {
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

  protected static createDefaultAnimationsProperties(closeAnimationType = GENERAL_ANIMATION_CLOSE_TYPES.FADE_OUT,
      openAnimationType?: MODAL_ANIMATION_OPEN_TYPES.FADE_IN): Animations {
    const animations: Animations = {
      close: {
        type: closeAnimationType,
        duration: '0.25s',
      },
    };
    if (openAnimationType) {
      animations.open = {
        type: openAnimationType,
        duration: '0.3s',
        delay: '0.15s',
      };
    }
    return animations;
  }

  protected static createDefaultComponentCenteringInParent(): ComponentCenteringInParent {
    return {
      vertical: true,
      horizontal: true,
    };
  }
  
  protected static createDefaultBackdropProperties(): BackdropProperties {
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
  
  protected static createDefaultComponentCloseTriggerProperties(): CloseTriggers {
    return {
      enter: false,
      escape: false,
      backdrop: false,
    };
  }

  public static createBaseComponent(componentStyle: NewComponentStyleProperties,
      createBaseSubcomponent: (componentStyle: NewComponentStyleProperties) => SubcomponentProperties, isBaseOptional = true): WorkshopComponent {
    const subcomponentNames: CustomSubcomponentNames = { base: componentStyle.baseName || CORE_SUBCOMPONENTS_NAMES.BASE };
    const subcomponents = {[subcomponentNames.base]: createBaseSubcomponent(componentStyle)};
    const componentPreviewStructure = PreviewStructure.createEmptyComponentPreviewStructure(subcomponents, subcomponentNames.base, isBaseOptional);
    return {
      type: componentStyle.componentType,
      style: componentStyle.baseStyle || DEFAULT_STYLE.DEFAULT,
      subcomponents,
      activeSubcomponentName: subcomponentNames.base,
      defaultSubcomponentName: subcomponentNames.base,
      componentPreviewStructure,
      className: 'default-class-name',
      subcomponentNames,
      componentStatus: { isRemoved: false },
    };
  }
}
