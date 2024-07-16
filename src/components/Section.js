export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach((item) => {
      console.log("Rendering Item:", item); // Log each item being rendered
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
