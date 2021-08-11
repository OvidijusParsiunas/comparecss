import { UpdateGenericComponentDropdownOptionNames } from '../../../../utils/componentManipulation/updateNestedComponentNames/updateGenericComponentDropdownOptionNames';
import { UpdateDropdownOptionNamesShared } from '../../../../utils/componentManipulation/updateNestedComponentNames/updateDropdownOptionNamesShared';
import { UpdateLayerDropdownOptionNames } from '../../../../utils/componentManipulation/updateNestedComponentNames/updateLayerDropdownOptionNames';
import { CustomCss, CustomFeatures, CustomStaticFeatures, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { AddNewGenericComponent } from '../../../../utils/componentManipulation/addNewNestedComponent/add/addNewGenericComponent';
import { AddNewLayerComponent } from '../../../../utils/componentManipulation/addNewNestedComponent/add/addNewLayerComponent';
import { BUTTON_STYLES, DEFAULT_STYLES, LAYER_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { LAYER_COMPONENTS_BASE_NAMES } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CoreSubcomponentRefs } from '../../../../../../../interfaces/coreSubcomponentRefs';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
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
    }
  }
  private static overwriteTitleProperties(coreSubcomponentRefs: CoreSubcomponentRefs): void {
    coreSubcomponentRefs.base.customCss = DefaultModal.createDefaultTitleCss();
    coreSubcomponentRefs.base.defaultCss = DefaultModal.createDefaultTitleCss();
    coreSubcomponentRefs.base.customFeatures = DefaultModal.createDefaultTextCustomFeatures();
    coreSubcomponentRefs.base.defaultCustomFeatures = DefaultModal.createDefaultTextCustomFeatures();
    coreSubcomponentRefs.base.customStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Card title');
    coreSubcomponentRefs.base.defaultCustomStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Card title');
    coreSubcomponentRefs.base.isRemovable = true;
  }

  private static overwriteDescriptionProperties(coreSubcomponentRefs: CoreSubcomponentRefs): void {
    coreSubcomponentRefs.base.customStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Description');
    coreSubcomponentRefs.base.defaultCustomStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Description');
    coreSubcomponentRefs.base.isRemovable = true;
  }

  private static overwriteSubmitButtonProperties(coreSubcomponentRefs: CoreSubcomponentRefs): void {
    coreSubcomponentRefs.base.customFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    coreSubcomponentRefs.base.defaultCustomFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    coreSubcomponentRefs.text.customStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Submit');
    coreSubcomponentRefs.text.defaultCustomStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Submit');
    coreSubcomponentRefs.base.isRemovable = true;
  }

  private static overwriteCancelButtonProperties(coreSubcomponentRefs: CoreSubcomponentRefs): void {
    coreSubcomponentRefs.base.customFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    coreSubcomponentRefs.base.defaultCustomFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    coreSubcomponentRefs.text.customStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Cancel');
    coreSubcomponentRefs.text.defaultCustomStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Cancel');
    coreSubcomponentRefs.base.isRemovable = true;
  }

  private static overwriteCloseButtonProperties(coreSubcomponentRefs: CoreSubcomponentRefs): void {
    coreSubcomponentRefs.base.customFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    coreSubcomponentRefs.base.defaultCustomFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    coreSubcomponentRefs.base.isRemovable = true;
  }

  private static overwriteLayerProperties(coreSubcomponentRefs: CoreSubcomponentRefs): void {
    const nestedDropdownStructure = this as any as NestedDropdownStructure;
    coreSubcomponentRefs.base.newNestedComponentsOptions = nestedDropdownStructure;
    coreSubcomponentRefs.base.isRemovable = true;
  }

  public static addComponentsToBase(modalComponent: WorkshopComponent): void {
    const nestedDropdownStructure = modalComponent.newNestedComponentsOptionsRefs.layer;
    const layer1Component = AddNewLayerComponent.add(modalComponent, LAYER_STYLES.CARD, true, DefaultModal.overwriteLayerProperties.bind(nestedDropdownStructure));
    const layer2Component = AddNewLayerComponent.add(modalComponent, LAYER_STYLES.CARD, true, DefaultModal.overwriteLayerProperties.bind(nestedDropdownStructure));
    const layer3Component = AddNewLayerComponent.add(modalComponent, LAYER_STYLES.CARD, true, DefaultModal.overwriteLayerProperties.bind(nestedDropdownStructure));
    UpdateLayerDropdownOptionNames.update(modalComponent, 0);
    AddNewGenericComponent.add(modalComponent, COMPONENT_TYPES.TEXT, DEFAULT_STYLES.DEFAULT,
      layer1Component.coreSubcomponentRefs.base.name, [DefaultModal.overwriteTitleProperties]);
    AddNewGenericComponent.add(modalComponent, COMPONENT_TYPES.BUTTON, BUTTON_STYLES.CLOSE,
      layer1Component.coreSubcomponentRefs.base.name, [DefaultModal.overwriteCloseButtonProperties]);
    AddNewGenericComponent.add(modalComponent, COMPONENT_TYPES.TEXT, DEFAULT_STYLES.DEFAULT,
      layer2Component.coreSubcomponentRefs.base.name, [DefaultModal.overwriteDescriptionProperties]);
    AddNewGenericComponent.add(modalComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLES.DEFAULT,
      layer3Component.coreSubcomponentRefs.base.name, [DefaultModal.overwriteSubmitButtonProperties]);
    AddNewGenericComponent.add(modalComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLES.DEFAULT,
      layer3Component.coreSubcomponentRefs.base.name, [DefaultModal.overwriteCancelButtonProperties]);
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(modalComponent, modalComponent.componentPreviewStructure.layers[0]);
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(modalComponent, modalComponent.componentPreviewStructure.layers[1]);
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(modalComponent, modalComponent.componentPreviewStructure.layers[2]);
  }

  public static overwriteBaseNewNestedComponentsOptions(modalComponent: WorkshopComponent): void {
    const nestedDropdownStructure = UpdateDropdownOptionNamesShared.generateNestedDropdownStructure([LAYER_COMPONENTS_BASE_NAMES.LAYER]);
    modalComponent.coreSubcomponentRefs.base.newNestedComponentsOptions = nestedDropdownStructure;
  }
}

export const defaultModal: ComponentGenerator = {
  createNewComponent(): WorkshopComponent {
    const modalComponent = modalBase.createNewComponent();
    DefaultModal.overwriteBaseNewNestedComponentsOptions(modalComponent);
    DefaultModal.addComponentsToBase(modalComponent);
    return modalComponent;
  },
}
