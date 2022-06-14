import React, {useState} from 'react';

import ChatRoom from "../../chat/chat.component";
import './chatPage.style.scss';

function ChatPage() {

    return (
        <div className="chat-page">
            <ChatRoom/>
        </div>
    )
}

export default ChatPage;