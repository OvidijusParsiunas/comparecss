import { AlignedLayerSection, AutoSize, Text } from '../../../../../../interfaces/workshopComponent';
import { WorkshopComponentCss } from '../../../../../../interfaces/workshopComponentCss';
import { ALIGNED_SECTION_TYPES } from '../../../../../../consts/layerSections.enum';

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
}