import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

// Create a single stable React Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000
    }
  }
});

export default function App() {
  const [selectedService, setSelectedService] = useState<string>('Web Development');

  const handleSelectService = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 flex flex-col font-sans transition-colors duration-200">
          {/* 1. Navbar */}
          <Navbar />

          <main className="flex-grow">
            {/* 2. Hero */}
            <Hero />

            {/* 3. Services */}
            <Services onSelectService={handleSelectService} />

            {/* 4. Projects */}
            <Projects />

            {/* 5. Skills */}
            <Skills />

            {/* 6. About */}
            <About />

            {/* 7. Contact */}
            <Contact selectedService={selectedService} />
          </main>

          {/* 8. Footer */}
          <Footer />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
