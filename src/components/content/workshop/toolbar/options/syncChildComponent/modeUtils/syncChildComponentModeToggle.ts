import { TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS } from '../../../../componentPreview/utils/animations/consts/sharedConsts';
import { SyncChildComponentModeToggleOff } from './syncChildComponentModeToggleOff';
import { ComponentOptions } from 'vue';

export default class SyncChildComponentModeToggleUtils {

  private static toggleDuringExpandedModalMode(optionsComponent: ComponentOptions): boolean {
    if (optionsComponent.isExpandedModalPreviewModeActive) {
      optionsComponent.toggleModalExpandMode();
      optionsComponent.hasSyncChildComponentModeClosedExpandedModal = true;
    } else if (optionsComponent.hasSyncChildComponentModeClosedExpandedModal) {
      setTimeout(() => {
        optionsComponent.$emit('toggle-sync-child-component-mode', optionsComponent);
        optionsComponent.hasSyncChildComponentModeClosedExpandedModal = false;
      }, TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS);
      optionsComponent.toggleModalExpandMode();
      return true;
    }
    return false;
  }

  public static toggleSyncChildComponentMode(optionsComponent: ComponentOptions): void {
    optionsComponent.isSyncChildComponentModeActive = !optionsComponent.isSyncChildComponentModeActive;
    if (optionsComponent.isSyncChildComponentModeActive) {
      // on
      optionsComponent.hideSettings();
    } else {
      // off
      SyncChildComponentModeToggleOff.displayOptionSettings(optionsComponent);
    }
    const hasBeenToggled = SyncChildComponentModeToggleUtils.toggleDuringExpandedModalMode(optionsComponent);
    if (!hasBeenToggled) optionsComponent.$emit('toggle-sync-child-component-mode', optionsComponent);
  }
}
