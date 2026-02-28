import React, { useState } from 'react';
import {
  Plus,
  Search,
  ChevronDown,
  Eye,
  History,
  Info,
  ExternalLink,
  Image as ImageIcon,
  GripVertical,
  MoreVertical,
  ChevronRight,
  ChevronUp,
  ArrowLeft,
  StickyNote,
  Globe,
  X,
  Layout,
  Clock,
  Tag,
  ShoppingBag,
  Zap,
  Filter,
  Layers,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../types';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const menuItems = [
  {
    id: '1',
    name: 'Americana Pizza - 10"',
    price: '$14.45',
    menus: 'Menu',
    categories: '10" Pizza',
    usedIn: '-',
    contains: 'Add Toppings',
    lastUpdated: '10/07',
    image: 'https://picsum.photos/seed/pizza1/100/100',
    description: 'Classic Americana pizza with tomato sauce and mozzarella.'
  },
  {
    id: '2',
    name: 'Americana Pizza - 13"',
    price: '$18.70',
    menus: 'Menu',
    categories: '13" Pizza',
    usedIn: '-',
    contains: 'Add Toppings',
    lastUpdated: '10/07',
    image: 'https://picsum.photos/seed/pizza2/100/100',
    description: 'Large Americana pizza for sharing.'
  },
  {
    id: '3',
    name: 'Americana Pizza - 12" Gluten Free',
    price: '$21.00',
    menus: 'Menu',
    categories: '12" Gluten Fr...',
    usedIn: '-',
    contains: 'Add Toppings',
    lastUpdated: '07/11',
    image: null,
    description: 'Gluten-free base Americana pizza.'
  },
  {
    id: '4',
    name: 'Americana Pizza - 18"',
    price: '$23.70',
    menus: 'Menu',
    categories: '18" Pizzas',
    usedIn: '-',
    contains: 'Choice of Ext...',
    lastUpdated: '10/07',
    image: 'https://picsum.photos/seed/pizza3/100/100',
    description: 'Extra large 18 inch pizza.'
  }
];

const overviewData = [
  {
    id: 'cat-1',
    name: 'Breakfast favorites',
    itemCount: 1,
    items: [
      { id: 'item-1', name: 'Pancakes', price: '$8.50', description: 'Buckwheat pancakes with maple syrup' }
    ]
  },
  {
    id: 'cat-2',
    name: 'Drinks',
    itemCount: 3,
    items: [
      { id: 'item-2', name: 'Soda', price: '$2.50', description: 'Refreshing soda.' },
      { id: 'item-3', name: 'Water', price: '$0.80', description: 'Pure spring water.' },
      { id: 'item-4', name: 'Coffee', price: '$4.50', description: 'Hot brewed coffee.' }
    ]
  }
];

const menusData = [
  { id: 'menu-1', name: 'Breakfast', hours: 'Every day: 4:00 AM - 10:00 AM' },
  { id: 'menu-2', name: 'Lunch', hours: 'Mon-Fri: 11:00 AM - 3:00 PM' },
  { id: 'menu-3', name: 'Dinner', hours: 'Every day: 5:00 PM - 10:00 PM' },
  { id: 'menu-4', name: 'Late Night', hours: 'Fri-Sat: 10:00 PM - 2:00 AM' },
];

const categoriesData = [
  { id: 'cat-1', name: 'Breakfast favorites', itemCount: 1 },
  { id: 'cat-2', name: 'Drinks', itemCount: 3 },
  { id: 'cat-3', name: 'Starters', itemCount: 5 },
  { id: 'cat-4', name: 'Mains', itemCount: 12 },
  { id: 'cat-5', name: 'Sides', itemCount: 4 },
];

const modifierGroupsData = [
  {
    id: 'mg-1',
    name: 'Choose Meat Temperature',
    min: 1,
    max: 1,
    options: [
      { name: 'Rare', price: 0 },
      { name: 'Medium Rare', price: 0 },
      { name: 'Medium', price: 0 },
      { name: 'Well Done', price: 0 }
    ]
  },
  {
    id: 'mg-2',
    name: 'Add Extra Toppings',
    min: 0,
    max: 5,
    options: [
      { name: 'Bacon', price: 1.50 },
      { name: 'Avocado', price: 2.00 },
      { name: 'Fried Egg', price: 1.00 },
      { name: 'Cheese', price: 0.50 }
    ]
  }
];

