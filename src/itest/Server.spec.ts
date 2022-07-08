import * as axios from 'axios';
import { UserCredentialsDbAccess } from '../app/Authorization/UserCredentialsDbAccess';
import {
  HTTP_CODES,
  UserCredentials,
  SessionToken,
} from '../app/Models/ServerModels';

axios.default.defaults.validateStatus = function () {
  return true;
};
const serverUrl = 'http://localhost:8080';
const itestsUserCredentials: UserCredentials = {
  accessRights: [1, 2, 3],
  password: 'iTest',
  username: 'iTestUser',
};

describe('Server itest suite', () => {
  // currently describe does not allow asyncronous functions so we can't use await
  // const testIfServerReachable = await serverReachable()? test:test.skip
  // serverReachable();
  let userCrendentialsDBAccess: UserCredentialsDbAccess;
  let sessionToken: SessionToken;
  beforeAll(() => {
    userCrendentialsDBAccess = new UserCredentialsDbAccess();
  });

  test('server reachable', async () => {
    const response = await axios.default.options(serverUrl);
    expect(response.status).toBe(HTTP_CODES.OK);
  });

  test.skip('put crendeitlas inside database', async () => {
    await userCrendentialsDBAccess.putUserCredential(itestsUserCredentials);
  });

  test('login wrong with invalid crendentials', async () => {
    const response = await axios.default.post(serverUrl + '/login', {
      password: 'wrongiTest',
      username: 'wrongiTestUser',
    });
    expect(response.status).toBe(HTTP_CODES.NOT_fOUND);
  });
  test('login succesful with correct credentials', async () => {
    const path = serverUrl + '/login';
    const response = await axios.default.post(path, {
      username: itestsUserCredentials.username,
      password: itestsUserCredentials.password,
    });
    expect(response.status).toBe(HTTP_CODES.CREATED);
    sessionToken = response.data;
  });
  test('Query data', async () => {
    const response = await axios.default.get(
      serverUrl + '/users?name=someName4',
      {
        headers: {
          Authorization: sessionToken.tokenId,
        },
      }
    );
    expect(response.status).toBe(HTTP_CODES.OK);
  });

  test('Query data with invalid token', async () => {
    const response = await axios.default.get(
      serverUrl + '/users?name=someName4',
      {
        headers: {
          Authorization: sessionToken.tokenId + 'sdfa',
        },
      }
    );
    expect(response.status).toBe(HTTP_CODES.UNAUTHORIZED);
  });
});
/**
 * Not usable in Jest
 * @see https://github.com/facebook/jest/issues/8604
 */
async function serverReachable(): Promise<boolean> {
  try {
    await axios.default.get(serverUrl);
  } catch (error) {
    console.log('server NOT reachable');
    return false;
  }
  console.log('server NOT reachable');
  return true;
}
