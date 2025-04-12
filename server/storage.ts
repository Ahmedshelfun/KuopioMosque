import {
  User,
  InsertUser,
  PrayerTime,
  InsertPrayerTime,
  Event,
  InsertEvent,
  News,
  InsertNews,
  ContactMessage,
  InsertContactMessage,
} from "@shared/schema";

import {
  Product,
  InsertProduct,
  Category,
  InsertCategory,
  Brand,
  InsertBrand,
  Review,
  InsertReview,
  Order,
  InsertOrder,
  OrderItem,
  InsertOrderItem
} from "@shared/commerce-schema";

import fs from 'fs';
import path from 'path';

// Remove the import for PgStorage
// import { PgStorage } from "./pg-storage";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Prayer times methods
  getPrayerTimesByDate(date: string): Promise<PrayerTime | undefined>;
  createPrayerTime(prayerTime: InsertPrayerTime): Promise<PrayerTime>;
  
  // Events methods
  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  getFeaturedEvent(): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  
  // News methods
  getNews(): Promise<News[]>;
  getNewsItem(id: number): Promise<News | undefined>;
  createNewsItem(news: InsertNews): Promise<News>;
  
  // Contact methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  
  // Commerce methods
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getFeaturedProducts(): Promise<Product[]>;
  getNewProducts(): Promise<Product[]>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  getProductsByBrand(brandId: number): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  getBrands(): Promise<Brand[]>;
  getFeaturedBrands(): Promise<Brand[]>;
  getBrand(id: number): Promise<Brand | undefined>;
  createBrand(brand: InsertBrand): Promise<Brand>;
  
  getReviews(productId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  
  getOrders(userId: number): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  
  getOrderItems(orderId: number): Promise<OrderItem[]>;
  createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private prayerTimes: Map<string, PrayerTime>; // Key is date string YYYY-MM-DD
  private events: Map<number, Event>;
  private newsItems: Map<number, News>;
  private contactMessages: Map<number, ContactMessage>;
  
  // Commerce maps
  private products: Map<number, Product>;
  private categories: Map<number, Category>;
  private brands: Map<number, Brand>;
  private reviews: Map<number, Review>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;
  
  private currentUserId: number;
  private currentEventId: number;
  private currentNewsId: number;
  private currentContactId: number;
  private currentProductId: number;
  private currentCategoryId: number;
  private currentBrandId: number;
  private currentReviewId: number;
  private currentOrderId: number;
  private currentOrderItemId: number;

  constructor() {
    this.users = new Map();
    this.prayerTimes = new Map();
    this.events = new Map();
    this.newsItems = new Map();
    this.contactMessages = new Map();
    
    // Initialize commerce maps
    this.products = new Map();
    this.categories = new Map();
    this.brands = new Map();
    this.reviews = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    
    this.currentUserId = 1;
    this.currentEventId = 1;
    this.currentNewsId = 1;
    this.currentContactId = 1;
    this.currentProductId = 1;
    this.currentCategoryId = 1;
    this.currentBrandId = 1;
    this.currentReviewId = 1;
    this.currentOrderId = 1;
    this.currentOrderItemId = 1;
    
    // Initialize with sample data
    this.initSampleData();
  }

  private initSampleData() {
    try {
      // Load eCommerce data from JSON file
      const productsData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'server/data/products.json'), 'utf8'));
      
      // Import brands
      if (productsData.brands && Array.isArray(productsData.brands)) {
        productsData.brands.forEach((brand: any) => {
          const brandObj: InsertBrand = {
            name: brand.name,
            name_ar: brand.name_ar,
            description: brand.description,
            description_ar: brand.description_ar,
            logoUrl: brand.logoUrl,
            websiteUrl: brand.websiteUrl,
            country: brand.country,
            country_ar: brand.country_ar,
            featured: brand.featured || false
          };
          this.createBrand(brandObj);
        });
      }
      
      // Import categories
      if (productsData.categories && Array.isArray(productsData.categories)) {
        productsData.categories.forEach((category: any) => {
          const categoryObj: InsertCategory = {
            name: category.name,
            name_ar: category.name_ar,
            description: category.description,
            description_ar: category.description_ar,
            imageUrl: category.imageUrl,
            parentId: category.parentId
          };
          this.createCategory(categoryObj);
        });
      }
      
      // Import products
      if (productsData.products && Array.isArray(productsData.products)) {
        productsData.products.forEach((product: any) => {
          const productObj: InsertProduct = {
            name: product.name,
            name_ar: product.name_ar,
            description: product.description,
            description_ar: product.description_ar,
            price: product.price.toString(),
            oldPrice: product.oldPrice ? product.oldPrice.toString() : null,
            imageUrl: product.imageUrl,
            categoryId: product.categoryId,
            brandId: product.brandId,
            stock: product.stock,
            weight: product.weight,
            isNew: product.isNew || false,
            isFeatured: product.isFeatured || false,
            tags: product.tags || [],
            nutritionFacts: product.nutritionFacts || {},
            ingredients: product.ingredients || null,
            ingredients_ar: product.ingredients_ar || null
          };
          this.createProduct(productObj);
        });
      }
    } catch (error) {
      console.error('Error loading product data:', error);
    }
    
    // Sample events
    const sampleEvents: InsertEvent[] = [
      {
        title: "Eid al-Adha Celebration",
        description: "Join us for the Eid al-Adha prayer and celebration. The event includes prayer service, a community feast, activities for children, and distribution of meat to the community.",
        date: "July 28, 2023",
        time_range: "9:00 AM - 2:00 PM",
        location: "Kuopio Islamic Center",
        type: "Featured",
        is_featured: true,
        image_url: "https://images.unsplash.com/photo-1604594849809-dfedbc827105?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Quran Study Circle",
        description: "Weekly gathering to study and discuss Quranic verses and their meanings in today's context.",
        date: "Every Wednesday",
        time_range: "6:30 PM - 8:00 PM",
        location: "Kuopio Islamic Center",
        type: "Weekly",
        is_featured: false,
      },
      {
        title: "Finnish Language Class",
        description: "Free Finnish language classes for community members. All levels welcome.",
        date: "July 18, 2023",
        time_range: "5:00 PM - 6:30 PM",
        location: "Kuopio Islamic Center",
        type: "Bi-weekly",
        is_featured: false,
      },
      {
        title: "Youth Sports Day",
        description: "Sports activities for children and teenagers at the local park. Football, volleyball, and more.",
        date: "July 23, 2023",
        time_range: "10:00 AM - 3:00 PM",
        location: "City Park",
        type: "Special",
        is_featured: false,
      },
      {
        title: "Community Dinner",
        description: "Monthly community dinner featuring dishes from various Muslim cultures.",
        date: "July 30, 2023",
        time_range: "6:00 PM - 8:30 PM",
        location: "Kuopio Islamic Center",
        type: "Monthly",
        is_featured: false,
      },
    ];
    
    // Add events to store
    sampleEvents.forEach(event => this.createEvent(event));
    
    // Sample news
    const sampleNews: InsertNews[] = [
      {
        title: "Eid Prayer Announcement",
        content: "Eid al-Adha prayer will be held at the mosque on July 28, 2023, at 9:00 AM. Please arrive early as we expect a large attendance.",
        image_url: "https://images.unsplash.com/photo-1621352404112-58e2468993a0?auto=format&fit=crop&w=600&q=80",
        author: "Imam Ahmed",
      },
      {
        title: "Mosque Renovation Update",
        content: "The renovation of the prayer hall will be completed by mid-August. Thank you for your patience and continued support.",
        image_url: "https://images.unsplash.com/photo-1606766125414-73cf89d8bbf2?auto=format&fit=crop&w=600&q=80",
        author: "Construction Committee",
      },
      {
        title: "Donation Goal Reached",
        content: "Thanks to your generosity, we have reached our fundraising goal for the new children's education center. Construction will begin next month.",
        image_url: "https://images.unsplash.com/photo-1577896851887-663e75df029d?auto=format&fit=crop&w=600&q=80",
        author: "Fundraising Committee",
      },
    ];
    
    // Add news to store
    sampleNews.forEach(news => this.createNewsItem(news));
    
    // Updated prayer times from IslamicFinder for Kuopio, Finland
    const today = new Date();
    const prayerTime: InsertPrayerTime = {
      date: today.toISOString().split('T')[0],
      fajr_begins: "03:06",
      fajr_iqamah: "03:36",
      sunrise: "05:38",
      dhuhr_begins: "12:51",
      dhuhr_iqamah: "13:15",
      asr_begins: "16:55",
      asr_iqamah: "17:15",
      maghrib_begins: "20:05",
      maghrib_iqamah: "20:15",
      isha_begins: "22:37",
      isha_iqamah: "22:45",
      jummah_khutbah: "12:45",
      jummah_iqamah: "13:15",
    };
    
    this.createPrayerTime(prayerTime);
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Prayer times methods
  async getPrayerTimesByDate(date: string): Promise<PrayerTime | undefined> {
    return this.prayerTimes.get(date);
  }
  
  async createPrayerTime(prayerTime: InsertPrayerTime): Promise<PrayerTime> {
    const dateStr = prayerTime.date.toString();
    const id = this.prayerTimes.size + 1;
    const newPrayerTime: PrayerTime = { ...prayerTime, id };
    this.prayerTimes.set(dateStr, newPrayerTime);
    return newPrayerTime;
  }
  
  // Events methods
  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values())
      .filter(event => !event.is_featured)
      .sort((a, b) => b.id - a.id);
  }
  
  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }
  
  async getFeaturedEvent(): Promise<Event | undefined> {
    return Array.from(this.events.values()).find(event => event.is_featured);
  }
  
  async createEvent(event: InsertEvent): Promise<Event> {
    const id = this.currentEventId++;
    const created_at = new Date();
    const newEvent: Event = { ...event, id, created_at };
    this.events.set(id, newEvent);
    return newEvent;
  }
  
  // News methods
  async getNews(): Promise<News[]> {
    return Array.from(this.newsItems.values())
      .sort((a, b) => b.id - a.id);
  }
  
  async getNewsItem(id: number): Promise<News | undefined> {
    return this.newsItems.get(id);
  }
  
  async createNewsItem(news: InsertNews): Promise<News> {
    const id = this.currentNewsId++;
    const created_at = new Date();
    const newNews: News = { ...news, id, created_at };
    this.newsItems.set(id, newNews);
    return newNews;
  }
  
  // Contact methods
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentContactId++;
    const created_at = new Date();
    const newMessage: ContactMessage = { ...message, id, created_at };
    this.contactMessages.set(id, newMessage);
    return newMessage;
  }
  
  // Commerce methods
  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values())
      .filter(product => product.isFeatured);
  }
  
  async getNewProducts(): Promise<Product[]> {
    return Array.from(this.products.values())
      .filter(product => product.isNew);
  }
  
  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return Array.from(this.products.values())
      .filter(product => product.categoryId === categoryId);
  }
  
  async getProductsByBrand(brandId: number): Promise<Product[]> {
    return Array.from(this.products.values())
      .filter(product => product.brandId === brandId);
  }
  
  async createProduct(product: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const created_at = new Date();
    const newProduct: Product = { ...product, id, created_at };
    this.products.set(id, newProduct);
    return newProduct;
  }
  
  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }
  
  async createCategory(category: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const created_at = new Date();
    const newCategory: Category = { ...category, id, created_at };
    this.categories.set(id, newCategory);
    return newCategory;
  }
  
  // Brand methods
  async getBrands(): Promise<Brand[]> {
    return Array.from(this.brands.values());
  }
  
  async getFeaturedBrands(): Promise<Brand[]> {
    return Array.from(this.brands.values())
      .filter(brand => brand.featured);
  }
  
  async getBrand(id: number): Promise<Brand | undefined> {
    return this.brands.get(id);
  }
  
  async createBrand(brand: InsertBrand): Promise<Brand> {
    const id = this.currentBrandId++;
    const created_at = new Date();
    const newBrand: Brand = { ...brand, id, created_at };
    this.brands.set(id, newBrand);
    return newBrand;
  }
  
  // Review methods
  async getReviews(productId: number): Promise<Review[]> {
    return Array.from(this.reviews.values())
      .filter(review => review.productId === productId);
  }
  
  async createReview(review: InsertReview): Promise<Review> {
    const id = this.currentReviewId++;
    const created_at = new Date();
    const newReview: Review = { ...review, id, created_at };
    this.reviews.set(id, newReview);
    return newReview;
  }
  
  // Order methods
  async getOrders(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values())
      .filter(order => order.userId === userId);
  }
  
  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }
  
  async createOrder(order: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const created_at = new Date();
    const newOrder: Order = { ...order, id, created_at };
    this.orders.set(id, newOrder);
    return newOrder;
  }
  
  // Order Item methods
  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values())
      .filter(item => item.orderId === orderId);
  }
  
  async createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem> {
    const id = this.currentOrderItemId++;
    const created_at = new Date();
    const newOrderItem: OrderItem = { ...orderItem, id, created_at };
    this.orderItems.set(id, newOrderItem);
    return newOrderItem;
  }
}

// Initialize storage with MemStorage implementation
export const storage = new MemStorage();
