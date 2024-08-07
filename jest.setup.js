// jest.setup.js
global.System = {
    import: jest.fn(() => Promise.resolve({})), // Mock import to return an empty object or any required mock
    register: jest.fn(),
};
