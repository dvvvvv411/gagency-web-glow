import { AnimatedSection } from "@/components/ui/animated-section";
import BlueWaveMesh from "@/components/graphics/BlueWaveMesh";
import IsometricCubes from "@/components/graphics/IsometricCubes";

const LandingGallery = () => {
  return (
    <AnimatedSection className="py-16 bg-gradient-to-b from-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Innovative Technologie trifft Design
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Erleben Sie die perfekte Symbiose aus modernster Technik und ästhetischem Design
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Wave Mesh Visualization */}
          <div className="space-y-4">
            <BlueWaveMesh />
            <div className="text-center">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Dynamische Datenströme
              </h3>
              <p className="text-muted-foreground">
                Visualisierung komplexer Datenflüsse und intelligente Algorithmen in Echtzeit
              </p>
            </div>
          </div>

          {/* Isometric Cubes */}
          <div className="space-y-4">
            <IsometricCubes />
            <div className="text-center">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Modulare Architektur
              </h3>
              <p className="text-muted-foreground">
                Flexible Systemkomponenten für maximale Skalierbarkeit und Performance
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default LandingGallery;