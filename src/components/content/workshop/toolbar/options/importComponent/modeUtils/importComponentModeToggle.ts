import { TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS } from '../../../../componentPreview/utils/expandedModalPreviewMode/consts/sharedConsts';
import { ImportComponedModeToggleOff } from './importComponentModeToggleOff';
import { ComponentOptions } from 'vue';

export default class ImportComponentModeToggleUtils {

  private static toggleDuringExpandedModalMode(optionsComponent: ComponentOptions): boolean {
    if (optionsComponent.isExpandedModalPreviewModeActive) {
      optionsComponent.toggleModalExpandMode();
      optionsComponent.hasImportComponentModeClosedExpandedModal = true;
    } else if (optionsComponent.hasImportComponentModeClosedExpandedModal) {
      setTimeout(() => {
        optionsComponent.$emit('toggle-import-subcomponent-mode', optionsComponent);
        optionsComponent.hasImportComponentModeClosedExpandedModal = false;
      }, TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS);
      optionsComponent.toggleModalExpandMode();
      return true;
    }
    return false;
  }

  public static toggleSubcomponentImport(optionsComponent: ComponentOptions): void {
    optionsComponent.isImportComponentModeActive = !optionsComponent.isImportComponentModeActive;
    if (optionsComponent.isImportComponentModeActive) {
      optionsComponent.hideSettings();
    } else {
      ImportComponedModeToggleOff.displayOptionSettings(optionsComponent);
    }
    const hasBeenToggled = ImportComponentModeToggleUtils.toggleDuringExpandedModalMode(optionsComponent);
    if (!hasBeenToggled) optionsComponent.$emit('toggle-import-subcomponent-mode', optionsComponent);
  }
}
