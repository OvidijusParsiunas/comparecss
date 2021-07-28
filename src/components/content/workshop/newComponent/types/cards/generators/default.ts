import { UpdateGenericComponentDropdownOptionNames } from '../../../../utils/componentManipulation/updateNestedComponentNames/updateGenericComponentDropdownOptionNames';
import { CustomCss, CustomFeatures, CustomStaticFeatures, Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { UpdateDropdownOptionNamesShared } from '../../../../utils/componentManipulation/updateNestedComponentNames/updateDropdownOptionNamesShared';
import { UpdateLayerDropdownOptionNames } from '../../../../utils/componentManipulation/updateNestedComponentNames/updateLayerDropdownOptionNames';
import { AddNewGenericComponent } from '../../../../utils/componentManipulation/addNewNestedComponent/add/addNewGenericComponent';
import { AddNewLayerComponent } from '../../../../utils/componentManipulation/addNewNestedComponent/add/addNewLayerComponent';
import { BUTTON_STYLES, DEFAULT_STYLES, LAYER_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { NESTED_COMPONENTS_BASE_NAMES } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { CoreSubcomponentNames } from '../../../../../../../interfaces/customSubcomponentNames';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { cardBase } from './base';

class DefaultCard extends ComponentBuilder {

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

  private static overwriteTitleProperties(subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames): void {
    subcomponents[coreSubcomponentNames.base].customCss = DefaultCard.createDefaultTitleCss();
    subcomponents[coreSubcomponentNames.base].defaultCss = DefaultCard.createDefaultTitleCss();
    subcomponents[coreSubcomponentNames.base].customFeatures = DefaultCard.createDefaultTextCustomFeatures();
    subcomponents[coreSubcomponentNames.base].defaultCustomFeatures = DefaultCard.createDefaultTextCustomFeatures();
    subcomponents[coreSubcomponentNames.base].customStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Card title');
    subcomponents[coreSubcomponentNames.base].defaultCustomStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Card title');
  }

  private static overwriteCloseButtonProperties(subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames): void {
    subcomponents[coreSubcomponentNames.base].customFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    subcomponents[coreSubcomponentNames.base].defaultCustomFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
  }

  private static overwriteImageProperties(subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames): void {
    subcomponents[coreSubcomponentNames.base].customFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.CENTER);
    subcomponents[coreSubcomponentNames.base].defaultCustomFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.CENTER);
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

  private static overwriteLayerProperties(subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames): void {
    const nestedDropdownStructure = UpdateDropdownOptionNamesShared.generateNestedDropdownStructure([
      NESTED_COMPONENTS_BASE_NAMES.BUTTON, NESTED_COMPONENTS_BASE_NAMES.TEXT, NESTED_COMPONENTS_BASE_NAMES.CLOSE, NESTED_COMPONENTS_BASE_NAMES.IMAGE]);
    subcomponents[coreSubcomponentNames.base].newNestedComponentsOptions = nestedDropdownStructure;
  }

  private static overwriteCancelButtonProperties(subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames): void {
    subcomponents[coreSubcomponentNames.base].customFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    subcomponents[coreSubcomponentNames.base].defaultCustomFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    subcomponents[coreSubcomponentNames.text].customStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Cancel');
    subcomponents[coreSubcomponentNames.text].defaultCustomStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Cancel');
  }

  public static addComponentsToBase(cardComponent: WorkshopComponent): void {
    const layer1Component = AddNewLayerComponent.add(cardComponent, LAYER_STYLES.CARD, true, DefaultCard.overwriteLayerProperties);
    const layer2Component = AddNewLayerComponent.add(cardComponent, LAYER_STYLES.CARD, true, DefaultCard.overwriteLayerProperties);
    const layer3Component = AddNewLayerComponent.add(cardComponent, LAYER_STYLES.CARD, true, DefaultCard.overwriteLayerProperties);
    UpdateLayerDropdownOptionNames.update(cardComponent, 0);
    AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.TEXT, DEFAULT_STYLES.DEFAULT,
      layer1Component.coreSubcomponentNames.base, [DefaultCard.overwriteTitleProperties]);
    AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.BUTTON, BUTTON_STYLES.CLOSE,
      layer1Component.coreSubcomponentNames.base, [DefaultCard.overwriteCloseButtonProperties]);
    AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.IMAGE, DEFAULT_STYLES.DEFAULT,
      layer1Component.coreSubcomponentNames.base, [DefaultCard.overwriteImageProperties]);
    AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.TEXT, DEFAULT_STYLES.DEFAULT,
      layer2Component.coreSubcomponentNames.base, [DefaultCard.overwriteDescriptionProperties]);
    AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLES.DEFAULT,
      layer3Component.coreSubcomponentNames.base, [DefaultCard.overwriteSubmitButtonProperties]);
    AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLES.DEFAULT,
      layer3Component.coreSubcomponentNames.base, [DefaultCard.overwriteCancelButtonProperties]);
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(cardComponent, cardComponent.componentPreviewStructure.layers[0]);
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(cardComponent, cardComponent.componentPreviewStructure.layers[1]);
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(cardComponent, cardComponent.componentPreviewStructure.layers[2]);
  }

  public static overwriteBaseNewNestedComponentsOptions(cardComponent: WorkshopComponent): void {
    const { subcomponents, coreSubcomponentNames } = cardComponent;
    const nestedDropdownStructure = UpdateDropdownOptionNamesShared.generateNestedDropdownStructure([NESTED_COMPONENTS_BASE_NAMES.LAYER]);
    subcomponents[coreSubcomponentNames.base].newNestedComponentsOptions = nestedDropdownStructure;
  }
}

export const defaultCard: ComponentGenerator = {
  createNewComponent(): WorkshopComponent {
    const cardComponent = cardBase.createNewComponent();
    DefaultCard.overwriteBaseNewNestedComponentsOptions(cardComponent);
    DefaultCard.addComponentsToBase(cardComponent);
    return cardComponent;
  },
}
