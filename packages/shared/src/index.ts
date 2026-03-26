
export interface User {
  id: string;
  name: string;
  email: string;
}


export const formatGreeting = (user: User): string => {
  return `Hello, ${user.name}! Welcome back.`;
};