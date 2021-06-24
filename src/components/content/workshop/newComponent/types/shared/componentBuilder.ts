import { AlignedLayerSection, AutoSize, SubcomponentProperties, Text, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { NewComponentStyleProperties } from '../../../../../../consts/newComponentStyleProperties';
import { CustomSubcomponentNames } from '../../../../../../interfaces/customSubcomponentNames';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../consts/coreSubcomponentNames.enum';
import { WorkshopComponentCss } from '../../../../../../interfaces/workshopComponentCss';
import { ALIGNED_SECTION_TYPES } from '../../../../../../consts/layerSections.enum';
import PreviewStructure from '../../../utils/componentGenerator/previewStructure';
import { COMPONENT_TYPES } from '../../../../../../consts/componentTypes.enum';
import { DEFAULT_STYLE } from '../../../../../../consts/componentStyles.enum';

export class ComponentBuilder {

  protected static createAlignedLayerSection(section: ALIGNED_SECTION_TYPES): AlignedLayerSection {
    return { section };
  }

  protected static createButtonBaseLastSelectedCssValues(pixels = '0px'): WorkshopComponentCss {
    return { left: pixels };
  }

  protected static createAutoSize(isWidthAuto = true): AutoSize {
    return {
      width: isWidthAuto,
    };
  }

  protected static createText(text = 'Text'): Text {
    return { text };
  }

  protected static createBaseComponent(componentStyle: NewComponentStyleProperties, componentType: COMPONENT_TYPES,
      createBaseSubcomponent: (componentStyle: NewComponentStyleProperties) => SubcomponentProperties): WorkshopComponent {
    const subcomponentNames: CustomSubcomponentNames = { base: componentStyle.baseName || CORE_SUBCOMPONENTS_NAMES.BASE };
    const subcomponents = {[subcomponentNames.base]: createBaseSubcomponent(componentStyle)};
    const componentPreviewStructure = PreviewStructure.createEmptyComponentPreviewStructure(subcomponents, subcomponentNames.base);
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
