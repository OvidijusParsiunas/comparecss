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
    cancelButton.sync.syncables.onCopy.subcomponents[SUBCOMPONENT_TYPES.TEXT].customStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Cancel');
    cancelButton.sync.syncables.onCopy.subcomponents[SUBCOMPONENT_TYPES.TEXT].defaultCustomStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Cancel');
    DefaultCard.setComponentToRemovable(cancelButton);
  }

  private static overwriteSubmitButtonProperties(submitButtonComponent: WorkshopComponent): void {
    submitButtonComponent.sync.syncables.onCopy.subcomponents[SUBCOMPONENT_TYPES.TEXT].customStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Submit');
    submitButtonComponent.sync.syncables.onCopy.subcomponents[SUBCOMPONENT_TYPES.TEXT].defaultCustomStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Submit');
    DefaultCard.setComponentToRemovable(submitButtonComponent);
  }

  private static populateLayer3(cardComponent: WorkshopComponent, layer3Component: WorkshopComponent): void {
    cardComponent.newChildComponents.propertyOverwritables.funcsToOverwritePropertiesPostBuild[COMPONENT_TYPES.BUTTON] = DefaultCard.overwriteSubmitButtonProperties;
    AddContainerComponent.add(cardComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLES.DEFAULT, layer3Component.baseSubcomponent.name);
    cardComponent.newChildComponents.propertyOverwritables.funcsToOverwritePropertiesPostBuild[COMPONENT_TYPES.BUTTON] = DefaultCard.overwriteCancelButtonProperties;
    AddContainerComponent.add(cardComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLES.DEFAULT, layer3Component.baseSubcomponent.name);
    UpdateGenericComponentDropdownItemNames.updateViaParentLayerPreviewStructure(cardComponent, cardComponent.componentPreviewStructure.layers[2]);
  }

  private static createDefaultTextCustomFeatures(): CustomFeatures {
    return {
      autoSize: ComponentBuilder.createAutoSize(true, true),
    };
  }

  private static overwriteDescriptionProperties(textComponent: WorkshopComponent): void {
    textComponent.baseSubcomponent.customFeatures = DefaultCard.createDefaultTextCustomFeatures();
    textComponent.baseSubcomponent.defaultCustomFeatures = DefaultCard.createDefaultTextCustomFeatures();
    textComponent.baseSubcomponent.customStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Description');
    textComponent.baseSubcomponent.defaultCustomStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Description');
    DefaultCard.setComponentToRemovable(textComponent);
  }

  private static populateLayer2(cardComponent: WorkshopComponent, layer2Component: WorkshopComponent): void {
    cardComponent.newChildComponents.propertyOverwritables.funcsToOverwritePropertiesPostBuild[COMPONENT_TYPES.TEXT] = DefaultCard.overwriteDescriptionProperties;
    AddContainerComponent.add(cardComponent, COMPONENT_TYPES.TEXT, DEFAULT_STYLES.DEFAULT, layer2Component.baseSubcomponent.name);
    UpdateGenericComponentDropdownItemNames.updateViaParentLayerPreviewStructure(cardComponent, cardComponent.componentPreviewStructure.layers[1]);
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
    textComponent.baseSubcomponent.customStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Card title');
    textComponent.baseSubcomponent.defaultCustomStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Card title');
    DefaultCard.setComponentToRemovable(textComponent);
  }

  private static populateLayer1(cardComponent: WorkshopComponent, layer1Component: WorkshopComponent): void {
    cardComponent.newChildComponents.propertyOverwritables = {
      funcsToOverwritePropertiesPostBuild: {
        [COMPONENT_TYPES.TEXT]: DefaultCard.overwriteTitleProperties,
        [COMPONENT_TYPES.IMAGE]: DefaultCard.setComponentToRemovable,
        [COMPONENT_TYPES.BUTTON]: DefaultCard.setComponentToRemovable,
      }
    };
    cardComponent.newChildComponents.propertyOverwritables.propertiesAddedOnBuild = {
      [COMPONENT_TYPES.IMAGE]:  { alignmentSection: ALIGNED_SECTION_TYPES.CENTER },
      [COMPONENT_TYPES.BUTTON]: { alignmentSection: ALIGNED_SECTION_TYPES.RIGHT },
    };
    AddContainerComponent.add(cardComponent, COMPONENT_TYPES.TEXT, DEFAULT_STYLES.DEFAULT, layer1Component.baseSubcomponent.name);
    AddContainerComponent.add(cardComponent, COMPONENT_TYPES.BUTTON, BUTTON_STYLES.CLOSE, layer1Component.baseSubcomponent.name);
    AddContainerComponent.add(cardComponent, COMPONENT_TYPES.IMAGE, DEFAULT_STYLES.DEFAULT, layer1Component.baseSubcomponent.name);
    UpdateGenericComponentDropdownItemNames.updateViaParentLayerPreviewStructure(cardComponent, cardComponent.componentPreviewStructure.layers[0]);
  }

  public static addComponentsToBase(cardComponent: WorkshopComponent): void {
    const layer1Component = AddLayerComponent.add(cardComponent, LAYER_STYLES.CARD, true);
    DefaultCard.populateLayer1(cardComponent, layer1Component);
    const layer2Component = AddLayerComponent.add(cardComponent, LAYER_STYLES.CARD, true);
    DefaultCard.populateLayer2(cardComponent, layer2Component);
    const layer3Component = AddLayerComponent.add(cardComponent, LAYER_STYLES.CARD, true);
    DefaultCard.populateLayer3(cardComponent, layer3Component);
    UpdateLayerDropdownItemNames.update(cardComponent, 0);
  }

  public static resetPropertyOverwritables(cardComponent: WorkshopComponent): void {
    cardComponent.newChildComponents.propertyOverwritables = {
      funcsToOverwritePropertiesPostBuild: {
        [COMPONENT_TYPES.LAYER]: DefaultCard.setComponentToRemovable,
      },
    };
  }
}

export const defaultCard: ComponentGenerator = {
  createNewComponent(): WorkshopComponent {
    const cardComponent = cardBase.createNewComponent({});
    DefaultCard.addComponentsToBase(cardComponent);
    DefaultCard.resetPropertyOverwritables(cardComponent);
    return cardComponent;
  },
}
