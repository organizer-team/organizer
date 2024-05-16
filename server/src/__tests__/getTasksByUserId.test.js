import supertest from 'supertest';
import app from '../app.js';

import {
  connectToMockDB,
  closeMockDatabase,
  clearMockDatabase,
} from '../__testUtils__/dbMock.js';

import { addTaskToMockDB } from '../__testUtils__/taskMock.js';

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

describe('GET /api/task/:userId', () => {
  it('Should return a 404 status code if the user does not exist or the user has no task', (done) => {
    request
      .get('/api/task/123')
      .then((response) => {
        expect(response.status).toBe(404);

        const { body } = response;
        expect(body.success).toBe(false);
        expect(body.message).toBe('No tasks found');

        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('Should return all the tasks for a user', async () => {
    // Create a tasks
    const task1 = {
      user_id: '123',
      title: 'Task 1',
      description: 'Description 1',
      completed: false,
      date: '2024-05-16T00:00:00.000Z',
      start_time: '2024-05-16T10:00:00.000Z',
      end_time: '2024-05-16T11:00:00.000Z',
      area_id: '123',
    };

    const task2 = {
      user_id: '123',
      title: 'Task 2',
      description: 'Description 2',
      completed: true,
      date: '2024-05-16T00:00:00.000Z',
      start_time: '2024-05-16T10:00:00.000Z',
      end_time: '2024-05-16T11:00:00.000Z',
      area_id: '123',
    };

    await addTaskToMockDB(task1);
    await addTaskToMockDB(task2);

    return request.get('/api/task/123').then((response) => {
      expect(response.status).toBe(200);

      const { body } = response;
      expect(body.success).toBe(true);

      const tasks = body.tasks;
      expect(tasks).toHaveLength(2);

      const task1Result = tasks.filter((task) => task.title === task1.title)[0];
      const task2Result = tasks.filter((task) => task.title === task2.title)[0];

      expect(task1Result.description).toBe(task1.description);
      expect(task2Result.description).toBe(task2.description);

      // tasks should have an area property which is an object including title, description, and color_code
      expect(task1Result.area).toHaveProperty('title');
      expect(task1Result.area).toHaveProperty('description');
      expect(task1Result.area).toHaveProperty('color_code');
    });
  });
});
