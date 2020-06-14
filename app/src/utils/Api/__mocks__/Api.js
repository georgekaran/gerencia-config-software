export const User = {
    /**
     * @param data Objeto contendo username e password
     * @returns Promise
     */
    signIn: jest.fn().mockImplementation((data) => {
        console.log(this);
        console.log(data);
        return new Promise(((resolve, reject) => {
            resolve(data);
        }));
    }),
};