export interface SiteData {
  _id: string;
  company: string;
  image: string;
  screenshot: string;
  website: string;
  socials: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
  description: string;
  address: string;
  phone: string;
  email: string;
}
