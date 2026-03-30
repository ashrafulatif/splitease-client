import { env } from "./env";

//base api
export const API_BASE_URL = env.BACKEND_URL;

//api endpoints
export const API_ENDPOINTS = {
  auth: {
    login: "/api/v1/auth/login",
    register: "/api/v1/auth/register",
    logout: "/api/v1/auth/logout",
    verifyEmail: "/api/v1/auth/verify-email",
    resendOtp: "/api/v1/auth/resend-otp",
    me: "/api/v1/auth/me",
    changePassword: "/api/v1/auth/change-password",
    updateProfile: "/api/v1/auth/profile"
  },
  house: {
    getAllHouses: "/api/v1/houses",
    createHouse: "/api/v1/houses",
    getMyHouse: "/api/v1/houses/my",
    getHouseById: (id: string) => `/api/v1/houses/${id}`,
    updateHouseById: (id: string) => `/api/v1/houses/update/${id}`,
    deleteHouse: (id: string) => `/api/v1/houses/delete/${id}`,
  },
  members:{
    getAllMembers: "/api/v1/house-members",
    addMember: "/api/v1/house-members",
    removeMember: (id: string) => `/api/v1/house-members/${id}`,
    // updateMember: (id: string) => `/api/v1/house-members/${id}`,
    getHouseMembers: (id: string) => `/api/v1/house-members/house/${id}`,
    getMemberById: (id: string) => `/api/v1/house-members/${id}`,
  },
  expenses:{
    getExpensesByMonth: "/api/v1/expenses",
    createExpense: "/api/v1/expenses",
    getExpenseById: (id: string) => `/api/v1/expenses/${id}`,
    updateExpenseById: (id: string) => `/api/v1/expenses/${id}`,
    deleteExpense: (id: string) => `/api/v1/expenses/${id}`,
  },
  months:{
    createMonth: "/api/v1/months",
    getHouseMonths: (id: string) => `/api/v1/months/house/${id}`,
    getFullMonthDataById: (id: string) => `/api/v1/months/${id}`,
    deleteMonth: (id: string) => `/api/v1/months/${id}`,  
  },
  meals:{
    getMealsByMonth: (id: string) => `/api/v1/meals/month/${id}`,
    addMeal: "/api/v1/meals",
    getMealById: (id: string) => `/api/v1/meals/${id}`,
    updateMealById: (id: string) => `/api/v1/meals/${id}`,
    deleteMeal: (id: string) => `/api/v1/meals/${id}`,
  },
  deposits:{
    getDepositsByMonth: "/api/v1/deposits",
    createDeposit: "/api/v1/deposits",
    getDepositById: (id: string) => `/api/v1/deposits/${id}`,
    updateDepositById: (id: string) => `/api/v1/deposits/${id}`,
    deleteDeposit: (id: string) => `/api/v1/deposits/${id}`,
  },
  stats:{
    getMonthlySummary: (id: string) => `/api/v1/stats/summary/${id}`,
    getDashboardSummary: "/api/v1/stats/dashboard",
  },
  plans:{
    getAllPlans: "/api/v1/plans",
    createPlan: "/api/v1/plans",
    updatePlan: (id: string) => `/api/v1/plans/${id}`,
    deletePlan: (id: string) => `/api/v1/plans/${id}`,
    
  },
  subscriptions:{
    getMySubscription: "/api/v1/subscription/my",
    getAllSubscriptions: "/api/v1/subscription/",
    initiatePayment: (id: string) => `/api/v1/subscription/initiate-payment/${id}`,
  },
  users:{
    getAllUsers: "/api/v1/users",
    updateUserStatus: (id: string) => `/api/v1/users/update-status/${id}`,
    deleteUser: (id: string) => `/api/v1/users/delete/${id}`,
    getUserById: (id: string) => `/api/v1/users/${id}`,
  }
} as const;

export const buildApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
};
