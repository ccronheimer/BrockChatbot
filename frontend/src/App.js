import React,{useState} from 'react';
import "./styles.css"

function App() {

  const questions = ['Lorem ipsum dolor sit amet?', 'Lorem ipsum dolor sit amet2?', 'Lorem ipsum dolor sit amet3?']
 
  const [messages, setMessages] = useState(['How can I help you?']);
  
  const handleAddMessage = () => {
    
  };

  return (
    
        <div className='container'>
          <div className='chat-container'>
            <div className='chat'>
                <MessageList messages={messages}/>
            </div>
          </div>
          <div className='chat-input-container'>
            <div className='chat-input'>
              <QuestionList questions={questions}/>
            </div>
          </div>
        </div>
 
  );
}
function MessageList(props) {
  const messages = props.messages;
  const listMessages = messages.map((message) => 
    <Message key={message} value={message}/>
  );

  return (
    <div>
      {listMessages}
    </div>
  )
}

function Message(props) {
  return <p>{props.value}</p>
}

function Question(props) {
  return <button>{props.value}</button>
}

function QuestionList(props) {
  const questions = props.questions;
  const listQuestions = questions.map((question) => 
    <Question key={question} value={question}/>
  );

  return (
    <div>
      {listQuestions}
    </div>
  )
}
export default App;

