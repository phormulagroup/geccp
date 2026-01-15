const endpoints = {
  auth: {
    login: "/auth/login",
    verifyToken: "/auth/verifyToken",
    verifyUser: "/auth/verifyUser",
    recover: "/auth/recover",
    recoverPassword: "/auth/recoverPassword",
    verifyTokenGeneratePassword: "/auth/verifyTokenGeneratePassword",
    generatePassword: "/auth/generatePassword",
  },
  user: {
    read: "/user/read",
    readByEmail: "/user/readByEmail",
    update: "/user/update",
    create: "/user/create",
    delete: "/user/delete",
    generatePassword: "/user/generatePassword",
  },
  patient: {
    read: "/patient/read",
    readById: "/patient/readById",
    readByInstitution: "/patient/readByInstitution",
    update: "/patient/update",
    create: "/patient/create",
    delete: "/patient/delete",
  },
  logs: {
    read: "/logs/read",
    create: "/logs/create",
  },
};

export default endpoints;
