export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'drinks' | 'meals' | 'snacks' | 'breakfast' | 'desserts';
  type: 'veg' | 'non-veg';
  tags: Array<'healthy' | 'popular' | 'recommended' | 'special'>;
  description: string;
  prepTime: number;
  image: string;
}

export const menuItems: MenuItem[] = [
  // Breakfast
  { id: 'b1', name: 'Idli', price: 40, category: 'breakfast', type: 'veg', tags: ['healthy', 'popular'], description: 'Steamed rice cakes with sambar', prepTime: 10, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'b2', name: 'Dosa', price: 50, category: 'breakfast', type: 'veg', tags: ['popular', 'recommended'], description: 'Crispy rice crepe with chutney', prepTime: 15, image: 'https://images.unsplash.com/photo-1668236499396-a62d2d1cb0cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'b3', name: 'Poori', price: 45, category: 'breakfast', type: 'veg', tags: ['popular'], description: 'Deep fried puffed bread', prepTime: 12, image: 'https://images.unsplash.com/photo-1596449870280-83df0de3f4fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'b4', name: 'Upma', price: 35, category: 'breakfast', type: 'veg', tags: ['healthy'], description: 'Savory semolina with vegetables', prepTime: 10, image: 'https://images.unsplash.com/photo-1680359871322-aabe6b33eff5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'b5', name: 'Pongal', price: 50, category: 'breakfast', type: 'veg', tags: ['healthy', 'special'], description: 'Rice and lentil comfort dish', prepTime: 15, image: 'https://images.unsplash.com/photo-1741376509166-cbd74b608f5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'b6', name: 'Vada', price: 30, category: 'breakfast', type: 'veg', tags: ['popular'], description: 'Crispy lentil donuts', prepTime: 10, image: 'https://images.unsplash.com/photo-1730191843435-073792ba22bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'b7', name: 'Bread Omelette', price: 60, category: 'breakfast', type: 'non-veg', tags: ['popular'], description: 'Fluffy omelette with bread', prepTime: 8, image: 'https://images.unsplash.com/photo-1605719161691-5d9771fc144f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'b8', name: 'Aloo Paratha', price: 70, category: 'breakfast', type: 'veg', tags: ['popular', 'recommended'], description: 'Stuffed flatbread with potato', prepTime: 15, image: 'https://images.unsplash.com/photo-1643892467625-65df6a500524?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'b9', name: 'Pesarattu', price: 55, category: 'breakfast', type: 'veg', tags: ['healthy'], description: 'Green gram dosa', prepTime: 12, image: 'https://images.unsplash.com/photo-1665660710687-b44c50751054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'b10', name: 'Sandwich', price: 65, category: 'breakfast', type: 'veg', tags: ['popular'], description: 'Grilled vegetable sandwich', prepTime: 10, image: 'https://images.unsplash.com/photo-1637226566014-d059bb944267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },

  // Meals
  { id: 'm1', name: 'Veg Meals', price: 120, category: 'meals', type: 'veg', tags: ['popular', 'recommended', 'healthy'], description: 'Complete thali with rice, dal, vegetables', prepTime: 20, image: 'https://images.unsplash.com/photo-1680993032090-1ef7ea9b51e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'm2', name: 'Chicken Biryani', price: 180, category: 'meals', type: 'non-veg', tags: ['popular', 'special', 'recommended'], description: 'Aromatic rice with tender chicken', prepTime: 25, image: 'https://images.unsplash.com/photo-1752673508949-f4aeeaef75f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'm3', name: 'Paneer Butter Masala', price: 150, category: 'meals', type: 'veg', tags: ['popular', 'recommended'], description: 'Cottage cheese in rich tomato gravy', prepTime: 18, image: 'https://images.unsplash.com/photo-1690401767645-595de0e0e5f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'm4', name: 'Fried Rice', price: 110, category: 'meals', type: 'veg', tags: ['popular'], description: 'Indo-Chinese fried rice', prepTime: 15, image: 'https://images.unsplash.com/photo-1775039983787-3fe9b416c545?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'm5', name: 'Jeera Rice', price: 90, category: 'meals', type: 'veg', tags: ['healthy'], description: 'Cumin flavored basmati rice', prepTime: 12, image: 'https://images.unsplash.com/photo-1775039983802-b3eb3f68cd2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'm6', name: 'Dal Tadka', price: 100, category: 'meals', type: 'veg', tags: ['healthy', 'popular'], description: 'Tempered yellow lentils', prepTime: 15, image: 'https://images.unsplash.com/photo-1708793873401-e8c6c153b76a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'm7', name: 'Butter Naan', price: 40, category: 'meals', type: 'veg', tags: ['popular'], description: 'Soft leavened flatbread with butter', prepTime: 8, image: 'https://images.unsplash.com/photo-1668236236543-090c0c2e1d89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'm8', name: 'Veg Pulao', price: 120, category: 'meals', type: 'veg', tags: ['recommended'], description: 'Spiced vegetable rice', prepTime: 18, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'm9', name: 'Curd Rice', price: 80, category: 'meals', type: 'veg', tags: ['healthy'], description: 'Cooling yogurt rice', prepTime: 10, image: 'https://images.unsplash.com/photo-1690401769082-5f475f87fb22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'm10', name: 'Fish Curry Meals', price: 200, category: 'meals', type: 'non-veg', tags: ['special'], description: 'Coastal style fish curry with rice', prepTime: 25, image: 'https://images.unsplash.com/photo-1690403160225-3db8cc8babd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },

  // Snacks
  { id: 's1', name: 'Samosa', price: 20, category: 'snacks', type: 'veg', tags: ['popular', 'recommended'], description: 'Crispy fried pastry with potato filling', prepTime: 5, image: 'https://images.unsplash.com/photo-1697155836252-d7f969108b5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 's2', name: 'French Fries', price: 70, category: 'snacks', type: 'veg', tags: ['popular'], description: 'Crispy golden potato fries', prepTime: 8, image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 's3', name: 'Veg Puff', price: 30, category: 'snacks', type: 'veg', tags: ['popular'], description: 'Flaky pastry with vegetable filling', prepTime: 7, image: 'https://images.unsplash.com/photo-1589786742305-f24d19eedbe5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 's4', name: 'Chicken Roll', price: 90, category: 'snacks', type: 'non-veg', tags: ['popular', 'special'], description: 'Spiced chicken wrapped in paratha', prepTime: 12, image: 'https://images.unsplash.com/photo-1622715395488-71045e2a4990?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 's5', name: 'Spring Roll', price: 80, category: 'snacks', type: 'veg', tags: ['recommended'], description: 'Crispy vegetable spring rolls', prepTime: 10, image: 'https://images.unsplash.com/photo-1772729996007-40bad08b3c40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 's6', name: 'Burger', price: 120, category: 'snacks', type: 'veg', tags: ['popular', 'special'], description: 'Classic veg burger', prepTime: 12, image: 'https://images.unsplash.com/photo-1542574271-7f3b92e6c821?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 's7', name: 'Pizza Slice', price: 100, category: 'snacks', type: 'veg', tags: ['popular'], description: 'Cheesy pizza slice', prepTime: 10, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 's8', name: 'Popcorn', price: 50, category: 'snacks', type: 'veg', tags: ['healthy'], description: 'Buttered popcorn', prepTime: 5, image: 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 's9', name: 'Cutlet', price: 40, category: 'snacks', type: 'veg', tags: ['popular'], description: 'Crispy vegetable cutlet', prepTime: 8, image: 'https://images.unsplash.com/photo-1767469576715-a4eb8bcfa204?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 's10', name: 'Momos', price: 90, category: 'snacks', type: 'veg', tags: ['popular', 'recommended'], description: 'Steamed dumplings', prepTime: 12, image: 'https://images.unsplash.com/photo-1598679253544-2c97992403ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },

  // Drinks
  { id: 'd1', name: 'Tea', price: 15, category: 'drinks', type: 'veg', tags: ['popular'], description: 'Hot masala chai', prepTime: 3, image: 'https://images.unsplash.com/photo-1609670438772-9cf3afc5052b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'd2', name: 'Coffee', price: 20, category: 'drinks', type: 'veg', tags: ['popular', 'recommended'], description: 'Fresh filter coffee', prepTime: 3, image: 'https://images.unsplash.com/photo-1618263616142-7b8815503d05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'd3', name: 'Badam Milk', price: 40, category: 'drinks', type: 'veg', tags: ['healthy'], description: 'Almond flavored milk', prepTime: 5, image: 'https://images.unsplash.com/photo-1648192312898-838f9b322f47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'd4', name: 'Fresh Lime Soda', price: 35, category: 'drinks', type: 'veg', tags: ['healthy', 'popular'], description: 'Refreshing lime with soda', prepTime: 3, image: 'https://images.unsplash.com/photo-1628702773947-1bcd12856811?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'd5', name: 'Mango Juice', price: 50, category: 'drinks', type: 'veg', tags: ['special'], description: 'Fresh mango juice', prepTime: 5, image: 'https://images.unsplash.com/photo-1628702774354-f09e4a167a8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'd6', name: 'Chocolate Milkshake', price: 70, category: 'drinks', type: 'veg', tags: ['popular'], description: 'Rich chocolate shake', prepTime: 5, image: 'https://images.unsplash.com/photo-1694050172039-90cb53128f11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'd7', name: 'Green Tea', price: 25, category: 'drinks', type: 'veg', tags: ['healthy'], description: 'Antioxidant green tea', prepTime: 3, image: 'https://images.unsplash.com/photo-1683533698664-12ee473e8c9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'd8', name: 'Cold Coffee', price: 80, category: 'drinks', type: 'veg', tags: ['popular', 'recommended'], description: 'Iced coffee with milk', prepTime: 5, image: 'https://images.unsplash.com/photo-1777620817565-1f0802f12b3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'd9', name: 'Soft Drink', price: 40, category: 'drinks', type: 'veg', tags: ['popular'], description: 'Chilled soft drink', prepTime: 2, image: 'https://images.unsplash.com/photo-1694050172060-836f5258ed0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'd10', name: 'Mineral Water', price: 20, category: 'drinks', type: 'veg', tags: ['healthy'], description: 'Bottled water', prepTime: 1, image: 'https://images.unsplash.com/photo-1605468477177-c2e99b183299?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },

  // Desserts
  { id: 'ds1', name: 'Gulab Jamun', price: 40, category: 'desserts', type: 'veg', tags: ['popular', 'recommended'], description: 'Sweet fried dough balls in syrup', prepTime: 5, image: 'https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'ds2', name: 'Ice Cream', price: 60, category: 'desserts', type: 'veg', tags: ['popular'], description: 'Assorted flavors', prepTime: 2, image: 'https://images.unsplash.com/photo-1673551494246-0ea345ddbf86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'ds3', name: 'Chocolate Cake', price: 90, category: 'desserts', type: 'veg', tags: ['special', 'popular'], description: 'Rich chocolate cake slice', prepTime: 5, image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'ds4', name: 'Brownie', price: 80, category: 'desserts', type: 'veg', tags: ['popular', 'recommended'], description: 'Chocolate brownie', prepTime: 5, image: 'https://images.unsplash.com/photo-1626263468007-a9e0cf83f1ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'ds5', name: 'Rasgulla', price: 45, category: 'desserts', type: 'veg', tags: ['popular'], description: 'Spongy cottage cheese balls in syrup', prepTime: 5, image: 'https://images.unsplash.com/photo-1710354473160-dafce976c2df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'ds6', name: 'Fruit Salad', price: 70, category: 'desserts', type: 'veg', tags: ['healthy'], description: 'Fresh seasonal fruits', prepTime: 5, image: 'https://images.unsplash.com/photo-1595608010652-d8bf1103a1c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'ds7', name: 'Cupcake', price: 50, category: 'desserts', type: 'veg', tags: ['popular'], description: 'Soft vanilla cupcake', prepTime: 3, image: 'https://images.unsplash.com/photo-1673551493011-2b5f771013d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'ds8', name: 'Kheer', price: 60, category: 'desserts', type: 'veg', tags: ['healthy', 'recommended'], description: 'Rice pudding with cardamom', prepTime: 5, image: 'https://images.unsplash.com/photo-1758387799050-8cd1d5984791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'ds9', name: 'Donut', price: 55, category: 'desserts', type: 'veg', tags: ['popular'], description: 'Glazed donut', prepTime: 3, image: 'https://images.unsplash.com/photo-1588195539297-f0b4efdb5472?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'ds10', name: 'Falooda', price: 85, category: 'desserts', type: 'veg', tags: ['special'], description: 'Cold dessert with vermicelli', prepTime: 8, image: 'https://images.unsplash.com/photo-1754996806629-2204dd4d7105?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
];

export const locations = [
  'Vijayawada',
  'Bengaluru',
  'Noida',
  'Chennai',
  'Lucknow',
  'Hyderabad',
  'Madurai'
];
