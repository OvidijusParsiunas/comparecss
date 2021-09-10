import { UpdateGenericComponentDropdownOptionNames } from '../../../../utils/componentManipulation/updateChildComponent/updateGenericComponentDropdownOptionNames';
import { UpdateLayerDropdownOptionNames } from '../../../../utils/componentManipulation/updateChildComponent/updateLayerDropdownOptionNames';
import { CustomCss, CustomFeatures, CustomStaticFeatures, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { AddContainerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addContainerComponent';
import { AddLayerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addLayerComponent';
import { BUTTON_STYLES, DEFAULT_STYLES, LAYER_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CoreSubcomponentRefs } from '../../../../../../../interfaces/coreSubcomponentRefs';
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
      alignedLayerSection: ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.LEFT),
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
    };
  }

  private static overwriteTitleProperties(coreSubcomponentRefs: CoreSubcomponentRefs): void {
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customCss = DefaultCard.createDefaultTitleCss();
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].defaultCss = DefaultCard.createDefaultTitleCss();
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customFeatures = DefaultCard.createDefaultTextCustomFeatures();
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].defaultCustomFeatures = DefaultCard.createDefaultTextCustomFeatures();
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Card title');
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].defaultCustomStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Card title');
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
  }

  private static overwriteCloseButtonProperties(coreSubcomponentRefs: CoreSubcomponentRefs): void {
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].defaultCustomFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
  }

  private static overwriteImageProperties(coreSubcomponentRefs: CoreSubcomponentRefs): void {
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.CENTER);
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].defaultCustomFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.CENTER);
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
  }

  private static overwriteDescriptionProperties(coreSubcomponentRefs: CoreSubcomponentRefs): void {
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customFeatures = DefaultCard.createDefaultTextCustomFeatures();
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].defaultCustomFeatures = DefaultCard.createDefaultTextCustomFeatures();
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Description');
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].defaultCustomStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Description');
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
  }

  private static overwriteSubmitButtonProperties(coreSubcomponentRefs: CoreSubcomponentRefs): void {
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].defaultCustomFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.TEXT].customStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Submit');
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.TEXT].defaultCustomStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Submit');
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
  }

  private static overwriteLayerProperties(coreSubcomponentRefs: CoreSubcomponentRefs): void {
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
  }

  private static overwriteCancelButtonProperties(coreSubcomponentRefs: CoreSubcomponentRefs): void {
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].defaultCustomFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.TEXT].customStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Cancel');
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.TEXT].defaultCustomStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Cancel');
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
  }

  private static addNewLayers(cardComponent: WorkshopComponent): WorkshopComponent[] {
    const layer1Component = AddLayerComponent.add(cardComponent, LAYER_STYLES.CARD, true, DefaultCard.overwriteLayerProperties);
    const layer2Component = AddLayerComponent.add(cardComponent, LAYER_STYLES.CARD, true, DefaultCard.overwriteLayerProperties);
    const layer3Component = AddLayerComponent.add(cardComponent, LAYER_STYLES.CARD, true, DefaultCard.overwriteLayerProperties);
    return [layer1Component, layer2Component, layer3Component];
  }

  public static addComponentsToBase(cardComponent: WorkshopComponent): void {
    const [layer1Component, layer2Component, layer3Component] = DefaultCard.addNewLayers(cardComponent);
    UpdateLayerDropdownOptionNames.update(cardComponent, 0);
    AddContainerComponent.add(cardComponent, COMPONENT_TYPES.TEXT, DEFAULT_STYLES.DEFAULT,
      layer1Component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name, [DefaultCard.overwriteTitleProperties]);
    AddContainerComponent.add(cardComponent, COMPONENT_TYPES.BUTTON, BUTTON_STYLES.CLOSE,
      layer1Component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name, [DefaultCard.overwriteCloseButtonProperties]);
    AddContainerComponent.add(cardComponent, COMPONENT_TYPES.IMAGE, DEFAULT_STYLES.DEFAULT,
      layer1Component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name, [DefaultCard.overwriteImageProperties]);
    AddContainerComponent.add(cardComponent, COMPONENT_TYPES.TEXT, DEFAULT_STYLES.DEFAULT,
      layer2Component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name, [DefaultCard.overwriteDescriptionProperties]);
    AddContainerComponent.add(cardComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLES.DEFAULT,
      layer3Component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name, [DefaultCard.overwriteSubmitButtonProperties]);
    AddContainerComponent.add(cardComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLES.DEFAULT,
      layer3Component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name, [DefaultCard.overwriteCancelButtonProperties]);
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(cardComponent, cardComponent.componentPreviewStructure.layers[0]);
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(cardComponent, cardComponent.componentPreviewStructure.layers[1]);
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(cardComponent, cardComponent.componentPreviewStructure.layers[2]);
  }
}

export const defaultCard: ComponentGenerator = {
  createNewComponent(): WorkshopComponent {
    const cardComponent = cardBase.createNewComponent();
    DefaultCard.addComponentsToBase(cardComponent);
    return cardComponent;
  },
}
