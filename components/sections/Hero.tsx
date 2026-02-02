import React from "react";

export function Hero() {
  return (
    <section className="bg-secondary text-secondary-foreground py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          La Forge Digitale Solutions
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
          Votre artisan du numérique dans le Médoc. Nous forgeons des solutions web sur mesure et assurons le dépannage de votre matériel informatique.
        </p>
        <a
          href="#contact"
          className="bg-primary text-primary-foreground font-bold py-3 px-8 rounded-lg hover:bg-primary/90 transition-colors duration-300"
        >
          Demander un Devis
        </a>
      </div>
    </section>
  );
}
