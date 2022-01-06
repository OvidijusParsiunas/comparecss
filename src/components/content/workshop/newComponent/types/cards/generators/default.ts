import { UpdateContainerComponentDropdownItemNames } from '../../../../utils/componentManipulation/updateChildComponent/updateContainerComponentDropdownItemNames';
import { UpdateLayerDropdownItemNames } from '../../../../utils/componentManipulation/updateChildComponent/updateLayerDropdownItemNames';
import { CustomCss, CustomFeatures, CustomStaticFeatures, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { AddContainerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addContainerComponent';
import { AddLayerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addLayerComponent';
import { BUTTON_STYLES, DEFAULT_STYLES, LAYER_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { HORIZONTAL_ALIGNMENT_SECTIONS } from '../../../../../../../consts/horizontalAlignmentSections';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { cardBase } from './base';

class DefaultCard extends ComponentBuilder {

  private static setComponentToRemovable(component: WorkshopComponent): void {
    component.baseSubcomponent.isRemovable = true;
  }

  private static overwriteTextCustomStaticFeatures(customStaticFeatures: CustomStaticFeatures, text?: string) {
    customStaticFeatures.subcomponentText = ComponentBuilder.createText(text || 'text');
    customStaticFeatures.alignment = ComponentBuilder.createHorizontalAlignmentSection(HORIZONTAL_ALIGNMENT_SECTIONS.LEFT);
  }

  private static overwriteCancelButtonProperties(cancelButton: WorkshopComponent): void {
    const { baseSubcomponent } = cancelButton.sync.syncables.onSyncComponents.uniqueComponents[COMPONENT_TYPES.TEXT];
    DefaultCard.overwriteTextCustomStaticFeatures(baseSubcomponent.customStaticFeatures, 'Cancel');
    DefaultCard.overwriteTextCustomStaticFeatures(baseSubcomponent.defaultCustomStaticFeatures, 'Cancel');
    DefaultCard.setComponentToRemovable(cancelButton);
  }

  private static overwriteSubmitButtonProperties(submitButtonComponent: WorkshopComponent): void {
    const { baseSubcomponent } = submitButtonComponent.sync.syncables.onSyncComponents.uniqueComponents[COMPONENT_TYPES.TEXT];
    DefaultCard.overwriteTextCustomStaticFeatures(baseSubcomponent.customStaticFeatures, 'Submit');
    DefaultCard.overwriteTextCustomStaticFeatures(baseSubcomponent.defaultCustomStaticFeatures, 'Submit');
    DefaultCard.setComponentToRemovable(submitButtonComponent);
  }

  private static populateLayer3(cardComponent: WorkshopComponent, layer3Component: WorkshopComponent): void {
    cardComponent.childComponentHandlers.onAddOverwritables.postBuildFuncs[COMPONENT_TYPES.BUTTON].tempAndComplete = [DefaultCard.overwriteSubmitButtonProperties];
    AddContainerComponent.add(cardComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLES.DEFAULT, layer3Component.baseSubcomponent.name);
    cardComponent.childComponentHandlers.onAddOverwritables.postBuildFuncs[COMPONENT_TYPES.BUTTON].tempAndComplete = [DefaultCard.overwriteCancelButtonProperties];
    AddContainerComponent.add(cardComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLES.DEFAULT, layer3Component.baseSubcomponent.name);
    UpdateContainerComponentDropdownItemNames.updateViaParentLayerPreviewStructure(cardComponent, cardComponent.componentPreviewStructure.layers[2]);
  }

  private static createDefaultTextCustomFeatures(): CustomFeatures {
    return {
      autoSize: ComponentBuilder.createAutoSize(true, true),
    };
  }

  private static overwriteDescriptionProperties(textComponent: WorkshopComponent): void {
    textComponent.baseSubcomponent.customFeatures = DefaultCard.createDefaultTextCustomFeatures();
    textComponent.baseSubcomponent.defaultCustomFeatures = DefaultCard.createDefaultTextCustomFeatures();
    DefaultCard.overwriteTextCustomStaticFeatures(textComponent.baseSubcomponent.customStaticFeatures, 'Description');
    DefaultCard.overwriteTextCustomStaticFeatures(textComponent.baseSubcomponent.defaultCustomStaticFeatures, 'Description');
    DefaultCard.setComponentToRemovable(textComponent);
  }

  private static populateLayer2(cardComponent: WorkshopComponent, layer2Component: WorkshopComponent): void {
    cardComponent.childComponentHandlers.onAddOverwritables.postBuildFuncs[COMPONENT_TYPES.TEXT].tempAndComplete = [DefaultCard.overwriteDescriptionProperties];
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
    textComponent.baseSubcomponent.customCss = DefaultCard.createDefaultTitleCss();
    textComponent.baseSubcomponent.defaultCss = DefaultCard.createDefaultTitleCss();
    textComponent.baseSubcomponent.customFeatures = DefaultCard.createDefaultTextCustomFeatures();
    textComponent.baseSubcomponent.defaultCustomFeatures = DefaultCard.createDefaultTextCustomFeatures();
    DefaultCard.overwriteTextCustomStaticFeatures(textComponent.baseSubcomponent.customStaticFeatures, 'Card title');
    DefaultCard.overwriteTextCustomStaticFeatures(textComponent.baseSubcomponent.defaultCustomStaticFeatures, 'Card title');
    DefaultCard.setComponentToRemovable(textComponent);
  }

  private static populateLayer1(cardComponent: WorkshopComponent, layer1Component: WorkshopComponent): void {
    cardComponent.childComponentHandlers.onAddOverwritables.postBuildFuncs = {
      [COMPONENT_TYPES.TEXT]: { tempAndComplete: [DefaultCard.overwriteTitleProperties] },
      [COMPONENT_TYPES.IMAGE]: { completeOnly: [DefaultCard.setComponentToRemovable] },
      [COMPONENT_TYPES.BUTTON]: { completeOnly: [DefaultCard.setComponentToRemovable] },
    };
    cardComponent.childComponentHandlers.onAddOverwritables.onBuildProperties = {
      [COMPONENT_TYPES.IMAGE]:  { horizontalSection: HORIZONTAL_ALIGNMENT_SECTIONS.CENTER },
      [COMPONENT_TYPES.BUTTON]: { horizontalSection: HORIZONTAL_ALIGNMENT_SECTIONS.RIGHT },
    };
    AddContainerComponent.add(cardComponent, COMPONENT_TYPES.TEXT, DEFAULT_STYLES.DEFAULT, layer1Component.baseSubcomponent.name);
    AddContainerComponent.add(cardComponent, COMPONENT_TYPES.BUTTON, BUTTON_STYLES.CLOSE, layer1Component.baseSubcomponent.name);
    AddContainerComponent.add(cardComponent, COMPONENT_TYPES.IMAGE, DEFAULT_STYLES.DEFAULT, layer1Component.baseSubcomponent.name);
    UpdateContainerComponentDropdownItemNames.updateViaParentLayerPreviewStructure(cardComponent, cardComponent.componentPreviewStructure.layers[0]);
  }

  private static populateLayers(layer1Component: WorkshopComponent, layer2Component: WorkshopComponent,
      layer3Component: WorkshopComponent, cardComponent: WorkshopComponent): void {
    const tempPostBuildFuncs = cardComponent.childComponentHandlers.onAddOverwritables.postBuildFuncs;
    DefaultCard.populateLayer1(cardComponent, layer1Component);
    DefaultCard.populateLayer2(cardComponent, layer2Component);
    DefaultCard.populateLayer3(cardComponent, layer3Component);
    cardComponent.childComponentHandlers.onAddOverwritables.postBuildFuncs = tempPostBuildFuncs;
  }

  public static addComponentsToBase(cardComponent: WorkshopComponent): void {
    const layer1Component = AddLayerComponent.add(cardComponent, LAYER_STYLES.CARD, true);
    const layer2Component = AddLayerComponent.add(cardComponent, LAYER_STYLES.CARD, true);
    const layer3Component = AddLayerComponent.add(cardComponent, LAYER_STYLES.CARD, true);
    DefaultCard.populateLayers(layer1Component, layer2Component, layer3Component, cardComponent);
    UpdateLayerDropdownItemNames.update(cardComponent, 0);
  }
}

export const defaultCard: ComponentGenerator = {
  createNewComponent(): WorkshopComponent {
    const cardComponent = cardBase.createNewComponent({});
    DefaultCard.addComponentsToBase(cardComponent);
    return cardComponent;
  },
}
