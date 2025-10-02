import React, { useState, useEffect } from 'react';
import { Scissors, Download } from 'lucide-react';
import Particles from '../components/Particles';
import { useLogin } from '../contexts/LoginContext';

const OnboardingPage = () => {
  const { setShowLoginModal, setShowRegisterModal } = useLogin();
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: any) => {
      event.preventDefault();
      setInstallPrompt(event);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (!installPrompt) {
      return;
    }
    installPrompt.prompt();
    installPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      setInstallPrompt(null);
    });
  };

  return (
    <section className='hero-section relative'>
      <Particles count={30} />
      <div className='bg-[#000000d2] w-full h-full flex items-start justify-center'>
        <div className='hero-content mt-16'>
          <div className="bg-white/10 backdrop-blur-sm p-12 px-24 rounded-4xl mb-4 flex items-center gap-3">
            <Scissors className="w-8 h-8 text-yellow-500" />
            <h1 className='font-pacifico text-2xl font-bold text-white'>Barbershop</h1>
          </div>
          <p className="text-gray-300 text-xl mb-14">Programează-te acum!</p>
          <div className="relative mb-14 flex justify-center">
            <img 
              src="https://cdn.pixabay.com/photo/2020/08/24/20/02/barber-5514959_1280.png" 
              alt="Barber Logo" 
              className="w-48 h-48 object-contain opacity-40 brightness-0 invert"
            />
          </div>
          <div className='flex flex-col sm:flex-row gap-4 justify-center mx-lg'>
            <button
              onClick={() => setShowLoginModal(true)}
              className='book-btn py-3 text-xl inline-block'
            >
              Autentificare
            </button>
            <button
              onClick={() => setShowRegisterModal(true)}
              className='rounded-4xl bg-white/10 backdrop-blur-sm px-8 py-3 text-xl font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-200'
            >
              Creează cont
            </button>
          </div>
          {installPrompt && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleInstallClick}
                className='flex items-center gap-2 rounded-4xl bg-yellow-500/80 backdrop-blur-sm px-6 py-3 text-lg font-semibold text-black shadow-lg hover:bg-yellow-500 transition-all duration-200'
              >
                <Download className="w-5 h-5" />
                Instalează Aplicația
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OnboardingPage;