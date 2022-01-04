import { TraverseComponentViaPreviewStructureParentFirst } from '../../componentTraversal/traverseComponentsViaPreviewStructure/traverseComponentsViaPreviewStructureParentFirst';
import { SelectComponentContainer, SELECT_CHILD_COMPONENT_STYLE_OPTIONS } from '../../../../../../interfaces/selectedChildComponent';
import { ComponentPreviewTraversalState, PreviewTraversalResult } from '../../../../../../interfaces/componentTraversal';
import { SELECT_CHILD_COMPONENT_STYLE_DISABLED } from '../../../../../../consts/selectedChildComponent';
import { Subcomponent, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../consts/subcomponentCssClasses.enum';
import { ComponentBuilder } from '../../../newComponent/types/shared/componentBuilder';
import { OnSyncComponents } from '../../../../../../interfaces/sync';

// WORK 2 - rename
export class SelectedChildComponentUtil {

  private static childComponentTraversalCallback(traversalState: ComponentPreviewTraversalState): PreviewTraversalResult {
    const isCurrentlySelected = this as any as boolean;
    const { child } = traversalState.component.baseSubcomponent.customStaticFeatures.selectComponent || {};
    if (child) child.isSelected = isCurrentlySelected;
    return { stopTraversal: false };
  }

  private static unselectButton(selectedChildComponentContainer: SelectComponentContainer): void {
    TraverseComponentViaPreviewStructureParentFirst.traverse(SelectedChildComponentUtil.childComponentTraversalCallback.bind(false),
      selectedChildComponentContainer.selectedComponent.baseSubcomponent.seedComponent);
    selectedChildComponentContainer.selectedComponent = null;
  }

  public static unselectChildViaContainerIfSelected(buttonGroupBaseComponent: WorkshopComponent): void {
    const { container } = buttonGroupBaseComponent.baseSubcomponent.customStaticFeatures.selectComponent;
    if (container.selectedComponent) SelectedChildComponentUtil.unselectButton(container);
  }

  public static getChildContainerSelectComponentObj(childComponent: WorkshopComponent): SelectComponentContainer {
    return childComponent.baseSubcomponent.customStaticFeatures.selectComponent.child.containerSelectComponentObj;
  }

  private static selectNewChild(childComponent: WorkshopComponent, selectedChildComponentContainer: SelectComponentContainer): void {
    TraverseComponentViaPreviewStructureParentFirst.traverse(SelectedChildComponentUtil.childComponentTraversalCallback.bind(true), childComponent);
    selectedChildComponentContainer.selectedComponent = childComponent;
  }

  public static select(childSubcomponent: Subcomponent): void {
    const childComponent = childSubcomponent.seedComponent;
    const selectedChildComponentContainer = SelectedChildComponentUtil.getChildContainerSelectComponentObj(childComponent);
    if (selectedChildComponentContainer.selectedComponent) SelectedChildComponentUtil.unselectButton(selectedChildComponentContainer);
    SelectedChildComponentUtil.selectNewChild(childComponent, selectedChildComponentContainer);
  }

  public static doesContainerHaveSelectedChildren(containerComponent: WorkshopComponent): boolean {
    return !!containerComponent.containerComponent.baseSubcomponent.customStaticFeatures.selectComponent.container.selectedComponent;
  }

  public static isSelectedAndStyleActive(childSubcomponent: Subcomponent): boolean {
    const { isSelected, containerSelectComponentObj } = childSubcomponent.customStaticFeatures?.selectComponent?.child || {};
    return isSelected && containerSelectComponentObj.activeStyle !== SELECT_CHILD_COMPONENT_STYLE_DISABLED;
  }

  public static getStyle(childSubcomponent: Subcomponent): SELECT_CHILD_COMPONENT_STYLE_OPTIONS {
    const { activeCssPseudoClassViaUserAction, activeCssPseudoClassesDropdownItem, seedComponent } = childSubcomponent;
    return (activeCssPseudoClassViaUserAction === CSS_PSEUDO_CLASSES.CLICK || activeCssPseudoClassesDropdownItem === CSS_PSEUDO_CLASSES.CLICK)
      ? CSS_PSEUDO_CLASSES.CLICK
      : SelectedChildComponentUtil.getChildContainerSelectComponentObj(seedComponent).activeStyle;
  }

  private static setSelectComponentObject(components: WorkshopComponent[], container: WorkshopComponent): void {
    components.forEach((component) => {
      component.baseSubcomponent.customStaticFeatures.selectComponent = {
        child: {
          isSelected: false,
          containerSelectComponentObj: container.baseSubcomponent.customStaticFeatures.selectComponent.container,
        },
        ...ComponentBuilder.createPreventDeepCopy(),
      };
    });
  }

  private static setSelectComponentObjsViaOnSyncComponents(onSyncComponents: OnSyncComponents, container: WorkshopComponent): void {
    const { uniqueComponents, repeatedComponents } = onSyncComponents;
    const components: WorkshopComponent[] = [...repeatedComponents];
    Object.keys(uniqueComponents).forEach((key) => {
      const component = uniqueComponents[key];
      if (component) components.push(component);
    });
    SelectedChildComponentUtil.setSelectComponentObject(components, container); 
  }

  public static populateComponentAndChildrenWithSelectComponentObj(component: WorkshopComponent, container: WorkshopComponent): void {
    const { onSyncComponents } = component.sync.syncables;
    if (onSyncComponents) {
      SelectedChildComponentUtil.setSelectComponentObjsViaOnSyncComponents(onSyncComponents, container);
    } else {
      SelectedChildComponentUtil.setSelectComponentObject([component], container);
    }
  }
}
