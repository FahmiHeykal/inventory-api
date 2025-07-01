jest.mock('../src/config/db'); 
const db = require('../src/config/db');
const bcrypt = require('bcryptjs');
const authService = require('../src/services/auth.service');

describe('Auth Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('register() harus menyimpan user baru ke database', async () => {
    const mockUser = {
      name: 'Fahmi',
      email: 'fahmi@example.com',
      password: 'rahasia',
      role: 'admin'
    };

    db.query.mockResolvedValue({ rows: [{ id: 1, ...mockUser }] });

    const result = await authService.register(mockUser);

    expect(db.query).toHaveBeenCalled();
    expect(result.name).toBe('Fahmi');
    expect(result.email).toBe('fahmi@example.com');
    expect(result.role).toBe('admin');
    expect(result).toHaveProperty('id');
  });
});
