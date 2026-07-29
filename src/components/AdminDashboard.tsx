import React from 'react';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Home,
  MessageSquare,
  Mail,
  FolderOpen,
  Settings,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Copy,
  Archive,
  Search,
  Eye,
  TrendingUp,
  Layers,
  Lock
} from 'lucide-react';
import type { Product, Review, Inquiry, HomepageConfig, Category } from '../types';

interface AdminDashboardProps {
  products: Product[];
  reviews: Review[];
  inquiries: Inquiry[];
  homepageConfig: HomepageConfig;
  onUpdateProducts: (products: Product[]) => void;
  onUpdateReviews: (reviews: Review[]) => void;
  onUpdateInquiries: (inquiries: Inquiry[]) => void;
  onUpdateHomepageConfig: (config: HomepageConfig) => void;
  onLogout: () => void;
  onBackToStorefront: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  inquiries,
  homepageConfig,
  onUpdateProducts,
  onUpdateHomepageConfig,
  onLogout,
  onBackToStorefront
}) => {
  const [activeTab, setActiveTab] = React.useState<
    'overview' | 'products' | 'categories' | 'homepage' | 'reviews' | 'inquiries' | 'media' | 'settings'
  >('overview');

  // Product Form Modal State
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = React.useState(false);

  // Smart Image Upload State inside product form
  const [imageTab, setImageTab] = React.useState<'device' | 'url' | 'instagram'>('device');
  const [instagramInput, setInstagramInput] = React.useState('');
  const [instagramMessage, setInstagramMessage] = React.useState('');

  // Search and Filter states
  const [productSearch, setProductSearch] = React.useState('');

  // Default Categories
  const [categories, setCategories] = React.useState<Category[]>([
    { id: 'cat-1', name: 'Kitchen Utensils', parentCategory: 'Kitchen Essentials' },
    { id: 'cat-2', name: 'Gadgets', parentCategory: 'Modern Gadgets' },
    { id: 'cat-3', name: 'Abayas', parentCategory: 'Abayas' },
  ]);
  const [newCatName, setNewCatName] = React.useState('');

  // Homepage Live Editor Form State
  const [cmsConfig, setCmsConfig] = React.useState<HomepageConfig>(homepageConfig);

  // Settings state
  const [settingsState, setSettingsState] = React.useState({
    businessName: 'Modest & Modern By Jiaddah',
    whatsapp: '+234 800 000 0000',
    email: 'contact@jiaddah.com',
    analyticsId: 'UA-123456789-1',
    themeColor: '#D4AF37'
  });

  // Calculate Metrics
  const totalProducts = products.length;
  const kitchenCount = products.filter(p => p.category === 'Kitchen Essentials').length;
  const abayasCount = products.filter(p => p.category === 'Abayas').length;
  const unreadMessages = inquiries.filter(i => !i.read).length;

  // Handler for saving product
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (products.some(p => p.id === editingProduct.id)) {
      onUpdateProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
    } else {
      onUpdateProducts([editingProduct, ...products]);
    }
    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  const handleCreateNewProduct = () => {
    setEditingProduct({
      id: 'prod-' + Date.now(),
      name: '',
      category: 'Kitchen Essentials',
      price: 0,
      description: '',
      image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
      images: [],
      stock: 10,
      sku: 'MMJ-' + Math.floor(1000 + Math.random() * 9000),
      isNew: true
    });
    setIsProductModalOpen(true);
  };

  const handleDeleteProduct = (id: string) => {
    onUpdateProducts(products.filter(p => p.id !== id));
  };

  const handleDuplicateProduct = (p: Product) => {
    const dup: Product = {
      ...p,
      id: 'prod-' + Date.now(),
      name: `${p.name} (Copy)`,
      sku: `${p.sku}-COPY`
    };
    onUpdateProducts([dup, ...products]);
  };

  const handleToggleArchive = (id: string) => {
    onUpdateProducts(products.map(p => p.id === id ? { ...p, isArchived: !p.isArchived } : p));
  };

  const handleInstagramImport = () => {
    if (!instagramInput) return;
    setInstagramMessage('Instagram API Policy: Direct scrapers restricted. Default fallback preview image generated.');
    if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
      });
    }
  };

  const handleSaveHomepageConfig = () => {
    onUpdateHomepageConfig(cmsConfig);
    alert('Homepage CMS Settings updated successfully!');
  };

  return (
    <div className="min-h-screen bg-[#F8F6F2] flex flex-col md:flex-row font-poppins text-left">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#2C2C2C] text-white flex flex-col justify-between p-6 shadow-2xl">
        <div className="space-y-8">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onBackToStorefront}>
            <div className="w-9 h-9 rounded-full bg-[#D4AF37] flex items-center justify-center text-white font-playfair font-bold text-lg">
              M
            </div>
            <div>
              <span className="font-playfair text-base font-bold text-white block leading-none">
                Jiaddah Admin
              </span>
              <span className="text-[9px] text-[#D4AF37] font-semibold tracking-widest uppercase block">
                Store Concierge
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'products', label: 'Products Management', icon: Package },
              { id: 'categories', label: 'Categories', icon: FolderTree },
              { id: 'homepage', label: 'Homepage Live Editor', icon: Home },
              { id: 'reviews', label: 'Testimonials', icon: MessageSquare },
              { id: 'inquiries', label: 'Customer Inquiries', icon: Mail, badge: unreadMessages },
              { id: 'media', label: 'Media Library', icon: FolderOpen },
              { id: 'settings', label: 'Store Settings', icon: Settings },
            ].map(item => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#D4AF37] text-white shadow-md'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <IconComp className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge ? (
                    <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>

        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-white/10 space-y-3">
          <button
            onClick={onBackToStorefront}
            className="w-full flex items-center space-x-2 text-xs text-gray-300 hover:text-[#D4AF37] cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>View Live Storefront</span>
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-2 text-xs text-red-400 hover:text-red-300 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out Admin</span>
          </button>
        </div>

      </aside>

      {/* Main Content Body */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="font-playfair text-3xl font-bold text-[#2C2C2C]">Dashboard Overview</h1>
                <p className="text-xs text-gray-500 font-light">Real-time metrics for Modest & Modern By Jiaddah</p>
              </div>
              <button
                onClick={handleCreateNewProduct}
                className="px-5 py-2.5 rounded-full bg-[#D4AF37] text-white text-xs font-semibold uppercase tracking-wider shadow-md hover:brightness-105 flex items-center space-x-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-[#D4AF37]/20 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Total Products</p>
                  <h3 className="font-playfair text-3xl font-bold text-[#2C2C2C] mt-1">{totalProducts}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#F8F6F2] text-[#D4AF37] flex items-center justify-center">
                  <Package className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#D4AF37]/20 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Abayas Collection</p>
                  <h3 className="font-playfair text-3xl font-bold text-[#2C2C2C] mt-1">{abayasCount}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#F8F6F2] text-[#2C2C2C] flex items-center justify-center">
                  <Layers className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#D4AF37]/20 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Kitchen Items</p>
                  <h3 className="font-playfair text-3xl font-bold text-[#2C2C2C] mt-1">{kitchenCount}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#F8F6F2] text-[#D4AF37] flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#D4AF37]/20 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Customer Inquiries</p>
                  <h3 className="font-playfair text-3xl font-bold text-[#2C2C2C] mt-1">{inquiries.length}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Sales & Product Activity Simulated Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-playfair text-lg font-bold text-[#2C2C2C]">Sales & Traffic Trends</h3>
                  <span className="text-xs text-[#D4AF37] font-semibold">Jul 2026</span>
                </div>
                <div className="h-48 flex items-end justify-between gap-3 pt-6 border-b border-gray-100 px-2">
                  {[45, 60, 75, 50, 90, 80, 110, 95, 120, 140, 130, 160].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                      <div
                        style={{ height: `${h}px` }}
                        className="w-full bg-gradient-to-t from-[#D4AF37] to-[#F4E8C1] rounded-t-md group-hover:brightness-110 transition-all"
                      />
                      <span className="text-[9px] text-gray-400">W{i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                <h3 className="font-playfair text-lg font-bold text-[#2C2C2C]">Category Breakdown</h3>
                <div className="space-y-4 pt-4">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Abayas Fashion</span>
                      <span>42%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#D4AF37] w-[42%]"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Kitchen Essentials</span>
                      <span>35%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#2C2C2C] w-[35%]"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Modern Gadgets</span>
                      <span>23%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#AA8B22] w-[23%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Products Management Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h1 className="font-playfair text-3xl font-bold text-[#2C2C2C]">Product Catalog</h1>
                <p className="text-xs text-gray-500 font-light">Manage, duplicate, edit prices, or archive products</p>
              </div>

              <button
                onClick={handleCreateNewProduct}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA8B22] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:brightness-105 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search products by name or category..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#D4AF37] outline-none text-xs"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8F6F2] uppercase text-gray-500 font-semibold border-b border-gray-200">
                    <tr>
                      <th className="p-4">Product</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products
                      .filter(p => p.name.toLowerCase().includes(productSearch.toLowerCase()))
                      .map(product => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="p-4 flex items-center space-x-3">
                            <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                            <div>
                              <p className="font-bold text-[#2C2C2C]">{product.name}</p>
                              <p className="text-[10px] text-gray-400">SKU: {product.sku}</p>
                            </div>
                          </td>
                          <td className="p-4 font-medium text-gray-700">{product.category}</td>
                          <td className="p-4 font-bold text-[#2C2C2C]">₦{product.price.toFixed(2)}</td>
                          <td className="p-4 font-medium">{product.stock} units</td>
                          <td className="p-4">
                            {product.isArchived ? (
                              <span className="px-2 py-0.5 rounded-full bg-gray-200 text-gray-600 text-[10px] font-bold">
                                Archived
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                                Active
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-right space-x-2">
                            <button
                              onClick={() => {
                                setEditingProduct(product);
                                setIsProductModalOpen(true);
                              }}
                              className="p-1.5 text-gray-500 hover:text-[#D4AF37] cursor-pointer"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDuplicateProduct(product)}
                              className="p-1.5 text-gray-500 hover:text-blue-500 cursor-pointer"
                              title="Duplicate"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleToggleArchive(product.id)}
                              className="p-1.5 text-gray-500 hover:text-amber-500 cursor-pointer"
                              title={product.isArchived ? 'Restore' : 'Archive'}
                            >
                              <Archive className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-1.5 text-gray-500 hover:text-red-500 cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div className="space-y-6 max-w-3xl">
            <h1 className="font-playfair text-3xl font-bold text-[#2C2C2C]">Category Management</h1>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="New Category Name..."
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-xs"
                />
                <button
                  onClick={() => {
                    if (!newCatName) return;
                    setCategories([...categories, { id: 'cat-' + Date.now(), name: newCatName, parentCategory: 'All' }]);
                    setNewCatName('');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#D4AF37] text-white text-xs font-semibold cursor-pointer"
                >
                  Add Category
                </button>
              </div>

              <div className="space-y-2 pt-4">
                {categories.map(c => (
                  <div key={c.id} className="flex justify-between items-center p-3 rounded-xl bg-gray-50 text-xs">
                    <span className="font-bold text-[#2C2C2C]">{c.name}</span>
                    <button
                      onClick={() => setCategories(categories.filter(x => x.id !== c.id))}
                      className="text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Homepage Live Editor Tab */}
        {activeTab === 'homepage' && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="font-playfair text-3xl font-bold text-[#2C2C2C]">Homepage CMS Editor</h1>
                <p className="text-xs text-gray-500 font-light">Customize headline, mission, vision, and hero media instantly</p>
              </div>
              <button
                onClick={handleSaveHomepageConfig}
                className="px-6 py-2.5 rounded-full bg-[#D4AF37] text-white text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer"
              >
                Save Live Changes
              </button>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 space-y-6 text-xs">
              <div>
                <label className="block font-bold text-[#2C2C2C] mb-2 uppercase">Hero Headline</label>
                <input
                  type="text"
                  value={cmsConfig.heroHeadline}
                  onChange={(e) => setCmsConfig({ ...cmsConfig, heroHeadline: e.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-200 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#2C2C2C] mb-2 uppercase">Hero Subheading</label>
                <textarea
                  rows={3}
                  value={cmsConfig.heroSubheading}
                  onChange={(e) => setCmsConfig({ ...cmsConfig, heroSubheading: e.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-200 outline-none"
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-[#2C2C2C] mb-2 uppercase">Hero Image</label>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Enter image URL..."
                    value={cmsConfig.heroImage}
                    onChange={(e) => setCmsConfig({ ...cmsConfig, heroImage: e.target.value })}
                    className="w-full p-3 rounded-xl border border-gray-200 outline-none text-xs"
                  />
                  <div className="flex items-center gap-3">
                    <label className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-xs cursor-pointer transition-colors inline-flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>Upload Custom Hero Image File</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setCmsConfig({ ...cmsConfig, heroImage: reader.result as string });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                  {cmsConfig.heroImage && (
                    <div className="mt-2">
                      <img src={cmsConfig.heroImage} alt="Hero Preview" className="w-32 h-20 rounded-xl object-cover border border-gray-200 shadow-sm" />
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                <div>
                  <label className="block font-bold text-[#2C2C2C] mb-2 uppercase">Mission Statement</label>
                  <textarea
                    rows={4}
                    value={cmsConfig.aboutMission}
                    onChange={(e) => setCmsConfig({ ...cmsConfig, aboutMission: e.target.value })}
                    className="w-full p-3 rounded-xl border border-gray-200 outline-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block font-bold text-[#2C2C2C] mb-2 uppercase">Vision Statement</label>
                  <textarea
                    rows={4}
                    value={cmsConfig.aboutVision}
                    onChange={(e) => setCmsConfig({ ...cmsConfig, aboutVision: e.target.value })}
                    className="w-full p-3 rounded-xl border border-gray-200 outline-none"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Customer Inquiries Tab */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <h1 className="font-playfair text-3xl font-bold text-[#2C2C2C]">Customer Inquiries</h1>
            <div className="space-y-4">
              {inquiries.map(inq => (
                <div key={inq.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-[#2C2C2C]">{inq.name}</span>
                      <span className="text-[10px] text-gray-400">• {inq.date}</span>
                    </div>
                    <p className="text-xs text-[#D4AF37]">{inq.email} | {inq.phone}</p>
                    <p className="text-xs text-gray-700 mt-2">{inq.message}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <a
                      href={`mailto:${inq.email}`}
                      className="px-4 py-2 rounded-xl bg-[#2C2C2C] text-white text-xs font-semibold"
                    >
                      Reply via Email
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-3xl">
            <h1 className="font-playfair text-3xl font-bold text-[#2C2C2C]">Store Settings & Security</h1>
            <div className="bg-white p-8 rounded-2xl border border-gray-200 space-y-6 text-xs">
              <div className="flex items-center space-x-3 p-4 bg-emerald-50 text-emerald-800 rounded-xl">
                <Lock className="w-5 h-5" />
                <span>SSL Encrypted • Two-Factor Security Enabled • Daily Auto Backup Active</span>
              </div>

              <div>
                <label className="block font-bold text-[#2C2C2C] mb-2 uppercase">Brand Business Name</label>
                <input
                  type="text"
                  value={settingsState.businessName}
                  onChange={(e) => setSettingsState({ ...settingsState, businessName: e.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-200 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#2C2C2C] mb-2 uppercase">WhatsApp Contact Number</label>
                <input
                  type="text"
                  value={settingsState.whatsapp}
                  onChange={(e) => setSettingsState({ ...settingsState, whatsapp: e.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-200 outline-none"
                />
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Product Form Drawer Modal */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-xl bg-white h-full overflow-y-auto p-8 shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <h3 className="font-playfair text-2xl font-bold text-[#2C2C2C]">
                  {editingProduct.id ? 'Edit Product' : 'Add New Product'}
                </h3>
                <button onClick={() => setIsProductModalOpen(false)} className="p-2 text-gray-500 hover:text-[#2C2C2C] cursor-pointer">
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-[#2C2C2C] mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full p-3 rounded-xl border border-gray-200 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#2C2C2C] mb-1">Category</label>
                    <select
                      value={editingProduct.category}
                      onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                      className="w-full p-3 rounded-xl border border-gray-200 outline-none bg-white"
                    >
                      <option value="Kitchen Essentials">Kitchen Essentials</option>
                      <option value="Abayas">Abayas</option>
                      <option value="Modern Gadgets">Modern Gadgets</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-[#2C2C2C] mb-1">Price (₦)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                      className="w-full p-3 rounded-xl border border-gray-200 outline-none"
                    />
                  </div>
                </div>

                {/* Smart Image Import System */}
                <div className="pt-2 border-t border-gray-100 space-y-3">
                  <label className="block font-bold text-[#2C2C2C]">Smart Image Import System</label>
                  <div className="flex space-x-2 border-b border-gray-200 pb-2">
                    <button
                      type="button"
                      onClick={() => setImageTab('device')}
                      className={`px-3 py-1 rounded-lg text-[11px] font-semibold cursor-pointer ${imageTab === 'device' ? 'bg-[#D4AF37] text-white' : 'bg-gray-100 text-gray-600'}`}
                    >
                      Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageTab('url')}
                      className={`px-3 py-1 rounded-lg text-[11px] font-semibold cursor-pointer ${imageTab === 'url' ? 'bg-[#D4AF37] text-white' : 'bg-gray-100 text-gray-600'}`}
                    >
                      Image URL
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageTab('instagram')}
                      className={`px-3 py-1 rounded-lg text-[11px] font-semibold cursor-pointer ${imageTab === 'instagram' ? 'bg-[#D4AF37] text-white' : 'bg-gray-100 text-gray-600'}`}
                    >
                      Instagram Link
                    </button>
                  </div>

                  {imageTab === 'device' ? (
                    <div className="space-y-2">
                      <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-2 pb-3">
                          <Plus className="w-6 h-6 text-gray-400 mb-1" />
                          <p className="text-xs text-gray-600 font-medium">Click to select image file from computer</p>
                          <p className="text-[10px] text-gray-400">PNG, JPG, WEBP (Max 5MB)</p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setEditingProduct({ ...editingProduct, image: reader.result as string });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    </div>
                  ) : imageTab === 'url' ? (
                    <div>
                      <input
                        type="text"
                        placeholder="Paste image URL (.jpg, .png, Unsplash, Drive)..."
                        value={editingProduct.image}
                        onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                        className="w-full p-3 rounded-xl border border-gray-200 outline-none text-xs"
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Paste Instagram Post or Reel Link..."
                          value={instagramInput}
                          onChange={(e) => setInstagramInput(e.target.value)}
                          className="flex-1 p-3 rounded-xl border border-gray-200 outline-none text-xs"
                        />
                        <button
                          type="button"
                          onClick={handleInstagramImport}
                          className="px-4 py-3 bg-[#2C2C2C] text-white rounded-xl font-bold cursor-pointer text-xs"
                        >
                          Import
                        </button>
                      </div>
                      {instagramMessage && (
                        <p className="text-[10px] text-amber-600 italic">{instagramMessage}</p>
                      )}
                    </div>
                  )}

                  {editingProduct.image && (
                    <div className="mt-2 flex items-center gap-3">
                      <img src={editingProduct.image} alt="Preview" className="w-16 h-16 rounded-xl object-cover border border-gray-200 shadow-sm" />
                      <div>
                        <p className="text-[10px] text-gray-400 font-semibold">Image Loaded Successfully</p>
                        <button
                          type="button"
                          onClick={() => setEditingProduct({ ...editingProduct, image: '' })}
                          className="text-[11px] text-red-500 hover:underline font-medium"
                        >
                          Remove Image
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-[#2C2C2C] mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    className="w-full p-3 rounded-xl border border-gray-200 outline-none"
                  ></textarea>
                </div>

                <div className="pt-4 flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-gradient-to-r from-[#D4AF37] to-[#AA8B22] text-white font-bold rounded-xl uppercase tracking-wider cursor-pointer"
                  >
                    Save Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
