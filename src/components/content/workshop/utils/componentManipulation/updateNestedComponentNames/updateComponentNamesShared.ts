import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { NestedSubcomponent } from '../../../../../../interfaces/componentPreviewStructure';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';

export class UpdateComponentNamesShared {

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
    return postfix !== UpdateComponentNamesShared.SINGLE_SPACE_STRING && typeof postfix === 'number';
  }

  private static parsePostfix(subcomponentName: string): string {
    return subcomponentName.match(/\d+$/)?.[0];
  }

  protected static generateNewSubcomponentName(oldSubcomponentName: string, newPostfix: number|string): string {
    let postfixLengthToReplace = 1;
    if (UpdateComponentNamesShared.isValidNumber(newPostfix)) {
      const oldPostfix = UpdateComponentNamesShared.parsePostfix(oldSubcomponentName) || 1;
      const currentPostfixLength = oldPostfix.toString().length;
      const nextPostfixLength = newPostfix.toString().length;
      // when removing number 9, need to make sure that the next 10 will get reduced to 9, hence more chars need to be removed
      postfixLengthToReplace = currentPostfixLength < nextPostfixLength ? nextPostfixLength : currentPostfixLength;
    }
    return UpdateComponentNamesShared.replaceSubstringAtIndex(oldSubcomponentName, oldSubcomponentName.length - postfixLengthToReplace, newPostfix);
  }

  private static removeSubcomponentsFromParentComponents(parentComponent: WorkshopComponent, oldSubcomponentName: string): void {
    const nestedComponent: WorkshopComponent = parentComponent.subcomponents[oldSubcomponentName].nestedComponent.ref;
    delete parentComponent.subcomponents[oldSubcomponentName];
    delete nestedComponent.subcomponents[oldSubcomponentName];
    delete nestedComponent.componentPreviewStructure.subcomponentDropdownStructure[oldSubcomponentName];
  }

  private static updateAllReferencesOfTheName(parentComponent: WorkshopComponent, oldSubcomponentName: string, newSubcomponentName: string,
      nestedSubcomponent: NestedSubcomponent): void {
    parentComponent.subcomponents[newSubcomponentName] = parentComponent.subcomponents[oldSubcomponentName];
    const nestedComponent: WorkshopComponent = parentComponent.subcomponents[oldSubcomponentName].nestedComponent.ref;
    nestedComponent.activeSubcomponentName = newSubcomponentName;
    nestedComponent.defaultSubcomponentName = newSubcomponentName;
    nestedComponent.coreSubcomponentNames.base = newSubcomponentName;
    nestedComponent.componentPreviewStructure.subcomponentDropdownStructure[newSubcomponentName] = nestedComponent
      .componentPreviewStructure.subcomponentDropdownStructure[oldSubcomponentName];
    nestedComponent.subcomponents[newSubcomponentName] = parentComponent.subcomponents[oldSubcomponentName];
    nestedSubcomponent.name = newSubcomponentName;
  }

  protected static updateName(parentComponent: WorkshopComponent, subcomponentDropdownStructure: NestedDropdownStructure, oldSubcomponentName: string,
      newSubcomponentName: string, nestedSubcomponent: NestedSubcomponent, oldSubcomponentNames: string[]): void {
    subcomponentDropdownStructure[newSubcomponentName] = subcomponentDropdownStructure[oldSubcomponentName];
    UpdateComponentNamesShared.updateAllReferencesOfTheName(parentComponent, oldSubcomponentName, newSubcomponentName, nestedSubcomponent);
    UpdateComponentNamesShared.removeSubcomponentsFromParentComponents(parentComponent, oldSubcomponentName);
    oldSubcomponentNames.push(oldSubcomponentName); 
  }
}
