import { CustomCss, CustomFeatures, SubcomponentProperties, Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { AddNewImportedComponent } from '../../../../utils/componentManipulation/addNewSubcomponentUtils/add/addNewImportedComponent';
import { AddNewLayerSubcomponent } from '../../../../utils/componentManipulation/addNewSubcomponentUtils/add/addNewLayerSubcomponent';
import { NewComponentStyleProperties } from '../../../../../../../consts/newComponentStyleProperties';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { CustomSubcomponentNames } from '../../../../../../../interfaces/customSubcomponentNames';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { NEW_COMPONENT_STYLES } from '../../../../../../../consts/newComponentStyles.enum';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import PreviewStructure from '../../../../utils/componentGenerator/previewStructure';
import { buttonSpecificSettings } from './buttonSpecificSettings';
import { ComponentBuilder } from '../../shared/componentBuilder';
import ReferenceSharingUtils from './referenceSharingUtils';
import { inheritedButtonCss } from './inheritedCss';

export class ButtonBuilder extends ComponentBuilder {

  private static createDefaultBaseCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        borderRadius: '0px',
        borderWidth: '0px',
        borderColor: '#1779ba',
        backgroundColor: '#1779ba',
        borderStyle: 'solid',
        boxShadow: 'unset',
        outline: 'none',
        paddingTop: '0px',
        paddingBottom: '0px',
        paddingLeft: '12px',
        paddingRight: '12px',
        marginLeft: '0px',
        marginTop: '0px',
        marginRight: '0px',
        marginBottom: '0px',
        width: '40px',
        height: '38px',
        boxSizing: 'content-box',
        color: '#ffffff',
        fontSize: '14px',
        fontFamily: '"Helvetica Neue", Helvetica, Roboto, Arial, sans-serif',
        transition: 'unset',
      },
      [CSS_PSEUDO_CLASSES.HOVER]: {
        backgroundColor: '#ff0000',
      },
      [CSS_PSEUDO_CLASSES.CLICK]: {
        backgroundColor: '#409441',
      },
    }
  }
  
  private static createDefaultButtonBaseCustomFeatures(): CustomFeatures {
    return {
      lastSelectedCssValues: ComponentBuilder.createButtonBaseLastSelectedCssValues(),
      alignedLayerSection: ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT),
    };
  }
  
  private static createBaseSubcomponent(customCssFunc: () => CustomCss): SubcomponentProperties {
    return {
      subcomponentType: SUBCOMPONENT_TYPES.BUTTON,
      customCss: (customCssFunc && customCssFunc()) || ButtonBuilder.createDefaultBaseCss(),
      defaultCss: (customCssFunc && customCssFunc()) || ButtonBuilder.createDefaultBaseCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      subcomponentPreviewTransition: 'all 0.25s ease-out',
      tempCustomCss: new Set(['transition']),
      inheritedCss: inheritedButtonCss,
      subcomponentSpecificSettings: buttonSpecificSettings,
      customFeatures: ButtonBuilder.createDefaultButtonBaseCustomFeatures(),
      defaultCustomFeatures: ButtonBuilder.createDefaultButtonBaseCustomFeatures(),
    };
  }
  
  private static createButtonBaseSubcomponent(componentStyle: NewComponentStyleProperties): WorkshopComponent {
    const subcomponentNames: CustomSubcomponentNames = { base: componentStyle.baseName || CORE_SUBCOMPONENTS_NAMES.BASE };
    const subcomponents = {[subcomponentNames.base]: ButtonBuilder.createBaseSubcomponent(componentStyle.baseCustomCssFunc)};
    const componentPreviewStructure = PreviewStructure.createEmptyComponentPreviewStructure(subcomponents, subcomponentNames.base);
    return {
      type: NEW_COMPONENT_TYPES.BUTTON,
      style: componentStyle.baseStyle || NEW_COMPONENT_STYLES.DEFAULT,
      subcomponents,
      activeSubcomponentName: subcomponentNames.base,
      defaultSubcomponentName: subcomponentNames.base,
      componentPreviewStructure,
      className: 'default-class-name',
      subcomponentNames,
      componentStatus: { isRemoved: false },
      referenceSharingExecutables: [ReferenceSharingUtils.appendJsClassesRefToAllSubcomponents],
    };
  }
  
  private static overwriteButtonTextProperties(subcomponents: Subcomponents, subcomponentNames: CustomSubcomponentNames): void {
    subcomponents[subcomponentNames.base].customStaticFeatures.subcomponentText.text = 'Button';
    subcomponents[subcomponentNames.base].customStaticFeatures.subcomponentText.text = 'Button';
  }

  private static addComponentsToBase(buttonComponent: WorkshopComponent, componentStyle: NewComponentStyleProperties): void {
    const layerSubcomponent = AddNewLayerSubcomponent.add(buttonComponent, NEW_COMPONENT_STYLES.BUTTON_LAYER, false);
    const textOverwriteFuncs = [ButtonBuilder.overwriteButtonTextProperties];
    if (componentStyle.overwriteButtonTextProperties) { textOverwriteFuncs.push(componentStyle.overwriteButtonTextProperties); }
    const textSubcomponent = AddNewImportedComponent.add(buttonComponent, NEW_COMPONENT_TYPES.TEXT,
      componentStyle.textStyle || NEW_COMPONENT_STYLES.TEXT_BUTTON, layerSubcomponent.baseName, textOverwriteFuncs);
    const { subcomponentNames } = buttonComponent;
    buttonComponent.subcomponents[subcomponentNames.base].triggerableSubcomponentName = textSubcomponent.baseName;
    subcomponentNames.layer = layerSubcomponent.baseName;
    subcomponentNames.text = textSubcomponent.baseName;
  }
  
  private static addReferences(buttonComponent: WorkshopComponent): void {
    const { subcomponentNames } = buttonComponent;
    ReferenceSharingUtils.appendJsClassesRefToAllSubcomponents(buttonComponent.subcomponents, subcomponentNames);
    ReferenceSharingUtils.appendBaseSubcomponentRefToAllChildSubcomponents(buttonComponent.subcomponents, subcomponentNames);
  }

  public static create(componentStyle: NewComponentStyleProperties): WorkshopComponent {
    const buttonComponent: WorkshopComponent = ButtonBuilder.createButtonBaseSubcomponent(componentStyle);
    ButtonBuilder.addComponentsToBase(buttonComponent, componentStyle);
    ButtonBuilder.addReferences(buttonComponent);
    return buttonComponent;
  }
}
