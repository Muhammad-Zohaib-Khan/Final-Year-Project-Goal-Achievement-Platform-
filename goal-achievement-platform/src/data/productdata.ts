export interface ProductType {
  recipe_id: number;
  title: string;
  image_url: string;
  content: string;
  description: string;
  price: number;
  category: string;
  created_at: string;
}

export const products=[
  {
    "recipe_id": 1,
    "title": "Creamy Chicken Alfredo",
    "image_url": "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2hpY2tlbiUyMGFsZnJlZG98ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    "content": "1. Boil pasta\n2. Cook chicken with spices\n3. Mix with cream sauce...",
    "description": "Rich and creamy pasta with tender chicken breast.",
    "price": 2.99,
    "category": "Italian",
    "created_at": "2025-07-01T10:30:00Z"
  },
  {
    "recipe_id": 2,
    "title": "Beef Biryani",
    "image_url": "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVlZiUyMGJpcnlhbml8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    "content": "1. Marinate beef\n2. Layer rice and beef\n3. Cook with steam...",
    "description": "Traditional spicy Pakistani beef biryani.",
    "price": 1.99,
    "category": "Pakistani",
    "created_at": "2025-07-01T12:15:00Z"
  },
  {
    "recipe_id": 3,
    "title": "Vegan Buddha Bowl",
    "image_url": "https://images.unsplash.com/photo-1551183053-bf91a1d81141",
    "content": "1. Roast veggies\n2. Add quinoa, chickpeas\n3. Top with tahini...",
    "description": "Colorful vegan bowl full of nutrients.",
    "price": 3.49,
    "category": "Vegan",
    "created_at": "2025-07-02T08:45:00Z"
  }
]


export const users = [
  {
    "user_id": 1,
    "name": "Ayesha Khan",
    "email": "ayesha.khan@example.com",
    "password": "hashed_password_1",  // Replace with actual hash in real apps
    "address": "Karachi, Pakistan",
    "phone": "+92-300-1234567",
    "created_at": "2025-06-25T09:00:00Z"
  },
  {
    "user_id": 2,
    "name": "John Smith",
    "email": "john.smith@example.com",
    "password": "hashed_password_2",
    "address": "New York, USA",
    "phone": "+1-212-555-7890",
    "created_at": "2025-06-26T10:30:00Z"
  },
  {
    "user_id": 3,
    "name": "Fatima Zahra",
    "email": "fatima.zahra@example.com",
    "password": "hashed_password_3",
    "address": "Lahore, Pakistan",
    "phone": "+92-321-6549870",
    "created_at": "2025-06-27T11:15:00Z"
  }
];
