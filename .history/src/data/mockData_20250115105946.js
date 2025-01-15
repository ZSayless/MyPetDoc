export const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Pet Owner",
    status: "active",
    joinDate: "2024-03-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Veterinarian",
    status: "active",
    joinDate: "2024-03-14",
  },
  {
    id: 3,
    name: "Dr. Wilson",
    email: "wilson@example.com",
    role: "Admin",
    status: "active",
    joinDate: "2024-03-10",
  },
];

export const mockHospitals = [
  {
    id: 1,
    name: "Pet Care Center",
    address: "123 Main St",
    phone: "0123456789",
    email: "petcare@example.com",
    status: "pending",
    rating: 4.5,
    joinDate: "2024-03-15",
  },
  {
    id: 2,
    name: "Animal Hospital",
    address: "456 Oak St",
    phone: "0987654321",
    email: "animalhospital@example.com",
    status: "approved",
    rating: 4.8,
    joinDate: "2024-03-10",
  },
];

export const mockBlogs = [
  {
    id: 1,
    title: "Essential Pet Vaccinations Guide",
    author: "Dr. John Smith",
    category: "Pet Health",
    content: "Detailed guide about pet vaccinations...",
    status: "published",
    views: 1234,
    publishDate: "2024-03-15",
  },
  {
    id: 2,
    title: "Common Pet Behavior Issues",
    author: "Dr. Sarah Johnson",
    category: "Pet Behavior",
    content: "Understanding pet behavior problems...",
    status: "draft",
    views: 0,
    publishDate: "-",
  },
];

export const mockReports = [
  {
    id: 1,
    type: "comment",
    content: "Inappropriate comment on blog post",
    reportedItem: "Comment on 'Pet Nutrition Guide'",
    reportedBy: "John Doe",
    reportedAt: "2024-03-15",
    status: "pending",
  },
  {
    id: 2,
    type: "review",
    content: "False review information",
    reportedItem: "Review for PetCare Hospital",
    reportedBy: "Jane Smith",
    reportedAt: "2024-03-14",
    status: "resolved",
  },
];

export const mockMessages = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    subject: "Question about services",
    message: "I have a question about your pet vaccination services...",
    status: "unread",
    createdAt: "2024-03-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    subject: "Feedback",
    message: "I wanted to share my experience...",
    status: "read",
    createdAt: "2024-03-14",
  },
];

export const mockPendingApprovals = [
  {
    id: 1,
    type: "hospital",
    name: "Pet Care Center",
    email: "petcare@example.com",
    status: "pending",
    submittedAt: "2024-03-15",
    details: {
      address: "123 Main St",
      phone: "0123456789",
      license: "LICENSE123",
      services: ["Vaccination", "Surgery", "Grooming"],
    },
  },
  {
    id: 2,
    type: "veterinarian",
    name: "Dr. Sarah Wilson",
    email: "sarah.wilson@example.com",
    status: "pending",
    submittedAt: "2024-03-14",
    details: {
      license: "VET456",
      specialization: "Small Animals",
      experience: "5 years",
      certifications: ["ACVS", "ACVIM"],
    },
  },
];
