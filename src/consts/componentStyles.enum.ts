export type COMPONENT_STYLES = DEFAULT_STYLES | TEXT_STYLES | LAYER_STYLES | BUTTON_STYLES;

export enum DEFAULT_STYLES {
  DEFAULT = 'Default',
  BASE = 'Base',
}

export enum TEXT_STYLES {
  BUTTON = 'Button text',
  CLOSE_BUTTON = 'Close button text',
}

export enum LAYER_STYLES {
  PLAIN = 'Plain layer',
  CARD = 'Card layer'
}

export enum BUTTON_STYLES {
  CLOSE = 'Close button',
}
