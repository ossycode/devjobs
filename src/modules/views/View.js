export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderError(message = this._errorMessage) {
    const errorMarkup = `<div class="error heading__2">
        <p class="error__text">${message}</p>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("beforeend", errorMarkup);
  }
  // renderSpinner() {
  //     const markup = `
  //     <div class="spinnerCont">
  //     <svg aria-labelledby="spinner-icon"" class="" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle class="spinner_b2T7"
  //     <title id="spinner-icon" lang="en">dot spinner spinner</title>
  //     cx="4" cy="12" r="3"/><circle class="spinner_b2T7 spinner_YRVV" cx="12" cy="12" r="3"/><circle class="spinner_b2T7 spinner_c9oY" cx="20" cy="12" r="3"/></svg>
  //     </div>
  //     `
  //     this
  // }
}
