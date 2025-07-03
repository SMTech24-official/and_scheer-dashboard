
import {  GiPayMoney  } from 'react-icons/gi';
import { IoSettingsOutline } from 'react-icons/io5';
import {  LiaClipboardListSolid } from 'react-icons/lia';
import {  MdOutlineManageAccounts, MdPayment } from 'react-icons/md';
import { RiDashboardFill } from 'react-icons/ri';

export const navLink = [
  {
    name: "Overview",
    href: "/dashboard/overview",
    icon: RiDashboardFill,
  },
  {
    name: "User Management",
    href: "/dashboard/user-management",
    icon: LiaClipboardListSolid,
  },
  {
    name: "Job Management",
    href: "/dashboard/job-management",
    icon: MdOutlineManageAccounts,
    
  },
  {
    name: "Subscription",
    href: "/dashboard/subscription",
    icon: MdPayment ,
    
  },
  {
    name: "Payment History",
    href: "/dashboard/payment-history",
    icon: GiPayMoney,
    
  },
  {
    name: "Setting",
    href: "/dashboard/setting",
    icon: IoSettingsOutline,
    
  },
];
