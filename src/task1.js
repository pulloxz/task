import users from './users.json';

export const getFirstUser = () => {
    return users[0];
};

export const getLastUser = () => {
    return users[users.length - 1];
};

export const getUserByID = (userID) => {
    return users.find(user => user.id === userID);
};

export const getUserByCompanyName = (companyName) => {
    return users.find(user => user.company.name === companyName);
};

export const getUsersByCity = (city) => {
    return users.filter(user => user.address.city === city);
};

export const getStreet = (userID) => {
    const user = getUserByID(userID);
    return user ? user.address.street : null;
};

export const addNewUser = (userObject) => {
    users.push(userObject);
};

export const updateUser = (userID, newEmail) => {
    const user = getUserByID(userID);
    if (user) {
        user.email = newEmail;
    }
};

export const deleteUserById = (userID) => {
    const index = users.findIndex(user => user.id === userID);
    if (index !== -1) {
        users.splice(index, 1);
    }
};
