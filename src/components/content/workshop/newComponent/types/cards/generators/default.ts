import { UpdateGenericComponentDropdownItemNames } from '../../../../utils/componentManipulation/updateChildComponent/updateGenericComponentDropdownItemNames';
import { UpdateLayerDropdownItemNames } from '../../../../utils/componentManipulation/updateChildComponent/updateLayerDropdownItemNames';
import { CustomCss, CustomFeatures, CustomStaticFeatures, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { AddContainerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addContainerComponent';
import { AddLayerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addLayerComponent';
import { BUTTON_STYLES, DEFAULT_STYLES, LAYER_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { cardBase } from './base';

class DefaultCard extends ComponentBuilder {

  private static createDefaultTextCustomFeatures(): CustomFeatures {
    return {
      autoSize: ComponentBuilder.createAutoSize(true, true),
    };
  }

  private static createDefaultTitleCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
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
      alignedLayerSection: ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.LEFT),
    };
  }

  private static overwriteTitleProperties(textComponent: WorkshopComponent): void {
    textComponent.baseSubcomponent.customCss = DefaultCard.createDefaultTitleCss();
    textComponent.baseSubcomponent.defaultCss = DefaultCard.createDefaultTitleCss();
    textComponent.baseSubcomponent.customFeatures = DefaultCard.createDefaultTextCustomFeatures();
    textComponent.baseSubcomponent.defaultCustomFeatures = DefaultCard.createDefaultTextCustomFeatures();
    textComponent.baseSubcomponent.customStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Card title');
    textComponent.baseSubcomponent.defaultCustomStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Card title');
    textComponent.baseSubcomponent.isRemovable = true;
  }

  private static overwriteCloseButtonProperties(closeButtonComponent: WorkshopComponent): void {
    closeButtonComponent.baseSubcomponent.customStaticFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    closeButtonComponent.baseSubcomponent.defaultCustomStaticFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    closeButtonComponent.baseSubcomponent.isRemovable = true;
  }

  private static overwriteImageProperties(imageComponent: WorkshopComponent): void {
    imageComponent.baseSubcomponent.customStaticFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.CENTER);
    imageComponent.baseSubcomponent.defaultCustomStaticFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.CENTER);
    imageComponent.baseSubcomponent.isRemovable = true;
  }

  private static overwriteDescriptionProperties(textComponent: WorkshopComponent): void {
    textComponent.baseSubcomponent.customFeatures = DefaultCard.createDefaultTextCustomFeatures();
    textComponent.baseSubcomponent.defaultCustomFeatures = DefaultCard.createDefaultTextCustomFeatures();
    textComponent.baseSubcomponent.customStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Description');
    textComponent.baseSubcomponent.defaultCustomStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Description');
    textComponent.baseSubcomponent.isRemovable = true;
  }

  private static overwriteSubmitButtonProperties(submitButtonComponent: WorkshopComponent): void {
    submitButtonComponent.baseSubcomponent.customStaticFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    submitButtonComponent.baseSubcomponent.defaultCustomStaticFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    submitButtonComponent.sync.syncables.onCopy.subcomponents[SUBCOMPONENT_TYPES.TEXT].customStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Submit');
    submitButtonComponent.sync.syncables.onCopy.subcomponents[SUBCOMPONENT_TYPES.TEXT].defaultCustomStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Submit');
    submitButtonComponent.baseSubcomponent.isRemovable = true;
  }

  private static overwriteCancelButtonProperties(cancelButton: WorkshopComponent): void {
    cancelButton.baseSubcomponent.customStaticFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    cancelButton.baseSubcomponent.defaultCustomStaticFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    cancelButton.sync.syncables.onCopy.subcomponents[SUBCOMPONENT_TYPES.TEXT].customStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Cancel');
    cancelButton.sync.syncables.onCopy.subcomponents[SUBCOMPONENT_TYPES.TEXT].defaultCustomStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Cancel');
    cancelButton.baseSubcomponent.isRemovable = true;
  }

  private static addNewLayers(cardComponent: WorkshopComponent): WorkshopComponent[] {
    const layer1Component = AddLayerComponent.add(cardComponent, LAYER_STYLES.CARD, true);
    const layer2Component = AddLayerComponent.add(cardComponent, LAYER_STYLES.CARD, true);
    const layer3Component = AddLayerComponent.add(cardComponent, LAYER_STYLES.CARD, true);
    return [layer1Component, layer2Component, layer3Component];
  }

  public static addComponentsToBase(cardComponent: WorkshopComponent): void {
    const [layer1Component, layer2Component, layer3Component] = DefaultCard.addNewLayers(cardComponent);
    UpdateLayerDropdownItemNames.update(cardComponent, 0);
    AddContainerComponent.add(cardComponent, COMPONENT_TYPES.TEXT, DEFAULT_STYLES.DEFAULT,
      layer1Component.baseSubcomponent.name, [DefaultCard.overwriteTitleProperties]);
    AddContainerComponent.add(cardComponent, COMPONENT_TYPES.BUTTON, BUTTON_STYLES.CLOSE,
      layer1Component.baseSubcomponent.name, [DefaultCard.overwriteCloseButtonProperties]);
    AddContainerComponent.add(cardComponent, COMPONENT_TYPES.IMAGE, DEFAULT_STYLES.DEFAULT,
      layer1Component.baseSubcomponent.name, [DefaultCard.overwriteImageProperties]);
    AddContainerComponent.add(cardComponent, COMPONENT_TYPES.TEXT, DEFAULT_STYLES.DEFAULT,
      layer2Component.baseSubcomponent.name, [DefaultCard.overwriteDescriptionProperties]);
    AddContainerComponent.add(cardComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLES.DEFAULT,
      layer3Component.baseSubcomponent.name, [DefaultCard.overwriteSubmitButtonProperties]);
    AddContainerComponent.add(cardComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLES.DEFAULT,
      layer3Component.baseSubcomponent.name, [DefaultCard.overwriteCancelButtonProperties]);
    UpdateGenericComponentDropdownItemNames.updateViaParentLayerPreviewStructure(cardComponent, cardComponent.componentPreviewStructure.layers[0]);
    UpdateGenericComponentDropdownItemNames.updateViaParentLayerPreviewStructure(cardComponent, cardComponent.componentPreviewStructure.layers[1]);
    UpdateGenericComponentDropdownItemNames.updateViaParentLayerPreviewStructure(cardComponent, cardComponent.componentPreviewStructure.layers[2]);
  }

  private static overwriteLayerProperties(layerComponent: WorkshopComponent): void {
    layerComponent.baseSubcomponent.isRemovable = true;
  }

  public static setPropertyOverwritables(cardComponent: WorkshopComponent): void {
    cardComponent.newChildComponents.propertyOverwritables = {
      [COMPONENT_TYPES.LAYER]: DefaultCard.overwriteLayerProperties,
    };
  }
}

export const defaultCard: ComponentGenerator = {
  createNewComponent(): WorkshopComponent {
    const cardComponent = cardBase.createNewComponent();
    DefaultCard.setPropertyOverwritables(cardComponent);
    DefaultCard.addComponentsToBase(cardComponent);
    return cardComponent;
  },
}
