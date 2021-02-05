export interface TransitionAnimation {
  transitionDuration: string;
  transitionProperty: string;
  transitionTimingFunction: string;
}

export default class ExpandedModalPreviewMode {

  public static expandedModalInitialFadeOutAnimationDurationMilliseconds = 150;

  public static expandedModalInitialFadeOutAnimationValues: TransitionAnimation = {
    transitionDuration: `${ExpandedModalPreviewMode.expandedModalInitialFadeOutAnimationDurationMilliseconds / 1000}s`, transitionProperty: 'opacity', transitionTimingFunction: 'linear',
  };
}
