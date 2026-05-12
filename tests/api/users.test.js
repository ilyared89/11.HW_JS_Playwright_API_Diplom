import { test, expect } from '@playwright/test';
import { UserService } from '../../src/services/UserService.js';
import { testData } from '../../src/utils/dataGenerator.js';

test('@POST Создание пользователя', async ({ request }) => {
  const userService = new UserService(request);
  const userData = testData.generateUser();
  
  const response = await userService.createUser(userData);
  expect(response.status()).toBe(201);
  
  const body = await userService.assertUserCreated(response, userData);
  expect(body.id).toBeDefined();
  expect(body.createdAt).toBeDefined();
});