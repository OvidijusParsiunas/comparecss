import { UpdateContainerComponentDropdownItemNames } from '../../../../utils/componentManipulation/updateChildComponent/updateContainerComponentDropdownItemNames';
import { AddContainerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addContainerComponent';
import { SubcomponentMouseEventCallbacks } from '../../../../../../../interfaces/subcomponentMouseEventCallbacks';
import { CustomCss, CustomFeatures, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SyncChildComponentUtils } from '../../../../toolbar/options/syncChildComponent/syncChildComponentUtils';
import { DropdownMenuAutoWidthUtils } from '../../../../toolbar/settings/utils/dropdownMenuAutoWidthUtils';
import { ComponentGenerator, PresetProperties } from '../../../../../../../interfaces/componentGenerator';
import { SubcomponentTriggers } from '../../../../utils/componentManipulation/utils/subcomponentTriggers';
import { TEMPORARY_COMPONENT_BASE_NAME } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { OtherSubcomponentTriggers } from '../../../../../../../interfaces/otherSubcomponentTriggers';
import { ActiveComponentUtils } from '../../../../utils/activeComponent/activeComponentUtils';
import { LAYER_STYLES, TEXT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { SelectDropdownUtils } from '../../dropdowns/selectDropdown/selectDropdownUtils';
import { JAVASCRIPT_CLASSES } from '../../../../../../../consts/javascriptClasses.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { layerBase } from './base';

export interface SetTextSubcomponentPropertiesContext {
  menuComponent: WorkshopComponent;
  createDefaultTextStyling: () => CustomCss;
}

export type OverwriteDropdownItemContext = (itemComponent: WorkshopComponent) => void;

export class DropdownItemLayer extends ComponentBuilder {

  private static setSyncableSubcomponents(itemComponent: WorkshopComponent, textComponent: WorkshopComponent): void {
    itemComponent.sync.syncables = ComponentBuilder.createSyncablesObjectUsingSubcomponents({
      [SUBCOMPONENT_TYPES.BASE]: itemComponent.baseSubcomponent,
      [SUBCOMPONENT_TYPES.TEXT]: textComponent.baseSubcomponent,
    });
  }

  private static addTextComponentReferences(menuComponent: WorkshopComponent, itemComponent: WorkshopComponent, textComponent: WorkshopComponent): void {
    itemComponent.baseSubcomponent.otherSubcomponentTriggers.subcomponentsToTrigger[SUBCOMPONENT_TYPES.TEXT] = textComponent.baseSubcomponent;
    itemComponent.newChildComponents.childComponentsLockedToLayer.push(textComponent);
    DropdownItemLayer.setSyncableSubcomponents(itemComponent, textComponent);
    menuComponent.sync.syncables.onCopy.childComponents.push(itemComponent);
  }

  private static addTextComponentToItem(itemComponent: WorkshopComponent, containerComponent: WorkshopComponent): void {
    const { higherComponentContainer: menuComponent } = ActiveComponentUtils.getHigherLevelComponents(containerComponent);
    const textComponent = AddContainerComponent.add(containerComponent, COMPONENT_TYPES.TEXT, TEXT_STYLES.BUTTON, itemComponent.baseSubcomponent.name);
    DropdownItemLayer.addTextComponentReferences(menuComponent, itemComponent, textComponent);
    if (itemComponent.baseSubcomponent.name !== TEMPORARY_COMPONENT_BASE_NAME.TEMPORARY) {
      UpdateContainerComponentDropdownItemNames.updateViaParentLayerPreviewStructure(containerComponent,
        menuComponent.componentPreviewStructure.layers[menuComponent.componentPreviewStructure.layers.length - 1]);
    }
  }

  public static overwriteDropdownItem(itemComponent: WorkshopComponent, menuComponent: WorkshopComponent): void {
    const overwriteItemCss = this as unknown as OverwriteDropdownItemContext;
    DropdownItemLayer.addTextComponentToItem(itemComponent, menuComponent);
    if (menuComponent.componentPreviewStructure.layers.length === 1
        && !SyncChildComponentUtils.getCurrentOrParentComponentThatIsInSync(menuComponent)) {
      overwriteItemCss(itemComponent);
    }
    DropdownMenuAutoWidthUtils.updateButtonAndMenuWidth(itemComponent, menuComponent);
  }

  public static setStyle(component: WorkshopComponent): void {
    component.style = LAYER_STYLES.DROPDOWN_ITEM;
  }

  public static initializeChildComponentsLockedToLayer(itemComponent: WorkshopComponent): void {
    itemComponent.newChildComponents.childComponentsLockedToLayer = [];
  }

  private static createOtherSubcomponentTriggersTemplate(): OtherSubcomponentTriggers {
    return SubcomponentTriggers.createOtherSubcomponentTriggersTemplate([SUBCOMPONENT_TYPES.TEXT, SUBCOMPONENT_TYPES.ICON]);
  }

  private static createMouseEventCallbacks(): SubcomponentMouseEventCallbacks {
    return {
      click: SelectDropdownUtils.setSelectDropdownText,
      mouseEnter: SelectDropdownUtils.setSelectDropdownLastHoveredItemText,
    };
  }

  private static createDefaultButtonBaseCustomFeatures(): CustomFeatures {
    return {
      animations: ComponentBuilder.createStationaryAnimations({}),
      mouseEventCallbacks: DropdownItemLayer.createMouseEventCallbacks(),
    };
  }

  public static overwriteBase(itemComponent: WorkshopComponent): void {
    const baseSubcomponent = itemComponent.baseSubcomponent;
    baseSubcomponent.customFeatures = DropdownItemLayer.createDefaultButtonBaseCustomFeatures();
    baseSubcomponent.defaultCustomFeatures = DropdownItemLayer.createDefaultButtonBaseCustomFeatures();
    baseSubcomponent.customStaticFeatures = { jsClasses: new Set([JAVASCRIPT_CLASSES.DROPDOWN_MENU]) };
    baseSubcomponent.defaultCustomStaticFeatures = { jsClasses: new Set([JAVASCRIPT_CLASSES.DROPDOWN_MENU]) };
    baseSubcomponent.otherSubcomponentTriggers = DropdownItemLayer.createOtherSubcomponentTriggersTemplate(),
    baseSubcomponent.isRemovable = true;
  }
}

export const dropdownItemLayer: ComponentGenerator = {
  createNewComponent(presetProperties: PresetProperties): WorkshopComponent {
    const itemComponent = layerBase.createNewComponent(presetProperties);
    DropdownItemLayer.overwriteBase(itemComponent);
    DropdownItemLayer.initializeChildComponentsLockedToLayer(itemComponent);
    DropdownItemLayer.setStyle(itemComponent);
    return itemComponent;
  },
};
