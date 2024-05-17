import supertest from 'supertest';

import {
  connectToMockDB,
  closeMockDatabase,
  clearMockDatabase,
} from '../__testUtils__/dbMock.js';
import app from '../app.js';
// import { addTaskToMockDB } from '../__testUtils__/taskMock.js';

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

describe('POST api/task/create', () => {
  describe('userId validation', () => {
    it('Should return a 400 status code if request body has no valid userId', () => {
      const taskWithoutUserId = {
        userId: '',
        title: 'Task 1',
        description: 'Description 1',
        completed: false,
        date: '2024-05-16T00:00:00.000Z',
        start_time: '2024-05-16T10:00:00.000Z',
        end_time: '2024-05-16T11:00:00.000Z',
        area_id: '123',
      };

      return Promise.all([
        // Task with an empty (invalid) user id will return a 400 status code and it should include {success: false, message:User id is required}
        request.post('/api/task/create').send(taskWithoutUserId).expect(400),
        request
          .post('/api/task/create')
          .send(taskWithoutUserId)
          .expect((response) => {
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('User id is required');
          }),
      ]);
    });
  });

  describe('title validation', () => {
    it('Should return a 400 status code if request body has no valid title', () => {
      const taskWithoutTitle = {
        userId: '123',
        title: '',
        description: 'Description 2',
        completed: true,
        date: '2024-05-16T00:00:00.000Z',
        start_time: '2024-05-16T10:00:00.000Z',
        end_time: '2024-05-16T11:00:00.000Z',
        area_id: '123',
      };

      return Promise.all([
        // Task with an empty (invalid) title field will return a 400 status code and it should include {success: false, message:Title is required}
        request.post('/api/task/create').send(taskWithoutTitle).expect(400),
        request
          .post('/api/task/create')
          .send(taskWithoutTitle)
          .expect((response) => {
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Title is required');
          }),
      ]);
    });
  });

  describe('description validation', () => {
    it('Should return a 400 status code if request body has no valid description', () => {
      const taskWithoutDescription = {
        userId: '123',
        title: 'Task 3',
        description: '',
        completed: false,
        date: '2024-05-16T00:00:00.000Z',
        start_time: '2024-05-16T10:00:00.000Z',
        end_time: '2024-05-16T11:00:00.000Z',
        area_id: '123',
      };

      return Promise.all([
        // Task with an empty (invalid) description field will return a 400 status code and it should include {success: false, message:Description is required}
        request
          .post('/api/task/create')
          .send(taskWithoutDescription)
          .expect(400),
        request
          .post('/api/task/create')
          .send(taskWithoutDescription)
          .expect((response) => {
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Description is required');
          }),
      ]);
    });
  });

  describe('Task creation', () => {
    it('Should return a 201 status code if the task is created successfully', () => {
      const task = {
        userId: '123',
        title: 'Task 4',
        description: 'Description 4',
        completed: false,
        date: '2024-05-16T00:00:00.000Z',
        start_time: '2024-05-16T10:00:00.000Z',
        end_time: '2024-05-16T11:00:00.000Z',
        area_id: '123',
      };

      return Promise.all([
        // Task with valid fields will return a 201 status code
        request.post('/api/task/create').send(task).expect(201),
        request
          .post('/api/task/create')
          .send(task)
          .expect((response) => {
            expect(response.body.success).toBe(true);
            expect(response.body.task).toMatchObject({
              user_id: '123',
              title: 'Task 4',
              description: 'Description 4',
              completed: false,
              date: '2024-05-16',
              start_time: '10:00',
              end_time: '11:00',
              area_id: '123',
            });
          }),
      ]);
    });
  });
});
