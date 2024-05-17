import supertest from 'supertest';

import {
  connectToMockDB,
  closeMockDatabase,
  clearMockDatabase,
} from '../__testUtils__/dbMock.js';
import app from '../app.js';
import { serverErrorMock } from '../__testUtils__/areaMock.js';

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

describe('POST api/area/create', () => {
  describe('userId validation', () => {
    it('Should return a 400 status code if request body has no valid userId', () => {
      const areaWithoutUserId = {
        userId: '',
        title: 'Area 1',
        color_code: '#ffffff',
        description: 'Description 1',
      };

      return Promise.all([
        // Area with an empty (invalid) user id will return a 400 status code and it should include {success: false, message:User id is required}
        request.post('/api/area/create').send(areaWithoutUserId).expect(400),
        request
          .post('/api/area/create')
          .send(areaWithoutUserId)
          .expect((response) => {
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('User id is required');
          }),
      ]);
    });
  });

  describe('title validation', () => {
    it('Should return a 400 status code if request body has no valid title', () => {
      const areaWithoutTitle = {
        userId: '123',
        title: '',
        color_code: '#ffffff',
        description: 'Description 2',
      };

      return Promise.all([
        // Area with an empty (invalid) title will return a 400 status code and it should include {success: false, message:Title is required}
        request.post('/api/area/create').send(areaWithoutTitle).expect(400),
        request
          .post('/api/area/create')
          .send(areaWithoutTitle)
          .expect((response) => {
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Title is required');
          }),
      ]);
    });
  });

  describe('successful area creation', () => {
    it('Should return a 201 status code if the area is created successfully', () => {
      const area = {
        userId: '123',
        title: 'Area 3',
        color_code: '#ffffff',
        description: 'Description 3',
      };

      return Promise.all([
        // Area with valid data will return a 201 status code and it should include {success: true, area: {area}}
        request.post('/api/area/create').send(area).expect(201),
        request
          .post('/api/area/create')
          .send(area)
          .expect((response) => {
            expect(response.body.success).toBe(true);
            expect(response.body.area.title).toBe(area.title);
            expect(response.body.area.color_code).toBe(area.color_code);
            expect(response.body.area.description).toBe(area.description);
          }),
      ]);
    });
  });

  describe('error handling', () => {
    it('Should return a 500 status code if there is an error creating the area', () => {
      const area = {
        userId: '123',
        title: 'Area 3',
        color_code: '#ffffff',
        description: 'Description 3',
      };

      // Mock server error
      serverErrorMock();

      return request.post('/api/area/create').send(area).expect(500);
    });
  });
});
