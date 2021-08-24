import { TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS } from '../../../../componentPreview/utils/animations/consts/sharedConsts';
import { CopyChildComponedModeToggleOff } from './copyChildComponentModeToggleOff';
import { ComponentOptions } from 'vue';

export default class CopyChildComponentModeToggleUtils {

  private static toggleDuringExpandedModalMode(optionsComponent: ComponentOptions): boolean {
    if (optionsComponent.isExpandedModalPreviewModeActive) {
      optionsComponent.toggleModalExpandMode();
      optionsComponent.hasCopyChildComponentModeClosedExpandedModal = true;
    } else if (optionsComponent.hasCopyChildComponentModeClosedExpandedModal) {
      setTimeout(() => {
        optionsComponent.$emit('toggle-copy-child-component-mode', optionsComponent);
        optionsComponent.hasCopyChildComponentModeClosedExpandedModal = false;
      }, TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS);
      optionsComponent.toggleModalExpandMode();
      return true;
    }
    return false;
  }

  public static toggleCopyChildComponentMode(optionsComponent: ComponentOptions): void {
    optionsComponent.isCopyChildComponentModeActive = !optionsComponent.isCopyChildComponentModeActive;
    if (optionsComponent.isCopyChildComponentModeActive) {
      // on
      optionsComponent.hideSettings();
    } else {
      // off
      CopyChildComponedModeToggleOff.displayOptionSettings(optionsComponent);
    }
    const hasBeenToggled = CopyChildComponentModeToggleUtils.toggleDuringExpandedModalMode(optionsComponent);
    if (!hasBeenToggled) optionsComponent.$emit('toggle-copy-child-component-mode', optionsComponent);
  }
}
