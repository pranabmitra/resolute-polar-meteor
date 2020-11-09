const CONSTANTS = require("../utils/constants");
const axios = require("axios");
const dayjs = require("dayjs");
const User = require("../services/User");
const userInfo = new User();

module.exports = {
  isRegistered: async (uid) => {
    try {
      const response = await axios.get(CONSTANTS.usersApiUrl);
      const registeredUsers = response.data;

      const isExist = registeredUsers.find((user) => user.uid === uid);
      if (isExist) {
        // Store user data
        userInfo.setUserName(registeredUsers);
      }

      return isExist;
    } catch (error) {
      return false;
    }
  },
  isMoreThanTenYears: async (uid) => {
    try {
      const response = await axios.get(CONSTANTS.usersProfileUrl);
      const allProfiles = response.data;

      const now = dayjs();
      const profile = allProfiles.find((user) => user.userUid === uid);
      const isOverAged = now.diff(profile.birthdate, "year") > 10;
      if (!isOverAged) {
        userInfo.setUserProfiles(allProfiles);
      }

      return isOverAged;
    } catch (error) {
      // assuming this should show an error page while getting any error here
      return true;
    }
  },
  setMessage: (uid, message) => {
    userInfo.setMessage(uid, message);
  },
  updateRequestStatus: (users) => {
    userInfo.updateRequestStatus(users);
  },
  getAllUsers: () => {
    return userInfo.getAllUsers();
  },
};
