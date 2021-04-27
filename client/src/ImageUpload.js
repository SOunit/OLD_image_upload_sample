import React from 'react';
import axios from 'axios';

class ImageUpload extends React.Component {
  state = { file: null };

  onSubmit = async (e) => {
    console.log('on submit');
    e.preventDefault();

    console.log(this.state.file);

    // get url from aws s3
    const uploadConfig = await axios
      .get('http://localhost:4000/api/upload')
      .catch((err) => {
        console.log(err);
      });

    // upload image to s3 strage
    const upload = await axios
      .put(uploadConfig.data.url, this.state.file, {
        headers: {
          'Content-type': this.state.file.type,
        },
      })
      .catch((err) => {
        console.log(err);
      });

    // save image in node server
    const res = await axios
      .post('http://localhost:4000/', {
        imageUrl: uploadConfig.data.key,
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onFileChange = (event) => {
    this.setState({ file: event.target.files[0] });
  };

  render() {
    console.log(this.state.file);
    return (
      <div className='ui container'>
        <h1>ImageUpload</h1>
        <h5>Add An Image</h5>
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
