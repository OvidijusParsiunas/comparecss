export default class NewComponentModal {
  // will need to be an enum
  static getPreviewImage(componentName: string): string {
    switch (componentName) {
      case 'Button':
        return 'Button'
      case 'Alert':
        return 'Alert'
      default:
        return 'placeholder'
    }
  }
}
