// import React, { useEffect, useState } from 'react';
// import { db, auth } from '../../../firebase';
// import { useAuth } from '../../hooks/useAuth';

// const MyChat = () => {
//   const { currentUser } = useAuth();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');

//   useEffect(() => {
//     if (currentUser) {
//       const unsubscribe = db
//         .collection('chats')
//         .doc('general') // assuming a single chat room named 'general'
//         .collection('messages')
//         .orderBy('createdAt')
//         .onSnapshot(snapshot => {
//           const messagesData = snapshot.docs.map(doc => ({
//             id: doc.id,
//             ...doc.data()
//           }));
//           setMessages(messagesData);
//         });

//       return () => unsubscribe();
//     }
//   }, [currentUser]);

//   const handleSendMessage = async () => {
//     if (newMessage.trim() !== '') {
//       await db.collection('chats').doc('general').collection('messages').add({
//         text: newMessage,
//         createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//         userId: currentUser.uid,
//         userName: currentUser.displayName,
//       });
//       setNewMessage('');
//     }
//   };

//   return (
//     <div>
//       <div style={{ height: '400px', overflowY: 'scroll' }}>
//         {messages.map(message => (
//           <div key={message.id}>
//             <strong>{message.userName}</strong>: {message.text}
//           </div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={newMessage}
//         onChange={e => setNewMessage(e.target.value)}
//       />
//       <button onClick={handleSendMessage}>Send</button>
//     </div>
//   );
// };

// export default MyChat;
