'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { TextReveal } from '@/components/animations/text-reveal';
import { Parallax } from '@/components/animations/parallax';
import { Magnetic } from '@/components/animations/magnetic';
import { ScrollProgress } from '@/components/animations/scroll-progress';
import { useScrollTo } from '@/components/smooth-scroll-provider';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const { scrollTo } = useScrollTo();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Hero animations
    if (heroRef.current) {
      const tl = gsap.timeline({ delay: 0.5 });
      
      tl.from('.hero-bg-elements > *', {
        scale: 0,
        rotation: 180,
        duration: 2,
        stagger: 0.2,
        ease: 'elastic.out(1, 0.3)'
      });
    }

    // Services cards animation
    if (servicesRef.current) {
      gsap.fromTo('.service-card', {
        y: 100,
        opacity: 0,
        scale: 0.8
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: servicesRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // Horizontal scroll section
    const horizontalSection = document.querySelector('.horizontal-scroll');
    if (horizontalSection) {
      const items = horizontalSection.querySelectorAll('.horizontal-item');
      const totalWidth = (items.length - 1) * 100;

      gsap.to(items, {
        xPercent: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: horizontalSection,
          pin: true,
          scrub: 1,
          snap: 1 / (items.length - 1),
          end: () => '+=' + horizontalSection.offsetWidth
        }
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <ScrollProgress />
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-border glass' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Magnetic>
              <div className="text-2xl font-bold tracking-tight cursor-pointer">
                thirtythree
              </div>
            </Magnetic>
            <div className="hidden md:flex items-center space-x-8">
              {['Services', 'Work', 'About', 'Contact'].map((item, i) => (
                <Magnetic key={item}>
                  <button 
                    onClick={() => scrollTo(`#${item.toLowerCase()}`, { offset: -100 })}
                    className="text-muted-foreground hover:text-foreground transition-colors animated-underline"
                  >
                    {item}
                  </button>
                </Magnetic>
              ))}
            </div>
            <Magnetic>
              <Button variant="outline" className="hidden md:block glow">
                Book a Call
              </Button>
            </Magnetic>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center">
        <div className="hero-bg-elements absolute inset-0 overflow-hidden">
          <Parallax speed={0.3} direction="up">
            <div className="absolute top-20 left-10 w-32 h-32 bg-accent/20 rounded-full blur-xl"></div>
          </Parallax>
          <Parallax speed={0.5} direction="down">
            <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/10 rounded-full blur-2xl"></div>
          </Parallax>
          <Parallax speed={0.2} direction="left">
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/10 rotate-45 blur-lg"></div>
          </Parallax>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 glass">
              Belgrade-based brand agency
            </Badge>
            
            <TextReveal className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 hero-gradient">
              We build brands
              <br />
              <span className="text-muted-foreground">that grow</span>
            </TextReveal>
            
            <TextReveal delay={0.5} className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              Strategic brand building, cutting-edge web development, and growth-driven ideas 
              that transform businesses into market leaders.
            </TextReveal>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Magnetic>
                <Button size="lg" className="text-lg px-8 py-6 glow">
                  Start Your Project
                </Button>
              </Magnetic>
              <Magnetic>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 glass">
                  View Our Work
                </Button>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" ref={servicesRef} className="py-32 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <TextReveal className="text-4xl md:text-6xl font-bold mb-6">
              What we do
            </TextReveal>
            <TextReveal delay={0.3} className="text-xl text-muted-foreground">
              Three core services that drive exceptional results
            </TextReveal>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Brand Building',
                description: 'Comprehensive brand strategy, visual identity, and positioning that resonates with your target audience and sets you apart from competition.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'Web Development',
                description: 'Custom websites and digital experiences that combine stunning design with powerful functionality to drive conversions and engagement.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: 'Growth Strategy',
                description: 'Data-driven growth strategies and innovative ideas that scale your business and maximize ROI across all marketing channels.'
              }
            ].map((service, index) => (
              <Magnetic key={service.title}>
                <Card className="service-card group hover:shadow-xl transition-all duration-500 border-0 glass hover:glow">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-accent/20 rounded-2xl mb-6 flex items-center justify-center group-hover:bg-accent/30 transition-colors group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </Magnetic>
            ))}
          </div>
        </div>
      </section>

      {/* Horizontal Scroll Section */}
      <section className="horizontal-scroll py-32 bg-background">
        <div className="flex h-screen">
          {['Brand Identity', 'Digital Strategy', 'Web Experiences', 'Growth Marketing'].map((item, index) => (
            <div key={item} className="horizontal-item flex-shrink-0 w-screen h-full flex items-center justify-center">
              <Parallax speed={0.1 * (index + 1)} direction="up">
                <div className="max-w-2xl mx-auto text-center px-6">
                  <h3 className="text-6xl md:text-8xl font-bold mb-8 hero-gradient">
                    {String(index + 1).padStart(2, '0')}
                  </h3>
                  <h4 className="text-3xl md:text-4xl font-bold mb-6">{item}</h4>
                  <p className="text-xl text-muted-foreground">
                    {index === 0 && 'Creating memorable visual identities that tell your brand story and connect with your audience on an emotional level.'}
                    {index === 1 && 'Comprehensive digital strategies that align with your business goals and drive measurable results across all channels.'}
                    {index === 2 && 'Award-winning web experiences that combine beautiful design with cutting-edge technology and seamless user experience.'}
                    {index === 3 && 'Data-driven growth marketing that scales your business through innovative campaigns and optimization strategies.'}
                  </p>
                </div>
              </Parallax>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <TextReveal className="text-4xl md:text-5xl font-bold mb-8">
                  Belgrade's creative 
                  <span className="text-muted-foreground"> powerhouse</span>
                </TextReveal>
                <TextReveal delay={0.3} className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Founded in Belgrade, thirtythree represents the new wave of Serbian creativity. 
                  We combine local insight with global standards to create brands that compete 
                  on the world stage.
                </TextReveal>
                <TextReveal delay={0.5} className="text-lg text-muted-foreground leading-relaxed">
                  Our team of strategists, designers, and developers work collaboratively 
                  to ensure every project exceeds expectations and drives real business results.
                </TextReveal>
              </div>
              <div className="relative">
                <Parallax speed={0.3} direction="up">
                  <div className="aspect-square bg-gradient-to-br from-accent/20 to-muted/50 rounded-3xl glass"></div>
                </Parallax>
                <div className="absolute inset-4 bg-background/80 backdrop-blur-sm rounded-2xl flex items-center justify-center glass">
                  <div className="text-center">
                    <div className="text-6xl font-bold mb-2 hero-gradient">33</div>
                    <div className="text-muted-foreground">Projects Delivered</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <TextReveal className="text-4xl md:text-6xl font-bold mb-6">
              Let's create something 
              <span className="text-muted-foreground">amazing</span>
            </TextReveal>
            <TextReveal delay={0.3} className="text-xl text-muted-foreground">
              Ready to transform your brand? Schedule a consultation and let's discuss your project.
            </TextReveal>
          </div>

          <div className="max-w-2xl mx-auto">
            <Magnetic>
              <Card className="border-0 glass glow">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Name</label>
                        <Input placeholder="Your name" className="glass" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <Input type="email" placeholder="your@email.com" className="glass" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Company</label>
                      <Input placeholder="Your company" className="glass" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Project Details</label>
                      <Textarea 
                        placeholder="Tell us about your project..." 
                        className="glass min-h-32"
                      />
                    </div>
                    <Magnetic>
                      <Button type="submit" size="lg" className="w-full text-lg py-6 glow">
                        Schedule a Meeting
                      </Button>
                    </Magnetic>
                  </form>
                </CardContent>
              </Card>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-border bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Magnetic>
              <div className="text-2xl font-bold mb-4 md:mb-0">
                thirtythree
              </div>
            </Magnetic>
            <div className="flex items-center space-x-8">
              <span className="text-muted-foreground">Belgrade, Serbia</span>
              <a href="mailto:hello@thirtythree.rs" className="text-muted-foreground hover:text-foreground transition-colors animated-underline">
                hello@thirtythree.rs
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
