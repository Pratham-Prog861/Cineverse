import { Clapperboard } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 md:px-6">
      <div className="flex flex-col items-center text-center mb-12">
        <Clapperboard className="h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About CineVerse</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Welcome to CineVerse, your ultimate destination for an unparalleled movie streaming experience. Our mission is to bring the magic of cinema right to your fingertips, offering a vast library of films that you can enjoy anytime, anywhere.
        </p>
      </div>

      <div className="space-y-10">
        <div className="p-6 bg-card rounded-lg">
          <h2 className="text-3xl font-bold mb-3">Our Vision</h2>
          <p className="text-muted-foreground leading-relaxed">
            We believe that great stories deserve to be seen. CineVerse was created by movie lovers, for movie lovers. We aim to provide a seamless and visually stunning platform where you can discover new favorites, revisit timeless classics, and immerse yourself in the world of film without any hassle.
          </p>
        </div>
        <div className="p-6 bg-card rounded-lg">
          <h2 className="text-3xl font-bold mb-3">Features</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-3 leading-relaxed">
            <li>A beautiful, responsive grid layout to browse our extensive movie catalog.</li>
            <li>Powerful search and filtering options to help you find the perfect movie for any mood.</li>
            <li>Detailed movie pages with descriptions, cast information, and trailers.</li>
            <li>High-quality, smooth video streaming with a user-friendly player.</li>
            <li>AI-powered trailer summarization to give you a quick glimpse of the plot.</li>
            <li>A sleek dark theme designed to enhance your viewing experience.</li>
          </ul>
        </div>
        <div className="p-6 bg-card rounded-lg">
          <h2 className="text-3xl font-bold mb-3">The Future</h2>
          <p className="text-muted-foreground leading-relaxed">
            We are constantly working to improve CineVerse and expand our collection. Our team is dedicated to bringing you the latest features and the best possible streaming service. Thank you for being a part of our community!
          </p>
        </div>
      </div>
    </div>
  );
}
