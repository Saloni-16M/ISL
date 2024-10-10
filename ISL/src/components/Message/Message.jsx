import React from 'react';
import './Message.css';
import Started_btn from '../Started_btn/Started_btn';
// import './gesture.png';
const Message = () => {
  return (
    <div className='msg_container'>
      <img src='/gesture.png' alt='pic' />
      <h1 className='message'>Break the Silence,<br /></h1>
      <h1 className='message2'>Speak Through Signs!</h1>
    <Started_btn/>
    </div>
  );
}

export default Message;