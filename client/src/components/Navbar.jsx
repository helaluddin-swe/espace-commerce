import React, { useState, useEffect } from 'react';
import { 
    Menu, X, ShoppingCart, 
    LogOut, UserPlus, LogIn, ShieldCheck 
} from 'lucide-react';

import { useAppContext } from '../context/AppContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    // Added cartCount to the destructured context (ensure your context provides this)
    const { navigate, isLoggedIn, userData, logout } = useAppContext();
    const { cartCount = 0 } = useCart();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const isAdmin = userData?.role === 'admin';

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const onNavigate = (to) => {
        setOpen(false);
        window.scrollTo(0, 0);
        navigate(to);
    };

    return (
        <nav className={`fixed top-0 w-full z-9999 transition-all duration-300 ${
            scrolled ? "bg-indigo-800 shadow-lg py-2" : "bg-indigo-600 py-4"
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-12">
                    
                    {/* Logo Section */}
                    <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onNavigate('/')}>
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-black text-indigo-600 group-hover:scale-105 transition-transform">
                            D
                        </div>
                        <h1 className="text-white font-bold text-xl tracking-tight">
                            DevSpace <span className="text-pink-300">Studio</span>
                        </h1>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-6">
                        <button onClick={() => onNavigate('/')} className="text-white/90 hover:text-white font-medium text-sm">Home</button>
                        
                        {/* Shopping Cart Icon */}
                        <button 
                            onClick={() => onNavigate('/cart')} 
                            className="relative p-2 text-white/90 hover:text-white transition-colors"
                        >
                            <ShoppingCart size={22} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-4.5 flex items-center justify-center border-2 border-indigo-600">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {isLoggedIn ? (
                            <>
                                {isAdmin && (
                                    <button onClick={() => onNavigate('/admin-control-center')} className="bg-amber-400 text-amber-950 px-4 py-2 rounded-lg font-bold text-xs uppercase hover:bg-amber-300 transition-colors">
                                        Admin
                                    </button>
                                )}
                                <button onClick={() => onNavigate('/dashboard')} className="text-white/90 hover:text-white font-medium text-sm">Dashboard</button>
                                <button onClick={logout} className="text-pink-200 hover:text-white font-medium text-sm">Logout</button>
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white border border-white/30 font-bold">
                                    {userData?.name?.charAt(0).toUpperCase()}
                                </div>
                            </>
                        ) : (
                            <>
                                <button onClick={() => onNavigate('/login')} className="text-white font-medium text-sm hover:text-pink-200 transition-colors">Login</button>
                                <button onClick={() => onNavigate('/signup')} className="bg-white text-indigo-600 px-5 py-2 rounded-full font-bold text-sm hover:bg-indigo-50 transition-all shadow-md">
                                    Join Now
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile Controls */}
                    <div className="flex items-center gap-4 lg:hidden">
                        {/* Mobile Cart Icon */}
                        <button 
                            onClick={() => onNavigate('/cart')} 
                            className="relative p-2 text-white"
                        >
                            <ShoppingCart size={24} />
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-1 bg-pink-500 text-white text-[10px] font-bold px-1 py-0.5 rounded-full min-w-4.5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        
                        <button onClick={() => setOpen(!open)} className="text-white">
                            {open ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden overflow-hidden transition-all duration-300 bg-indigo-700 ${open ? "max-h-96 border-t border-white/10" : "max-h-0"}`}>
                <div className="px-4 py-6 space-y-4">
                    <button onClick={() => onNavigate('/')} className="block w-full text-left text-white font-medium py-2 px-2 border-b border-white/5">Home</button>
                    {isLoggedIn ? (
                        <>
                            <p className="text-white/60 text-xs uppercase font-bold px-2">Welcome, {userData?.name}</p>
                            <button onClick={() => onNavigate('/dashboard')} className="block w-full text-left text-white font-medium py-2 px-2">Dashboard</button>
                            {isAdmin && <button onClick={() => onNavigate('/admin-control-center')} className="block w-full text-left text-amber-300 font-medium py-2 px-2">Admin Panel</button>}
                            <button onClick={logout} className="block w-full text-left text-red-300 font-medium py-2 px-2">Logout</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => onNavigate('/login')} className="block w-full text-left text-white font-medium py-2 px-2">Login</button>
                            <button onClick={() => onNavigate('/signup')} className="block w-full text-center bg-white text-indigo-600 font-bold py-3 rounded-xl shadow-lg">Join Now</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;