import { useState, useEffect } from 'react';
import { contactService } from '../../services/contactService';

function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await contactService.getMessages();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Contact Messages</h2>
      <div className="grid gap-4">
        {messages.map((message) => (
          <div key={message.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold">
                  {message.firstName} {message.lastName}
                </h3>
                <p className="text-sm text-gray-600">{message.email}</p>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(message.createdAt).toLocaleDateString()}
              </span>
            </div>
            <h4 className="font-medium mb-2">{message.subject}</h4>
            <p className="text-gray-700">{message.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactMessages; 