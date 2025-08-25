import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

export default function Index() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold tracking-tight">
              thirtythree
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
                Services
              </a>
              <a href="#work" className="text-muted-foreground hover:text-foreground transition-colors">
                Work
              </a>
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
            <Button variant="outline" className="hidden md:block">
              Book a Call
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/50 to-accent/5"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              Belgrade-based brand agency
            </Badge>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
              We build brands
              <br />
              <span className="text-muted-foreground">that grow</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              Strategic brand building, cutting-edge web development, and growth-driven ideas 
              that transform businesses into market leaders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6">
                Start Your Project
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                View Our Work
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl"></div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              What we do
            </h2>
            <p className="text-xl text-muted-foreground">
              Three core services that drive exceptional results
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-background/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-accent/20 rounded-2xl mb-6 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Brand Building</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Comprehensive brand strategy, visual identity, and positioning that resonates 
                  with your target audience and sets you apart from competition.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-background/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-accent/20 rounded-2xl mb-6 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Web Development</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Custom websites and digital experiences that combine stunning design 
                  with powerful functionality to drive conversions and engagement.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-background/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-accent/20 rounded-2xl mb-6 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Growth Strategy</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Data-driven growth strategies and innovative ideas that scale your business 
                  and maximize ROI across all marketing channels.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8">
                  Belgrade's creative 
                  <span className="text-muted-foreground"> powerhouse</span>
                </h2>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Founded in Belgrade, thirtythree represents the new wave of Serbian creativity. 
                  We combine local insight with global standards to create brands that compete 
                  on the world stage.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our team of strategists, designers, and developers work collaboratively 
                  to ensure every project exceeds expectations and drives real business results.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-accent/20 to-muted/50 rounded-3xl"></div>
                <div className="absolute inset-4 bg-background/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold mb-2">33</div>
                    <div className="text-muted-foreground">Projects Delivered</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Let's create something 
              <span className="text-muted-foreground">amazing</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Ready to transform your brand? Schedule a consultation and let's discuss your project.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="border-0 bg-background/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <Input placeholder="Your name" className="bg-background/50" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input type="email" placeholder="your@email.com" className="bg-background/50" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <Input placeholder="Your company" className="bg-background/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Details</label>
                    <Textarea 
                      placeholder="Tell us about your project..." 
                      className="bg-background/50 min-h-32"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full text-lg py-6">
                    Schedule a Meeting
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold mb-4 md:mb-0">
              thirtythree
            </div>
            <div className="flex items-center space-x-8">
              <span className="text-muted-foreground">Belgrade, Serbia</span>
              <span className="text-muted-foreground">hello@thirtythree.rs</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
