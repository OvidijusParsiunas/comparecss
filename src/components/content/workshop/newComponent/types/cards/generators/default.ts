import { CustomCss, CustomFeatures, CustomStaticFeatures, Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { UpdateGenericComponentNames } from '../../../../utils/componentManipulation/updateNestedComponentNames/updateGenericComponentNames';
import { UpdateLayerComponentNames } from '../../../../utils/componentManipulation/updateNestedComponentNames/updateLayerComponentNames';
import { AddNewGenericComponent } from '../../../../utils/componentManipulation/addNewNestedComponent/add/addNewGenericComponent';
import { AddNewLayerComponent } from '../../../../utils/componentManipulation/addNewNestedComponent/add/addNewLayerComponent';
import { BUTTON_STYLES, DEFAULT_STYLES, LAYER_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { CoreSubcomponentNames } from '../../../../../../../interfaces/customSubcomponentNames';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { cardBase } from './base';

class DefaultCard extends ComponentBuilder {

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
    };
  }

  private static overwriteTopLayerProperties(subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames): void {
    subcomponents[coreSubcomponentNames.base].customStaticFeatures = DefaultCard.createDefaultTopLayerCustomStaticFeatures();
    subcomponents[coreSubcomponentNames.base].defaultCustomStaticFeatures = DefaultCard.createDefaultTopLayerCustomStaticFeatures();
  }

  private static overwriteTitleProperties(subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames): void {
    subcomponents[coreSubcomponentNames.base].customCss = DefaultCard.createDefaultTitleCss();
    subcomponents[coreSubcomponentNames.base].defaultCss = DefaultCard.createDefaultTitleCss();
    subcomponents[coreSubcomponentNames.base].customFeatures = DefaultCard.createDefaultTextCustomFeatures();
    subcomponents[coreSubcomponentNames.base].defaultCustomFeatures = DefaultCard.createDefaultTextCustomFeatures();
    subcomponents[coreSubcomponentNames.base].customStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Card title');
    subcomponents[coreSubcomponentNames.base].defaultCustomStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Card title');
  }

  private static overwriteDescriptionProperties(subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames): void {
    subcomponents[coreSubcomponentNames.base].customFeatures = DefaultCard.createDefaultTextCustomFeatures();
    subcomponents[coreSubcomponentNames.base].defaultCustomFeatures = DefaultCard.createDefaultTextCustomFeatures();
    subcomponents[coreSubcomponentNames.base].customStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Description');
    subcomponents[coreSubcomponentNames.base].defaultCustomStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Description');
  }

  private static overwriteSubmitButtonProperties(subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames): void {
    subcomponents[coreSubcomponentNames.base].customFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    subcomponents[coreSubcomponentNames.base].defaultCustomFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    subcomponents[coreSubcomponentNames.text].customStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Submit');
    subcomponents[coreSubcomponentNames.text].defaultCustomStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Submit');
  }

  private static overwriteCancelButtonProperties(subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames): void {
    subcomponents[coreSubcomponentNames.base].customFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    subcomponents[coreSubcomponentNames.base].defaultCustomFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    subcomponents[coreSubcomponentNames.text].customStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Cancel');
    subcomponents[coreSubcomponentNames.text].defaultCustomStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Cancel');
  }

  public static addComponentsToBase(cardComponent: WorkshopComponent): void {
    const layer1Component = AddNewLayerComponent.add(cardComponent, DEFAULT_STYLES.DEFAULT, true, DefaultCard.overwriteTopLayerProperties);
    const layer2Component = AddNewLayerComponent.add(cardComponent, LAYER_STYLES.CARD, true);
    const layer3Component = AddNewLayerComponent.add(cardComponent, LAYER_STYLES.CARD, true);
    UpdateLayerComponentNames.update(cardComponent, 0);
    AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.TEXT, DEFAULT_STYLES.DEFAULT,
      layer1Component.coreSubcomponentNames.base, [DefaultCard.overwriteTitleProperties]);
    AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.BUTTON, BUTTON_STYLES.CLOSE,
      layer1Component.coreSubcomponentNames.base);
    AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.AVATAR, DEFAULT_STYLES.DEFAULT,
      layer1Component.coreSubcomponentNames.base);
    AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.TEXT, DEFAULT_STYLES.DEFAULT,
      layer2Component.coreSubcomponentNames.base, [DefaultCard.overwriteDescriptionProperties]);
    AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLES.DEFAULT,
      layer3Component.coreSubcomponentNames.base, [DefaultCard.overwriteSubmitButtonProperties]);
    AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLES.DEFAULT,
      layer3Component.coreSubcomponentNames.base, [DefaultCard.overwriteCancelButtonProperties]);
    UpdateGenericComponentNames.updateViaLayerObject(cardComponent, cardComponent.componentPreviewStructure.layers[0]);
    UpdateGenericComponentNames.updateViaLayerObject(cardComponent, cardComponent.componentPreviewStructure.layers[1]);
    UpdateGenericComponentNames.updateViaLayerObject(cardComponent, cardComponent.componentPreviewStructure.layers[2]);
  }
}

export const defaultCard: ComponentGenerator = {
  createNewComponent(): WorkshopComponent {
    const cardComponent = cardBase.createNewComponent();
    DefaultCard.addComponentsToBase(cardComponent);
    return cardComponent;
  },
}
