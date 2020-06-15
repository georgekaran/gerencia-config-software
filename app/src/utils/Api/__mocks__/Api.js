export const User = {
    signIn: jest.fn().mockImplementation((data) => {
        return new Promise(((resolve, reject) => {
            resolve(data);
        }));
    }),
};

export const Item = {
    save: jest.fn().mockImplementation((id, data) => {
        return new Promise(((resolve, reject) => {
            resolve(data);
        }));
    }),
};