import express from 'express';
// Importing our shared code!
import { User, formatGreeting } from '@my-app/shared';

const app = express();
const PORT = 3000;

app.get('/api/user', (req, res) => {
  const mockUser: User = {
    id: '1',
    name: 'Developer',
    email: 'dev@example.com'
  };

  res.json({
    user: mockUser,
    greeting: formatGreeting(mockUser)
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});