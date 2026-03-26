import { useEffect, useState } from 'react';
// Importing our shared code into the frontend!
import {type User, formatGreeting } from '@my-app/shared';

function App() {
  const [data, setData] = useState<{ user: User | null; greeting: string }>({
    user: null,
    greeting: ''
  });

  useEffect(() => {
    // In a real app, you would fetch from your Express backend here
    const mockUser: User = {
      id: '2',
      name: 'Frontend Wizard',
      email: 'wizard@example.com'
    };
    
    setData({
      user: mockUser,
      greeting: formatGreeting(mockUser)
    });
  }, []);

  return (
    <div>
      <h1>Client App</h1>
      <p>Shared Greeting: {data.greeting}</p>
    </div>
  );
}

export default App;