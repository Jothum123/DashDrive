import { useState } from 'react';
import { ChevronDown, Plus, Minus, Upload } from 'lucide-react';

export function AddProduct() {
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Products Description Section */}
            <section className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-8">Products Description</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Product Name</label>
                            <input
                                type="text"
                                placeholder="Enter product name"
                                className="w-full bg-gray-50 border border-transparent focus:border-blue-100 focus:bg-white rounded-2xl py-3 px-4 text-sm outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Category</label>
                            <div className="relative group">
                                <select className="w-full bg-gray-50 border border-transparent focus:border-blue-100 focus:bg-white rounded-2xl py-3 px-4 text-sm outline-none appearance-none transition-all cursor-pointer">
                                    <option>Select Category</option>
                                    <option>Laptop</option>
                                    <option>Accessories</option>
                                    <option>Watch</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 size-4 pointer-events-none group-focus-within:text-blue-600 transition-colors" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Brand</label>
                            <div className="relative group">
                                <select className="w-full bg-gray-50 border border-transparent focus:border-blue-100 focus:bg-white rounded-2xl py-3 px-4 text-sm outline-none appearance-none transition-all cursor-pointer">
                                    <option>Select Brand</option>
                                    <option>ASUS</option>
                                    <option>Apple</option>
                                    <option>Samsung</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 size-4 pointer-events-none group-focus-within:text-blue-600 transition-colors" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Color</label>
                            <div className="relative group">
                                <select className="w-full bg-gray-50 border border-transparent focus:border-blue-100 focus:bg-white rounded-2xl py-3 px-4 text-sm outline-none appearance-none transition-all cursor-pointer">
                                    <option>Select color</option>
                                    <option>Space Gray</option>
                                    <option>Silver</option>
                                    <option>Gold</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 size-4 pointer-events-none group-focus-within:text-blue-600 transition-colors" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Weight (kg)</label>
                            <input
                                type="number"
                                defaultValue={15}
                                className="w-full bg-gray-50 border border-transparent focus:border-blue-100 focus:bg-white rounded-2xl py-3 px-4 text-sm outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Length (cm)</label>
                            <input
                                type="number"
                                defaultValue={120}
                                className="w-full bg-gray-50 border border-transparent focus:border-blue-100 focus:bg-white rounded-2xl py-3 px-4 text-sm outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Width (cm)</label>
                            <input
                                type="number"
                                defaultValue={23}
                                className="w-full bg-gray-50 border border-transparent focus:border-blue-100 focus:bg-white rounded-2xl py-3 px-4 text-sm outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2 mt-8">
                        <label className="text-sm font-bold text-gray-700">Description</label>
                        <textarea
                            rows={4}
                            placeholder="Receipt Info (optional)"
                            className="w-full bg-gray-50 border border-transparent focus:border-blue-100 focus:bg-white rounded-2xl py-3 px-4 text-sm outline-none transition-all resize-none"
                        />
                    </div>
                </div>
            </section>

            {/* Pricing & Availability Section */}
            <section className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-8">Pricing & Availability</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Weight (kg)</label>
                            <input type="number" defaultValue={15} className="w-full bg-gray-50 border border-transparent focus:border-blue-100 focus:bg-white rounded-2xl py-3 px-4 text-sm outline-none transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Length (cm)</label>
                            <input type="number" defaultValue={120} className="w-full bg-gray-50 border border-transparent focus:border-blue-100 focus:bg-white rounded-2xl py-3 px-4 text-sm outline-none transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Width (cm)</label>
                            <input type="number" defaultValue={23} className="w-full bg-gray-50 border border-transparent focus:border-blue-100 focus:bg-white rounded-2xl py-3 px-4 text-sm outline-none transition-all" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Stock Quantity</label>
                            <div className="flex items-center">
                                <button
                                    onClick={() => setQuantity(Math.max(0, quantity - 1))}
                                    className="bg-gray-50 border border-gray-100 p-3 rounded-l-2xl hover:bg-gray-100 text-gray-500 transition-colors"
                                >
                                    <Minus size={18} />
                                </button>
                                <div className="flex-1 bg-gray-50 border-y border-gray-100 py-3 px-4 text-center text-sm font-bold text-gray-800">
                                    {quantity}
                                </div>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="bg-gray-50 border border-gray-100 p-3 rounded-r-2xl hover:bg-gray-100 text-gray-500 transition-colors"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Availability Status</label>
                            <div className="relative group">
                                <select className="w-full bg-gray-50 border border-transparent focus:border-blue-100 focus:bg-white rounded-2xl py-3 px-4 text-sm outline-none appearance-none transition-all cursor-pointer">
                                    <option>Select Availability</option>
                                    <option>In Stock</option>
                                    <option>Out of Stock</option>
                                    <option>Pre-order</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 size-4 pointer-events-none group-focus-within:text-blue-600 transition-colors" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Images Section */}
            <section className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-8">Products Images</h2>

                    <div className="border-2 border-dashed border-blue-100 rounded-3xl p-12 flex flex-col items-center justify-center text-center group hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer">
                        <div className="size-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Upload size={32} />
                        </div>
                        <p className="text-gray-800 font-bold mb-2">Click to upload <span className="text-gray-400 font-medium">or drag and drop SVG,</span></p>
                        <p className="text-gray-400 text-sm font-medium">PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                </div>
            </section>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-4">
                <button className="px-8 py-3 bg-white border border-gray-200 text-gray-600 font-bold rounded-2xl hover:bg-gray-50 transition-all">
                    Draft
                </button>
                <button className="px-8 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                    Publish Product
                </button>
            </div>
        </div>
    );
}
