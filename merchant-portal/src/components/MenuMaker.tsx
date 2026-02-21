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
  X
} from 'lucide-react';
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
      className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm"
    >
      <div className="flex items-center p-4 hover:bg-gray-50 transition-colors group">
        <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing mr-4">
          <GripVertical size={20} className="text-gray-300" />
        </div>
        <div className="flex-1 flex items-center gap-3">
          <span className="font-bold text-emerald-600 text-lg cursor-pointer hover:underline">
            {category.name}
          </span>
          <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs font-bold">
            {category.itemCount}
          </span>
        </div>
        <button 
          onClick={() => onToggle(category.id)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {isExpanded && (
        <div className="bg-gray-50/50 px-8 py-4 border-t border-gray-100">
          <div className="text-sm text-gray-400 italic">Items in this category will be listed here...</div>
        </div>
      )}
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

  const subTabs = ['Overview', 'Menus', 'Categories', 'Items', 'Modifier Groups'];

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
      <div className="flex flex-col h-full bg-white">
        {/* Sub Navigation (Sticky) */}
        <div className="flex items-center justify-between border-b border-gray-100 px-8 shrink-0">
          <div className="flex gap-8">
            {subTabs.map((tab) => (
              <button
                key={tab}
                className={cn(
                  "py-4 text-sm font-medium relative transition-colors",
                  tab === 'Items' ? "text-emerald-600" : "text-gray-400"
                )}
              >
                {tab}
                {tab === 'Items' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6 text-emerald-600">
            <button className="flex items-center gap-1.5 text-xs font-bold hover:underline">
              <ExternalLink size={14} />
              View Online
            </button>
            <button className="flex items-center gap-1.5 text-xs font-bold hover:underline">
              <Info size={14} />
              About
            </button>
          </div>
        </div>

        {/* Item Detail View */}
        <div className="flex-1 overflow-y-auto p-8 bg-white">
          <div className="max-w-4xl mx-auto">
            {/* Action Bar */}
            <div className="flex items-center justify-between mb-8">
              <button 
                onClick={() => setSelectedItem(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <div className="flex items-center gap-4">
                <button className="px-6 py-2 bg-gray-100 text-black font-bold rounded-sm hover:bg-gray-200 transition-colors">
                  Delete
                </button>
                <button className="px-6 py-2 bg-gray-100 text-black font-bold rounded-sm hover:bg-gray-200 transition-colors">
                  Duplicate
                </button>
                <button className="px-6 py-2 bg-gray-100 text-gray-400 font-bold rounded-sm cursor-not-allowed">
                  Save
                </button>
              </div>
            </div>

            {/* Image Upload Dropzone */}
            <div className="mb-10">
              <label className="text-sm font-bold text-gray-800 mb-2 block">Item Image</label>
              <div className="border-2 border-dashed border-gray-200 rounded-sm p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
                {selectedItem.image ? (
                  <div className="relative w-40 h-40 mb-4">
                    <img src={selectedItem.image} alt="" className="w-full h-full object-cover rounded-sm shadow-md" referrerPolicy="no-referrer" />
                    <button className="absolute -top-2 -right-2 bg-white p-1 rounded-full shadow-md border border-gray-200 hover:bg-gray-50">
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                    <Plus size={24} className="text-emerald-600" />
                  </div>
                )}
                <p className="text-sm font-bold text-emerald-600 hover:underline">
                  {selectedItem.image ? 'Replace Image' : 'Add Image'}
                </p>
                <p className="text-xs text-gray-400 mt-1">Drag and drop or click to upload</p>
              </div>
            </div>

            {/* Title Section */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-8">
              <h1 className="text-4xl font-bold">{selectedItem.name}</h1>
              <button className="flex items-center gap-2 text-emerald-600 font-bold hover:underline">
                <StickyNote size={18} />
                Add Note
              </button>
            </div>

            {/* Form Sections */}
            <div className="space-y-10 max-w-2xl">
              {/* Description */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-gray-800">Description (optional)</label>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">120 / 250</span>
                </div>
                <div className="bg-gray-50 rounded-sm overflow-hidden border border-transparent focus-within:border-emerald-500 transition-colors">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 border-b border-gray-200">
                    <button className="p-1 hover:bg-gray-200 rounded-sm font-serif font-bold text-xs">B</button>
                    <button className="p-1 hover:bg-gray-200 rounded-sm font-serif italic text-xs">I</button>
                    <button className="p-1 hover:bg-gray-200 rounded-sm text-xs">• List</button>
                  </div>
                  <textarea 
                    defaultValue={selectedItem.description || ""}
                    className="w-full p-4 bg-transparent border-none text-sm focus:ring-0 min-h-[120px] resize-none"
                    placeholder="Tell customers about your item..."
                  />
                </div>
              </div>

              {/* Sell item on its own */}
              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-800">Sell item on its own?</label>
                <div className="flex gap-4">
                  <button className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 rounded-sm shadow-sm">
                    <div className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
                    </div>
                    <span className="font-bold">Yes</span>
                  </button>
                  <button className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-100 rounded-sm">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                    <span className="font-bold">No</span>
                  </button>
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-2">
                <div className="relative flex items-center bg-gray-50 rounded-sm p-2 gap-2">
                  <Search size={16} className="text-gray-400 ml-2" />
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">
                      Breakfast favorites
                      <X size={14} className="cursor-pointer" />
                    </div>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Add a category" 
                    className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-1"
                  />
                  <X size={16} className="text-gray-400 mr-2 cursor-pointer" />
                </div>
                <p className="text-xs text-gray-500">Listed in the following menus: Breakfast</p>
              </div>

              {/* Pricing */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm font-bold text-gray-800">Priced by Weight?</span>
                  <button className="w-12 h-6 bg-emerald-600 rounded-full relative transition-colors">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-800">Price per lb</label>
                    <div className="flex items-center bg-gray-50 rounded-sm overflow-hidden border border-transparent focus-within:border-emerald-500">
                      <div className="px-4 py-3 bg-gray-100 text-gray-500 text-sm">$</div>
                      <input 
                        type="text" 
                        defaultValue="12.50"
                        className="flex-1 bg-transparent border-none p-3 text-sm focus:ring-0"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-800">Tax Rate</label>
                    <div className="flex items-center bg-gray-50 rounded-sm overflow-hidden border border-transparent focus-within:border-emerald-500">
                      <input 
                        type="text" 
                        defaultValue="10"
                        className="flex-1 bg-transparent border-none p-3 text-sm focus:ring-0"
                      />
                      <div className="px-4 py-3 bg-gray-100 text-gray-500 text-sm">%</div>
                    </div>
                  </div>
                </div>
              </div>

              <button className="text-emerald-600 font-bold text-sm hover:underline">
                Add Menu Specific Pricing
              </button>

              {/* Dietary Tags */}
              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-800">Dietary Tags</label>
                <div className="flex flex-wrap gap-3">
                  {['Vegan', 'Vegetarian', 'Gluten-Free', 'Halal', 'Kosher'].map(tag => (
                    <button 
                      key={tag}
                      className={cn(
                        "px-4 py-2 rounded-full text-xs font-bold border transition-all",
                        tag === 'Gluten-Free' 
                          ? "bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-200" 
                          : "bg-white border-gray-200 text-gray-500 hover:border-emerald-600 hover:text-emerald-600"
                      )}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Out of stock toggle */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-gray-800">Item out of stock?</span>
                <button className="w-12 h-6 bg-gray-200 rounded-full relative transition-colors">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Sub Navigation */}
      <div className="flex items-center justify-between border-b border-gray-100 px-8 shrink-0">
        <div className="flex gap-8">
          {subTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={cn(
                "py-4 text-sm font-medium relative transition-colors",
                activeSubTab === tab ? "text-emerald-600" : "text-gray-400 hover:text-black"
              )}
            >
              {tab}
              {activeSubTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6 text-emerald-600">
          <button className="flex items-center gap-1.5 text-xs font-bold hover:underline">
            <ExternalLink size={14} />
            View Online
          </button>
          <button className="flex items-center gap-1.5 text-xs font-bold hover:underline">
            <Info size={14} />
            About
          </button>
        </div>
      </div>

      <div className="p-8 flex-1 overflow-y-auto bg-gray-50/50">
        {activeSubTab === 'Overview' ? (
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-bold">Overview</h1>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-8">
                <div className="relative">
                  <select className="appearance-none bg-gray-100 border-none rounded-sm px-4 py-2 pr-10 text-sm font-medium focus:ring-1 focus:ring-emerald-500 min-w-[180px]">
                    <option>Breakfast</option>
                    <option>Lunch</option>
                    <option>Dinner</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-bold">Menu Hours</span>
                  <button className="text-emerald-600 font-bold hover:underline">Edit</button>
                  <span className="text-gray-500 ml-2">Every day: 4:00 AM - 10:00 AM</span>
                </div>
              </div>
              
              <button className="bg-gray-100 text-gray-400 px-6 py-2 rounded-sm font-bold text-sm cursor-not-allowed">
                Save
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <button onClick={expandAll} className="text-emerald-600 text-sm font-bold hover:underline">Expand All</button>
              <button onClick={collapseAll} className="text-emerald-600 text-sm font-bold hover:underline">Collapse All</button>
            </div>

            {/* Overview List */}
            <div className="space-y-4">
              {overviewData.map((category) => (
                <div key={category.id} className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
                  <div className="flex items-center p-4 hover:bg-gray-50 transition-colors group">
                    <button 
                      onClick={() => toggleCategory(category.id)}
                      className="mr-4 text-gray-400 hover:text-black transition-colors"
                    >
                      {expandedCategories.includes(category.id) ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </button>
                    <GripVertical size={20} className="text-gray-300 mr-4 cursor-grab active:cursor-grabbing" />
                    <span className="flex-1 font-bold text-emerald-600 text-lg cursor-pointer hover:underline">
                      {category.name}
                    </span>
                    <div className="flex items-center gap-6">
                      <span className="text-sm text-gray-500">Items: {category.itemCount}</span>
                      <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                        <MoreVertical size={20} className="text-gray-400" />
                      </button>
                    </div>
                  </div>

                  {expandedCategories.includes(category.id) && (
                    <div className="bg-gray-50/50 px-8 py-4 space-y-2">
                      {category.items.map((item) => (
                        <div key={item.id} className="bg-white border border-gray-100 rounded-sm p-4 flex items-center hover:shadow-sm transition-all group">
                          <GripVertical size={18} className="text-gray-300 mr-4 cursor-grab active:cursor-grabbing" />
                          <span 
                            onClick={() => handleEditItem(item)}
                            className="flex-1 text-emerald-600 font-medium cursor-pointer hover:underline"
                          >
                            {item.name}
                          </span>
                          <div className="flex items-center gap-6">
                            <span className="text-sm font-medium">{item.price}</span>
                            <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                              <MoreVertical size={18} className="text-gray-400" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : activeSubTab === 'Menus' ? (
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-bold">Menus</h1>
              <button className="bg-black text-white px-6 py-2.5 rounded-sm font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors">
                <Plus size={18} />
                New Menu
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {menus.map((menu) => (
                <div key={menu.id} className="bg-white border border-gray-200 rounded-sm p-6 shadow-sm relative group hover:border-emerald-500 transition-colors">
                  <div className="absolute top-4 right-4">
                    <button 
                      onClick={() => setOpenMenuId(openMenuId === menu.id ? null : menu.id)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <MoreVertical size={20} className="text-gray-400" />
                    </button>
                    
                    {openMenuId === menu.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-sm shadow-xl z-10 py-1">
                        <button 
                          onClick={() => duplicateMenu(menu)}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                        >
                          Duplicate
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2">
                          Edit Hours
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600">
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-emerald-600 mb-1 cursor-pointer hover:underline">{menu.name}</h3>
                  <p className="text-sm text-gray-500">{menu.name} Menu • {menu.hours}</p>
                </div>
              ))}
            </div>

            <div className="bg-white border border-gray-200 rounded-sm p-8 shadow-sm select-none" onMouseLeave={handleMouseUp}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Schedule Matrix</h2>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-100 border border-emerald-300 rounded-full"></div>
                    <span className="text-xs font-medium text-gray-500">Breakfast</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded-full"></div>
                    <span className="text-xs font-medium text-gray-500">Lunch</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-100 border border-orange-300 rounded-full"></div>
                    <span className="text-xs font-medium text-gray-500">Dinner</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-6 italic">Click and drag across the grid to assign menu hours. Click a cell multiple times to cycle through menus.</p>
              
              <div className="grid grid-cols-8 border-t border-l border-gray-200" onMouseUp={handleMouseUp}>
                <div className="p-4 border-r border-b border-gray-200 bg-gray-50 text-xs font-bold text-gray-400 uppercase">Time</div>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <div key={day} className="p-4 border-r border-b border-gray-200 bg-gray-50 text-xs font-bold text-gray-400 uppercase text-center">{day}</div>
                ))}
                
                {[...Array(24)].map((_, h) => (
                  <React.Fragment key={h}>
                    <div className="p-2 border-r border-b border-gray-200 text-[10px] font-bold text-gray-400 uppercase flex items-center justify-center bg-gray-50/30">
                      {h === 0 ? '12 AM' : h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h - 12} PM`}
                    </div>
                    {[...Array(7)].map((_, d) => {
                      const value = schedule[`${d}-${h}`];
                      return (
                        <div 
                          key={d} 
                          onMouseDown={() => handleMouseDown(d, h)}
                          onMouseEnter={() => handleMouseEnter(d, h)}
                          className={cn(
                            "border-r border-b border-gray-200 h-10 relative group cursor-pointer transition-all duration-150",
                            !value && "hover:bg-gray-50",
                            value === 'Breakfast' && "bg-emerald-50",
                            value === 'Lunch' && "bg-blue-50",
                            value === 'Dinner' && "bg-orange-50"
                          )}
                        >
                          {value && (
                            <div className={cn(
                              "absolute inset-0.5 border rounded-sm flex items-center justify-center overflow-hidden",
                              value === 'Breakfast' && "bg-emerald-100 border-emerald-300 text-emerald-800",
                              value === 'Lunch' && "bg-blue-100 border-blue-300 text-blue-800",
                              value === 'Dinner' && "bg-orange-100 border-orange-300 text-orange-800"
                            )}>
                              <span className="text-[8px] font-bold uppercase truncate px-1">{value}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        ) : activeSubTab === 'Categories' ? (
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-bold">Categories</h1>
              <button className="bg-black text-white px-6 py-2.5 rounded-sm font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors">
                <Plus size={18} />
                New Category
              </button>
            </div>

            <DndContext 
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext 
                items={categories.map(c => c.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-4">
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
        ) : activeSubTab === 'Items' ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">Items</h1>
              <button className="bg-black text-white px-6 py-2.5 rounded-sm font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors">
                <Plus size={18} />
                New Item
              </button>
            </div>

            {/* Filters */}
            <div className="flex gap-4 mb-8">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-sm text-sm focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <button className="flex items-center justify-between gap-2 px-4 py-2 bg-gray-100 rounded-sm text-sm font-medium min-w-[200px]">
                All
                <ChevronDown size={16} />
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-4 font-bold text-sm text-gray-800">Photo</th>
                    <th className="pb-4 font-bold text-sm text-gray-800 flex items-center gap-1 cursor-pointer">
                      <ChevronDown size={14} /> Name
                    </th>
                    <th className="pb-4 font-bold text-sm text-gray-800">Price</th>
                    <th className="pb-4 font-bold text-sm text-gray-800">Menus</th>
                    <th className="pb-4 font-bold text-sm text-gray-800">Categories</th>
                    <th className="pb-4 font-bold text-sm text-gray-800">Used In</th>
                    <th className="pb-4 font-bold text-sm text-gray-800">Contains</th>
                    <th className="pb-4 font-bold text-sm text-gray-800">Last Updated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {menuItems.map((item) => (
                    <tr key={item.id} className="group hover:bg-gray-50 transition-colors">
                      <td className="py-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-sm overflow-hidden flex items-center justify-center">
                          {item.image ? (
                            <img src={item.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          ) : (
                            <ImageIcon size={20} className="text-gray-300" />
                          )}
                        </div>
                      </td>
                      <td 
                        className="py-4"
                      >
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setItemStock(prev => ({ ...prev, [item.id]: !prev[item.id] }));
                            }}
                            className={cn(
                              "w-10 h-5 rounded-full relative transition-colors shrink-0",
                              itemStock[item.id] ? "bg-emerald-500" : "bg-gray-300"
                            )}
                            title={itemStock[item.id] ? "In Stock" : "Sold Out"}
                          >
                            <div className={cn(
                              "absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all",
                              itemStock[item.id] ? "left-5.5" : "left-0.5"
                            )}></div>
                          </button>
                          <span 
                            onClick={() => handleEditItem(item)}
                            className={cn(
                              "font-medium hover:underline cursor-pointer",
                              itemStock[item.id] ? "text-emerald-600" : "text-gray-400 line-through"
                            )}
                          >
                            {item.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 text-sm">{item.price}</td>
                      <td className="py-4 text-sm">{item.menus}</td>
                      <td className="py-4 text-sm">{item.categories}</td>
                      <td className="py-4 text-sm">{item.usedIn}</td>
                      <td className="py-4 text-sm">{item.contains}</td>
                      <td className="py-4 text-sm">{item.lastUpdated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : activeSubTab === 'Modifier Groups' ? (
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-bold">Modifier Groups</h1>
              <button className="bg-black text-white px-6 py-2.5 rounded-sm font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors">
                <Plus size={18} />
                New Group
              </button>
            </div>

            <div className="space-y-6">
              {modifierGroups.map((group) => (
                <div key={group.id} className="bg-white border border-gray-200 rounded-sm p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                    <div>
                      <h3 className="text-xl font-bold text-emerald-600">{group.name}</h3>
                      <p className="text-xs text-gray-400 mt-1 uppercase font-bold tracking-wider">
                        {group.min === 1 && group.max === 1 ? 'Radio Buttons (Single Choice)' : 'Checkboxes (Multiple Choice)'}
                      </p>
                    </div>
                    <div className="flex items-center gap-8">
                      <button 
                        onClick={() => setLinkingGroup(group)}
                        className="text-emerald-600 font-bold text-sm hover:underline"
                      >
                        Link to Items
                      </button>
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] font-bold text-gray-400 uppercase mb-2">Min</span>
                        <div className="flex items-center bg-gray-100 rounded-sm overflow-hidden">
                          <button onClick={() => updateModifierLimit(group.id, 'min', -1)} className="px-3 py-1 hover:bg-gray-200 transition-colors">-</button>
                          <span className="px-4 py-1 font-bold text-sm min-w-[40px] text-center">{group.min}</span>
                          <button onClick={() => updateModifierLimit(group.id, 'min', 1)} className="px-3 py-1 hover:bg-gray-200 transition-colors">+</button>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] font-bold text-gray-400 uppercase mb-2">Max</span>
                        <div className="flex items-center bg-gray-100 rounded-sm overflow-hidden">
                          <button onClick={() => updateModifierLimit(group.id, 'max', -1)} className="px-3 py-1 hover:bg-gray-200 transition-colors">-</button>
                          <span className="px-4 py-1 font-bold text-sm min-w-[40px] text-center">{group.max}</span>
                          <button onClick={() => updateModifierLimit(group.id, 'max', 1)} className="px-3 py-1 hover:bg-gray-200 transition-colors">+</button>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <MoreVertical size={20} className="text-gray-400" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {group.options.map((option, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-sm border border-transparent hover:border-gray-200 transition-colors">
                        <div className="flex items-center gap-4">
                          {group.min === 1 && group.max === 1 ? (
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
                              {i === 0 && <div className="w-2.5 h-2.5 bg-emerald-600 rounded-full"></div>}
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-sm border-2 border-gray-300 flex items-center justify-center">
                              {i % 2 === 0 && <div className="w-3 h-3 bg-emerald-600 rounded-sm"></div>}
                            </div>
                          )}
                          <span className="font-medium text-gray-700">{option.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-gray-400">+$</span>
                          <input 
                            type="text" 
                            defaultValue={option.price.toFixed(2)}
                            className="w-20 bg-white border border-gray-200 rounded-sm p-1 text-sm text-right focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>
                      </div>
                    ))}
                    <button className="flex items-center gap-2 text-emerald-600 text-sm font-bold hover:underline mt-4">
                      <Plus size={16} />
                      Add Option
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            {activeSubTab} screen coming soon.
          </div>
        )}
      </div>

      {/* Bulk Attachment Linker Modal */}
      {linkingGroup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-sm shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <div>
                <h2 className="text-xl font-bold">Link "{linkingGroup.name}"</h2>
                <p className="text-sm text-gray-500">Select items to attach this modifier group to.</p>
              </div>
              <button onClick={() => setLinkingGroup(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search items..." 
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-sm text-sm focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-2">
                {menuItems.map((item) => (
                  <label key={item.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-sm cursor-pointer border border-transparent hover:border-gray-100 transition-all group">
                    <div className="w-5 h-5 rounded-sm border-2 border-gray-300 flex items-center justify-center group-hover:border-emerald-500 transition-colors">
                      {parseInt(item.id) % 2 === 0 && <div className="w-3 h-3 bg-emerald-600 rounded-sm"></div>}
                    </div>
                    <div className="w-10 h-10 bg-gray-100 rounded-sm overflow-hidden shrink-0">
                      {item.image ? (
                        <img src={item.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <ImageIcon size={16} className="text-gray-300 m-auto mt-3" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm">{item.name}</p>
                      <p className="text-xs text-gray-400">{item.categories}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-4">
              <button 
                onClick={() => setLinkingGroup(null)}
                className="px-6 py-2 text-sm font-bold hover:underline"
              >
                Cancel
              </button>
              <button 
                onClick={() => setLinkingGroup(null)}
                className="px-8 py-2 bg-black text-white rounded-sm font-bold text-sm hover:bg-gray-800 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuMaker;
