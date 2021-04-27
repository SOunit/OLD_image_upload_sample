import React from 'react';
import axios from 'axios';

class ImageUpload extends React.Component {
  state = { file: null, images: [] };

  componentDidMount = async () => {
    const res = await axios.get('http://localhost:4000/');
    console.log(res.data);
    this.setState({ images: res.data });
  };

  onSubmit = async (e) => {
    console.log('on submit');
    e.preventDefault();

    if (!this.state.file) {
      return;
    }

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

    console.log(res.data);

    // update state
    this.setState({ file: null, images: res.data });
  };

  onFileChange = (event) => {
    this.setState({ file: event.target.files[0] });
  };

  renderImages = () => {
    const baseUrl =
      'https://image-upload-sample-bucket.s3.ap-northeast-3.amazonaws.com/';
    return this.state.images.map((image, i) => {
      return (
        <div className='column' key={i}>
          <div className='ui segment'>
            <img
              className='ui rounded fluid image'
              src={baseUrl + image.imageUrl}
            />
          </div>
        </div>
      );
    });
  };

  render() {
    console.log(this.state.file);
    return (
      <div>
        <div className='ui container'>
          <h1>ImageUpload</h1>
          <h5>Add An Image</h5>
          <form className='ui form' onSubmit={this.onSubmit}>
            <div className='field'>
              <input
                onChange={this.onFileChange}
                type='file'
                accept='image/*'
              />
            </div>
            <button className='ui button' type='submit'>
              Submit
            </button>
          </form>
        </div>
        <div className='ui divider'></div>
        <div className='ui container'>
          <div className='ui four column doubling stackable grid'>
            {this.renderImages()}
          </div>
        </div>
      </div>
    );
  }
}

export default ImageUpload;
