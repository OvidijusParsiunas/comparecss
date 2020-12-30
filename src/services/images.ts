export default class Images {
  public static preloadWithPromises(paths: string[]): Promise<string[]> {
    const promises = [];
    for (let i = 0; i < paths.length; i += 1) {
      const promise = new Promise((resolve, reject) => {
        const imgElement = document.createElement('img');
        imgElement.onload = () => resolve('success');
        imgElement.onerror = (error) => reject(error);
        imgElement.setAttribute('src', paths[i]);
        imgElement.style.display = 'none';
        document.head.appendChild(imgElement);
      });
      promises.push(promise);
    }
    return Promise.all(promises);
  }

  public static preload(paths: string[]): void {
    this.preloadWithPromises(paths)
      .catch((e: Event) => {
        console.log('Failed to load the following image:');
        console.log((e.target as HTMLImageElement).src);
      });
  }
}
