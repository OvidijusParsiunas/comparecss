import { CustomCss, CustomFeatures, SubcomponentProperties, Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { AddNewLayerSubcomponent } from '../../../../utils/componentManipulation/addNewSubcomponentUtils/add/addNewLayerSubcomponent';
import { AddNewGenericComponent } from '../../../../utils/componentManipulation/addNewSubcomponentUtils/add/addNewGenericComponent';
import { NewComponentStyleProperties } from '../../../../../../../consts/newComponentStyleProperties';
import { CoreSubcomponentNames } from '../../../../../../../interfaces/customSubcomponentNames';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { LAYER_STYLES, TEXT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
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
      lastSelectedCssValues: ComponentBuilder.createLastSelectedCssLeftValue(),
      alignedLayerSection: ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT),
    };
  }

  private static createBaseSubcomponent(componentStyle: NewComponentStyleProperties): SubcomponentProperties {
    return {
      subcomponentType: SUBCOMPONENT_TYPES.BUTTON,
      customCss: (componentStyle.baseCustomCssFunc && componentStyle.baseCustomCssFunc()) || ButtonBuilder.createDefaultBaseCss(),
      defaultCss: (componentStyle.baseCustomCssFunc && componentStyle.baseCustomCssFunc()) || ButtonBuilder.createDefaultBaseCss(),
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

  private static overwriteButtonTextProperties(subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames): void {
    subcomponents[coreSubcomponentNames.base].customStaticFeatures.subcomponentText.text = 'Button';
    subcomponents[coreSubcomponentNames.base].customStaticFeatures.subcomponentText.text = 'Button';
  }

  private static addComponentsToBase(buttonComponent: WorkshopComponent, componentStyle: NewComponentStyleProperties): void {
    const layerSubcomponent = AddNewLayerSubcomponent.add(buttonComponent, LAYER_STYLES.PLAIN, false);
    const textSubcomponent = AddNewGenericComponent.add(buttonComponent, COMPONENT_TYPES.TEXT,
      componentStyle.overwriteLayersProperties?.[0]?.text?.[0]?.style || TEXT_STYLES.BUTTON,
      layerSubcomponent.baseName, [ButtonBuilder.overwriteButtonTextProperties, componentStyle.overwriteLayersProperties?.[0]?.text?.[0]?.func]);
    const { coreSubcomponentNames } = buttonComponent;
    buttonComponent.subcomponents[coreSubcomponentNames.base].triggerableSubcomponentName = textSubcomponent.baseName;
    coreSubcomponentNames.text = textSubcomponent.baseName;
  }

  private static addReferences(buttonComponent: WorkshopComponent): void {
    const { coreSubcomponentNames } = buttonComponent;
    ReferenceSharingUtils.appendJsClassesRefToAllSubcomponents(buttonComponent.subcomponents, coreSubcomponentNames);
    ReferenceSharingUtils.appendBaseSubcomponentRefToAllChildSubcomponents(buttonComponent.subcomponents, coreSubcomponentNames);
    buttonComponent.referenceSharingExecutables = [ReferenceSharingUtils.appendJsClassesRefToAllSubcomponents];
  }

  public static create(componentStyle: NewComponentStyleProperties): WorkshopComponent {
    componentStyle.componentType = COMPONENT_TYPES.BUTTON;
    const buttonComponent: WorkshopComponent = ComponentBuilder.createBaseComponent(componentStyle, ButtonBuilder.createBaseSubcomponent);
    ButtonBuilder.addComponentsToBase(buttonComponent, componentStyle);
    ButtonBuilder.addReferences(buttonComponent);
    return buttonComponent;
  }
}
