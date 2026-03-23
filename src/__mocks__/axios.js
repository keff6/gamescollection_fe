const mockAxios = jest.createMockFromModule('axios');

mockAxios.create = jest.fn(() => mockAxios);
mockAxios.get = jest.fn();
mockAxios.post = jest.fn();
mockAxios.put = jest.fn();
mockAxios.delete = jest.fn();

export default mockAxios;