import React from 'react';
import './Message.css';
import Started_btn from '../Started_btn/Started_btn';

const Message = () => {
  return (
    <div className='msg_container'>
      <img src='https://ecisveep.nic.in/uploads/monthly_2018_10/connect-sign-language-logo.thumb.png.7610eaaa2e106d22ace0e767c9b8d3c0.png' alt='pic' />
      <h1 className='message'>Break the Silence,<br /></h1>
      <h1 className='message2'>Speak Through Signs!</h1>
    <Started_btn/>
    </div>
  );
}

export default Message;