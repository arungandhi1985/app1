/* export default function Root(props) {
  return <section>{props.name} is mounted!</section>;
}
 */

import { useEffect, useState } from 'react';
import { sendMessage, getMessage } from '@verint/utils';
import Button from './Button';

const App1 = (props: any) => {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const subscription = getMessage().subscribe((msg: any) => {
      if(msg.from === "App2"){
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const sendMsg = () => {
    sendMessage({ from: 'App1', text: `Hello from App1 ${new Date(Date.now()).toString()}` });
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h1>App1</h1>
      <section>{props.name} is mounted!</section>
      <Button onClick={sendMsg}>Send Message to app2</Button>
      <p>Messages from app2:</p>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default App1;