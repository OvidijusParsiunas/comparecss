import { UpdateContainerComponentDropdownUtils } from './updateContainerComponentDropdownUtils';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { UpdateDropdownItemNamesShared } from './updateDropdownItemNamesShared';
import { ArrayUtils } from '../../generic/arrayUtils';

export class UpdatePaddingComponentDropdownItemNames extends UpdateDropdownItemNamesShared {

  public static updateChildAndAuxiliaryComponents(paddingComponent: WorkshopComponent): void {
    const { subcomponentDropdownStructure } = paddingComponent.paddingComponentChild.componentPreviewStructure;
    const { itemDataMaps, stateObjects: { overwrittenItemNames, newDrodpownNames, overwrittenDropdownStructures },
      } = UpdateContainerComponentDropdownUtils.generateItemUpdateInitializationObjects(subcomponentDropdownStructure);
    const subcomponentNames = UpdateDropdownItemNamesShared.getSubcomponentNames(subcomponentDropdownStructure);
    subcomponentNames.forEach((subcomponentName) => {
      UpdateContainerComponentDropdownUtils.updateItemNames(paddingComponent, itemDataMaps, subcomponentDropdownStructure,
        overwrittenItemNames, newDrodpownNames, subcomponentName, overwrittenDropdownStructures);
    });
    ArrayUtils.differenceInArrays(overwrittenItemNames, newDrodpownNames);
    UpdateContainerComponentDropdownUtils.removeOldItemNames(overwrittenItemNames, newDrodpownNames, subcomponentDropdownStructure);
  }
}
