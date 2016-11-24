import React from 'react';
import Dropzone from 'react-dropzone';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentClear from 'material-ui/svg-icons/content/clear';
import styles from './styles.css';


const dropzoneStyle = {
  position: 'relative',
  height: '114px',
  width: '114px',
  border: '1px dashed #1ac5c0',
  cursor: 'pointer',
};

const addBtnStyle = {
  width: 48,
  height: 48,
  color: '#1ac5c0',
  position: 'absolute',
  left: '33px',
  top: '33px',
};

const deleteBtnStyle = {
  width: 15,
  height: 15,
  position: 'absolute',
  right: '9px',
  top: '9px',
  cursor: 'pointer',
  color: '#757575',
};

export default class LogoUploader extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      uploadedFiles: [],
    };
  }

  onImageDrop(file) {
    this.setState({
      uploadedFiles: this.state.uploadedFiles.concat(file),
    });
  }

  onDeleteImg(index) {
    this.setState({
      uploadedFiles: this.state.uploadedFiles.filter((f, i) => i !== index),
    });
  }

  render() {
    const displayUploader = this.props.multiple === false && this.state.uploadedFiles.length === 1;

    const displayPreviewZone = this.state.uploadedFiles.length > 0;

    const uploader = (
      <div className={styles.drop}>
        <Dropzone style={dropzoneStyle} multiple={false} accept="image/*" onDrop={file => this.onImageDrop(file)}>
          <ContentAdd style={addBtnStyle} />
        </Dropzone>
        <div className={styles.upload_info}>
          <h4 className={styles.upload_legend}> Drop or <span className={styles.upload_legend_green}>Select</span> File to Upload</h4>
          <p className={styles.upload_legend_p}>Only .jpg, .jpeg or .png files allowed, no size limit.</p>
        </div>
      </div>
    );

    const previewZone = (
      <div>
        {this.state.uploadedFiles.map((item, index) =>
          <div key={index} className={styles.logo_container}>
            <ContentClear style={deleteBtnStyle} onClick={() => this.onDeleteImg(index)} />
            <div className={styles.logo}>
              <img className={styles.logo_img} src={item.preview} alt="img" />
            </div>
          </div>
        )}
      </div>
    );

    return (
      <div className={styles.wrapper}>
        <div className={styles.label}>
          <p className={styles.label_text}>Logo <span className={styles.label_green}>optional</span></p>
        </div>
        {displayUploader ? null : uploader}
        {displayPreviewZone ? previewZone : null}
      </div>
    );
  }
}

LogoUploader.defaultProps = {
  multiple: false,
};

