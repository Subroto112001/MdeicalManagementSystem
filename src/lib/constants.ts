export const clinic = {
  name: "Healtho Medical Center",
  phone: "+880 1700-000000",
  email: "hello@healtho.example",
  address: "Dhaka, Bangladesh",
  openingHours: "Sat–Thu, 9:00 AM–8:00 PM",
} as const;

export const socialLinks = [
  { label: "Facebook", href: "https://facebook.com/" },
  { label: "Instagram", href: "https://instagram.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
] as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Doctors", href: "/doctors" },
  { label: "Contact", href: "/contact" },
] as const;
