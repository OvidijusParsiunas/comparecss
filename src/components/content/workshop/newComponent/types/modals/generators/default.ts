import { UpdateGenericComponentDropdownOptionNames } from '../../../../utils/componentManipulation/updateNestedComponentNames/updateGenericComponentDropdownOptionNames';
import { CustomCss, CustomFeatures, CustomStaticFeatures, Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { UpdateDropdownOptionNamesShared } from '../../../../utils/componentManipulation/updateNestedComponentNames/updateDropdownOptionNamesShared';
import { UpdateLayerDropdownOptionNames } from '../../../../utils/componentManipulation/updateNestedComponentNames/updateLayerDropdownOptionNames';
import { AddNewGenericComponent } from '../../../../utils/componentManipulation/addNewNestedComponent/add/addNewGenericComponent';
import { AddNewLayerComponent } from '../../../../utils/componentManipulation/addNewNestedComponent/add/addNewLayerComponent';
import { BUTTON_STYLES, DEFAULT_STYLES, LAYER_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { LAYER_COMPONENTS_BASE_NAMES } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { CoreSubcomponentNames } from '../../../../../../../interfaces/customSubcomponentNames';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
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
  private static overwriteTitleProperties(subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames): void {
    subcomponents[coreSubcomponentNames.base].customCss = DefaultModal.createDefaultTitleCss();
    subcomponents[coreSubcomponentNames.base].defaultCss = DefaultModal.createDefaultTitleCss();
    subcomponents[coreSubcomponentNames.base].customFeatures = DefaultModal.createDefaultTextCustomFeatures();
    subcomponents[coreSubcomponentNames.base].defaultCustomFeatures = DefaultModal.createDefaultTextCustomFeatures();
    subcomponents[coreSubcomponentNames.base].customStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Card title');
    subcomponents[coreSubcomponentNames.base].defaultCustomStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Card title');
    subcomponents[coreSubcomponentNames.base].isRemovable = true;
  }

  private static overwriteDescriptionProperties(subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames): void {
    subcomponents[coreSubcomponentNames.base].customStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Description');
    subcomponents[coreSubcomponentNames.base].defaultCustomStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Description');
    subcomponents[coreSubcomponentNames.base].isRemovable = true;
  }

  private static overwriteSubmitButtonProperties(subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames): void {
    subcomponents[coreSubcomponentNames.base].customFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    subcomponents[coreSubcomponentNames.base].defaultCustomFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    subcomponents[coreSubcomponentNames.text].customStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Submit');
    subcomponents[coreSubcomponentNames.text].defaultCustomStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Submit');
    subcomponents[coreSubcomponentNames.base].isRemovable = true;
  }

  private static overwriteCancelButtonProperties(subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames): void {
    subcomponents[coreSubcomponentNames.base].customFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    subcomponents[coreSubcomponentNames.base].defaultCustomFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    subcomponents[coreSubcomponentNames.text].customStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Cancel');
    subcomponents[coreSubcomponentNames.text].defaultCustomStaticFeatures = DefaultModal.createDefaultTextCustomStaticFeatures('Cancel');
    subcomponents[coreSubcomponentNames.base].isRemovable = true;
  }

  private static overwriteCloseButtonProperties(subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames): void {
    subcomponents[coreSubcomponentNames.base].customFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    subcomponents[coreSubcomponentNames.base].defaultCustomFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    subcomponents[coreSubcomponentNames.base].isRemovable = true;
  }

  private static overwriteLayerProperties(subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames): void {
    const nestedDropdownStructure = this as any as NestedDropdownStructure;
    subcomponents[coreSubcomponentNames.base].newNestedComponentsOptions = nestedDropdownStructure;
    subcomponents[coreSubcomponentNames.base].isRemovable = true;
  }

  public static addComponentsToBase(modalComponent: WorkshopComponent): void {
    const nestedDropdownStructure = modalComponent.newNestedComponentsOptionsRefs.layer;
    const layer1Component = AddNewLayerComponent.add(modalComponent, LAYER_STYLES.CARD, true, DefaultModal.overwriteLayerProperties.bind(nestedDropdownStructure));
    const layer2Component = AddNewLayerComponent.add(modalComponent, LAYER_STYLES.CARD, true, DefaultModal.overwriteLayerProperties.bind(nestedDropdownStructure));
    const layer3Component = AddNewLayerComponent.add(modalComponent, LAYER_STYLES.CARD, true, DefaultModal.overwriteLayerProperties.bind(nestedDropdownStructure));
    UpdateLayerDropdownOptionNames.update(modalComponent, 0);
    AddNewGenericComponent.add(modalComponent, COMPONENT_TYPES.TEXT, DEFAULT_STYLES.DEFAULT,
      layer1Component.coreSubcomponentNames.base, [DefaultModal.overwriteTitleProperties]);
    AddNewGenericComponent.add(modalComponent, COMPONENT_TYPES.BUTTON, BUTTON_STYLES.CLOSE,
      layer1Component.coreSubcomponentNames.base, [DefaultModal.overwriteCloseButtonProperties]);
    AddNewGenericComponent.add(modalComponent, COMPONENT_TYPES.TEXT, DEFAULT_STYLES.DEFAULT,
      layer2Component.coreSubcomponentNames.base, [DefaultModal.overwriteDescriptionProperties]);
    AddNewGenericComponent.add(modalComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLES.DEFAULT,
      layer3Component.coreSubcomponentNames.base, [DefaultModal.overwriteSubmitButtonProperties]);
    AddNewGenericComponent.add(modalComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLES.DEFAULT,
      layer3Component.coreSubcomponentNames.base, [DefaultModal.overwriteCancelButtonProperties]);
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(modalComponent, modalComponent.componentPreviewStructure.layers[0]);
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(modalComponent, modalComponent.componentPreviewStructure.layers[1]);
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(modalComponent, modalComponent.componentPreviewStructure.layers[2]);
  }

  public static overwriteBaseNewNestedComponentsOptions(modalComponent: WorkshopComponent): void {
    const { subcomponents, coreSubcomponentNames } = modalComponent;
    const nestedDropdownStructure = UpdateDropdownOptionNamesShared.generateNestedDropdownStructure([LAYER_COMPONENTS_BASE_NAMES.LAYER]);
    subcomponents[coreSubcomponentNames.base].newNestedComponentsOptions = nestedDropdownStructure;
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
