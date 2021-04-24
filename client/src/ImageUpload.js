import React from 'react';
import axios from 'axios';

class ImageUpload extends React.Component {
  state = { file: null };

  onSubmit = (e) => {
    console.log('on submit');
    e.preventDefault();
  };

  onFileChange = (event) => {
    this.setState({ file: event.target.files[0] });
    axios
      .get('http://localhost:4000')
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  render() {
    console.log(this.state.file);
    return (
      <div className='ui container'>
        <h1>ImageUpload</h1>
        <form className='ui form' onSubmit={this.onSubmit}>
          <div className='field'>
            <input onChange={this.onFileChange} type='file' accept='image/*' />
          </div>
          <button className='ui button' type='submit'>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default ImageUpload;
