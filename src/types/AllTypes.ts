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

export type UserManager = {
    id?:                  string;
    email?:               string;
    fullName?:            string;
    profilePic?:          string;
    role?:                string;
    isSubscribed?:        boolean;
    companyName?:         string;
    joiningDate?:         null;
    planExpiration?:      Date | null;
    subscriptionType?:    null | string;
    totalPayPerJobCount?: number;
    isVerified?:          boolean;
    createdAt?:           Date;
    updatedAt?:           Date;
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
  data: UserManager[];
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
  planType: "subscription" | "payPerJob" | "Employer_Plan"
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

export interface StatisticsResponce {
    success?:    boolean;
    statusCode?: number;
    message?:    string;
    data?:      StatisticData;
}

export interface StatisticData {
    users?:         StatisticUsers;
    jobs?:          StatisticJobs;
    companies?:    StatisticCompanies;
    subscriptions?: StatisticSubscriptions;
}

export interface StatisticCompanies {
    totalRegistered?: number;
}

export interface StatisticJobs {
    totalPostedToday?: number;
    totalPosted?:      number;
}

export interface StatisticSubscriptions  {
    total?:  number;
    active?: number;
}

export type StatisticUsers = {
    totalVerified?:    number;
    activeJobSeekers?: number;
    activeEmployers?:  number;
}
// jobs types response
export type JobsApiResponse = {
    success?:    boolean;
    statusCode?: number;
    message?:    string;
    data?:       Data;
}

export type Data = {
    meta?: Meta;
    data?: Jobs[];
}

export type Jobs = {
    id?:          string;
    jobId?:       string;
    title?:       string;
    experience?:  string;
    deadline?:    Date;
    location?:    string;
    salaryType?:  string;
    salaryRange?: string;
    skills?:      string[];
    features?:    Feature[];
    userId?:      string;
    companyId?:   string;
    jobType?:     string;
    status?:      string;
    createdAt?:   Date;
    updatedAt?:   Date;
    company?:     CompanyForJob;
    user?:        User | null;
}

export type CompanyForJob = {
    companyName?:   string;
    industryType?:  string;
    logo?:          string;
    roleInCompany?: string;
    description?:   string;
    email?:         string;
    phoneNumber?:   string;
    country?:       string;
    city?:          string;
    state?:         string;
    address?:       string;
    zipCode?:       string;
    website?:       string;
}
// 

export type Feature = {
    featureTitle?: string;
    paragraph?:    string;
    point?:        Point[];
}

export type Point = "Design and maintain cloud infrastructure" | "Implement security best practices" | "Optimize deployment pipelines";

export type UserI = {
    id?:                  string;
    firstName?:           string;
    lastName?:            string;
    fullName?:            string;
    email?:               string;
    profilePic?:          string;
    role?:                string;
    isSubscribed?:        boolean;
    planExpiration?:      Date;
    subscriptionType?:    string;
    totalPayPerJobCount?: number;
    createdAt?:           Date;
    updatedAt?:           Date;
}

export type Meta = {
    page?:      number;
    limit?:     number;
    total?:     number;
    totalPage?: number;
}

export type TransactionResponce = {
    success?:    boolean;
    statusCode?: number;
    message?:    string;
    meta?:       Meta;
    data?:       Transaction[];
}

export type Transaction = {
    id?:            string;
    paymentDate?:   Date;
    planName?:      string;
    planType?:      string;
    userName?:      string;
    email?:         string;
    payType?:       string;
    billingStatus?: string;
}






// profile type 
export type Profile = {
    socialMedia?:    SocialMedia;
    id?:             string;
    firstName?:      string;
    lastName?:       string;
    phoneNumber?:    string;
    profileId?:      string;
    email?:          string;
    countryRegion?:  string;
    address?:        string;
    city?:           string;
    state?:          string;
    zipCode?:        string;
    JobTitle?:       string;
    jobDescription?: string;
    jobExperience?:  JobExperience[];
    education?:      Education[];
    certifications?: any[];
    skills?:         string[];
    aboutMe?:        string;
    userId?:         string;
    createdAt?:      Date;
    updatedAt?:      Date;
    User?:           ProfileUser;
}

export type ProfileUser = {
    id?:                     string;
    firstName?:              string;
    lastName?:               string;
    fullName?:               string;
    email?:                  string;
    password?:               string;
    profilePic?:             string;
    phone?:                  string;
    preferredContactMethod?: string;
    passwordChangedAt?:      null;
    isVerified?:             boolean;
    isResetPassword?:        boolean;
    canResetPassword?:       boolean;
    isResentOtp?:            boolean;
    role?:                   string;
    isSubscribed?:           boolean;
    companyName?:            string;
    joiningDate?:            null;
    planExpiration?:         Date;
    address?:                null;
    city?:                   null;
    zipCode?:                null;
    status?:                 null;
    subscriptionType?:       string;
    planId?:                 string;
    totalPayPerJobCount?:    number;
    createdAt?:              Date;
    updatedAt?:              Date;
}

export type Education = {
    degree?:           string;
    institution_name?: string;
    major?:            string;

     startDate?: string;
  endDate?: string;
}

export type JobExperience = {
    job_title?:       string;
    company_name?:    string;
    start_date?:      Date;
    end_date?:        Date;
    job_description?: string;
}

export type SocialMedia = {
    linkedin_profile_url?:   string;
    personal_website_url?:   string;
    other_social_media?:     string;
    other_social_media_url?: string;
    github_url?:             null;
    twitter_url?:            null;
    portfolio_url?:          null;
}









export interface UpdateCompanyRequest extends Partial<CreateCompanyRequest> { }


