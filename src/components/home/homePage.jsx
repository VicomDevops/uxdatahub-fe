import React, { useState } from 'react';
import { ArrowRight, Shield, CheckCircle } from 'lucide-react';
import { Header } from '../home/Header';
import { Hero } from '../home/Hero';
import { FeatureCard } from '../home/FeatureCard';
import { TestimonialCard } from '../home/TestimonialCard';
import { PricingCard } from '../home/PricingCard';
import { Footer } from '../home/Footer';
import { content } from '../home/content';

function HomePageForm() {
  const [language, setLanguage] = useState('fr');
  const currentContent = content[language];

  return (
    <div className="min-h-screen bg-white">
      <Header 
        content={currentContent} 
        language={language} 
        onLanguageChange={setLanguage} 
      />
      
      <Hero content={currentContent} />
      
      <section className="py-20 bg-white">
        <div className="w-full px-0">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {currentContent.speed.title}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              {currentContent.speed.description}
            </p>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-gray-50">
        <div className="w-full px-0">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {currentContent.features.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {currentContent.features.items.map((item, index) => (
              <FeatureCard
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="w-full px-0">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {currentContent.teamwork.title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {currentContent.teamwork.description}
              </p>
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-blue-900 mb-2">
                  {currentContent.teamwork.subtitle}
                </h3>
                <p className="text-blue-700">
                  {currentContent.teamwork.subdescription}
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Team collaboration"
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="w-full px-0">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {currentContent.audience.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {currentContent.audience.items.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <p className="text-gray-700">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="w-full px-0">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {currentContent.methodology.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {currentContent.methodology.items.map((item, index) => (
              <FeatureCard
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="w-full px-0">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {currentContent.insights.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {currentContent.insights.items.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p className="text-gray-700 text-lg">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 bg-white">
        <div className="w-full px-0">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {currentContent.pricing.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {currentContent.pricing.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {currentContent.pricing.plans.map((plan, index) => (
              <PricingCard
                key={index}
                name={plan.name}
                price={plan.price}
                period={plan.period}
                description={plan.description}
                features={plan.features}
                cta={plan.cta}
                popular={plan.popular}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900 text-white">
        <div className="w-full px-0">
          <div className="text-center mb-16">
            <Shield className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              {currentContent.security.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentContent.security.items.map((item, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-xl">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <p className="text-gray-200">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="w-full px-0">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {currentContent.testimonials.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {currentContent.testimonials.items.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="w-full px-0 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">
              {currentContent.summary.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {currentContent.summary.items.map((item, index) => (
                <div key={index} className="text-lg font-medium">
                  {item}
                </div>
              ))}
            </div>
            <p className="text-xl text-blue-100 mb-8">
              {currentContent.summary.cta}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-200 flex items-center justify-center space-x-2 font-semibold text-lg shadow-lg">
                <span>{currentContent.hero.cta1}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-200 flex items-center justify-center space-x-2 font-semibold text-lg">
                <span>{currentContent.hero.cta2}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer content={currentContent} />
    </div>
  );
}

export default HomePageForm;
