import React from 'react';
import UserProfile from './userProfile';
import { mockUser } from './mocks/userMocks';
function App() {
  return <UserProfile user={mockUser} />;
}

export default App;
