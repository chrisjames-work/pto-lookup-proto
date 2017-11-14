import React, { Component } from 'react';
import workAndCoLogoImg from '../../../assets/img/workco-logo.svg';

export default class Menu extends Component {
  render() {
    return (
      <div className='Menu'>
        <div className='Menu-logo'>
          <img
            src={ workAndCoLogoImg }
            alt='Work & Co logo'
          />
        </div>
      </div>
    );
  }
}