interface SortableCategoryProps {
  category: any;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  key?: any;
}

const SortableCategory = ({
  category,
  isExpanded,
  onToggle
}: SortableCategoryProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="card-premium h-20 bg-white border-none shadow-sm flex items-center group overflow-hidden"
    >
      <div {...attributes} {...listeners} className="w-14 h-full flex items-center justify-center text-zinc-200 group-hover:text-zinc-400 cursor-grab active:cursor-grabbing transition-colors bg-zinc-50/50">
        <GripVertical size={20} />
      </div>

      <div className="flex-1 px-6 flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="flex items-center gap-3">
            <h3 className="font-black text-black tracking-tight text-lg group-hover:text-[#00ff90] transition-colors">{category.name}</h3>
            <span className="text-[10px] font-black text-[#00ff90] uppercase tracking-widest px-2 py-0.5 bg-[#00ff90]/10 rounded-full">Primary</span>
          </div>
          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">{category.itemCount} Units Registered</p>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none mb-1">Architecture</div>
            <div className="text-sm font-black text-zinc-900 leading-none">Global Sync</div>
          </div>
          <button
            onClick={() => onToggle(category.id)}
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
              isExpanded ? "bg-black text-[#00ff90]" : "bg-zinc-50 text-zinc-400 hover:text-black"
            )}
          >
            <ChevronDown size={18} className={cn("transition-transform duration-300", isExpanded ? "" : "-rotate-90")} />
          </button>
        </div>
      </div>
    </div>
  );
};


