jest.mock('../src/config/db');
const db = require('../src/config/db');
const productService = require('../src/services/product.service');

describe('Product Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getAllProducts() harus ambil semua produk', async () => {
    const mockProducts = [
      { id: 1, name: 'Kabel USB', category: 'Elektronik', stock: 100 }
    ];

    db.query.mockResolvedValue({ rows: mockProducts });

    const result = await productService.getAllProducts();

    expect(db.query).toHaveBeenCalled();
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Kabel USB');
  });
});
