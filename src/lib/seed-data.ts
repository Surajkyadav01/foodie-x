export type MenuItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  veg: boolean;
  desc?: string;
};

export type Restaurant = {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  priceForTwo: number;
  offer?: string;
  menu: MenuItem[];
};

const img = (q: string, sig: number) =>
  `https://images.unsplash.com/photo-${q}?auto=format&fit=crop&w=800&q=80&sig=${sig}`;

export const seedCategories = [
  { name: "Pizza", emoji: "🍕" },
  { name: "Burger", emoji: "🍔" },
  { name: "Biryani", emoji: "🍚" },
  { name: "Drinks", emoji: "🥤" },
  { name: "Chinese", emoji: "🍜" },
  { name: "Desserts", emoji: "🍰" },
  { name: "Indian", emoji: "🍛" },
  { name: "South Indian", emoji: "🥞" },
];

export const seedOffers = [
  { id: "o1", title: "50% OFF up to ₹100", subtitle: "Use code FOODIE50", color: "from-rose-500 to-red-600" },
  { id: "o2", title: "Free Delivery", subtitle: "On orders above ₹199", color: "from-orange-500 to-rose-500" },
  { id: "o3", title: "Buy 1 Get 1", subtitle: "On selected pizzas", color: "from-amber-500 to-red-500" },
];

const pizza = "1513104890138-7c749659a591";
const burger = "1568901346375-23c9450c58cd";
const biryani = "1633945274405-b6c8b39f4264";
const noodles = "1569718212165-3a8278d5f624";
const dosa = "1630383249896-424e482df921";
const drink = "1544145945-f90425340c7e";
const dessert = "1551024506-0bccd828d307";
const curry = "1585937421612-70a008356fbe";

export const seedRestaurants: Restaurant[] = [
  {
    id: "r1",
    name: "Spice Symphony",
    image: img(curry, 1),
    cuisine: "Indian, Biryani, Tandoor",
    rating: 4.5,
    deliveryTime: "25-30 min",
    priceForTwo: 350,
    offer: "50% OFF up to ₹100",
    menu: [
      { id: "r1m1", name: "Chicken Biryani", price: 220, image: img(biryani, 11), category: "Biryani", veg: false, desc: "Aromatic basmati with tender chicken" },
      { id: "r1m2", name: "Veg Biryani", price: 180, image: img(biryani, 12), category: "Biryani", veg: true, desc: "Mixed vegetables, fragrant rice" },
      { id: "r1m3", name: "Butter Chicken", price: 280, image: img(curry, 13), category: "Non-veg", veg: false, desc: "Creamy tomato gravy" },
      { id: "r1m4", name: "Paneer Tikka Masala", price: 240, image: img(curry, 14), category: "Veg", veg: true },
      { id: "r1m5", name: "Mango Lassi", price: 80, image: img(drink, 15), category: "Drinks", veg: true },
    ],
  },
  {
    id: "r2",
    name: "Pizza Pavilion",
    image: img(pizza, 2),
    cuisine: "Italian, Pizza, Pasta",
    rating: 4.3,
    deliveryTime: "20-25 min",
    priceForTwo: 500,
    offer: "Buy 1 Get 1",
    menu: [
      { id: "r2m1", name: "Margherita Pizza", price: 249, image: img(pizza, 21), category: "Pizza", veg: true },
      { id: "r2m2", name: "Pepperoni Pizza", price: 349, image: img(pizza, 22), category: "Pizza", veg: false },
      { id: "r2m3", name: "Farmhouse Pizza", price: 329, image: img(pizza, 23), category: "Pizza", veg: true },
      { id: "r2m4", name: "Coke", price: 60, image: img(drink, 24), category: "Drinks", veg: true },
    ],
  },
  {
    id: "r3",
    name: "Burger Bros",
    image: img(burger, 3),
    cuisine: "American, Burgers, Fries",
    rating: 4.6,
    deliveryTime: "15-20 min",
    priceForTwo: 300,
    offer: "Free Delivery",
    menu: [
      { id: "r3m1", name: "Classic Cheese Burger", price: 149, image: img(burger, 31), category: "Burger", veg: false },
      { id: "r3m2", name: "Veg Crunch Burger", price: 119, image: img(burger, 32), category: "Burger", veg: true },
      { id: "r3m3", name: "Chocolate Shake", price: 129, image: img(drink, 33), category: "Drinks", veg: true },
    ],
  },
  {
    id: "r4",
    name: "Dragon Wok",
    image: img(noodles, 4),
    cuisine: "Chinese, Asian, Noodles",
    rating: 4.2,
    deliveryTime: "30-35 min",
    priceForTwo: 400,
    menu: [
      { id: "r4m1", name: "Hakka Noodles", price: 180, image: img(noodles, 41), category: "Chinese", veg: true },
      { id: "r4m2", name: "Chilli Chicken", price: 240, image: img(curry, 42), category: "Chinese", veg: false },
      { id: "r4m3", name: "Schezwan Fried Rice", price: 200, image: img(noodles, 43), category: "Chinese", veg: true },
    ],
  },
  {
    id: "r5",
    name: "South Spice",
    image: img(dosa, 5),
    cuisine: "South Indian, Dosa, Idli",
    rating: 4.4,
    deliveryTime: "20-25 min",
    priceForTwo: 250,
    menu: [
      { id: "r5m1", name: "Masala Dosa", price: 120, image: img(dosa, 51), category: "South Indian", veg: true },
      { id: "r5m2", name: "Idli Sambar", price: 90, image: img(dosa, 52), category: "South Indian", veg: true },
    ],
  },
  {
    id: "r6",
    name: "Sweet Treats",
    image: img(dessert, 6),
    cuisine: "Desserts, Bakery, Ice Cream",
    rating: 4.7,
    deliveryTime: "15-20 min",
    priceForTwo: 200,
    offer: "30% OFF",
    menu: [
      { id: "r6m1", name: "Chocolate Lava Cake", price: 159, image: img(dessert, 61), category: "Desserts", veg: true },
      { id: "r6m2", name: "Vanilla Cheesecake", price: 179, image: img(dessert, 62), category: "Desserts", veg: true },
    ],
  },
];