const MenuMaker = () => {
  const [activeSubTab, setActiveSubTab] = useState('Overview');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['cat-1', 'cat-2']);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [schedule, setSchedule] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (let d = 0; d < 7; d++) {
      for (let h = 4; h <= 10; h++) initial[`${d}-${h}`] = 'Breakfast';
      for (let h = 11; h <= 15; h++) initial[`${d}-${h}`] = 'Lunch';
      for (let h = 17; h <= 22; h++) initial[`${d}-${h}`] = 'Dinner';
    }
    return initial;
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragValue, setDragValue] = useState<string | null>(null);
  const [modifierGroups, setModifierGroups] = useState(modifierGroupsData);
  const [linkingGroup, setLinkingGroup] = useState<any>(null);
  const [menus, setMenus] = useState(menusData);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [categories, setCategories] = useState(categoriesData);
  const [itemStock, setItemStock] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    menuItems.forEach(item => initial[item.id] = true);
    return initial;
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const subTabs = [
    { name: 'Overview', icon: Layout },
    { name: 'Menus', icon: Clock },
    { name: 'Categories', icon: Tag },
    { name: 'Items', icon: ShoppingBag },
    { name: 'Modifier Groups', icon: Zap }
  ];

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setCategories((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const duplicateMenu = (menu: any) => {
    const newMenu = {
      ...menu,
      id: `menu-${Date.now()}`,
      name: `${menu.name} (Copy)`
    };
    setMenus(prev => [...prev, newMenu]);
    setOpenMenuId(null);
  };

  const handleMouseDown = (day: number, hour: number) => {
    setIsDragging(true);
    const currentValue = schedule[`${day}-${hour}`];
    const newValue = currentValue === 'Breakfast' ? 'Lunch' : currentValue === 'Lunch' ? 'Dinner' : currentValue === 'Dinner' ? '' : 'Breakfast';
    setDragValue(newValue);
    setSchedule(prev => ({ ...prev, [`${day}-${hour}`]: newValue }));
  };

  const handleMouseEnter = (day: number, hour: number) => {
    if (isDragging && dragValue !== null) {
      setSchedule(prev => ({ ...prev, [`${day}-${hour}`]: dragValue }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragValue(null);
  };

  const updateModifierLimit = (id: string, field: 'min' | 'max', delta: number) => {
    setModifierGroups(prev => prev.map(mg => {
      if (mg.id === id) {
        const newVal = Math.max(0, mg[field] + delta);
        return { ...mg, [field]: newVal };
      }
      return mg;
    }));
  };

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const expandAll = () => setExpandedCategories(overviewData.map(c => c.id));
  const collapseAll = () => setExpandedCategories([]);

  const handleEditItem = (item: any) => {
    setSelectedItem(item);
  };

  if (selectedItem) {
    return (
      <div className="flex flex-col h-full bg-white animate-in slide-in-from-right duration-500">
        <div className="flex items-center justify-between border-b border-zinc-100 px-10 py-6 shrink-0 bg-white/80 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-10">
            <button
              onClick={() => setSelectedItem(null)}
              className="w-12 h-12 rounded-full border border-zinc-100 flex items-center justify-center text-zinc-400 hover:bg-black hover:text-white transition-all shadow-sm"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="space-y-1">
              <h2 className="text-2xl font-black tracking-tighter">{selectedItem.name}</h2>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest px-2 py-0.5 border border-zinc-100 rounded-full">ID: {selectedItem.id}</span>
                <span className="text-[10px] font-black text-[#00ff90] uppercase tracking-widest px-2 py-0.5 bg-[#00ff90]/10 rounded-full flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-[#00ff90] rounded-full animate-pulse" /> Live in Catalog
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-8 py-3.5 bg-zinc-50 text-zinc-400 font-black text-[11px] uppercase tracking-widest rounded-2xl hover:bg-zinc-100 transition-all border border-zinc-100">
              Discard Changes
            </button>
            <button className="px-10 py-3.5 bg-black text-[#00ff90] font-black text-[11px] uppercase tracking-widest rounded-2xl hover:scale-105 transition-all shadow-xl shadow-black/10">
              Persist Metadata
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-transparent">
          <div className="max-w-[1000px] mx-auto py-16 px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              {/* Left Column: Media & Core Info */}
              <div className="lg:col-span-1 space-y-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Visual Representation</label>
                  <div className="aspect-square rounded-[32px] overflow-hidden bg-zinc-50 border border-zinc-100 relative group cursor-pointer">
                    {selectedItem.image ? (
                      <img src={selectedItem.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-zinc-300 gap-4">
                        <ImageIcon size={48} />
                        <span className="text-[10px] font-black uppercase tracking-widest">No Media Attached</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="px-6 py-3 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded-xl">Replace Asset</button>
                    </div>
                  </div>
                </div>

                <div className="card-premium p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-black uppercase tracking-widest">Inventory Status</span>
                    <button
                      onClick={() => setItemStock(prev => ({ ...prev, [selectedItem.id]: !prev[selectedItem.id] }))}
                      className={cn(
                        "w-12 h-6 rounded-full transition-all relative p-1",
                        itemStock[selectedItem.id] ? "bg-[#00ff90]" : "bg-zinc-200"
                      )}
                    >
                      <div className={cn("w-4 h-4 bg-white rounded-full shadow-sm transition-all", itemStock[selectedItem.id] ? "translate-x-6" : "")} />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-500">Node Sync</span>
                      <span className="text-xs font-black text-black">Global Master</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-500">Last Modified</span>
                      <span className="text-xs font-black text-black">2h ago by Admin</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Configuration Matrix */}
              <div className="lg:col-span-2 space-y-12">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                    <h3 className="text-2xl font-black text-black tracking-tighter">Identity & Context</h3>
                    <div className="flex items-center gap-2">
                      {['Vegan', 'Halal', 'Spicy'].map(tag => (
                        <span key={tag} className="px-3 py-1 bg-zinc-50 border border-zinc-100 text-zinc-400 text-[9px] font-black uppercase tracking-widest rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Display Denomination</label>
                      <input
                        type="text"
                        defaultValue={selectedItem.name}
                        className="w-full bg-zinc-50 border-zinc-100 rounded-xl p-4 font-black text-sm focus:ring-4 focus:ring-[#00ff90]/5 focus:border-[#00ff90] transition-all"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Pricing Structure ($)</label>
                      <input
                        type="text"
                        defaultValue={selectedItem.price.replace('$', '')}
                        className="w-full bg-zinc-50 border-zinc-100 rounded-xl p-4 font-black text-sm focus:ring-4 focus:ring-[#00ff90]/5 focus:border-[#00ff90] transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Narrative Description</label>
                    <textarea
                      defaultValue={selectedItem.description}
                      className="w-full bg-zinc-50 border-zinc-100 rounded-2xl p-6 font-medium text-zinc-600 text-sm focus:ring-4 focus:ring-[#00ff90]/5 focus:border-[#00ff90] transition-all min-h-[160px] resize-none"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                    <h3 className="text-2xl font-black text-black tracking-tighter">Architecture Mapping</h3>
                    <button className="text-[10px] font-black text-[#00ff90] uppercase tracking-widest flex items-center gap-2 hover:underline">
                      <Plus size={14} /> Add Modifier Group
                    </button>
                  </div>

                  <div className="space-y-4">
                    {modifierGroups.slice(0, 2).map((group, i) => (
                      <div key={group.id} className="card-premium p-6 border-zinc-100 shadow-sm flex items-center justify-between group hover:border-[#00ff90]/30 transition-all">
                        <div className="flex items-center gap-6">
                          <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-[#00ff90]/10 group-hover:text-[#00ff90] transition-colors">
                            <Layers size={20} />
                          </div>
                          <div>
                            <div className="text-sm font-black text-black">{group.name}</div>
                            <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Required: {group.min} • Limit: {group.max}</div>
                          </div>
                        </div>
                        <button className="text-zinc-300 hover:text-red-500 transition-colors">
                          <X size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-10 border-t border-zinc-100">
                  <button className="flex-1 py-5 bg-zinc-900 text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-black transition-all shadow-xl shadow-black/10">
                    Duplicate Node
                  </button>
                  <button className="flex-1 py-5 bg-white border-2 border-red-50 text-red-500 font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-red-50 transition-all">
                    Terminate Asset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Premium Sub-Navigation */}
      <div className="flex items-center justify-between border-b border-zinc-100 px-10 shrink-0 bg-white/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="flex gap-10">
          {subTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={cn(
                "py-6 text-[11px] font-black uppercase tracking-[0.2em] relative transition-all duration-300",
                activeSubTab === tab ? "text-black" : "text-zinc-400 hover:text-black"
              )}
            >
              {tab}
              {activeSubTab === tab && (
                <motion.div
                  layoutId="subtab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-[#00ff90] rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-8">
          <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#00ff90] hover:underline">
            <Globe size={14} /> Global Status: Online
          </button>
          <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black transition-colors">
            <Info size={14} /> Documentation
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-transparent">
        <div className="max-w-[1400px] mx-auto py-12 px-10 space-y-12 pb-32">
          {/* Section Header */}
          <div className="flex items-end justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <h1 className="text-5xl font-black text-black tracking-tighter uppercase">{activeSubTab}</h1>
                <div className="px-3 py-1 bg-[#00ff90]/10 text-[#00ff90] rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <Sparkles size={12} /> Live Engine
                </div>
              </div>
              <p className="text-zinc-500 font-medium text-lg">Manage your {activeSubTab.toLowerCase()} infrastructure and deployment.</p>
            </div>

            <div className="flex items-center gap-4">
              <button className="bg-black text-[#00ff90] px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-xl shadow-black/10 flex items-center gap-3">
                <Plus size={18} /> New {activeSubTab.replace('s', '')}
              </button>
            </div>
          </div>

          {/* Conditional Content Rendering */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {activeSubTab === 'Overview' && (
              <div className="space-y-6">
                {overviewData.map((category, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={category.id}
                    className="card-premium overflow-hidden border-none shadow-sm"
                  >
                    <div className="p-8 flex items-center justify-between group cursor-pointer hover:bg-zinc-50 transition-all">
                      <div className="flex items-center gap-8">
                        <div className="flex items-center gap-4">
                          <GripVertical size={20} className="text-zinc-200 group-hover:text-zinc-400 cursor-grab active:cursor-grabbing transition-colors" />
                          <button
                            onClick={() => toggleCategory(category.id)}
                            className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                              expandedCategories.includes(category.id) ? "bg-black text-white" : "bg-zinc-100 text-zinc-400 group-hover:text-black"
                            )}
                          >
                            <ChevronDown size={18} className={cn("transition-transform duration-300", expandedCategories.includes(category.id) ? "" : "-rotate-90")} />
                          </button>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-4">
                            <h3 className="text-2xl font-black text-black tracking-tighter">{category.name}</h3>
                            <span className="text-[10px] font-black text-[#00ff90] uppercase tracking-widest px-2 py-0.5 bg-[#00ff90]/10 rounded-full">Primary</span>
                          </div>
                          <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em]">{category.itemCount} Units Registered</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-10">
                        <div className="flex -space-x-3">
                          {category.items.slice(0, 3).map((item, idx) => (
                            <div key={idx} className="w-10 h-10 rounded-full border-2 border-white bg-zinc-100 flex items-center justify-center text-[10px] font-black text-zinc-400 overflow-hidden">
                              {item.name.charAt(0)}
                            </div>
                          ))}
                        </div>
                        <button className="w-12 h-12 rounded-full border border-zinc-100 flex items-center justify-center text-zinc-400 hover:bg-black hover:text-white transition-all">
                          <MoreVertical size={20} />
                        </button>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedCategories.includes(category.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-zinc-50/50 border-t border-zinc-100"
                        >
                          <div className="p-8 space-y-4">
                            {category.items.map((item) => (
                              <div key={item.id} className="bg-white p-6 rounded-[24px] border border-zinc-100/50 flex items-center group/item hover:border-[#00ff90]/30 hover:shadow-xl hover:shadow-[#00ff90]/5 transition-all">
                                <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-300 group-hover/item:text-[#00ff90] transition-colors mr-6">
                                  <GripVertical size={18} className="cursor-grab active:cursor-grabbing" />
                                </div>
                                <div className="flex-1 space-y-1">
                                  <h4
                                    onClick={() => handleEditItem(item)}
                                    className="text-lg font-black text-black cursor-pointer hover:text-[#00ff90] transition-colors tracking-tight"
                                  >
                                    {item.name}
                                  </h4>
                                  <p className="text-zinc-400 text-xs font-medium max-w-md line-clamp-1">{item.description}</p>
                                </div>
                                <div className="flex items-center gap-12">
                                  <div className="text-right">
                                    <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none mb-1">MSRP</div>
                                    <div className="text-xl font-black text-black leading-none">{item.price}</div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <button onClick={() => handleEditItem(item)} className="px-6 py-2.5 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#00ff90] hover:text-black transition-all">
                                      Edit unit
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            )}

            {activeSubTab === 'Menus' && (
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {menus.map((menu, i) => (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      key={menu.id}
                      className="card-premium p-8 group relative overflow-hidden bg-white hover:shadow-2xl hover:shadow-black/5 transition-all border-none"
                    >
                      <div className="relative z-10 space-y-6">
                        <div className="w-12 h-12 rounded-2xl bg-[#00ff90]/10 flex items-center justify-center text-[#00ff90]">
                          <Clock size={24} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-black text-black tracking-tighter group-hover:text-[#00ff90] transition-colors">{menu.name}</h3>
                          <p className="text-zinc-400 font-bold text-sm mt-1">{menu.hours}</p>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-zinc-50">
                          <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Architecture Active</span>
                          <button className="text-[10px] font-black text-black uppercase tracking-widest hover:underline">Configure</button>
                        </div>
                      </div>
                      <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-[#00ff90]/5 rounded-full blur-3xl group-hover:bg-[#00ff90]/10 transition-colors" />
                    </motion.div>
                  ))}
                </div>

                <div className="card-premium p-10 bg-black text-white border-none shadow-2xl relative overflow-hidden">
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#00ff90] flex items-center justify-center text-black shadow-lg shadow-[#00ff90]/20">
                          <Layers size={20} />
                        </div>
                        <h2 className="text-3xl font-black tracking-tighter">Global Schedule Matrix</h2>
                      </div>
                      <p className="text-zinc-400 max-w-xl font-medium">Coordinate your entire node network across time zones. Drag and select cells to assign menu availability with millisecond precision.</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white/5 p-2 rounded-2xl border border-white/10">
                      {['Breakfast', 'Lunch', 'Dinner'].map(type => (
                        <div key={type} className="flex items-center gap-2 px-4 py-2">
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            type === 'Breakfast' ? "bg-[#00ff90]" : type === 'Lunch' ? "bg-blue-400" : "bg-orange-400"
                          )} />
                          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">{type}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-12 overflow-hidden rounded-[32px] border border-white/5 bg-zinc-900/50 backdrop-blur-xl">
                    <div className="grid grid-cols-8">
                      <div className="p-5 border-r border-b border-white/5 text-[9px] font-black text-zinc-500 uppercase tracking-widest text-center">UTC+8</div>
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                        <div key={day} className="p-5 border-r border-b border-white/5 text-[9px] font-black text-zinc-400 uppercase tracking-widest text-center">{day}</div>
                      ))}
                      {[...Array(12)].map((_, h) => (
                        <React.Fragment key={h}>
                          <div className="p-4 border-r border-b border-white/5 text-[9px] font-black text-zinc-600 uppercase text-center">{h * 2}:00</div>
                          {[...Array(7)].map((_, d) => (
                            <div key={d} className="border-r border-b border-white/5 h-12 relative group cursor-pointer hover:bg-white/5 transition-colors">
                              {h > 2 && h < 6 && (
                                <div className="absolute inset-1.5 rounded-lg bg-[#00ff90]/10 border border-[#00ff90]/20 flex items-center justify-center">
                                  <div className="w-1.5 h-1.5 bg-[#00ff90] rounded-full animate-pulse" />
                                </div>
                              )}
                            </div>
                          ))}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSubTab === 'Categories' && (
              <div className="space-y-6">
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={categories.map(c => c.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-6">
                      {categories.map((category) => (
                        <SortableCategory
                          key={category.id}
                          category={category}
                          isExpanded={expandedCategories.includes(category.id)}
                          onToggle={toggleCategory}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              </div>
            )}

            {activeSubTab === 'Items' && (
              <div className="card-premium bg-white border-none shadow-sm overflow-hidden p-0">
                <div className="p-8 border-b border-zinc-50 flex items-center justify-between">
                  <div className="flex items-center gap-4 bg-zinc-50 px-6 py-3 rounded-2xl border border-zinc-100 flex-1 max-w-md">
                    <Search size={18} className="text-zinc-400" />
                    <input type="text" placeholder="Filter items..." className="bg-transparent border-none outline-none font-bold text-sm" />
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="p-3 text-zinc-400 hover:text-black transition-colors"><Filter size={18} /></button>
                    <button className="flex items-center gap-2 px-6 py-3 border border-zinc-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-50">Bulk Actions</button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-zinc-50/50">
                      <tr>
                        <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Entity</th>
                        <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Valuation</th>
                        <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Node Path</th>
                        <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Configuration</th>
                        <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50">
                      {menuItems.map((item) => (
                        <tr key={item.id} className="group hover:bg-zinc-50/50 transition-all cursor-pointer" onClick={() => handleEditItem(item)}>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-zinc-100 overflow-hidden flex-shrink-0">
                                {item.image ? <img src={item.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-zinc-300"><ImageIcon size={20} /></div>}
                              </div>
                              <div>
                                <div className="text-sm font-black text-black">{item.name}</div>
                                <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">ID: {item.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-sm font-black text-black">{item.price}</td>
                          <td className="px-8 py-6 text-xs font-medium text-zinc-500">{item.categories}</td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-1 bg-zinc-100 text-[9px] font-black text-zinc-500 uppercase tracking-widest rounded-md">{item.contains}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <button
                              onClick={(e) => { e.stopPropagation(); setItemStock(prev => ({ ...prev, [item.id]: !prev[item.id] })); }}
                              className={cn(
                                "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all",
                                itemStock[item.id] ? "bg-[#00ff90]/10 text-[#00ff90] border border-[#00ff90]/20" : "bg-red-50 text-red-500 border border-red-100"
                              )}
                            >
                              {itemStock[item.id] ? 'In Service' : 'Off-Line'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeSubTab === 'Modifier Groups' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {modifierGroups.map((group) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={group.id}
                    className="card-premium p-8 bg-white border-none shadow-sm space-y-8"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="text-2xl font-black text-black tracking-tighter uppercase">{group.name}</h3>
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                          Architecture: {group.min === 1 && group.max === 1 ? 'Exclusive Selection' : 'Multi-Select Permitted'}
                        </p>
                      </div>
                      <button onClick={() => setLinkingGroup(group)} className="w-10 h-10 rounded-xl bg-[#00ff90]/10 text-[#00ff90] flex items-center justify-center hover:bg-[#00ff90] hover:text-black transition-all">
                        <ExternalLink size={18} />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100 flex items-center justify-between">
                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Min Depth</span>
                        <span className="text-sm font-black">{group.min}</span>
                      </div>
                      <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100 flex items-center justify-between">
                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Max Depth</span>
                        <span className="text-sm font-black">{group.max}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {group.options.map((option, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-zinc-50/50 rounded-2xl border border-transparent hover:border-zinc-100 transition-all">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#00ff90] shadow-[0_0_10px_#00ff90]" />
                            <span className="text-sm font-bold text-black">{option.name}</span>
                          </div>
                          <span className="text-xs font-black text-zinc-400 tracking-widest">+${option.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bulk Attachment Linker Modal */}
      <AnimatePresence>
        {linkingGroup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-8"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[40px] shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[85vh] border border-white/20"
            >
              <div className="p-10 border-b border-zinc-50 flex items-center justify-between bg-zinc-50/50">
                <div className="space-y-1">
                  <h2 className="text-3xl font-black tracking-tighter uppercase">Link "{linkingGroup.name}"</h2>
                  <p className="text-sm text-zinc-500 font-medium">Coordinate deployment across registered item nodes.</p>
                </div>
                <button onClick={() => setLinkingGroup(null)} className="w-12 h-12 rounded-full bg-white border border-zinc-100 flex items-center justify-center text-zinc-400 hover:text-black transition-all">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-10">
                <div className="space-y-4">
                  {menuItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-6 p-6 hover:bg-zinc-50 rounded-3xl cursor-pointer border-2 border-transparent hover:border-[#00ff90]/20 transition-all group">
                      <div className="w-6 h-6 rounded-lg border-2 border-zinc-200 flex items-center justify-center transition-all group-hover:border-[#00ff90]">
                        {parseInt(item.id) % 2 === 0 && <div className="w-3 h-3 bg-[#00ff90] rounded-sm" />}
                      </div>
                      <div className="w-14 h-14 bg-zinc-100 rounded-2xl overflow-hidden flex-shrink-0">
                        {item.image ? <img src={item.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-zinc-300"><ImageIcon size={20} /></div>}
                      </div>
                      <div className="flex-1">
                        <p className="font-black text-lg text-black tracking-tight leading-none mb-1">{item.name}</p>
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{item.categories}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-10 border-t border-zinc-50 bg-white flex justify-end gap-6">
                <button onClick={() => setLinkingGroup(null)} className="px-10 py-5 text-[11px] font-black uppercase tracking-widest text-zinc-400 hover:text-black">Cancel Transaction</button>
                <button onClick={() => setLinkingGroup(null)} className="px-12 py-5 bg-black text-[#00ff90] rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-xl shadow-black/10">Push Configuration</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenuMaker;
