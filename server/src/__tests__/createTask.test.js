import supertest from 'supertest';

import {
  connectToMockDB,
  closeMockDatabase,
  clearMockDatabase,
} from '../__testUtils__/dbMock.js';
import app from '../app.js';
import { findTaskInMockDB } from '../__testUtils__/taskMock.js';

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

const testTaskBase = {
  userId: '123456',
  title: 'Test Task',
  description: 'This is a test task',
  completed: false,
  start_time: new Date(),
  end_time: new Date(),
  area_id: '78910',
};

describe('POST /api/task/create', () => {
  it('Should return a bad request if no userId is given', (done) => {
    const testTask = { ...testTaskBase, userId: undefined };

    request
      .post('/api/task/create')
      .send(testTask)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('User id is required');
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('Should return a bad request if no title is given', (done) => {
    const testTask = { ...testTaskBase, title: undefined };

    request
      .post('/api/task/create')
      .send(testTask)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Task title is required');
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('Should return a success response and the id of the new task if a valid task object is provided', (done) => {
    const testTask = { ...testTaskBase };

    request
      .post('/api/task/create')
      .send(testTask)
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.task._id).toBeDefined();
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('Should return a success state if a correct task is given', async () => {
    const testTask = { ...testTaskBase };

    return request
      .post('/api/task/create')
      .send(testTask)
      .then(async (response) => {
        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);

        // Retrieve the newly created task from the database
        const newTask = await findTaskInMockDB(response.body.task._id);

        expect(newTask.title).toEqual(testTask.title);
      });
  });
});
