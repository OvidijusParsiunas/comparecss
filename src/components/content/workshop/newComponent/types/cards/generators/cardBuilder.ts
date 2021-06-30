import { CustomCss, CustomFeatures, CustomStaticFeatures, SubcomponentProperties, Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { AddNewLayerSubcomponent } from '../../../../utils/componentManipulation/addNewSubcomponentUtils/add/addNewLayerSubcomponent';
import { AddNewGenericComponent } from '../../../../utils/componentManipulation/addNewSubcomponentUtils/add/addNewGenericComponent';
import { BUTTON_STYLES, DEFAULT_STYLE, LAYER_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { uniqueSubcomponentIdState } from '../../../../utils/componentGenerator/uniqueSubcomponentIdState';
import { NewComponentStyleProperties } from '../../../../../../../consts/newComponentStyleProperties';
import { PARENT_SUBCOMPONENT_NAME } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { CoreSubcomponentNames } from '../../../../../../../interfaces/customSubcomponentNames';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { NewComponentProperties } from '../../../../../../../interfaces/addNewSubcomponent';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { inheritedLayerBaseChildCss } from '../../shared/layer/inheritedBaseChildCss';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { getCardBaseSpecificSettings } from './cardBaseSpecificSettings';
import { inheritedLayerBaseCss } from '../../shared/layer/inheritedCss';
import { ComponentBuilder } from '../../shared/componentBuilder';

export class CardBuilder extends ComponentBuilder {

  private static addSubcomponentSpecificSettings(baseSubcomponent: SubcomponentProperties, closeComponent: NewComponentProperties,
      avatarComponent: NewComponentProperties): void {
    baseSubcomponent.subcomponentSpecificSettings = getCardBaseSpecificSettings(
      closeComponent.subcomponents[closeComponent.baseName], avatarComponent.subcomponents[avatarComponent.baseName]);
  }
  
  private static createDefaultTopLayerCustomStaticFeatures(): CustomStaticFeatures {
    return {
      image: ComponentBuilder.createImage(false),
    };
  }
  
  private static createDefaultTextCustomFeatures(): CustomFeatures {
    return {
      autoSize: ComponentBuilder.createAutoSize(true, true),
      alignedLayerSection: ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.LEFT),
    };
  }

  private static createDefaultModalTitleCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        top: '50%',
        width: 'max-content',
        fontWeight: '500',
        fontSize: '20px',
        fontFamily: '"Poppins", sans-serif',
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
      },
    };
  }

  private static createDefaultTextCustomStaticFeatures(text?: string): CustomStaticFeatures {
    return {
      subcomponentText: ComponentBuilder.createText(text || 'text'),
    }
  }

  private static overwriteTopLayerProperties(subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames): void {
    subcomponents[coreSubcomponentNames.base].customStaticFeatures = CardBuilder.createDefaultTopLayerCustomStaticFeatures();
    subcomponents[coreSubcomponentNames.base].defaultCustomStaticFeatures = CardBuilder.createDefaultTopLayerCustomStaticFeatures();
  }
  
  private static overwriteTitleProperties(subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames): void {
    subcomponents[coreSubcomponentNames.base].customCss = CardBuilder.createDefaultModalTitleCss();
    subcomponents[coreSubcomponentNames.base].defaultCss = CardBuilder.createDefaultModalTitleCss();
    subcomponents[coreSubcomponentNames.base].customFeatures = CardBuilder.createDefaultTextCustomFeatures();
    subcomponents[coreSubcomponentNames.base].defaultCustomFeatures = CardBuilder.createDefaultTextCustomFeatures();
    subcomponents[coreSubcomponentNames.base].customStaticFeatures = CardBuilder.createDefaultTextCustomStaticFeatures('Modal title');
    subcomponents[coreSubcomponentNames.base].defaultCustomStaticFeatures = CardBuilder.createDefaultTextCustomStaticFeatures('Modal title');
  }
  
  private static overwriteDescriptionProperties(subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames): void {
    subcomponents[coreSubcomponentNames.base].customStaticFeatures = CardBuilder.createDefaultTextCustomStaticFeatures('Description');
    subcomponents[coreSubcomponentNames.base].defaultCustomStaticFeatures = CardBuilder.createDefaultTextCustomStaticFeatures('Description');
  }
  
  private static overwriteSubmitButtonProperties(subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames): void {
    subcomponents[coreSubcomponentNames.base].customFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    subcomponents[coreSubcomponentNames.base].defaultCustomFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    subcomponents[coreSubcomponentNames.text].customStaticFeatures = CardBuilder.createDefaultTextCustomStaticFeatures('Submit');
    subcomponents[coreSubcomponentNames.text].defaultCustomStaticFeatures = CardBuilder.createDefaultTextCustomStaticFeatures('Submit');
  }
  
  private static overwriteCancelButtonProperties(subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames): void {
    subcomponents[coreSubcomponentNames.base].customFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    subcomponents[coreSubcomponentNames.base].defaultCustomFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    subcomponents[coreSubcomponentNames.text].customStaticFeatures = CardBuilder.createDefaultTextCustomStaticFeatures('Cancel');
    subcomponents[coreSubcomponentNames.text].defaultCustomStaticFeatures = CardBuilder.createDefaultTextCustomStaticFeatures('Cancel');
  }

  private static addComponentsToBase(cardComponent: WorkshopComponent, componentStyle: NewComponentStyleProperties): void {
    const layer1Component = AddNewLayerSubcomponent.add(cardComponent, DEFAULT_STYLE.DEFAULT, true,
      (componentStyle.overwriteLayersProperties?.[0]?.layer) || CardBuilder.overwriteTopLayerProperties);
    const layer2Component = AddNewLayerSubcomponent.add(cardComponent, LAYER_STYLES.CARD, true);
    const layer3Component = AddNewLayerSubcomponent.add(cardComponent, LAYER_STYLES.CARD, true);
    AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.TEXT, DEFAULT_STYLE.DEFAULT,
      layer1Component.baseName, [(componentStyle.overwriteLayersProperties?.[0]?.text?.[0]?.func) || CardBuilder.overwriteTitleProperties]);
    AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.TEXT, DEFAULT_STYLE.DEFAULT,
      layer2Component.baseName, [(componentStyle.overwriteLayersProperties?.[1]?.text?.[0]?.func) || CardBuilder.overwriteDescriptionProperties]);
    AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLE.DEFAULT,
      layer3Component.baseName, [(componentStyle.overwriteLayersProperties?.[2]?.button?.[0]) || CardBuilder.overwriteSubmitButtonProperties]);
    AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLE.DEFAULT,
      layer3Component.baseName, [(componentStyle.overwriteLayersProperties?.[2]?.button?.[1]) || CardBuilder.overwriteCancelButtonProperties]);
    const closeButtonComponent = AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.BUTTON,
      BUTTON_STYLES.CLOSE, layer1Component.baseName, [(componentStyle.overwriteLayersProperties?.[0]?.button?.[0])]);
    const avatarComponent = AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.AVATAR, DEFAULT_STYLE.DEFAULT,
      layer1Component.baseName, [(componentStyle.overwriteLayersProperties?.[0]?.avatar)]);
    CardBuilder.addSubcomponentSpecificSettings(cardComponent.subcomponents[PARENT_SUBCOMPONENT_NAME.BASE], closeButtonComponent, avatarComponent);
  }

  private static createDefaultCardCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        color: '#004085',
        backgroundColor: '#ffffff',
        borderColor: '#00000033',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '4px',
        width: '450px',
        boxSizing: 'unset',
        boxShadow: 'unset',
        top: '0px',
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
      customCss: (componentStyle.baseCustomCssFunc && componentStyle.baseCustomCssFunc()) || CardBuilder.createDefaultCardCss(),
      defaultCss: (componentStyle.baseCustomCssFunc && componentStyle.baseCustomCssFunc()) || CardBuilder.createDefaultCardCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      inheritedCss: inheritedLayerBaseCss,
      childCss: inheritedLayerBaseChildCss,
      customFeatures: CardBuilder.createDefaultCustomFeatures(),
      defaultCustomFeatures: CardBuilder.createDefaultCustomFeatures(),
    };
  }

  public static create(componentStyle: NewComponentStyleProperties = {}): WorkshopComponent {
    uniqueSubcomponentIdState.resetUniqueId();
    if (componentStyle.componentType === undefined) componentStyle.componentType = COMPONENT_TYPES.CARD;
    const cardComponent = ComponentBuilder.createBaseComponent(componentStyle, CardBuilder.createBaseSubcomponent, false);
    CardBuilder.addComponentsToBase(cardComponent, componentStyle);
    return cardComponent;
  }
}
