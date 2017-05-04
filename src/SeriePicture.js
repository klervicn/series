import React from 'react';

class SeriePicture extends React.Component {
  constructor() {
    super();
    this.state = { inputValue: '' };
    this.updateInputValue = this.updateInputValue.bind(this);
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  render() {
    var setPicture = this.props.setPicture;
    var serieKey = this.props.serieKey;
    var pathPicture = this.props.seriePictureURL;
    var inputPath = this.state.inputValue;

    function setSeriePicture() {
      setPicture(serieKey, inputPath);
    }

    function displayPicture() {
      pathPicture = inputPath;
      setSeriePicture();
    }

    return (
      <div className="PictureForm">
        <form onSubmit={this.updateInputValue}>
          <label>
            <input
              type="text"
              name="element"
              placeholder="Type picture path"
              value={this.state.inputValue}
              onChange={this.updateInputValue}
            />
          </label>
          <button type="button" onClick={displayPicture}> Save </button>
        </form>
        <div className="imgPreview">
          <img src={pathPicture} alt="" />
        </div>
      </div>
    );
  }
}

export default SeriePicture;
