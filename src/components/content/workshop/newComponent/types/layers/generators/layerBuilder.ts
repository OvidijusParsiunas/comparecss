import { CustomCss, SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { EntityDisplayStatusUtils } from '../../../../utils/entityDisplayStatus/entityDisplayStatusUtils';
import { NewComponentStyleProperties } from '../../../../../../../consts/newComponentStyleProperties';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections.enum';
import { ComponentBuilder } from '../../shared/componentBuilder';

export class LayerBuilder extends ComponentBuilder {

  private static createDefaultBottomLayerCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        position: 'relative',
        height: '50px',
        textAlign: 'left',
        paddingLeft: '20px',
        paddingTop: '0px',
        paddingRight: '0px',
        paddingBottom: '0px',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: '#e9ecef',
        backgroundColor: 'inherit',
        boxShadow: 'unset',
        backgroundSize: '100% 100%',
      },
    };
  }

  private static createBaseSubcomponent(componentStyle: NewComponentStyleProperties): SubcomponentProperties {
    return {
      subcomponentType: SUBCOMPONENT_TYPES.LAYER,
      customCss: (componentStyle.baseCustomCssFunc && componentStyle.baseCustomCssFunc()) || LayerBuilder.createDefaultBottomLayerCss(),
      defaultCss: (componentStyle.baseCustomCssFunc && componentStyle.baseCustomCssFunc()) || LayerBuilder.createDefaultBottomLayerCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      layerSectionsType: LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS,
      subcomponentDisplayStatus: EntityDisplayStatusUtils.createDefaultEntityDisplayStatus(),
    };
  }

  public static create(componentStyle: NewComponentStyleProperties): WorkshopComponent {
    return ComponentBuilder.createBaseComponent(componentStyle, NEW_COMPONENT_TYPES.LAYER, LayerBuilder.createBaseSubcomponent);
  }
}
