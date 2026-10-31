import { FiActivity, FiHeart, FiEye, FiSmile, FiDroplet, FiWind, FiShield, FiClock, FiUsers, FiAward, FiCheckCircle, FiArrowUpRight, FiStar } from "react-icons/fi";
import { departments as clinicDepartments, doctors as clinicDoctors } from "@/data/medical-data";

const departmentIcons = { cardiology: FiHeart, neurology: FiActivity, ophthalmology: FiEye, "dental-care": FiSmile, diagnostics: FiDroplet, pulmonology: FiWind };
const departmentTones = { cardiology: "rose", neurology: "violet", ophthalmology: "sky", "dental-care": "amber", diagnostics: "teal", pulmonology: "blue" };
export const departments = clinicDepartments.map(department => ({ ...department, icon: departmentIcons[department.slug as keyof typeof departmentIcons], tone: departmentTones[department.slug as keyof typeof departmentTones], count: `${clinicDoctors.filter(doctor => doctor.department === department.slug).length} specialists` }));
export const doctors = clinicDoctors;

export const features = [
  { title: "Expert medical team", description: "Experienced, board-certified doctors who listen and put your health first.", icon: FiUsers },
  { title: "Care around the clock", description: "A responsive care team is ready when you need support, day or night.", icon: FiClock },
  { title: "Modern diagnostics", description: "Accurate results from well-equipped labs and advanced imaging services.", icon: FiActivity },
  { title: "Your care, coordinated", description: "Connected services make it easier to move from consultation to recovery.", icon: FiShield },
];

export const testimonials = [
  { quote: "The doctors took time to explain everything, and the whole team made my family feel at ease.", name: "Nusrat Jahan", detail: "Patient · Cardiology", initials: "NJ" },
  { quote: "Booking was simple, the clinic was welcoming, and I received my reports faster than expected.", name: "Arif Hossain", detail: "Patient · Diagnostics", initials: "AH" },
  { quote: "Compassionate care from the first call through my follow-up. I felt listened to at every step.", name: "Maliha Chowdhury", detail: "Patient · Internal Medicine", initials: "MC" },
];

export const healthTips = [
  { category: "Heart health", title: "Small daily habits that support a healthier heart", date: "May 18, 2025", image: "photo-1505751172876-fa1923c5c528", read: "5 min read" },
  { category: "Wellness", title: "A practical guide to getting more restful sleep", date: "May 12, 2025", image: "photo-1511295742362-92c96b0f8aab", read: "4 min read" },
  { category: "Nutrition", title: "Building a balanced plate with familiar foods", date: "May 06, 2025", image: "photo-1490645935967-10de6ba17061", read: "6 min read" },
];

export const stats = [
  { value: 85, suffix: "+", label: "Expert doctors", icon: FiUsers },
  { value: 24, suffix: "k+", label: "Happy patients", icon: FiHeart },
  { value: 18, suffix: "+", label: "Years of care", icon: FiAward },
  { value: 120, suffix: "+", label: "Beds & services", icon: FiCheckCircle },
];

export const StarIcon = FiStar;
export const ArrowIcon = FiArrowUpRight;
