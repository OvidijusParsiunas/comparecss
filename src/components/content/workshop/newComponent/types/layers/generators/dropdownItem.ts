import { CustomCss, CustomFeatures, CustomStaticFeatures, SubcomponentProperties, Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { UpdateGenericComponentDropdownOptionNames } from '../../../../utils/componentManipulation/updateNestedComponentNames/updateGenericComponentDropdownOptionNames';
import { AddNewGenericComponent } from '../../../../utils/componentManipulation/addNewNestedComponent/add/addNewGenericComponent';
import { MultiBaseComponentUtils } from '../../../../utils/multiBaseComponent/multiBaseComponentUtils';
import { CoreSubcomponentNames } from '../../../../../../../interfaces/customSubcomponentNames';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { LAYER_STYLES, TEXT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { layerBase } from './base';

interface OverwriteTextPropertiesBaseComponents {
  parentComponent: WorkshopComponent;
  activeBaseComponent: WorkshopComponent;
}

export class DropdownItemLayer extends ComponentBuilder {

  private static addNestedComponentsToLayer(parentComponent: WorkshopComponent): WorkshopComponent[] {
    const layerComponent = this as undefined as WorkshopComponent;
    const activeBaseComponent = MultiBaseComponentUtils.getCurrentlyActiveBaseComponent(parentComponent);
    const textComponent = AddNewGenericComponent.add(parentComponent, COMPONENT_TYPES.TEXT, TEXT_STYLES.BUTTON,
      layerComponent.coreSubcomponentNames.base,
      [DropdownItemLayer.overwriteTextProperties.bind({parentComponent, activeBaseComponent} as OverwriteTextPropertiesBaseComponents)]);
    layerComponent.componentPreviewStructure.baseSubcomponentProperties.nameOfAnotherSubcomponetToTrigger = textComponent.coreSubcomponentNames.base;
    layerComponent.nestedComponentsLockedToLayer.list.push(textComponent.coreSubcomponentNames.base);
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(parentComponent,
      activeBaseComponent.componentPreviewStructure.layers[activeBaseComponent.componentPreviewStructure.layers.length - 1]);
    return [textComponent];
  }

  public static createNestedComponentsLockedToLayer(layerComponent: WorkshopComponent): void {
    layerComponent.nestedComponentsLockedToLayer = { add: DropdownItemLayer.addNestedComponentsToLayer.bind(layerComponent), list: [] };
  }

  private static createDefaultTextCustomCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        top: '50%',
        width: 'max-content',
        fontWeight: '400',
        fontFamily: '"Helvetica Neue", Helvetica, Roboto, Arial, sans-serif',
        fontSize: '14px',
        color: '#212529',
        textAlign: 'left',
        backgroundColor: CSS_PROPERTY_VALUES.INHERIT,
        paddingTop: '0px',
        paddingBottom: '0px',
        paddingLeft: '0px',
        paddingRight: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        marginTop: '0px',
        marginBottom: '0px',
        height: '',
        borderWidth: '0',
        borderColor: '#1779ba',
        borderStyle: 'solid',
        borderRightWidth: '0px',
        borderLeftWidth: '0px',
        transition: CSS_PROPERTY_VALUES.UNSET,
        outline: 'none',
        left: '0px',
        cursor: 'pointer',
      },
      [CSS_PSEUDO_CLASSES.HOVER]: {
        color: '#ffffff',
      },
      [CSS_PSEUDO_CLASSES.CLICK]: {
        color: CSS_PROPERTY_VALUES.INHERIT,
      },
    };
  }

  private static createDefaultTextCustomFeatures(): CustomFeatures {
    return {
      autoSize: ComponentBuilder.createAutoSize(true, true),
      alignedLayerSection: ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.LEFT),
    };
  }

  private static createDefaultTextCustomStaticFeatures(text?: string): CustomStaticFeatures {
    return {
      subcomponentText: ComponentBuilder.createText(text || 'text'),
    };
  }

  public static overwriteTextProperties(subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames): void {
    const { parentComponent, activeBaseComponent } = this as unknown as OverwriteTextPropertiesBaseComponents;
    const { layers: activeBaseComponentLayers } = activeBaseComponent.componentPreviewStructure;
    if (activeBaseComponentLayers.length > 1) {
      const siblingDropdownItem = activeBaseComponentLayers[activeBaseComponentLayers.length - 2];
      const nestedTextComponentName = siblingDropdownItem.subcomponentProperties.nestedComponent.ref.nestedComponentsLockedToLayer.list[0];
      subcomponents[coreSubcomponentNames.base].customCss = parentComponent.subcomponents[nestedTextComponentName].customCss;
      subcomponents[coreSubcomponentNames.base].defaultCss = parentComponent.subcomponents[nestedTextComponentName].defaultCss;
      subcomponents[coreSubcomponentNames.base].customFeatures = parentComponent.subcomponents[nestedTextComponentName].customFeatures;
      subcomponents[coreSubcomponentNames.base].defaultCustomFeatures = parentComponent.subcomponents[nestedTextComponentName].defaultCustomFeatures;
    } else {
      subcomponents[coreSubcomponentNames.base].customCss = DropdownItemLayer.createDefaultTextCustomCss();
      subcomponents[coreSubcomponentNames.base].defaultCss = DropdownItemLayer.createDefaultTextCustomCss();
      subcomponents[coreSubcomponentNames.base].customFeatures = DropdownItemLayer.createDefaultTextCustomFeatures();
      subcomponents[coreSubcomponentNames.base].defaultCustomFeatures = DropdownItemLayer.createDefaultTextCustomFeatures();
    }
    subcomponents[coreSubcomponentNames.base].customStaticFeatures = DropdownItemLayer.createDefaultTextCustomStaticFeatures('Dropdown item');
    subcomponents[coreSubcomponentNames.base].defaultCustomStaticFeatures = DropdownItemLayer.createDefaultTextCustomStaticFeatures('Dropdown item');
  }

  public static setStyle(component: WorkshopComponent): void {
    component.style = LAYER_STYLES.DROPDOWN_ITEM;
  }

  // WORK1
  // the reason why subcomponentProperties need to be passed in via arg rather than being binded by default is because the first dropdownItem's customFeatures reference is copied
  // across all items in the dropdown menu
  public static callback(subcomponentProperties: SubcomponentProperties): void {
    if (subcomponentProperties.parentAuxiliaryComponent.subcomponents[subcomponentProperties.parentAuxiliaryComponent.coreSubcomponentNames.base].customFeatures.dropdownSelect.enabled) {
      if (subcomponentProperties.nestedComponent) {
        const newText = subcomponentProperties.parentAuxiliaryComponent.auxiliaryComponentCoreComponentRef.subcomponents[subcomponentProperties.nestedComponent.ref.nestedComponentsLockedToLayer.list[0]].customStaticFeatures.subcomponentText.text;
        subcomponentProperties.parentAuxiliaryComponent.subcomponents[subcomponentProperties.parentAuxiliaryComponent.coreSubcomponentNames.base].customFeatures.dropdownSelect.lastSelectedItemText = newText;
      } else {
        const coreBaseComponent = subcomponentProperties.parentAuxiliaryComponent.auxiliaryComponentCoreComponentRef;
        coreBaseComponent.subcomponents[coreBaseComponent.coreSubcomponentNames.text].customStaticFeatures.dropdownSelect = subcomponentProperties.customFeatures.dropdownSelect; 
      }
    }
  }

  private static createDefaultButtonBaseCustomFeatures(): CustomFeatures {
    return {
      animations: ComponentBuilder.createStationaryAnimations({}),
      // WORK1
      mouseEventCallbacks: {
        'click': DropdownItemLayer.callback,
      }
    };
  }

  private static createDefaultLayerCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        position: 'relative',
        height: '30px',
        textAlign: 'left',
        paddingLeft: '20px',
        paddingTop: '0px',
        paddingRight: '0px',
        paddingBottom: '0px',
        borderBottomWidth: '0px',
        borderBottomStyle: 'solid',
        borderBottomColor: '#e9ecef',
        cursor: 'pointer',
        backgroundColor: CSS_PROPERTY_VALUES.INHERIT,
        boxShadow: CSS_PROPERTY_VALUES.UNSET,
      },
      [CSS_PSEUDO_CLASSES.HOVER]: {
        backgroundColor: '#5050da',
      },
      [CSS_PSEUDO_CLASSES.CLICK]: {
        backgroundColor: CSS_PROPERTY_VALUES.INHERIT,
      },
    };
  }

  private static overwriteCustomCss(baseSubcomponent: SubcomponentProperties): void {
    baseSubcomponent.customCss = DropdownItemLayer.createDefaultLayerCss();
    baseSubcomponent.defaultCss = DropdownItemLayer.createDefaultLayerCss();
    baseSubcomponent.customFeatures = DropdownItemLayer.createDefaultButtonBaseCustomFeatures();
    baseSubcomponent.defaultCustomFeatures = DropdownItemLayer.createDefaultButtonBaseCustomFeatures();
  }

  public static overwriteBase(component: WorkshopComponent): void {
    const baseSubcomponent = component.subcomponents[component.coreSubcomponentNames.base];
    DropdownItemLayer.overwriteCustomCss(baseSubcomponent);
    baseSubcomponent.isRemovable = true;
  }
}

export const dropdownItemLayer: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const layerComponent = layerBase.createNewComponent(baseName);
    DropdownItemLayer.overwriteBase(layerComponent);
    DropdownItemLayer.createNestedComponentsLockedToLayer(layerComponent);
    DropdownItemLayer.setStyle(layerComponent);
    return layerComponent;
  },
};
