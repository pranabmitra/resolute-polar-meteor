class User {
  constructor() {
    this.userInfo = [];
  }

  setUserName(registeredUsers) {
    this.userInfo = [...registeredUsers];
  }

  setUserProfiles(allProfiles) {
    this.userInfo = this.userInfo.map((user) => {
      const aProfile = allProfiles.find(
        (profileData) => user.uid === profileData.userUid
      );

      return {
        id: user.uid,
        name: user.username,
        address: aProfile.address,
        birthdate: aProfile.birthdate,
        requestStatus: "pending",
        message: "",
      };
    });

    return this.userInfo;
  }

  setMessage(uid, message) {
    const user = this.userInfo.find((user) => user.id === uid);
    user.message = message;

    return this.userInfo;
  }

  updateRequestStatus(users) {
    users.map(pendingUser => {
        this.userInfo.filter((user) => {
            user.requestStatus  = 'delivered'
        });
    });
  }

  getAllUsers() {
    return this.userInfo;
  }
}

module.exports = User;
