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

export interface UpdateCompanyRequest extends Partial<CreateCompanyRequest> { }


