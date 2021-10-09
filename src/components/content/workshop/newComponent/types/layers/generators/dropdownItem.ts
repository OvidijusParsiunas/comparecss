import { UpdateGenericComponentDropdownItemNames } from '../../../../utils/componentManipulation/updateChildComponent/updateGenericComponentDropdownItemNames';
import { CustomCss, CustomFeatures, CustomStaticFeatures, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { AddContainerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addContainerComponent';
import { SubcomponentMouseEventCallbacks } from '../../../../../../../interfaces/subcomponentMouseEventCallbacks';
import { SubcomponentTriggers } from '../../../../utils/componentManipulation/utils/subcomponentTriggers';
import { TEMPORARY_COMPONENT_BASE_NAME } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { OtherSubcomponentTriggers } from '../../../../../../../interfaces/otherSubcomponentTriggers';
import { ActiveComponentUtils } from '../../../../utils/activeComponent/activeComponentUtils';
import { LAYER_STYLES, TEXT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { SelectDropdownUtils } from '../../dropdowns/selectDropdown/selectDropdownUtils';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { JAVASCRIPT_CLASSES } from '../../../../../../../consts/javascriptClasses.enum';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { BORDER_STYLES } from '../../../../../../../consts/borderStyles.enum';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { SetUtils } from '../../../../utils/generic/setUtils';
import { layerBase } from './base';

export class DropdownItemLayer extends ComponentBuilder {

  private static createDefaultTextCustomFeatures(): CustomFeatures {
    return {
      autoSize: ComponentBuilder.createAutoSize(true, true),
    };
  }

  // split this into more granular methods
  public static setTextSubcomponentProperties(textComponent: WorkshopComponent): void {
    const menuComponent = this as unknown as WorkshopComponent;
    const { layers: activeBaseComponentLayers } = menuComponent.componentPreviewStructure;
    if (activeBaseComponentLayers.length > 1) {
      const siblingDropdownItem = activeBaseComponentLayers[activeBaseComponentLayers.length - 2];
      const childTextComponent = siblingDropdownItem.subcomponentProperties.seedComponent.childComponentsLockedToLayer.list[0];
      textComponent.baseSubcomponent.customCss = childTextComponent.customCss;
      textComponent.baseSubcomponent.defaultCss = childTextComponent.defaultCss;
      textComponent.baseSubcomponent.customFeatures = childTextComponent.customFeatures;
      textComponent.baseSubcomponent.defaultCustomFeatures = childTextComponent.defaultCustomFeatures;
    } else {
      const syncedDropdownComponent = menuComponent.linkedComponents.base.paddingComponent?.sync.componentThisIsSyncedTo;
      if (!syncedDropdownComponent) {
        textComponent.baseSubcomponent.customCss = menuComponent.newChildComponents.customCssOverwritables[SUBCOMPONENT_TYPES.TEXT]();
        textComponent.baseSubcomponent.defaultCss = menuComponent.newChildComponents.customCssOverwritables[SUBCOMPONENT_TYPES.TEXT]();
      } else {
        const { layers } = syncedDropdownComponent.paddingComponentChild.linkedComponents.auxiliary[0].componentPreviewStructure;
        const textSubcomponent = layers.length > 0
          ? layers[0].sections.alignedSections.left[0].subcomponentProperties.customCss
          : menuComponent.newChildComponents.customCssOverwritables[SUBCOMPONENT_TYPES.TEXT]();
        textComponent.baseSubcomponent.customCss = textSubcomponent;
        textComponent.baseSubcomponent.defaultCss = menuComponent.newChildComponents.customCssOverwritables[SUBCOMPONENT_TYPES.TEXT]();
      }
      textComponent.baseSubcomponent.customFeatures = DropdownItemLayer.createDefaultTextCustomFeatures();
      textComponent.baseSubcomponent.defaultCustomFeatures = DropdownItemLayer.createDefaultTextCustomFeatures();
      menuComponent.linkedComponents.base.paddingComponent?.sync.componentsSyncedToThis.forEach((component) => {
        const { layers } = component.paddingComponentChild.linkedComponents.auxiliary[0].componentPreviewStructure;
        if (layers.length > 0) {
          layers[0].sections.alignedSections.left[0].subcomponentProperties.customCss = textComponent.baseSubcomponent.customCss;
        }
      })
    }
    if (menuComponent.baseSubcomponent.customFeatures.jsClasses) {
      if (!textComponent.baseSubcomponent.customFeatures.jsClasses) {
        textComponent.baseSubcomponent.customFeatures.jsClasses = new Set();
      }
      SetUtils.addSetsToSet(textComponent.baseSubcomponent.customFeatures.jsClasses,
        menuComponent.baseSubcomponent.customFeatures.jsClasses);
    }
    textComponent.baseSubcomponent.customStaticFeatures = DropdownItemLayer.createDefaultTextCustomStaticFeatures('Dropdown item');
    textComponent.baseSubcomponent.defaultCustomStaticFeatures = DropdownItemLayer.createDefaultTextCustomStaticFeatures('Dropdown item');
  }

  public static setStyle(component: WorkshopComponent): void {
    component.style = LAYER_STYLES.DROPDOWN_ITEM;
  }

  private static createDefaultTextCustomStaticFeatures(text?: string): CustomStaticFeatures {
    return {
      subcomponentText: ComponentBuilder.createText(text || 'text'),
      alignedLayerSection: ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.LEFT),
    };
  }

  private static setSyncableSubcomponents(layerComponent: WorkshopComponent, textComponent: WorkshopComponent): void {
    layerComponent.sync.syncables = ComponentBuilder.createSyncablesObjectUsingSubcomponents({
      [SUBCOMPONENT_TYPES.BASE]: layerComponent.baseSubcomponent,
      [SUBCOMPONENT_TYPES.TEXT]: textComponent.baseSubcomponent,
    });
  }
  
  private static addChildComponentsToLayer(layerComponent: WorkshopComponent, containerComponent: WorkshopComponent): WorkshopComponent[] {
    const { higherComponentContainer: menuComponent } = ActiveComponentUtils.getHigherLevelComponents(containerComponent);
    const textComponent = AddContainerComponent.add(containerComponent, COMPONENT_TYPES.TEXT, TEXT_STYLES.BUTTON,
      layerComponent.baseSubcomponent.name,
      [DropdownItemLayer.setTextSubcomponentProperties.bind(menuComponent)]);
    layerComponent.baseSubcomponent.otherSubcomponentTriggers
      .subcomponentsToTrigger[SUBCOMPONENT_TYPES.TEXT] = textComponent.baseSubcomponent;
    layerComponent.childComponentsLockedToLayer.list.push(textComponent.baseSubcomponent);
    if (layerComponent.baseSubcomponent.name !== TEMPORARY_COMPONENT_BASE_NAME.TEMPORARY) {
      UpdateGenericComponentDropdownItemNames.updateViaParentLayerPreviewStructure(containerComponent,
        menuComponent.componentPreviewStructure.layers[menuComponent.componentPreviewStructure.layers.length - 1]);
    }
    DropdownItemLayer.setSyncableSubcomponents(layerComponent, textComponent);
    menuComponent.sync.syncables.childComponents.push(layerComponent);
    return [textComponent];
  }

  public static createChildComponentsLockedToLayer(layerComponent: WorkshopComponent): void {
    layerComponent.childComponentsLockedToLayer = { add: DropdownItemLayer.addChildComponentsToLayer, list: [] };
  }

  private static createOtherSubcomponentTriggersTemplate(): OtherSubcomponentTriggers {
    return SubcomponentTriggers.createOtherSubcomponentTriggersTemplate([SUBCOMPONENT_TYPES.TEXT, SUBCOMPONENT_TYPES.ICON]);
  }

  private static createMouseEventCallbacks(): SubcomponentMouseEventCallbacks {
    return {
      click: SelectDropdownUtils.setSelectDropdownText,
      mouseEnter: SelectDropdownUtils.setSelectDropdownLastHoveredItemText,
    }
  }

  private static createDefaultButtonBaseCustomFeatures(): CustomFeatures {
    return {
      animations: ComponentBuilder.createStationaryAnimations({}),
      mouseEventCallbacks: DropdownItemLayer.createMouseEventCallbacks(),
      jsClasses: new Set([JAVASCRIPT_CLASSES.DROPDOWN_MENU]) as Set<JAVASCRIPT_CLASSES>,
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
        borderBottomStyle: BORDER_STYLES.SOLID,
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

  public static overwriteBase(component: WorkshopComponent): void {
    const baseSubcomponent = component.baseSubcomponent;
    baseSubcomponent.customCss = DropdownItemLayer.createDefaultLayerCss();
    baseSubcomponent.defaultCss = DropdownItemLayer.createDefaultLayerCss();
    baseSubcomponent.customFeatures = DropdownItemLayer.createDefaultButtonBaseCustomFeatures();
    baseSubcomponent.defaultCustomFeatures = DropdownItemLayer.createDefaultButtonBaseCustomFeatures();
    baseSubcomponent.otherSubcomponentTriggers = DropdownItemLayer.createOtherSubcomponentTriggersTemplate(),
    baseSubcomponent.isRemovable = true;
  }
}

export const dropdownItemLayer: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const layerComponent = layerBase.createNewComponent(baseName);
    DropdownItemLayer.overwriteBase(layerComponent);
    DropdownItemLayer.createChildComponentsLockedToLayer(layerComponent);
    DropdownItemLayer.setStyle(layerComponent);
    return layerComponent;
  },
};
