import { TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS } from '../../../../componentPreview/utils/animations/consts/sharedConsts';
import { CopyNestedComponedModeToggleOff } from './copyNestedComponentModeToggleOff';
import { ComponentOptions } from 'vue';

export default class CopyNestedComponentModeToggleUtils {

  private static toggleDuringExpandedModalMode(optionsComponent: ComponentOptions): boolean {
    if (optionsComponent.isExpandedModalPreviewModeActive) {
      optionsComponent.toggleModalExpandMode();
      optionsComponent.hasCopyNestedComponentModeClosedExpandedModal = true;
    } else if (optionsComponent.hasCopyNestedComponentModeClosedExpandedModal) {
      setTimeout(() => {
        optionsComponent.$emit('toggle-copy-nested-component-mode', optionsComponent);
        optionsComponent.hasCopyNestedComponentModeClosedExpandedModal = false;
      }, TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS);
      optionsComponent.toggleModalExpandMode();
      return true;
    }
    return false;
  }

  public static toggleCopyNestedComponentMode(optionsComponent: ComponentOptions): void {
    optionsComponent.isCopyNestedComponentModeActive = !optionsComponent.isCopyNestedComponentModeActive;
    if (optionsComponent.isCopyNestedComponentModeActive) {
      optionsComponent.hideSettings();
    } else {
      CopyNestedComponedModeToggleOff.displayOptionSettings(optionsComponent);
    }
    const hasBeenToggled = CopyNestedComponentModeToggleUtils.toggleDuringExpandedModalMode(optionsComponent);
    if (!hasBeenToggled) optionsComponent.$emit('toggle-copy-nested-component-mode', optionsComponent);
  }
}
