
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowLeft, Phone, CreditCard, ChevronRight, Zap, Clock } from 'lucide-react';
import { Network, Method, DataPlan, Order } from '../types';
import { PLANS, COLORS, NETWORK_LOGOS } from '../constants';
import Logo from '../components/Logo';

const SelectionFlow: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [network, setNetwork] = useState<Network | null>(null);
  const [method, setMethod] = useState<Method | null>(null);
  const [plan, setPlan] = useState<DataPlan | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleNetworkSelect = (n: Network) => {
    setNetwork(n);
    setStep(2);
  };

  const handleMethodSelect = (m: Method) => {
    // Check availability
    if (m === 'MANUAL' && (network === 'AIRTEL' || network === 'GLO')) {
      alert("Manual method is currently only available for MTN. Please select Automatic.");
      return;
    }
    setMethod(m);
    setStep(3);
  };

  const handlePlanSelect = (p: DataPlan) => {
    setPlan(p);
    setStep(4);
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      alert("Please enter a valid phone number");
      return;
    }

    setIsProcessing(true);
    // Simulate Flutterwave Checkout
    console.log("Triggering Flutterwave checkout for:", plan?.price);
    
    // Save to orders (mock)
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      network: network!,
      method: method!,
      plan: plan!.label,
      price: plan!.price,
      phoneNumber,
      status: 'PENDING',
      createdAt: Date.now()
    };

    const existingOrders = JSON.parse(localStorage.getItem('sy_data_orders') || '[]');
    localStorage.setItem('sy_data_orders', JSON.stringify([...existingOrders, newOrder]));

    // Navigate to status page after simulated delay
    setTimeout(() => {
      navigate('/status');
    }, 1500);
  };

  return (
    <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <button onClick={() => step > 1 ? setStep(step - 1) : navigate('/')} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-slate-600" />
        </button>
        <Logo size="sm" />
        <div className="w-10"></div> {/* Spacer */}
      </div>

      {/* Progress Bar */}
      <div className="flex justify-between mb-12 px-4">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="relative flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
              step >= s ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 text-slate-400 bg-white'
            }`}>
              {step > s ? <Check size={20} /> : s}
            </div>
            <div className="absolute -bottom-6 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center w-20">
              {s === 1 && 'Network'}
              {s === 2 && 'Method'}
              {s === 3 && 'Plan'}
              {s === 4 && 'Checkout'}
            </div>
          </div>
        ))}
        <div className="absolute top-[138px] left-1/2 -translate-x-1/2 w-[calc(100%-100px)] max-w-[500px] h-[2px] bg-slate-200 -z-10" />
      </div>

      <div className="mt-16 bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 relative">
        
        {/* Step 1: Network Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-slate-800">Select Your Network</h2>
              <p className="text-slate-500">Choose the provider you want to top up</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {(['MTN', 'AIRTEL', 'GLO'] as Network[]).map((n) => (
                <button
                  key={n}
                  onClick={() => handleNetworkSelect(n)}
                  className={`flex items-center gap-5 p-5 rounded-2xl border-2 transition-all group bg-white hover:border-blue-500 hover:shadow-md hover:scale-[1.01] active:scale-[0.98] border-slate-100`}
                >
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center p-2 border border-slate-50 bg-slate-50/30 shadow-inner`}>
                    <img 
                      src={NETWORK_LOGOS[n]} 
                      alt={`${n} Logo`} 
                      className="max-w-full max-h-full object-contain grayscale-[0.2] group-hover:grayscale-0 transition-all" 
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-xl font-bold text-slate-800">{n}</span>
                    <p className="text-xs text-slate-400">Stable connection & fast delivery</p>
                  </div>
                  <ChevronRight className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Selected Network Badge for Steps 2-4 */}
        {step > 1 && network && (
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
             <div className="bg-white p-2 rounded-2xl shadow-lg border border-slate-100 w-16 h-16 flex items-center justify-center">
                <img src={NETWORK_LOGOS[network]} alt={network} className="max-w-full max-h-full object-contain" />
             </div>
          </div>
        )}

        {/* Step 2: Method Selection */}
        {step === 2 && (
          <div className="space-y-6 pt-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-slate-800">Manual or Auto?</h2>
              <p className="text-slate-500">Pick how you want to process this order</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => handleMethodSelect('MANUAL')}
                className={`p-6 rounded-2xl border-2 text-left space-y-4 transition-all hover:border-blue-500 hover:bg-blue-50/30 group ${
                  method === 'MANUAL' ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200'
                }`}
              >
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">Manual</h3>
                  <p className="text-xs text-slate-500">Cheapest price with a little wait (5mins max)</p>
                </div>
              </button>

              <button
                onClick={() => handleMethodSelect('AUTO')}
                className={`p-6 rounded-2xl border-2 text-left space-y-4 transition-all hover:border-blue-500 hover:bg-blue-50/30 group ${
                  method === 'AUTO' ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200'
                }`}
              >
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                  <Zap size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">Automatic</h3>
                  <p className="text-xs text-slate-500">Cheap price and instant delivery (Seconds)</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Plan Selection */}
        {step === 3 && network && method && (
          <div className="space-y-6 pt-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-slate-800">Pick a Data Plan</h2>
              <p className="text-slate-500">Processing <span className="font-bold text-blue-600">{network} ({method})</span></p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {PLANS[network][method].map((p) => (
                <button
                  key={p.id}
                  onClick={() => handlePlanSelect(p)}
                  className={`p-4 rounded-xl border-2 text-center transition-all hover:border-blue-600 ${
                    plan?.id === p.id ? 'border-blue-600 bg-blue-50' : 'border-slate-100 bg-slate-50'
                  }`}
                >
                  <div className="text-lg font-bold text-slate-800">{p.label}</div>
                  <div className="text-blue-600 font-extrabold text-xl">₦{p.price}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Checkout */}
        {step === 4 && plan && (
          <div className="space-y-6 pt-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-slate-800">Final Checkout</h2>
              <p className="text-slate-500">You are buying <span className="font-bold">{network} {plan.label}</span> for <span className="font-bold">₦{plan.price}</span></p>
            </div>
            
            <form onSubmit={handlePayment} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <Phone size={16} /> Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 08123456789"
                  className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-xl tracking-widest font-mono"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-dashed border-slate-300">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Method:</span>
                  <span className="font-bold">{method}</span>
                </div>
                <div className="flex justify-between items-center text-slate-800 text-lg border-t border-slate-200 mt-2 pt-2 font-bold">
                  <span>Total Payable:</span>
                  <span className="text-blue-600">₦{plan.price}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white p-5 rounded-2xl text-xl font-bold shadow-lg shadow-blue-200 transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-50"
              >
                <CreditCard size={24} />
                Pay Now
              </button>
            </form>
          </div>
        )}

      </div>

      <p className="text-center mt-8 text-slate-400 text-sm">
        Secured by Flutterwave | Powered by SY DATA
      </p>
    </div>
  );
};

export default SelectionFlow;
