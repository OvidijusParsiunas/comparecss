import { CustomCss, CustomFeatures, CustomStaticFeatures, SubcomponentProperties, Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { AddNewGenericComponent } from '../../../../utils/componentManipulation/addNewNestedComponent/add/addNewGenericComponent';
import { AddNewLayerComponent } from '../../../../utils/componentManipulation/addNewNestedComponent/add/addNewLayerComponent';
import { BUTTON_STYLES, DEFAULT_STYLE, LAYER_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { uniqueSubcomponentIdState } from '../../../../utils/componentGenerator/uniqueSubcomponentIdState';
import { NewComponentStyleProperties } from '../../../../../../../consts/newComponentStyleProperties';
import { PARENT_SUBCOMPONENT_NAME } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { CoreSubcomponentNames } from '../../../../../../../interfaces/customSubcomponentNames';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { inheritedBaseChildCss } from '../../shared/childCss/inheritedBaseChildCss';
import { getCardBaseSpecificSettings } from '../settings/cardBaseSpecificSettings';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { inheritedCardBaseCss } from '../inheritedCss/inheritedCardCss';
import { ComponentBuilder } from '../../shared/componentBuilder';

export class CardBuilder extends ComponentBuilder {

  private static addSubcomponentSpecificSettings(baseSubcomponent: SubcomponentProperties, closeComponent: WorkshopComponent,
      avatarComponent: WorkshopComponent): void {
    baseSubcomponent.subcomponentSpecificSettings = getCardBaseSpecificSettings(
      closeComponent.componentPreviewStructure.baseSubcomponentProperties, avatarComponent.componentPreviewStructure.baseSubcomponentProperties);
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

  private static createDefaultTitleCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        top: '50%',
        width: 'max-content',
        fontWeight: '500',
        fontSize: '20px',
        fontFamily: '"Poppins", sans-serif',
        color: '#004085',
        textAlign: 'left',
        backgroundColor: CSS_PROPERTY_VALUES.INHERIT,
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
    subcomponents[coreSubcomponentNames.base].customCss = CardBuilder.createDefaultTitleCss();
    subcomponents[coreSubcomponentNames.base].defaultCss = CardBuilder.createDefaultTitleCss();
    subcomponents[coreSubcomponentNames.base].customFeatures = CardBuilder.createDefaultTextCustomFeatures();
    subcomponents[coreSubcomponentNames.base].defaultCustomFeatures = CardBuilder.createDefaultTextCustomFeatures();
    subcomponents[coreSubcomponentNames.base].customStaticFeatures = CardBuilder.createDefaultTextCustomStaticFeatures('Card title');
    subcomponents[coreSubcomponentNames.base].defaultCustomStaticFeatures = CardBuilder.createDefaultTextCustomStaticFeatures('Card title');
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
    const layer1Component = AddNewLayerComponent.add(cardComponent, DEFAULT_STYLE.DEFAULT, true,
      (componentStyle.overwriteLayersProperties?.[0]?.layer) || CardBuilder.overwriteTopLayerProperties);
    const layer2Component = AddNewLayerComponent.add(cardComponent, LAYER_STYLES.CARD, true);
    const layer3Component = AddNewLayerComponent.add(cardComponent, LAYER_STYLES.CARD, true);
    AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.TEXT, DEFAULT_STYLE.DEFAULT,
      layer1Component.coreSubcomponentNames.base, [(componentStyle.overwriteLayersProperties?.[0]?.text?.[0]?.func) || CardBuilder.overwriteTitleProperties]);
    AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.TEXT, DEFAULT_STYLE.DEFAULT,
      layer2Component.coreSubcomponentNames.base, [(componentStyle.overwriteLayersProperties?.[1]?.text?.[0]?.func) || CardBuilder.overwriteDescriptionProperties]);
    AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLE.DEFAULT,
      layer3Component.coreSubcomponentNames.base, [(componentStyle.overwriteLayersProperties?.[2]?.button?.[0]) || CardBuilder.overwriteSubmitButtonProperties]);
    AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLE.DEFAULT,
      layer3Component.coreSubcomponentNames.base, [(componentStyle.overwriteLayersProperties?.[2]?.button?.[1]) || CardBuilder.overwriteCancelButtonProperties]);
    const closeButtonComponent = AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.BUTTON,
      BUTTON_STYLES.CLOSE, layer1Component.coreSubcomponentNames.base, [(componentStyle.overwriteLayersProperties?.[0]?.button?.[0])]);
    const avatarComponent = AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.AVATAR, DEFAULT_STYLE.DEFAULT,
      layer1Component.coreSubcomponentNames.base, [(componentStyle.overwriteLayersProperties?.[0]?.avatar)]);
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
        boxSizing: CSS_PROPERTY_VALUES.UNSET,
        boxShadow: CSS_PROPERTY_VALUES.UNSET,
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
      inheritedCss: inheritedCardBaseCss,
      childCss: inheritedBaseChildCss,
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
