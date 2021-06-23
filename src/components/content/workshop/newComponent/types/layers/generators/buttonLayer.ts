import { NewComponentStyleProperties } from '../../../../../../../consts/newComponentStyleProperties';
import { CustomCss, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { NEW_COMPONENT_STYLES } from '../../../../../../../consts/newComponentStyles.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { LayerBuilder } from './layerBuilder';

function createDefaultBaseCss(): CustomCss {
  return {
    [CSS_PSEUDO_CLASSES.DEFAULT]: {
      height: '100%',
    },
  }
}

export const buttonLayer: ComponentGenerator = {
  createNewComponent(importedComponentBaseName: string): WorkshopComponent {
    const componentStyle: NewComponentStyleProperties = { baseName: importedComponentBaseName,
      baseStyle: NEW_COMPONENT_STYLES.BUTTON_LAYER, baseCustomCssFunc: createDefaultBaseCss, };
    return LayerBuilder.create(componentStyle);
  },
};
