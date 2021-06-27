import { AlignedLayerSection, AutoSize, SubcomponentProperties, Image, Text, WorkshopComponent, Animations } from '../../../../../../interfaces/workshopComponent';
import { NewComponentStyleProperties } from '../../../../../../consts/newComponentStyleProperties';
import { CustomSubcomponentNames } from '../../../../../../interfaces/customSubcomponentNames';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../consts/coreSubcomponentNames.enum';
import { GENERAL_ANIMATION_CLOSE_TYPES } from '../../../../../../consts/animationTypes.enum';
import { WorkshopComponentCss } from '../../../../../../interfaces/workshopComponentCss';
import { ALIGNED_SECTION_TYPES } from '../../../../../../consts/layerSections.enum';
import PreviewStructure from '../../../utils/componentGenerator/previewStructure';
import { COMPONENT_TYPES } from '../../../../../../consts/componentTypes.enum';
import { DEFAULT_STYLE } from '../../../../../../consts/componentStyles.enum';
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

  protected static createDefaultAnimationsProperties(closeAnimationType = GENERAL_ANIMATION_CLOSE_TYPES.FADE_OUT): Animations {
    return {
      close: {
        type: closeAnimationType,
        duration: '0.25s',
      },
    };
  }

  public static createBaseComponent(componentStyle: NewComponentStyleProperties, componentType: COMPONENT_TYPES,
      createBaseSubcomponent: (componentStyle: NewComponentStyleProperties) => SubcomponentProperties, isBaseOptional = true): WorkshopComponent {
    const subcomponentNames: CustomSubcomponentNames = { base: componentStyle.baseName || CORE_SUBCOMPONENTS_NAMES.BASE };
    const subcomponents = {[subcomponentNames.base]: createBaseSubcomponent(componentStyle)};
    const componentPreviewStructure = PreviewStructure.createEmptyComponentPreviewStructure(subcomponents, subcomponentNames.base, isBaseOptional);
    return {
      type: componentType,
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
