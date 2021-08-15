import { UpdateGenericComponentDropdownOptionNames } from '../../../../utils/componentManipulation/updateNestedComponentNames/updateGenericComponentDropdownOptionNames';
import { UpdateLayerDropdownOptionNames } from '../../../../utils/componentManipulation/updateNestedComponentNames/updateLayerDropdownOptionNames';
import { CustomCss, CustomFeatures, CustomStaticFeatures, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { AddNewGenericComponent } from '../../../../utils/componentManipulation/addNewNestedComponent/add/addNewGenericComponent';
import { AddNewLayerComponent } from '../../../../utils/componentManipulation/addNewNestedComponent/add/addNewLayerComponent';
import { BUTTON_STYLES, DEFAULT_STYLES, LAYER_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CoreSubcomponentRefs } from '../../../../../../../interfaces/coreSubcomponentRefs';
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

  private static overwriteTitleProperties(coreSubcomponentRefs: CoreSubcomponentRefs): void {
    coreSubcomponentRefs.base.customCss = DefaultCard.createDefaultTitleCss();
    coreSubcomponentRefs.base.defaultCss = DefaultCard.createDefaultTitleCss();
    coreSubcomponentRefs.base.customFeatures = DefaultCard.createDefaultTextCustomFeatures();
    coreSubcomponentRefs.base.defaultCustomFeatures = DefaultCard.createDefaultTextCustomFeatures();
    coreSubcomponentRefs.base.customStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Card title');
    coreSubcomponentRefs.base.defaultCustomStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Card title');
    coreSubcomponentRefs.base.isRemovable = true;
  }

  private static overwriteCloseButtonProperties(coreSubcomponentRefs: CoreSubcomponentRefs): void {
    coreSubcomponentRefs.base.customFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    coreSubcomponentRefs.base.defaultCustomFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    coreSubcomponentRefs.base.isRemovable = true;
  }

  private static overwriteImageProperties(coreSubcomponentRefs: CoreSubcomponentRefs): void {
    coreSubcomponentRefs.base.customFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.CENTER);
    coreSubcomponentRefs.base.defaultCustomFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.CENTER);
    coreSubcomponentRefs.base.isRemovable = true;
  }

  private static overwriteDescriptionProperties(coreSubcomponentRefs: CoreSubcomponentRefs): void {
    coreSubcomponentRefs.base.customFeatures = DefaultCard.createDefaultTextCustomFeatures();
    coreSubcomponentRefs.base.defaultCustomFeatures = DefaultCard.createDefaultTextCustomFeatures();
    coreSubcomponentRefs.base.customStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Description');
    coreSubcomponentRefs.base.defaultCustomStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Description');
    coreSubcomponentRefs.base.isRemovable = true;
  }

  private static overwriteSubmitButtonProperties(coreSubcomponentRefs: CoreSubcomponentRefs): void {
    coreSubcomponentRefs.base.customFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    coreSubcomponentRefs.base.defaultCustomFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    coreSubcomponentRefs.text.customStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Submit');
    coreSubcomponentRefs.text.defaultCustomStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Submit');
    coreSubcomponentRefs.base.isRemovable = true;
  }

  private static overwriteLayerProperties(coreSubcomponentRefs: CoreSubcomponentRefs): void {
    coreSubcomponentRefs.base.isRemovable = true;
  }

  private static overwriteCancelButtonProperties(coreSubcomponentRefs: CoreSubcomponentRefs): void {
    coreSubcomponentRefs.base.customFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    coreSubcomponentRefs.base.defaultCustomFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    coreSubcomponentRefs.text.customStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Cancel');
    coreSubcomponentRefs.text.defaultCustomStaticFeatures = DefaultCard.createDefaultTextCustomStaticFeatures('Cancel');
    coreSubcomponentRefs.base.isRemovable = true;
  }

  private static addNewLayers(cardComponent: WorkshopComponent): WorkshopComponent[] {
    const layer1Component = AddNewLayerComponent.add(cardComponent, LAYER_STYLES.CARD, true, DefaultCard.overwriteLayerProperties);
    const layer2Component = AddNewLayerComponent.add(cardComponent, LAYER_STYLES.CARD, true, DefaultCard.overwriteLayerProperties);
    const layer3Component = AddNewLayerComponent.add(cardComponent, LAYER_STYLES.CARD, true, DefaultCard.overwriteLayerProperties);
    return [layer1Component, layer2Component, layer3Component];
  }

  public static addComponentsToBase(cardComponent: WorkshopComponent): void {
    const [layer1Component, layer2Component, layer3Component] = DefaultCard.addNewLayers(cardComponent);
    UpdateLayerDropdownOptionNames.update(cardComponent, 0);
    AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.TEXT, DEFAULT_STYLES.DEFAULT,
      layer1Component.coreSubcomponentRefs.base.name, [DefaultCard.overwriteTitleProperties]);
    AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.BUTTON, BUTTON_STYLES.CLOSE,
      layer1Component.coreSubcomponentRefs.base.name, [DefaultCard.overwriteCloseButtonProperties]);
    AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.IMAGE, DEFAULT_STYLES.DEFAULT,
      layer1Component.coreSubcomponentRefs.base.name, [DefaultCard.overwriteImageProperties]);
    AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.TEXT, DEFAULT_STYLES.DEFAULT,
      layer2Component.coreSubcomponentRefs.base.name, [DefaultCard.overwriteDescriptionProperties]);
    AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLES.DEFAULT,
      layer3Component.coreSubcomponentRefs.base.name, [DefaultCard.overwriteSubmitButtonProperties]);
    AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLES.DEFAULT,
      layer3Component.coreSubcomponentRefs.base.name, [DefaultCard.overwriteCancelButtonProperties]);
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
