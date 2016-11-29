import React from 'react';
import styles from './styles.css';

export default class InstructionsSidebar extends React.Component {

  render() {
    const {
      footer,
      footerInfo,
      body,
    } = this.props;

    const footerStyles = {
      wrapper: { backgroundColor: '#DDF6F6', fontFamily: '"Lato", sans-serif', fontSize: '13px', lineHeight: '11px', padding: '0 0 30px' },
      container: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '0 0 0 20px' },
      title: { display: 'inline-block', fontSize: '13px', textTransform: 'uppercase', color: '#1f768a', fontWeight: 400, margin: '15px 0 20px', lineHeight: '11px' },
      ul: { listStyle: 'none', padding: 0, margin: 0, width: '200px' },
      liBold: { color: '#757575', fontWeight: 400, margin: '0 0 15px' },
      li: { color: '#757575', fontWeight: 300, margin: '0 0 15px' },
    };

    const ftr = (
      <div style={footerStyles.wrapper}>
        <div style={footerStyles.container}>
          <p style={footerStyles.title}>Summary</p>
          <ul style={footerStyles.ul}>
            <li style={footerStyles.liBold}>{footerInfo ? footerInfo.position : null}</li>
            <li style={footerStyles.li}>{footerInfo ? footerInfo.company : null}</li>
            <li style={footerStyles.li}>{footerInfo ? footerInfo.workflow : null}</li>
          </ul>
        </div>
      </div>
    );

    let placeholder = 'http://placehold.it/115x115/1AC5C0/ffffff';
    let titleText = 'Tips for a winning description';
    let containerStyle = styles.container;
    let iconStyle = styles.icon;
    let titleStyle = styles.title;

    if (footer) {
      placeholder = 'http://placehold.it/40x40/1AC5C0/ffffff';
      containerStyle = styles.container_with_f;
      iconStyle = styles.icon_with_f;
      titleText = 'Optimize Job Position Requirements';
      titleStyle = styles.title_with_p;
    }

    return (
      <div className={styles.wrapper}>
        <div className={containerStyle}>
          <div>
            <img className={iconStyle} src={placeholder} alt="icon" />
          </div>
          <div className={styles.container_bot}>
            <h1 className={titleStyle}>{titleText}</h1>
            { body }
          </div>
        </div>
        { footer ? ftr : null}
      </div>
    );
  }
}
