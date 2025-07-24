export interface CreateJobRequest {
  title: string;
  experience: string;
  deadline: string;
  location: string;
  salaryType: string;
  salaryRange: string;
  skills: string[];
  features: {
    featureTitle: string;
    paragraph?: string;
    point?: string[];
  }[];
  userId: string;
  companyId: string;
  type: string;
  status?: string;
}


export interface JobResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Job;
}


export interface JobsListResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPage: number;
    };
    data: Job[];
  };
}


export interface Job {
  id: string;
  title: string;
  experience: string;
  deadline: string;
  location: string;
  salaryType: string;
  salaryRange: string;
  skills: string[];
  features: {
    featureTitle: string;
    paragraph?: string;
    point?: string[];
  }[];
  userId: string;
  companyId: string;
  type: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    profilePic: string;
    role: string;
    isVerified?: boolean;
  };
  company?: {
    companyName: string;
    logo: string;
    industryType: string;
    email: string;
    phoneNumber: string;
  };
}

export type UpdateJobRequest = Partial<CreateJobRequest>;



//Companies Types
export interface Company {
  id: string;
  companyName: string;
  industryType: string;
  roleInCompany: string;
  description: string;
  logo: string; // URL to logo image
  country: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  website: string;
  userId: string; // MongoDB ObjectId (reference to user)
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
}


export interface CompanyListResponse {
  success: boolean;
  message: string;
  data: Company[];
}

export interface CompanyResponse {
  success: boolean;
  message: string;
  data: Company;
}

export interface CreateCompanyRequest {
  companyName: string;
  logo: string;
  industryType: string;
  email: string;
  phoneNumber: string;
}
// //  {
//             "id": "6874d933acae2f94b75ef251",
//             "email": "superadmin@gmail.com",
//             "fullName": "Super Admin",
//             "profilePic": "",
//             "role": "SUPER_ADMIN",
//             "isSubscribed": false
//         },

// user types

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  profilePic: string;
  role: string;
  isVerified?: boolean;

}
export interface UserListResponse {
  success: boolean;
  message: string;

  meta: {
    page: number;
    limit: number;  

    total: number;
    totalPage: number;
    },
  data: User[];
}
export interface UserResponse {
  success: boolean;
  message: string;
  data: User;
} 
export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePic?: string;
  role: string; // e.g., "USER", "ADMIN", "SUPER_ADMIN"
}
export interface UpdateUserRequest extends Partial<CreateUserRequest> {
  id: string; // Include the user ID for updates
}

export interface Plan {
  id: string;
  planName: string;
  amount: number;
  currency: string;
  interval: string | null;
  intervalCount: number | null;
  productId: string;
  priceId: string;
  active: boolean;
  description: string;
  features: string[];
  planType: "subscription" | "payPerJob";
  totalSubscribers: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export type StatisticsResponce = {
    success?:    boolean;
    statusCode?: number;
    message?:    string;
    data?:      StatisticData;
}

export type StatisticData = {
    users?:         StatisticUsers;
    jobs?:          StatisticJobs;
    companies?:    StatisticCompanies;
    subscriptions?: StatisticSubscriptions;
}

export type StatisticCompanies = {
    totalRegistered?: number;
}

export type StatisticJobs = {
    totalPostedToday?: number;
    totalPosted?:      number;
}

export type StatisticSubscriptions = {
    total?:  number;
    active?: number;
}

export type StatisticUsers = {
    totalVerified?:    number;
    activeJobSeekers?: number;
    activeEmployers?:  number;
}






export interface UpdateCompanyRequest extends Partial<CreateCompanyRequest> { }


