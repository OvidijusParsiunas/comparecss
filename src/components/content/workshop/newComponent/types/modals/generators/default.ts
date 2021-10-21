import { UpdateContainerComponentDropdownItemNames } from '../../../../utils/componentManipulation/updateChildComponent/updateContainerComponentDropdownItemNames';
import { UpdateLayerDropdownItemNames } from '../../../../utils/componentManipulation/updateChildComponent/updateLayerDropdownItemNames';
import { CustomCss, CustomFeatures, CustomStaticFeatures, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { AddContainerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addContainerComponent';
import { AddLayerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addLayerComponent';
import { BUTTON_STYLES, DEFAULT_STYLES, LAYER_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { ModalBaseSpecificSettings } from '../settings/modalBaseSpecificSettings';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { modalBase } from './base';

class DefaultModal extends ComponentBuilder {

  private static setComponentToRemovable(component: WorkshopComponent): void {
    component.baseSubcomponent.isRemovable = true;
  }

  private static createDefaultTextCustomStaticFeatures(text?: string): CustomStaticFeatures {
    return {
      subcomponentText: ComponentBuilder.createText(text || 'text'),
      alignedLayerSection: ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.LEFT),
    };
  }

  private static overwriteCancelButtonProperties(cancelButton: WorkshopComponent): void {
    cancelButton.sync.syncables.onCopy.subcomponents[SUBCOMPONENT_TYPES.TEXT].customStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Cancel');
    cancelButton.sync.syncables.onCopy.subcomponents[SUBCOMPONENT_TYPES.TEXT].defaultCustomStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Cancel');
    DefaultModal.setComponentToRemovable(cancelButton);
  }

  private static overwriteSubmitButtonProperties(submitButtonComponent: WorkshopComponent): void {
    submitButtonComponent.sync.syncables.onCopy.subcomponents[SUBCOMPONENT_TYPES.TEXT].customStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Submit');
    submitButtonComponent.sync.syncables.onCopy.subcomponents[SUBCOMPONENT_TYPES.TEXT].defaultCustomStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Submit');
    DefaultModal.setComponentToRemovable(submitButtonComponent);
  }

  private static populateLayer3(cardComponent: WorkshopComponent, layer3Component: WorkshopComponent): void {
    cardComponent.newChildComponents.propertyOverwritables.postBuildFuncs[COMPONENT_TYPES.BUTTON] = DefaultModal.overwriteSubmitButtonProperties;
    AddContainerComponent.add(cardComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLES.DEFAULT, layer3Component.baseSubcomponent.name);
    cardComponent.newChildComponents.propertyOverwritables.postBuildFuncs[COMPONENT_TYPES.BUTTON] = DefaultModal.overwriteCancelButtonProperties;
    AddContainerComponent.add(cardComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLES.DEFAULT, layer3Component.baseSubcomponent.name);
    UpdateContainerComponentDropdownItemNames.updateViaParentLayerPreviewStructure(cardComponent, cardComponent.componentPreviewStructure.layers[2]);
  }

  private static createDefaultTextCustomFeatures(): CustomFeatures {
    return {
      autoSize: ComponentBuilder.createAutoSize(true, true),
    };
  }

  private static overwriteDescriptionProperties(textComponent: WorkshopComponent): void {
    textComponent.baseSubcomponent.customFeatures = DefaultModal.createDefaultTextCustomFeatures();
    textComponent.baseSubcomponent.defaultCustomFeatures = DefaultModal.createDefaultTextCustomFeatures();
    textComponent.baseSubcomponent.customStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Description');
    textComponent.baseSubcomponent.defaultCustomStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Description');
    DefaultModal.setComponentToRemovable(textComponent);
  }

  private static populateLayer2(cardComponent: WorkshopComponent, layer2Component: WorkshopComponent): void {
    cardComponent.newChildComponents.propertyOverwritables.postBuildFuncs[COMPONENT_TYPES.TEXT] = DefaultModal.overwriteDescriptionProperties;
    AddContainerComponent.add(cardComponent, COMPONENT_TYPES.TEXT, DEFAULT_STYLES.DEFAULT, layer2Component.baseSubcomponent.name);
    UpdateContainerComponentDropdownItemNames.updateViaParentLayerPreviewStructure(cardComponent, cardComponent.componentPreviewStructure.layers[1]);
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

  private static overwriteTitleProperties(textComponent: WorkshopComponent): void {
    textComponent.baseSubcomponent.customCss = DefaultModal.createDefaultTitleCss();
    textComponent.baseSubcomponent.defaultCss = DefaultModal.createDefaultTitleCss();
    textComponent.baseSubcomponent.customFeatures = DefaultModal.createDefaultTextCustomFeatures();
    textComponent.baseSubcomponent.defaultCustomFeatures = DefaultModal.createDefaultTextCustomFeatures();
    textComponent.baseSubcomponent.customStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Card title');
    textComponent.baseSubcomponent.defaultCustomStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Card title');
    DefaultModal.setComponentToRemovable(textComponent);
  }

  private static populateLayer1(cardComponent: WorkshopComponent, layer1Component: WorkshopComponent): void {
    cardComponent.newChildComponents.propertyOverwritables = {
      postBuildFuncs: {
        [COMPONENT_TYPES.TEXT]: DefaultModal.overwriteTitleProperties,
        [COMPONENT_TYPES.IMAGE]: DefaultModal.setComponentToRemovable,
        [COMPONENT_TYPES.BUTTON]: DefaultModal.setComponentToRemovable,
      },
    };
    cardComponent.newChildComponents.propertyOverwritables.onBuildProperties = {
      [COMPONENT_TYPES.IMAGE]: { alignmentSection: ALIGNED_SECTION_TYPES.CENTER },
      [COMPONENT_TYPES.BUTTON]: { alignmentSection: ALIGNED_SECTION_TYPES.RIGHT },
    };
    AddContainerComponent.add(cardComponent, COMPONENT_TYPES.TEXT, DEFAULT_STYLES.DEFAULT, layer1Component.baseSubcomponent.name);
    AddContainerComponent.add(cardComponent, COMPONENT_TYPES.BUTTON, BUTTON_STYLES.CLOSE, layer1Component.baseSubcomponent.name);
    AddContainerComponent.add(cardComponent, COMPONENT_TYPES.IMAGE, DEFAULT_STYLES.DEFAULT, layer1Component.baseSubcomponent.name);
    UpdateContainerComponentDropdownItemNames.updateViaParentLayerPreviewStructure(cardComponent, cardComponent.componentPreviewStructure.layers[0]);
  }

  public static addComponentsToBase(cardComponent: WorkshopComponent): void {
    const layer1Component = AddLayerComponent.add(cardComponent, LAYER_STYLES.CARD, true);
    DefaultModal.populateLayer1(cardComponent, layer1Component);
    const layer2Component = AddLayerComponent.add(cardComponent, LAYER_STYLES.CARD, true);
    DefaultModal.populateLayer2(cardComponent, layer2Component);
    const layer3Component = AddLayerComponent.add(cardComponent, LAYER_STYLES.CARD, true);
    DefaultModal.populateLayer3(cardComponent, layer3Component);
    UpdateLayerDropdownItemNames.update(cardComponent, 0);
  }

  public static setPropertyOverwritables(dropdownMenuComponent: WorkshopComponent): void {
    dropdownMenuComponent.newChildComponents.propertyOverwritables = {
      postBuildFuncs: {
        [COMPONENT_TYPES.LAYER]: DefaultModal.setComponentToRemovable,
      },
    };
  }
}

export const defaultModal: ComponentGenerator = {
  createNewComponent(): WorkshopComponent {
    const modalComponent = modalBase.createNewComponent({});
    DefaultModal.addComponentsToBase(modalComponent);
    ModalBaseSpecificSettings.set(modalComponent);
    return modalComponent;
  },
}
