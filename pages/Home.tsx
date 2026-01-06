
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, ShieldCheck, Clock } from 'lucide-react';
import Logo from '../components/Logo';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full text-center space-y-8">
        <div className="animate-fade-in mb-4">
          <Logo size="lg" />
        </div>
        
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Cheap, Fast & Reliable <br />
            <span className="text-blue-600">Data Solutions</span> for You.
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Stay connected with the most affordable data plans in Nigeria. 
            Choose your network and top up instantly or save more with our manual processing.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <button
            onClick={() => navigate('/buy')}
            className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-xl font-bold shadow-xl transition-all hover:scale-105 active:scale-95"
          >
            Get Started
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-slate-200">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2">
              <Zap size={24} />
            </div>
            <h3 className="font-bold text-slate-800">Instant Delivery</h3>
            <p className="text-sm text-slate-500">Automatic methods process your request in seconds.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-bold text-slate-800">Secure Payments</h3>
            <p className="text-sm text-slate-500">Your transactions are safe with Flutterwave encryption.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2">
              <Clock size={24} />
            </div>
            <h3 className="font-bold text-slate-800">Cheap Rates</h3>
            <p className="text-sm text-slate-500">Get the best prices on the market, manual or auto.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
