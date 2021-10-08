import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { COMPONENT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { plainLayer } from '../../layers/generators/plainLayer';

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

  private static setSharedProperties(paddingComponent: WorkshopComponent, childComponent: WorkshopComponent): void {
    PaddingComponentUtils.mergeChildAndPaddingComponentPropertiesAndSetReferences(childComponent,
      paddingComponent, 'subcomponents');
    PaddingComponentUtils.mergeChildAndPaddingComponentPropertiesAndSetReferences(childComponent.componentPreviewStructure,
      paddingComponent.componentPreviewStructure, 'subcomponentNameToDropdownItemName');
    PaddingComponentUtils.updatePaddingDropdown(paddingComponent, childComponent);
  }
  
  public static create(baseName: string, componentType: COMPONENT_TYPES, componentStyle: COMPONENT_STYLES, baseType: SUBCOMPONENT_TYPES,
      childComponent: WorkshopComponent): WorkshopComponent {
    const paddingComponent = plainLayer.createNewComponent(baseName);
    paddingComponent.type = componentType;
    paddingComponent.style = componentStyle;
    paddingComponent.baseSubcomponent.subcomponentType = baseType;
    paddingComponent.paddingComponentChild = childComponent;
    childComponent.paddingComponent = paddingComponent;
    PaddingComponentUtils.setSharedProperties(paddingComponent, childComponent);
    return paddingComponent;
  }
}
