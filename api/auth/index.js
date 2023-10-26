import { createResourceId } from 'src/utils/create-resource-id';
import { decode, JWT_EXPIRES_IN, JWT_SECRET, sign } from 'src/utils/jwt';
import { wait } from 'src/utils/wait';
import { BACKEND_BASE_URL } from 'src/config';

import { users } from './data';

const STORAGE_KEY = 'users';

// NOTE: We use sessionStorage since memory storage is lost after page reload.
//  This should be replaced with a server call that returns DB persisted data.

const getPersistedUsers = () => {
  try {
    const data = sessionStorage.getItem(STORAGE_KEY);

    if (!data) {
      return [];
    }

    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return [];
  }
};

const persistUser = (user) => {
  try {
    const users = getPersistedUsers();
    const data = JSON.stringify([...users, user]);
    sessionStorage.setItem(STORAGE_KEY, data);
  } catch (err) {
    console.error(err);
  }
};

class AuthApi {
  async signIn(request) {
    const { email, password } = request;
  
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to authenticate');
      }
  
      const data = await response.json();
  
      if (data.token) {
        console.log(data.token);
        return { accessToken: data.token };

      } else {
        throw new Error(data.message || 'Unknown error');
      }
    } catch (err) {
      console.error('[Auth Api]: ', err);
      throw new Error('Internal server error');
    }
  }
  

  async signUp(request) {
    const { email, name, password } = request;

    await wait(1000);

    return new Promise((resolve, reject) => {
      try {
        // Merge static users (data file) with persisted users (browser storage)
        const mergedUsers = [...users, ...getPersistedUsers()];

        // Check if a user already exists
        let user = mergedUsers.find((user) => user.email === email);

        if (user) {
          reject(new Error('User already exists'));
          return;
        }

        user = {
          id: createResourceId(),
          avatar: undefined,
          email,
          name,
          password,
          plan: 'Standard',
        };

        persistUser(user);

        const accessToken = sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        resolve({ accessToken });
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  async me(request) {
    const { accessToken } = request;
  
    try {
      // Make a request to the backend to fetch user details using the JWT token
      const response = await fetch(`${BACKEND_BASE_URL}/api/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
  
      const user = await response.json();

      console.log(user);
      localStorage.setItem('user_data', JSON.stringify(user));

  
      // Store the JWT token in local storage for subsequent requests
      localStorage.setItem('jwt_token', accessToken);
  
      return {
        id: user.username,
        avatar: user.avatar,
        email: user.email,
        name: user.name,
          // Ensure your backend provides this information, or remove it if not needed
      };
    } catch (err) {
      console.error('[Auth Api]: ', err);
      throw new Error('Internal server error');
    }
  }
}

export const authApi = new AuthApi();
