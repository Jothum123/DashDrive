import React, { useState } from 'react';
import { 
  User, Phone, Mail, CheckCircle2, XCircle, 
  TrendingUp, Star, Download, FileText, 
  Search, Filter, ChevronRight, ArrowLeft,
  CreditCard, History, ShieldCheck, AlertCircle,
  Eye, MoreVertical
} from 'lucide-react';
import { cn } from '../utils';

interface CustomerDetailsProps {
  customerId: string;
  onBack: () => void;
}

export const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customerId, onBack }) => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [reviewTab, setReviewTab] = useState('Given');

  const customer = {
    id: customerId,
    name: 'Test User',
    phone: '+1 555-****-0202',
    email: 'test.user@example.com',
    avatar: `https://picsum.photos/seed/${customerId}/200/200`,
    stats: {
      digitalPayment: 22.22,
      successRate: 77.78,
      reviewGiven: 44.44,
      cancellationRate: 16.67,
      completedTrips: 14,
      cancelTrips: 3,
      lowestPrice: 12.50,
      highestPrice: 85.00
    },
    documents: [
      { name: 'Identity_Verification.jpg', type: 'JPG', size: '1.2 MB' },
      { name: 'Address_Proof.png', type: 'PNG', size: '2.4 MB' }
    ]
  };

  const trips = [
    { id: 'TRP-9021', date: '2024-02-20 14:30', driver: 'Alex Rivera', type: 'Ride Request', cost: 25.00, discount: 5.00, status: 'Completed', payment: 'Paid' },
    { id: 'TRP-9022', date: '2024-02-19 09:15', driver: 'Sarah Chen', type: 'Ride Request', cost: 18.50, discount: 0.00, status: 'Completed', payment: 'Paid' },
    { id: 'TRP-9023', date: '2024-02-18 18:45', driver: 'Marco Rossi', type: 'Ride Request', cost: 42.00, discount: 10.00, status: 'Cancelled', payment: 'Unpaid' },
  ];

  const transactions = [
    { id: 'TXN-8821-4421', type: 'Wallet balance', to: 'Customer', debit: 0, credit: 50.00, balance: 125.50 },
    { id: 'TXN-8821-4422', type: 'Trip Payment', to: 'System', debit: 25.00, credit: 0, balance: 100.50 },
  ];

  const reviews = [
    { id: 'TRP-9021', reviewer: 'Alex Rivera', rating: 5, comment: 'Very polite customer, arrived on time.', date: '2024-02-20' },
    { id: 'TRP-9022', reviewer: 'Sarah Chen', rating: 4, comment: 'Good trip, but had some trouble finding the pickup point.', date: '2024-02-19' },
  ];

  const handleExportTrips = () => {
    const headers = ['Trip ID', 'Date', 'Driver', 'Type', 'Cost', 'Status'];
    const csvContent = [
      headers.join(','),
      ...trips.map(trip => [
        trip.id,
        trip.date,
        trip.driver,
        trip.type,
        trip.cost,
        trip.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `customer_${customerId}_trips.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportTransactions = () => {
    const headers = ['Transaction ID', 'Type', 'To', 'Debit', 'Credit', 'Balance'];
    const csvContent = [
      headers.join(','),
      ...transactions.map(txn => [
        txn.id,
        txn.type,
        txn.to,
        txn.debit,
        txn.credit,
        txn.balance
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `customer_${customerId}_transactions.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-500"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-slate-800">Customer Details</h2>
          <p className="text-sm text-slate-500">Monitor activity, behavior, and history</p>
        </div>
      </div>

      {/* Top Section: Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Info Card */}
        <div className="bg-white p-6 rounded-[24px] shadow-soft border border-slate-100 flex items-center gap-6">
          <div className="w-24 h-24 rounded-full border-4 border-slate-50 overflow-hidden shadow-inner">
            <img src={customer.avatar} alt={customer.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-slate-800">{customer.name}</h3>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-slate-500">
                <Phone className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">{customer.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Mail className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">{customer.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rate Info Card */}
        <div className="bg-white p-6 rounded-[24px] shadow-soft border border-slate-100 space-y-4">
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {[
              { label: 'Total Digital Payment', value: customer.stats.digitalPayment, color: 'bg-primary' },
              { label: 'Success Rate', value: customer.stats.successRate, color: 'bg-emerald-500' },
              { label: 'Total Review Given', value: customer.stats.reviewGiven, color: 'bg-blue-500' },
              { label: 'Cancellation Rate', value: customer.stats.cancellationRate, color: 'bg-red-500' },
            ].map((stat) => (
              <div key={stat.label} className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
                  <span className="text-[10px] font-bold text-slate-800">{stat.value}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full rounded-full", stat.color)} 
                    style={{ width: `${stat.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-slate-100">
        {['Overview', 'Trips', 'Transaction', 'Review'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-8 py-4 text-sm font-bold transition-all relative",
              activeTab === tab 
                ? "text-primary" 
                : "text-slate-400 hover:text-slate-600"
            )}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 min-h-0">
        {activeTab === 'Overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-[24px] shadow-soft border border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Customer Details</h3>
                  <div className="flex bg-slate-50 rounded-lg p-1">
                    {['Trip', 'Duty & Review', 'Wallet'].map(s => (
                      <button key={s} className="px-3 py-1 text-[10px] font-bold rounded-md hover:bg-white hover:shadow-sm transition-all text-slate-500 hover:text-slate-800">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { label: 'Completed Trips', value: customer.stats.completedTrips, icon: <CheckCircle2 className="text-emerald-500" /> },
                    { label: 'Cancel Trips', value: customer.stats.cancelTrips, icon: <XCircle className="text-red-500" /> },
                    { label: 'Lowest Price', value: `$${customer.stats.lowestPrice}`, icon: <TrendingUp className="text-blue-500 rotate-180" /> },
                    { label: 'Highest Price', value: `$${customer.stats.highestPrice}`, icon: <TrendingUp className="text-primary" /> },
                  ].map((item) => (
                    <div key={item.label} className="space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                        {React.cloneElement(item.icon as React.ReactElement, { className: "w-5 h-5" })}
                      </div>
                      <div>
                        <p className="text-lg font-bold text-slate-800">{item.value}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{item.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[24px] shadow-soft border border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6">Attached Documents</h3>
              <div className="space-y-4">
                {customer.documents.map((doc) => (
                  <div key={doc.name} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-slate-200">
                        <FileText className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 truncate max-w-[120px]">{doc.name}</p>
                        <p className="text-[10px] text-slate-400">{doc.size}</p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-primary">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Trips' && (
          <div className="bg-white rounded-[24px] shadow-soft border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="Search by Trip ID..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border-transparent rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all" />
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleExportTrips}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all"
                >
                  <Download className="w-4 h-4" /> Export
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary/90 transition-all shadow-sm">
                  <Filter className="w-4 h-4" /> Filter
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Trip ID</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Driver</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Trip Type</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cost</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {trips.map((trip) => (
                    <tr key={trip.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <span className="text-xs font-bold text-slate-800">{trip.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-slate-500">{trip.date}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-slate-100 overflow-hidden">
                            <img src={`https://picsum.photos/seed/${trip.driver}/50/50`} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <span className="text-xs font-medium text-slate-700">{trip.driver}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-bold px-2 py-1 bg-blue-50 text-blue-600 rounded-lg uppercase">{trip.type}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-bold text-slate-800">${trip.cost.toFixed(2)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "text-[10px] font-bold px-2 py-1 rounded-lg uppercase",
                          trip.status === 'Completed' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                        )}>
                          {trip.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 hover:bg-primary/10 rounded-lg transition-all text-slate-400 hover:text-primary">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Transaction' && (
          <div className="bg-white rounded-[24px] shadow-soft border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="Search by Transaction ID..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border-transparent rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all" />
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleExportTransactions}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all"
                >
                  <Download className="w-4 h-4" /> Export
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Transaction ID</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Account Type</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Debit</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Credit</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {transactions.map((txn) => (
                    <tr key={txn.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-xs font-mono text-slate-500">{txn.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-medium text-slate-700">{txn.type}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-bold text-red-500">{txn.debit > 0 ? `-$${txn.debit.toFixed(2)}` : '-'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-bold text-emerald-500">{txn.credit > 0 ? `+$${txn.credit.toFixed(2)}` : '-'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-bold text-slate-800">${txn.balance.toFixed(2)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Review' && (
          <div className="space-y-6">
            <div className="flex bg-white rounded-xl shadow-sm border border-slate-100 p-1 w-fit">
              <button 
                onClick={() => setReviewTab('Given')}
                className={cn(
                  "px-6 py-2 text-xs font-bold rounded-lg transition-all",
                  reviewTab === 'Given' ? "bg-primary/10 text-primary" : "text-slate-500 hover:bg-slate-50"
                )}
              >
                Review Given To Driver
              </button>
              <button 
                onClick={() => setReviewTab('From')}
                className={cn(
                  "px-6 py-2 text-xs font-bold rounded-lg transition-all",
                  reviewTab === 'From' ? "bg-primary/10 text-primary" : "text-slate-500 hover:bg-slate-50"
                )}
              >
                Review From Driver
              </button>
            </div>

            <div className="bg-white rounded-[24px] shadow-soft border border-slate-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Trip ID</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Reviewer</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Rating</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Comment</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {reviews.map((review) => (
                      <tr key={review.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="text-xs font-bold text-slate-800">{review.id}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-medium text-slate-700">{review.reviewer}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={cn("w-3 h-3", i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200")} />
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-xs text-slate-500 italic">"{review.comment}"</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs text-slate-400">{review.date}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
