import { NewComponentStyleProperties } from '../../../../../../../consts/newComponentStyleProperties';
import { CustomCss, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { TEXT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { TextBuilder } from './textBuilder';

function createDefaultTextCss(): CustomCss {
  return {
    [CSS_PSEUDO_CLASSES.DEFAULT]: {
      top: '50%',
      width: 'max-content',
      userSelect: 'none',
      overflow: 'unset',
      fontSize: '14px',
      fontFamily: '"Helvetica Neue", Helvetica, Roboto, Arial, sans-serif',
      backgroundColor: 'inherit',
      fontWeight: '400',
      paddingTop: '0px',
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

export const buttonText: ComponentGenerator = {
  createNewComponent(importedComponentBaseName: string): WorkshopComponent {
    const componentStyle: NewComponentStyleProperties = { baseName: importedComponentBaseName, baseStyle: TEXT_STYLES.BUTTON,
      baseCustomCssFunc: createDefaultTextCss };
    const buttonTextComponent =  TextBuilder.create(componentStyle);
    overwriteAlignment(buttonTextComponent);
    return buttonTextComponent;
  },
};
