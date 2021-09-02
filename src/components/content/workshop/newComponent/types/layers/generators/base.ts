import { CustomCss, SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { ComponentBuilder } from '../../shared/componentBuilder';

class LayerBase extends ComponentBuilder {

  private static createDefaultBaseCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        position: 'relative',
        height: '50px',
        textAlign: 'left',
        paddingLeft: '20px',
        paddingTop: '0px',
        paddingRight: '0px',
        paddingBottom: '0px',
        backgroundColor: CSS_PROPERTY_VALUES.INHERIT,
        boxShadow: CSS_PROPERTY_VALUES.UNSET,
        backgroundSize: '100% 100%',
      },
    };
  }

  public static createBaseSubcomponent(name: string): SubcomponentProperties {
    return {
      name,
      subcomponentType: SUBCOMPONENT_TYPES.LAYER,
      customCss: LayerBase.createDefaultBaseCss(),
      defaultCss: LayerBase.createDefaultBaseCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      layerSectionsType: LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS,
    };
  }
}

export const layerBase: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    return ComponentBuilder.createBaseComponent(
      { componentType: COMPONENT_TYPES.LAYER, baseName }, LayerBase.createBaseSubcomponent);
  },
}
