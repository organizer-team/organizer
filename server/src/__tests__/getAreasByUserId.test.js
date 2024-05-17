import supertest from 'supertest';
import app from '../app.js';

import {
  connectToMockDB,
  closeMockDatabase,
  clearMockDatabase,
} from '../__testUtils__/dbMock.js';

import { addAreaToMockDB } from '../__testUtils__/areaMock.js';

const request = supertest(app);

beforeAll(async () => {
  await connectToMockDB();
});

afterEach(async () => {
  await clearMockDatabase();
});

afterAll(async () => {
  await closeMockDatabase();
});

describe('GET /api/area/:userId', () => {
  it('Should return a 404 status code if the user does not exist or the user has no area', (done) => {
    request
      .get('/api/area/123')
      .then((response) => {
        expect(response.status).toBe(404);

        const { body } = response;
        expect(body.success).toBe(false);
        expect(body.message).toBe('No areas found');

        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('Should return all the areas for a user', async () => {
    // Create a areas
    const area1 = {
      user_id: '123',
      title: 'Area 1',
      color_code: '#ffffff',
      description: 'Description 1',
    };

    const area2 = {
      user_id: '123',
      title: 'Area 2',
      color_code: '#ffffff',
      description: 'Description 2',
    };

    await addAreaToMockDB(area1);
    await addAreaToMockDB(area2);

    // Get areas
    const response = await request.get('/api/area/123');

    expect(response.status).toBe(200);

    const { body } = response;
    expect(body.success).toBe(true);
    expect(body.areas.length).toBe(2);

    const [firstArea, secondArea] = body.areas;

    expect(firstArea.title).toBe(area1.title);
    expect(firstArea.color_code).toBe(area1.color_code);
    expect(firstArea.description).toBe(area1.description);

    expect(secondArea.title).toBe(area2.title);
    expect(secondArea.color_code).toBe(area2.color_code);
    expect(secondArea.description).toBe(area2.description);
  });
});
