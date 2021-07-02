import { CustomCss, CustomFeatures, SubcomponentProperties, Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { AddNewGenericComponent } from '../../../../utils/componentManipulation/addNewNestedComponent/add/addNewGenericComponent';
import { AddNewLayerComponent } from '../../../../utils/componentManipulation/addNewNestedComponent/add/addNewLayerComponent';
import { BUTTON_STYLES, DEFAULT_STYLE, LAYER_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { uniqueSubcomponentIdState } from '../../../../utils/componentGenerator/uniqueSubcomponentIdState';
import { NewComponentStyleProperties } from '../../../../../../../consts/newComponentStyleProperties';
import { CoreSubcomponentNames } from '../../../../../../../interfaces/customSubcomponentNames';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { inheritedBaseChildCss } from '../../shared/childCss/inheritedBaseChildCss';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { alertBaseSpecificSettings } from '../settings/alertBaseSpecificSettings';
import { inheritedCardBaseCss } from '../../cards/inheritedCss/inheritedCardCss';
import { ComponentBuilder } from '../../shared/componentBuilder';

export class AlertBuilder extends ComponentBuilder {

  private static overwriteTextProperties(subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames): void {
    subcomponents[coreSubcomponentNames.base].customFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.CENTER);
    subcomponents[coreSubcomponentNames.base].defaultCustomFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.CENTER);
  }

  private static addComponentsToBase(alertComponent: WorkshopComponent, componentStyle: NewComponentStyleProperties): void {
    const layer1Component = AddNewLayerComponent.add(alertComponent, LAYER_STYLES.PLAIN, false);
    AddNewGenericComponent.add(alertComponent, COMPONENT_TYPES.TEXT, DEFAULT_STYLE.DEFAULT,
      layer1Component.baseName, [(componentStyle.overwriteLayersProperties?.[0]?.text?.[0]?.func) || AlertBuilder.overwriteTextProperties]);
    AddNewGenericComponent.add(alertComponent, COMPONENT_TYPES.BUTTON,
      BUTTON_STYLES.CLOSE, layer1Component.baseName, [(componentStyle.overwriteLayersProperties?.[0]?.button?.[0])]);
  }

  private static createDefaultCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        color: '#004085',
        backgroundColor: '#cce5ff',
        borderColor: '#b8daff',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '4px',
        width: '400px',
        height: '50px',
        boxSizing: 'unset',
        fontSize: '16px',
        boxShadow: 'unset',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '0px',
        paddingBottom: '0px',
        fontFamily: '"Poppins", sans-serif',
        textAlign: 'left',
      },
    }
  }

  private static createDefaultCustomFeatures(): CustomFeatures {
    return {
      animations: ComponentBuilder.createDefaultAnimationsProperties(),
    };
  }

  private static createBaseSubcomponent(componentStyle: NewComponentStyleProperties): SubcomponentProperties {
    return {
      subcomponentType: SUBCOMPONENT_TYPES.BASE,
      customCss: (componentStyle.baseCustomCssFunc && componentStyle.baseCustomCssFunc()) || AlertBuilder.createDefaultCss(),
      defaultCss: (componentStyle.baseCustomCssFunc && componentStyle.baseCustomCssFunc()) || AlertBuilder.createDefaultCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      inheritedCss: inheritedCardBaseCss,
      childCss: inheritedBaseChildCss,
      subcomponentSpecificSettings: alertBaseSpecificSettings,
      customFeatures: AlertBuilder.createDefaultCustomFeatures(),
      defaultCustomFeatures: AlertBuilder.createDefaultCustomFeatures(),
    };
  }

  public static create(componentStyle: NewComponentStyleProperties = {}): WorkshopComponent {
    uniqueSubcomponentIdState.resetUniqueId();
    if (componentStyle.componentType === undefined) componentStyle.componentType = COMPONENT_TYPES.ALERT;
    const alertComponent = ComponentBuilder.createBaseComponent(componentStyle, AlertBuilder.createBaseSubcomponent, false);
    AlertBuilder.addComponentsToBase(alertComponent, componentStyle);
    return alertComponent;
  }
}
