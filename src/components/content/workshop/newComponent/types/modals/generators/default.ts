import { UpdateGenericComponentDropdownItemNames } from '../../../../utils/componentManipulation/updateChildComponent/updateGenericComponentDropdownItemNames';
import { UpdateLayerDropdownItemNames } from '../../../../utils/componentManipulation/updateChildComponent/updateLayerDropdownItemNames';
import { CustomCss, CustomFeatures, CustomStaticFeatures, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { AddContainerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addContainerComponent';
import { AddLayerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addLayerComponent';
import { BUTTON_STYLES, DEFAULT_STYLES, LAYER_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { LAYER_COMPONENTS_BASE_NAMES } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { DropdownUtils } from '../../../../utils/componentManipulation/utils/dropdownUtils';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { ModalBaseSpecificSettings } from '../settings/modalBaseSpecificSettings';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { modalBase } from './base';

class DefaultModal extends ComponentBuilder {

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
    }
  }

  private static overwriteTitleProperties(textComponent: WorkshopComponent): void {
    textComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customCss = DefaultModal.createDefaultTitleCss();
    textComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].defaultCss = DefaultModal.createDefaultTitleCss();
    textComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customFeatures = DefaultModal.createDefaultTextCustomFeatures();
    textComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].defaultCustomFeatures = DefaultModal.createDefaultTextCustomFeatures();
    textComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Card title');
    textComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].defaultCustomStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Card title');
    textComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
  }

  private static overwriteCloseButtonProperties(closeButtonComponent: WorkshopComponent): void {
    closeButtonComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customStaticFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    closeButtonComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].defaultCustomStaticFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    closeButtonComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
  }

  private static overwriteImageProperties(imageComponent: WorkshopComponent): void {
    imageComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customStaticFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.CENTER);
    imageComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].defaultCustomStaticFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.CENTER);
    imageComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
  }

  private static overwriteDescriptionProperties(textComponent: WorkshopComponent): void {
    textComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customFeatures = DefaultModal.createDefaultTextCustomFeatures();
    textComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].defaultCustomFeatures = DefaultModal.createDefaultTextCustomFeatures();
    textComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Description');
    textComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].defaultCustomStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Description');
    textComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
  }

  private static overwriteSubmitButtonProperties(submitButtonComponent: WorkshopComponent): void {
    submitButtonComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customStaticFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    submitButtonComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].defaultCustomStaticFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    submitButtonComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.TEXT].customStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Submit');
    submitButtonComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.TEXT].defaultCustomStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Submit');
    submitButtonComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
  }

  private static overwriteLayerProperties(layerComponent: WorkshopComponent): void {
    layerComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
  }

  private static overwriteCancelButtonProperties(cancelButton: WorkshopComponent): void {
    cancelButton.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customStaticFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    cancelButton.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].defaultCustomStaticFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    cancelButton.coreSubcomponentRefs[SUBCOMPONENT_TYPES.TEXT].customStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Cancel');
    cancelButton.coreSubcomponentRefs[SUBCOMPONENT_TYPES.TEXT].defaultCustomStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Cancel');
    cancelButton.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
  }

  private static addNewLayers(cardComponent: WorkshopComponent): WorkshopComponent[] {
    const layer1Component = AddLayerComponent.add(cardComponent, LAYER_STYLES.CARD, true, DefaultModal.overwriteLayerProperties);
    const layer2Component = AddLayerComponent.add(cardComponent, LAYER_STYLES.CARD, true, DefaultModal.overwriteLayerProperties);
    const layer3Component = AddLayerComponent.add(cardComponent, LAYER_STYLES.CARD, true, DefaultModal.overwriteLayerProperties);
    return [layer1Component, layer2Component, layer3Component];
  }

  public static addComponentsToBase(cardComponent: WorkshopComponent): void {
    const [layer1Component, layer2Component, layer3Component] = DefaultModal.addNewLayers(cardComponent);
    UpdateLayerDropdownItemNames.update(cardComponent, 0);
    AddContainerComponent.add(cardComponent, COMPONENT_TYPES.TEXT, DEFAULT_STYLES.DEFAULT,
      layer1Component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name, [DefaultModal.overwriteTitleProperties]);
    AddContainerComponent.add(cardComponent, COMPONENT_TYPES.BUTTON, BUTTON_STYLES.CLOSE,
      layer1Component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name, [DefaultModal.overwriteCloseButtonProperties]);
    AddContainerComponent.add(cardComponent, COMPONENT_TYPES.IMAGE, DEFAULT_STYLES.DEFAULT,
      layer1Component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name, [DefaultModal.overwriteImageProperties]);
    AddContainerComponent.add(cardComponent, COMPONENT_TYPES.TEXT, DEFAULT_STYLES.DEFAULT,
      layer2Component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name, [DefaultModal.overwriteDescriptionProperties]);
    AddContainerComponent.add(cardComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLES.DEFAULT,
      layer3Component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name, [DefaultModal.overwriteSubmitButtonProperties]);
    AddContainerComponent.add(cardComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLES.DEFAULT,
      layer3Component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name, [DefaultModal.overwriteCancelButtonProperties]);
    UpdateGenericComponentDropdownItemNames.updateViaParentLayerPreviewStructure(cardComponent, cardComponent.componentPreviewStructure.layers[0]);
    UpdateGenericComponentDropdownItemNames.updateViaParentLayerPreviewStructure(cardComponent, cardComponent.componentPreviewStructure.layers[1]);
    UpdateGenericComponentDropdownItemNames.updateViaParentLayerPreviewStructure(cardComponent, cardComponent.componentPreviewStructure.layers[2]);
  }

  public static overwriteBaseNewChildComponentsItems(modalComponent: WorkshopComponent): void {
    const nestedDropdownStructure = DropdownUtils.generateDropdownStructure([LAYER_COMPONENTS_BASE_NAMES.LAYER]);
    modalComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].newChildComponentsItems = nestedDropdownStructure;
  }
}

export const defaultModal: ComponentGenerator = {
  createNewComponent(): WorkshopComponent {
    const modalComponent = modalBase.createNewComponent();
    DefaultModal.overwriteBaseNewChildComponentsItems(modalComponent);
    DefaultModal.addComponentsToBase(modalComponent);
    ModalBaseSpecificSettings.set(modalComponent);
    return modalComponent;
  },
}
