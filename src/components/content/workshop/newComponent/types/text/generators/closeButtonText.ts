import { NewComponentStyleProperties } from '../../../../../../../consts/newComponentStyleProperties';
import { CustomCss, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { inheritedCloseTextCss } from '../../buttons/generators/inheritedCloseTextCss';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { TEXT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { TextBuilder } from './textBuilder';

function createDefaultTextCss(): CustomCss {
  return {
    [CSS_PSEUDO_CLASSES.DEFAULT]: {
      top: '50%',
      width: 'max-content',
      color: '#ff0000',
      userSelect: 'none',
      overflow: 'unset',
      fontSize: '18px',
      fontFamily: '"Poppins", sans-serif',
      backgroundColor: 'inherit',
      fontWeight: '300',
      paddingTop: '1px',
      paddingBottom: '0px',
      paddingLeft: '0px',
      paddingRight: '0px',
      marginLeft: '0px',
      marginRight: '0px',
      transition: 'unset',
      outline: 'none',
      left: '0px',
    },
  }
}

function overwriteAlignment(textComponent: WorkshopComponent): void {
  textComponent.subcomponents[textComponent.subcomponentNames.base].customFeatures.alignedLayerSection.section = ALIGNED_SECTION_TYPES.CENTER;
  textComponent.subcomponents[textComponent.subcomponentNames.base].defaultCustomFeatures.alignedLayerSection.section = ALIGNED_SECTION_TYPES.CENTER;
}

export const closeButtonText: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const componentStyle: NewComponentStyleProperties = { baseName,
      baseStyle: TEXT_STYLES.CLOSE_BUTTON, baseCustomCssFunc: createDefaultTextCss, baseInheritedCss: inheritedCloseTextCss };
    const closeButtonTextComponent =  TextBuilder.create(componentStyle);
    overwriteAlignment(closeButtonTextComponent);
    return closeButtonTextComponent;
  },
};
