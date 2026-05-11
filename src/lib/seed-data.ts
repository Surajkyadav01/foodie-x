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
  { name: "Rolls", emoji: "🌯" },
  { name: "Sandwich", emoji: "🥪" },
  { name: "Pasta", emoji: "🍝" },
  { name: "Momos", emoji: "🥟" },
  { name: "Sushi", emoji: "🍣" },
  { name: "Salad", emoji: "🥗" },
  { name: "Coffee", emoji: "☕" },
  { name: "Ice Cream", emoji: "🍦" },
  { name: "Tacos", emoji: "🌮" },
  { name: "Shawarma", emoji: "🥙" },
  { name: "Healthy", emoji: "🥦" },
  { name: "Breakfast", emoji: "🍳" },
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
const sandwich = "1528735602780-2552fd46c7af";
const pasta = "1551183053-bf91a1d81141";
const momos = "1626776877531-5d3c5c0aef4f";
const sushi = "1579871494447-9811cf80d66c";
const salad = "1512621776951-a57141f2eefd";
const coffee = "1509042239860-f550ce710b93";
const icecream = "1501443762994-82bd5dace89a";
const tacos = "1565299585323-38d6b0865b47";
const shawarma = "1561651823-34feb02250e4";
const breakfast = "1533089860892-a7c6f0a88666";
const roll = "1565299715199-866c917206bb";
const wrap = "1606755962773-d324e0a13086";

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
  {
    id: "r7",
    name: "Global Bites Cafe",
    image: img(sandwich, 7),
    cuisine: "Multi-cuisine, Cafe, Healthy",
    rating: 4.6,
    deliveryTime: "20-25 min",
    priceForTwo: 350,
    offer: "20% OFF up to ₹80",
    menu: [
      { id: "r7m1", name: "Grilled Veg Sandwich", price: 129, image: img(sandwich, 71), category: "Sandwich", veg: true, desc: "Triple layer toasted with cheese" },
      { id: "r7m2", name: "Chicken Club Sandwich", price: 179, image: img(sandwich, 72), category: "Sandwich", veg: false },
      { id: "r7m3", name: "Paneer Tikka Sandwich", price: 149, image: img(sandwich, 73), category: "Sandwich", veg: true },
      { id: "r7m4", name: "Bombay Masala Sandwich", price: 119, image: img(sandwich, 74), category: "Sandwich", veg: true },
      { id: "r7m5", name: "Creamy Alfredo Pasta", price: 229, image: img(pasta, 75), category: "Pasta", veg: true, desc: "White sauce, herbs, parmesan" },
      { id: "r7m6", name: "Arrabbiata Red Sauce Pasta", price: 209, image: img(pasta, 76), category: "Pasta", veg: true },
      { id: "r7m7", name: "Chicken Pesto Pasta", price: 269, image: img(pasta, 77), category: "Pasta", veg: false },
      { id: "r7m8", name: "Mac & Cheese", price: 219, image: img(pasta, 78), category: "Pasta", veg: true },
      { id: "r7m9", name: "Veg Steamed Momos", price: 99, image: img(momos, 79), category: "Momos", veg: true, desc: "8 pcs with spicy chutney" },
      { id: "r7m10", name: "Chicken Steamed Momos", price: 129, image: img(momos, 80), category: "Momos", veg: false },
      { id: "r7m11", name: "Veg Fried Momos", price: 119, image: img(momos, 81), category: "Momos", veg: true },
      { id: "r7m12", name: "Tandoori Momos", price: 149, image: img(momos, 82), category: "Momos", veg: true },
      { id: "r7m13", name: "Greek Salad Bowl", price: 189, image: img(salad, 83), category: "Salad", veg: true, desc: "Feta, olives, cucumber" },
      { id: "r7m14", name: "Caesar Salad", price: 199, image: img(salad, 84), category: "Salad", veg: false },
      { id: "r7m15", name: "Quinoa Power Bowl", price: 249, image: img(salad, 85), category: "Salad", veg: true },
      { id: "r7m16", name: "Garden Fresh Salad", price: 149, image: img(salad, 86), category: "Salad", veg: true },
      { id: "r7m17", name: "Cappuccino", price: 119, image: img(coffee, 87), category: "Coffee", veg: true },
      { id: "r7m18", name: "Cafe Latte", price: 129, image: img(coffee, 88), category: "Coffee", veg: true },
      { id: "r7m19", name: "Iced Mocha", price: 149, image: img(coffee, 89), category: "Coffee", veg: true },
      { id: "r7m20", name: "Cold Brew", price: 139, image: img(coffee, 90), category: "Coffee", veg: true },
      { id: "r7m21", name: "Espresso Shot", price: 89, image: img(coffee, 91), category: "Coffee", veg: true },
      { id: "r7m22", name: "Vanilla Ice Cream Sundae", price: 149, image: img(icecream, 92), category: "Ice Cream", veg: true },
      { id: "r7m23", name: "Chocolate Brownie Sundae", price: 179, image: img(icecream, 93), category: "Ice Cream", veg: true },
      { id: "r7m24", name: "Strawberry Scoop", price: 99, image: img(icecream, 94), category: "Ice Cream", veg: true },
      { id: "r7m25", name: "Butterscotch Scoop", price: 109, image: img(icecream, 95), category: "Ice Cream", veg: true },
      { id: "r7m26", name: "Mango Kulfi", price: 89, image: img(icecream, 96), category: "Ice Cream", veg: true },
      { id: "r7m27", name: "Avocado Toast", price: 219, image: img(breakfast, 97), category: "Breakfast", veg: true },
      { id: "r7m28", name: "Classic English Breakfast", price: 289, image: img(breakfast, 98), category: "Breakfast", veg: false },
      { id: "r7m29", name: "Pancake Stack", price: 199, image: img(breakfast, 99), category: "Breakfast", veg: true },
      { id: "r7m30", name: "Omelette & Toast", price: 159, image: img(breakfast, 100), category: "Breakfast", veg: false },
      { id: "r7m31", name: "Granola Yogurt Bowl", price: 179, image: img(breakfast, 101), category: "Breakfast", veg: true },
      { id: "r7m32", name: "Quinoa Buddha Bowl", price: 259, image: img(salad, 102), category: "Healthy", veg: true },
      { id: "r7m33", name: "Grilled Chicken Bowl", price: 289, image: img(salad, 103), category: "Healthy", veg: false },
      { id: "r7m34", name: "Smoothie Bowl", price: 199, image: img(icecream, 104), category: "Healthy", veg: true },
      { id: "r7m35", name: "Tofu Stir Fry", price: 229, image: img(salad, 105), category: "Healthy", veg: true },
      { id: "r7m36", name: "Veg Sushi Roll", price: 299, image: img(sushi, 106), category: "Sushi", veg: true },
      { id: "r7m37", name: "California Roll", price: 349, image: img(sushi, 107), category: "Sushi", veg: false },
      { id: "r7m38", name: "Salmon Nigiri", price: 399, image: img(sushi, 108), category: "Sushi", veg: false },
      { id: "r7m39", name: "Veg Tacos (3 pcs)", price: 189, image: img(tacos, 109), category: "Tacos", veg: true },
      { id: "r7m40", name: "Chicken Tacos (3 pcs)", price: 229, image: img(tacos, 110), category: "Tacos", veg: false },
      { id: "r7m41", name: "Paneer Tacos", price: 209, image: img(tacos, 111), category: "Tacos", veg: true },
      { id: "r7m42", name: "Chicken Shawarma Roll", price: 169, image: img(shawarma, 112), category: "Shawarma", veg: false },
      { id: "r7m43", name: "Falafel Shawarma", price: 149, image: img(shawarma, 113), category: "Shawarma", veg: true },
      { id: "r7m44", name: "Mixed Shawarma Platter", price: 279, image: img(shawarma, 114), category: "Shawarma", veg: false },
      { id: "r7m45", name: "Veg Kathi Roll", price: 119, image: img(roll, 115), category: "Rolls", veg: true },
      { id: "r7m46", name: "Chicken Tikka Roll", price: 159, image: img(roll, 116), category: "Rolls", veg: false },
      { id: "r7m47", name: "Paneer Tikka Roll", price: 149, image: img(roll, 117), category: "Rolls", veg: true },
      { id: "r7m48", name: "Egg Roll", price: 99, image: img(wrap, 118), category: "Rolls", veg: false },
      { id: "r7m49", name: "Fresh Lime Soda", price: 69, image: img(drink, 119), category: "Drinks", veg: true },
      { id: "r7m50", name: "Cold Coffee", price: 119, image: img(drink, 120), category: "Drinks", veg: true },
      { id: "r7m51", name: "Watermelon Juice", price: 89, image: img(drink, 121), category: "Drinks", veg: true },
      { id: "r7m52", name: "Masala Chai", price: 49, image: img(drink, 122), category: "Drinks", veg: true },
    ],
  },
];
