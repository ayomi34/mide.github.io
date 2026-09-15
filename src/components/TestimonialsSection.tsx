import React, { useEffect, useState } from 'react';
import { Quote, Star, MessageSquareQuote } from 'lucide-react';
import { ThemeColor } from '../types/portfolio';
import { testimonialsList } from '../data/portfolioData';
import { fetchPublishedContent } from '../lib/supabase';

interface TestimonialsSectionProps {
  activeTheme: ThemeColor;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ activeTheme: _activeTheme }) => {
  const [content, setContent] = useState({
    heading: 'What clients in Nigeria say',
    description: 'Feedback from people and teams I have helped turn ideas into useful digital products.',
    region: 'Nigeria',
    items: testimonialsList,
  });

  useEffect(() => {
    void fetchPublishedContent().then((entries) => {
      const entry = entries.find((item) => item.key === 'testimonials');
      if (!entry) return;
      const value = entry.value;
      const items = Array.isArray(value.items) ? value.items : [];
      setContent((current) => ({
        heading: typeof value.heading === 'string' ? value.heading : current.heading,
        description: typeof value.description === 'string' ? value.description : current.description,
        region: typeof value.region === 'string' ? value.region : current.region,
        items: items as typeof testimonialsList,
      }));
    }).catch(() => undefined);
  }, []);

  return (
    <section id="testimonials" className="py-20 md:py-28 relative border-t border-slate-300 bg-slate-100 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-indigo-600">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>CLIENT FEEDBACK · {content.region.toUpperCase()}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            {content.heading}
          </h2>
          <p className="text-slate-600 max-w-2xl text-base sm:text-lg">
            {content.description}
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {content.items.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-7 rounded-3xl bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:shadow-lg hover:shadow-slate-200/70 transition-all duration-300 flex flex-col justify-between space-y-6 relative group"
            >
              <div className="space-y-4">
                {/* Top Quote Icon & Rating */}
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                    <Quote className="w-4 h-4" />
                  </div>
                  <div className="flex items-center space-x-1 text-amber-400">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Content Quote */}
                <p className="text-sm text-slate-600 leading-relaxed italic">
                  "{item.content}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-200 flex items-center space-x-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {item.role}, <span className="text-slate-600 font-medium">{item.company}</span>
                  </p>
                  <p className="text-[10px] text-indigo-400/80 font-mono mt-0.5">
                    {item.relationship || content.region}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
