import { Search, Download, Plus, Filter, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../utils/cn';

const products = [
    {
        id: 1,
        name: 'ASUS ROG Gaming Laptop',
        category: 'Laptop',
        brand: 'ASUS',
        price: '$2,199',
        stock: 'Out of Stock',
        createdAt: '01 Dec, 2027',
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=50&h=50&fit=crop'
    },
    {
        id: 2,
        name: 'Airpods Pro 2nd Gen',
        category: 'Accessories',
        brand: 'Apple',
        price: '$839',
        stock: 'In Stock',
        createdAt: '29 Jun, 2027',
        image: 'https://images.unsplash.com/photo-1588423770503-d1d6a97da552?w=50&h=50&fit=crop'
    },
    {
        id: 3,
        name: 'Apple Watch Ultra',
        category: 'Watch',
        brand: 'Apple',
        price: '$1,579',
        stock: 'Out of Stock',
        createdAt: '13 Mar, 2027',
        image: 'https://images.unsplash.com/photo-1434493907317-a46b59bc043a?w=50&h=50&fit=crop'
    }
];

interface InventoryProps {
    onAddProduct: () => void;
}

export function Inventory({ onAddProduct }: InventoryProps) {
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

    const toggleSelect = (id: number) => {
        setSelectedProducts(prev =>
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        );
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Products List</h2>
                        <p className="text-xs text-gray-400 mt-1">Track your store's progress to boost your sales.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-100 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                            Export <Download size={16} />
                        </button>
                        <button
                            onClick={onAddProduct}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-100"
                        >
                            <Plus size={18} /> Add Product
                        </button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="relative group flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4 group-focus-within:text-blue-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-gray-50 border border-transparent focus:border-blue-100 focus:bg-white rounded-xl py-2 pl-10 pr-4 text-sm w-full outline-none transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-100 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                            <Filter size={18} /> Filter
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left border-b border-gray-50">
                                <th className="pb-4 pt-2">
                                    <input type="checkbox" className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                </th>
                                <th className="pb-4 pt-2 text-xs font-semibold text-gray-400 uppercase tracking-tight">Products</th>
                                <th className="pb-4 pt-2 text-xs font-semibold text-gray-400 uppercase tracking-tight">Category</th>
                                <th className="pb-4 pt-2 text-xs font-semibold text-gray-400 uppercase tracking-tight">Brand</th>
                                <th className="pb-4 pt-2 text-xs font-semibold text-gray-400 uppercase tracking-tight">Price</th>
                                <th className="pb-4 pt-2 text-xs font-semibold text-gray-400 uppercase tracking-tight">Stock</th>
                                <th className="pb-4 pt-2 text-xs font-semibold text-gray-400 uppercase tracking-tight">Created At</th>
                                <th className="pb-4 pt-2 text-xs font-semibold text-gray-400 uppercase tracking-tight text-right pr-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {products.map((product) => (
                                <tr key={product.id} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 whitespace-nowrap">
                                        <input
                                            type="checkbox"
                                            checked={selectedProducts.includes(product.id)}
                                            onChange={() => toggleSelect(product.id)}
                                            className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                        />
                                    </td>
                                    <td className="py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-4">
                                            <img src={product.image} alt="" className="size-12 rounded-xl object-cover bg-gray-50" />
                                            <span className="text-sm font-bold text-gray-800">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 whitespace-nowrap text-sm text-gray-600">{product.category}</td>
                                    <td className="py-4 whitespace-nowrap text-sm text-gray-600">{product.brand}</td>
                                    <td className="py-4 whitespace-nowrap text-sm font-bold text-gray-800">{product.price}</td>
                                    <td className="py-4 whitespace-nowrap">
                                        <span className={cn(
                                            "px-3 py-1 rounded-full text-[10px] font-bold",
                                            product.stock === 'In Stock'
                                                ? "bg-emerald-50 text-emerald-600"
                                                : "bg-red-50 text-red-600"
                                        )}>
                                            {product.stock}
                                        </span>
                                    </td>
                                    <td className="py-4 whitespace-nowrap text-sm text-gray-500">{product.createdAt}</td>
                                    <td className="py-4 whitespace-nowrap text-right pr-4">
                                        <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-800 transition-colors">
                                            <MoreHorizontal size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
