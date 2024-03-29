import { CustomCss, Subcomponent, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ComponentGenerator, PresetProperties } from '../../../../../../../interfaces/componentGenerator';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
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

  public static createBaseSubcomponent(name: string): Subcomponent {
    return {
      name,
      subcomponentType: SUBCOMPONENT_TYPES.LAYER,
      customCss: LayerBase.createDefaultBaseCss(),
      defaultCss: LayerBase.createDefaultBaseCss(),
      activeCssPseudoClassesDropdownItem: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClassesDropdownItem: CSS_PSEUDO_CLASSES.DEFAULT,
      activeCssPseudoClassViaUserAction: CSS_PSEUDO_CLASSES.DEFAULT,
    };
  }
}

export const layerBase: ComponentGenerator = {
  createNewComponent(presetProperties: PresetProperties): WorkshopComponent {
    presetProperties.componentType = COMPONENT_TYPES.LAYER;
    return ComponentBuilder.createBaseComponent(presetProperties, LayerBase.createBaseSubcomponent);
  },
}
