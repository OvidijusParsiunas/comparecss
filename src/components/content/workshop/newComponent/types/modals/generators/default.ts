import { UpdateGenericComponentDropdownOptionNames } from '../../../../utils/componentManipulation/updateChildComponent/updateGenericComponentDropdownOptionNames';
import { UpdateDropdownOptionNamesShared } from '../../../../utils/componentManipulation/updateChildComponent/updateDropdownOptionNamesShared';
import { UpdateLayerDropdownOptionNames } from '../../../../utils/componentManipulation/updateChildComponent/updateLayerDropdownOptionNames';
import { CustomCss, CustomFeatures, CustomStaticFeatures, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { AddContainerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addContainerComponent';
import { AddLayerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addLayerComponent';
import { BUTTON_STYLES, DEFAULT_STYLES, LAYER_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { LAYER_COMPONENTS_BASE_NAMES } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CoreSubcomponentRefs } from '../../../../../../../interfaces/coreSubcomponentRefs';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { ModalBaseSpecificSettings } from '../settings/modalBaseSpecificSettings';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { modalBase } from './base';

class DefaultModal extends ComponentBuilder {

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
    }
  }
  private static overwriteTitleProperties(coreSubcomponentRefs: CoreSubcomponentRefs): void {
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customCss = DefaultModal.createDefaultTitleCss();
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].defaultCss = DefaultModal.createDefaultTitleCss();
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customFeatures = DefaultModal.createDefaultTextCustomFeatures();
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].defaultCustomFeatures = DefaultModal.createDefaultTextCustomFeatures();
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Card title');
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].defaultCustomStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Card title');
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
  }

  private static overwriteDescriptionProperties(coreSubcomponentRefs: CoreSubcomponentRefs): void {
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Description');
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].defaultCustomStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Description');
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
  }

  private static overwriteSubmitButtonProperties(coreSubcomponentRefs: CoreSubcomponentRefs): void {
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].defaultCustomFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.TEXT].customStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Submit');
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.TEXT].defaultCustomStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Submit');
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
  }

  private static overwriteCancelButtonProperties(coreSubcomponentRefs: CoreSubcomponentRefs): void {
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].defaultCustomFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.TEXT].customStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Cancel');
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.TEXT].defaultCustomStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Cancel');
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
  }

  private static overwriteCloseButtonProperties(coreSubcomponentRefs: CoreSubcomponentRefs): void {
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].defaultCustomFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
  }

  private static overwriteLayerProperties(coreSubcomponentRefs: CoreSubcomponentRefs): void {
    const nestedDropdownStructure = this as any as NestedDropdownStructure;
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].newChildComponentsOptions = nestedDropdownStructure;
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
  }

  public static addComponentsToBase(modalComponent: WorkshopComponent): void {
    const nestedDropdownStructure = modalComponent.newChildComponentsOptionsRefs.layer;
    const layer1Component = AddLayerComponent.add(modalComponent, LAYER_STYLES.CARD, true, DefaultModal.overwriteLayerProperties.bind(nestedDropdownStructure));
    const layer2Component = AddLayerComponent.add(modalComponent, LAYER_STYLES.CARD, true, DefaultModal.overwriteLayerProperties.bind(nestedDropdownStructure));
    const layer3Component = AddLayerComponent.add(modalComponent, LAYER_STYLES.CARD, true, DefaultModal.overwriteLayerProperties.bind(nestedDropdownStructure));
    UpdateLayerDropdownOptionNames.update(modalComponent, 0);
    AddContainerComponent.add(modalComponent, COMPONENT_TYPES.TEXT, DEFAULT_STYLES.DEFAULT,
      layer1Component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name, [DefaultModal.overwriteTitleProperties]);
    AddContainerComponent.add(modalComponent, COMPONENT_TYPES.BUTTON, BUTTON_STYLES.CLOSE,
      layer1Component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name, [DefaultModal.overwriteCloseButtonProperties]);
    AddContainerComponent.add(modalComponent, COMPONENT_TYPES.TEXT, DEFAULT_STYLES.DEFAULT,
      layer2Component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name, [DefaultModal.overwriteDescriptionProperties]);
    AddContainerComponent.add(modalComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLES.DEFAULT,
      layer3Component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name, [DefaultModal.overwriteSubmitButtonProperties]);
    AddContainerComponent.add(modalComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLES.DEFAULT,
      layer3Component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name, [DefaultModal.overwriteCancelButtonProperties]);
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(modalComponent, modalComponent.componentPreviewStructure.layers[0]);
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(modalComponent, modalComponent.componentPreviewStructure.layers[1]);
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(modalComponent, modalComponent.componentPreviewStructure.layers[2]);
  }

  public static overwriteBaseNewChildComponentsOptions(modalComponent: WorkshopComponent): void {
    const nestedDropdownStructure = UpdateDropdownOptionNamesShared.generateDropdownStructure([LAYER_COMPONENTS_BASE_NAMES.LAYER]);
    modalComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].newChildComponentsOptions = nestedDropdownStructure;
  }
}

export const defaultModal: ComponentGenerator = {
  createNewComponent(): WorkshopComponent {
    const modalComponent = modalBase.createNewComponent();
    DefaultModal.overwriteBaseNewChildComponentsOptions(modalComponent);
    DefaultModal.addComponentsToBase(modalComponent);
    ModalBaseSpecificSettings.set(modalComponent);
    return modalComponent;
  },
}
