import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Navigation */}
          <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold tracking-tight">
                  thirtythree
                </Link>
                <Button variant="outline" asChild>
                  <Link to="/">Back Home</Link>
                </Button>
              </div>
            </div>
          </nav>

          {/* 404 Content */}
          <div className="pt-24">
            <div className="text-8xl md:text-9xl font-bold text-muted-foreground/20 mb-8">
              404
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Page not found
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              The page you're looking for doesn't exist. But don't worry, 
              there's plenty more to explore on our site.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-6">
                <Link to="/">Back to Home</Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-lg px-8 py-6">
                <Link to="/#contact">Contact Us</Link>
              </Button>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl"></div>
        </div>
      </div>
    </div>
  );
}
