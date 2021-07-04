import { CustomCss, SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { NewComponentStyleProperties } from '../../../../../../../consts/newComponentStyleProperties';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { ComponentBuilder } from '../../shared/componentBuilder';

export class LayerBuilder extends ComponentBuilder {

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

  private static createBaseSubcomponent(componentStyle: NewComponentStyleProperties): SubcomponentProperties {
    return {
      subcomponentType: SUBCOMPONENT_TYPES.LAYER,
      customCss: (componentStyle.baseCustomCssFunc && componentStyle.baseCustomCssFunc()) || LayerBuilder.createDefaultBaseCss(),
      defaultCss: (componentStyle.baseCustomCssFunc && componentStyle.baseCustomCssFunc()) || LayerBuilder.createDefaultBaseCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      layerSectionsType: LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS,
    };
  }

  public static create(componentStyle: NewComponentStyleProperties = {}): WorkshopComponent {
    componentStyle.componentType = COMPONENT_TYPES.LAYER;
    return ComponentBuilder.createBaseComponent(componentStyle, LayerBuilder.createBaseSubcomponent);
  }
}
