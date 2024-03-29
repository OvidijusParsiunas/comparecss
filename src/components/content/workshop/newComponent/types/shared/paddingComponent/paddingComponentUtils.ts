import { UniqueSubcomponentNameGenerator } from '../../../../utils/componentGenerator/uniqueSubcomponentNameGenerator';
import { BUTTON_COMPONENTS_BASE_NAMES } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { CreateNewComponent } from '../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { COMPONENT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { paddingBase } from './base';

export class PaddingComponentUtils {

  private static updatePaddingDropdown(paddingComponent: WorkshopComponent, childComponent: WorkshopComponent): void {
    paddingComponent.componentPreviewStructure.subcomponentDropdownStructure[
      paddingComponent.baseSubcomponent.name] = { ...childComponent.componentPreviewStructure.subcomponentDropdownStructure };
  }

  private static mergeChildAndPaddingComponentPropertiesAndSetReferences(childComponentObj: unknown,
      paddingComponentObj: unknown, propertyName: string): void {
    Object.assign(childComponentObj[propertyName], paddingComponentObj[propertyName]);
    paddingComponentObj[propertyName] = childComponentObj[propertyName];
  }

  // needs to be executed after linked components insertion as this renders linked base dropdown items with their final implementation
  private static setSharedProperties(paddingComponent: WorkshopComponent, childComponent: WorkshopComponent): void {
    PaddingComponentUtils.mergeChildAndPaddingComponentPropertiesAndSetReferences(childComponent,
      paddingComponent, 'subcomponents');
    PaddingComponentUtils.mergeChildAndPaddingComponentPropertiesAndSetReferences(childComponent.componentPreviewStructure,
      paddingComponent.componentPreviewStructure, 'subcomponentNameToDropdownItemName');
    PaddingComponentUtils.updatePaddingDropdown(paddingComponent, childComponent);
  }

  private static createChildComponent(paddingComponent: WorkshopComponent, createChildComponentFunc: CreateNewComponent,
      childBaseName: BUTTON_COMPONENTS_BASE_NAMES, overwriteChildComponentFunc: (childComponent: WorkshopComponent) => void): WorkshopComponent {
    const childComponent = createChildComponentFunc({ baseName: UniqueSubcomponentNameGenerator.generate(childBaseName), paddingComponent });
    overwriteChildComponentFunc(childComponent);
    childComponent.paddingComponent = paddingComponent;
    paddingComponent.paddingComponentChild = childComponent;
    return childComponent;
  }
  
  public static create(baseName: string, componentType: COMPONENT_TYPES, componentStyle: COMPONENT_STYLES, subcomponentType: SUBCOMPONENT_TYPES,
      createChildComponentFunc: CreateNewComponent, childBaseName: BUTTON_COMPONENTS_BASE_NAMES,
      overwriteChildComponentFunc: (childComponent: WorkshopComponent) => void): WorkshopComponent {
    const paddingComponent = paddingBase.createNewComponent({ baseName, componentType, componentStyle, baseSubcomponentType: subcomponentType });
    const childComponent = PaddingComponentUtils.createChildComponent(
      paddingComponent, createChildComponentFunc, childBaseName, overwriteChildComponentFunc);
    PaddingComponentUtils.setSharedProperties(paddingComponent, childComponent);
    return paddingComponent;
  }
}
