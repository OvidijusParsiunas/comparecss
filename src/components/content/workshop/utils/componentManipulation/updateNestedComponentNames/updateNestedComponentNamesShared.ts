import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';

export class UpdateNestedComponentNames {

  protected static readonly SINGLE_SPACE_STRING = ' ';

  protected static removeOverwrittenDropdownNames(oldSubcomponentNames: string[], dropdownStructure: NestedDropdownStructure): void {
    oldSubcomponentNames.forEach((name) => {
      delete dropdownStructure[name];
    });
  }

  protected static replaceSubstringAtIndex(fullString: string, index: number, replacementSubstring: string | number): string {
    return `${fullString.substring(0, index)}${replacementSubstring}`;
  }

  private static isValidNumber(postfix: number|string): postfix is number {
    return postfix !== UpdateNestedComponentNames.SINGLE_SPACE_STRING && typeof postfix === 'number';
  }

  protected static getNewSubcomponentName(oldSubcomponentName: string, postfix: number|string): string {
    let postfixLengthToReplace = 1;
    if (UpdateNestedComponentNames.isValidNumber(postfix)) {
      const currentPostfixLength = (postfix).toString().length;
      const nextPostfixLength = (postfix + 1).toString().length;
      // when removing number 9, need to make sure that the next 10 will get reduced to 9, hence more chars need to be removed
      postfixLengthToReplace = currentPostfixLength < nextPostfixLength ? nextPostfixLength : currentPostfixLength;
    }
    return UpdateNestedComponentNames.replaceSubstringAtIndex(oldSubcomponentName, oldSubcomponentName.length - postfixLengthToReplace, postfix);
  }

  private static removeSubcomponentsFromParentComponents(parentComponent: WorkshopComponent, oldSubcomponentName: string): void {
    const nestedComponent: WorkshopComponent = parentComponent.subcomponents[oldSubcomponentName].nestedComponent.ref
    delete parentComponent.subcomponents[oldSubcomponentName];
    delete nestedComponent.subcomponents[oldSubcomponentName];
  }

  private static updateAllReferencesOfTheName(parentComponent: WorkshopComponent, oldSubcomponentName: string, newSubcomponentName: string): void {
    parentComponent.subcomponents[newSubcomponentName] = parentComponent.subcomponents[oldSubcomponentName];
    const nestedComponent: WorkshopComponent = parentComponent.subcomponents[oldSubcomponentName].nestedComponent.ref
    nestedComponent.activeSubcomponentName = newSubcomponentName;
    nestedComponent.defaultSubcomponentName = newSubcomponentName;
    nestedComponent.coreSubcomponentNames.base = newSubcomponentName;
    // double check if this is needed
    nestedComponent.componentPreviewStructure.subcomponentDropdownStructure[newSubcomponentName] = nestedComponent
      .componentPreviewStructure.subcomponentDropdownStructure[oldSubcomponentName];
    nestedComponent.subcomponents[newSubcomponentName] = parentComponent.subcomponents[oldSubcomponentName];
  }

  protected static updateName(parentComponent: WorkshopComponent, subcomponentDropdownStructure: NestedDropdownStructure, oldSubcomponentName: string,
      newSubcomponentName: string, oldSubcomponentNames: string[]): void {
    subcomponentDropdownStructure[newSubcomponentName] = subcomponentDropdownStructure[oldSubcomponentName];
    UpdateNestedComponentNames.updateAllReferencesOfTheName(parentComponent, oldSubcomponentName, newSubcomponentName);
    UpdateNestedComponentNames.removeSubcomponentsFromParentComponents(parentComponent, oldSubcomponentName);
    oldSubcomponentNames.push(oldSubcomponentName);
  }
}
