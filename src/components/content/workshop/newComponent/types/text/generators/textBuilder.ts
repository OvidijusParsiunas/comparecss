import { CustomCss, CustomFeatures, CustomStaticFeatures, SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { EntityDisplayStatusUtils } from '../../../../utils/entityDisplayStatus/entityDisplayStatusUtils';
import { NewComponentStyleProperties } from '../../../../../../../consts/newComponentStyleProperties';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { CustomSubcomponentNames } from '../../../../../../../interfaces/customSubcomponentNames';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { NEW_COMPONENT_STYLES } from '../../../../../../../consts/newComponentStyles.enum';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import PreviewStructure from '../../../../utils/componentGenerator/previewStructure';
import { inheritedTextCss } from '../../shared/text/inheritedCss';
import { ComponentBuilder } from '../../shared/componentBuilder';

export class TextBuilder extends ComponentBuilder {

  private static createTextCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        top: '50%',
        width: 'max-content',
        fontWeight: '400',
        fontFamily: '"Poppins", sans-serif',
        fontSize: '16px',
        color: '#004085',
        textAlign: 'left',
        backgroundColor: 'inherit',
        paddingTop: '0px',
        paddingBottom: '0px',
        paddingLeft: '0px',
        paddingRight: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        height: '',
        borderWidth: '0',
        borderColor: '#1779ba',
        borderStyle: 'solid',
        borderRightWidth: '0px',
        borderLeftWidth: '0px',
        transition: 'unset',
        outline: 'none',
        left: '0px',
      },
    }
  }

  private static createDefaultTextCustomFeatures(): CustomFeatures {
    return {
      autoSize: ComponentBuilder.createAutoSize(),
      alignedLayerSection: ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.LEFT),
    };
  }

  private static createDefaultTextCustomStaticFeatures(): CustomStaticFeatures {
    return {
      subcomponentText: ComponentBuilder.createText(),
    };
  }

  private static createBaseSubcomponent(componentStyle: NewComponentStyleProperties): SubcomponentProperties {
    return {
      subcomponentType: SUBCOMPONENT_TYPES.TEXT,
      customCss: (componentStyle.baseCustomCssFunc && componentStyle.baseCustomCssFunc()) || TextBuilder.createTextCss(),
      defaultCss: (componentStyle.baseCustomCssFunc && componentStyle.baseCustomCssFunc()) || TextBuilder.createTextCss(),
      inheritedCss: componentStyle.baseInheritedCss || inheritedTextCss,
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      customFeatures: TextBuilder.createDefaultTextCustomFeatures(),
      defaultCustomFeatures: TextBuilder.createDefaultTextCustomFeatures(),
      customStaticFeatures: TextBuilder.createDefaultTextCustomStaticFeatures(),
      defaultCustomStaticFeatures: TextBuilder.createDefaultTextCustomStaticFeatures(),
    };
  }

  private static createButtonBaseSubcomponent(componentStyle: NewComponentStyleProperties): WorkshopComponent {
    const subcomponentNames: CustomSubcomponentNames = { base: componentStyle.baseName || CORE_SUBCOMPONENTS_NAMES.BASE };
    const subcomponents = {[subcomponentNames.base]: TextBuilder.createBaseSubcomponent(componentStyle)};
    const subcomponentDropdownStructure = { [subcomponentNames.base]: EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject() };
    const componentPreviewStructure = PreviewStructure.createComponentPreviewStructure(subcomponentDropdownStructure, subcomponents, subcomponentNames);
    return {
      type: NEW_COMPONENT_TYPES.TEXT,
      style: componentStyle.baseStyle || NEW_COMPONENT_STYLES.DEFAULT,
      subcomponents,
      activeSubcomponentName: subcomponentNames.base,
      defaultSubcomponentName: subcomponentNames.base,
      componentPreviewStructure,
      className: 'default-class-name',
      subcomponentNames,
      componentStatus: { isRemoved: false },
    };
  }

  public static create(componentStyle: NewComponentStyleProperties): WorkshopComponent {
    return TextBuilder.createButtonBaseSubcomponent(componentStyle);
  }
}
