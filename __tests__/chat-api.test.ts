import { createRequest, createResponse } from 'node-mocks-http';
import handler from '../src/pages/api/chat';

describe('POST /api/chat validation', () => {
  it('returns 400 when message is missing', async () => {
    const req = createRequest({
      method: 'POST',
      body: {},
    });
    const res = createResponse();

    await handler(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
    const data = res._getJSONData();
    expect(data.error).toBe('Invalid message');
  });
});
