import React, { useState, useEffect } from "react";

interface ProjectCarouselProps {
  dossierImg: string; // ex: "portfolio", "project-manager", etc.
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ dossierImg }) => {
  const [images, setImages] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // Recherche dynamique : charge toutes les images consécutives (1.jpg, 2.png, ...)
    // Utilise le BASE_URL pour supporter les sous-dossiers (Astro, Vite...)
    const exts = ["jpg", "jpeg", "png", "webp", "gif"];
    let isMounted = true;
    const tryLoadImages = async () => {
      const found: string[] = [];
      let index = 1;
      while (index < 100) { // Limite de sécurité à 99 images
        let foundForThisIndex = false;
        for (const ext of exts) {
          // Ajoute le BASE_URL si défini (Astro, Vite...)
          const base = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) ? import.meta.env.BASE_URL : '/';
          const path = `${base}projects/${dossierImg}/${index}.${ext}`;
          // Teste si l'image existe réellement
          // eslint-disable-next-line no-loop-func
          await new Promise((resolve) => {
            const img = new window.Image();
            img.src = path;
            img.onload = () => {
              if (!found.includes(path)) found.push(path);
              foundForThisIndex = true;
              resolve(true);
            };
            img.onerror = () => resolve(false);
          });
          if (foundForThisIndex) break; // On ne prend qu'une image par index
        }
        if (!foundForThisIndex) break; // On arrête dès qu'on ne trouve plus d'image pour un index
        index++;
      }
      if (isMounted) setImages(found);
    };
    setImages([]);
    setCurrent(0);
    tryLoadImages();
    return () => {
      isMounted = false;
      setImages([]);
      setCurrent(0);
    };
  }, [dossierImg]);

  if (images.length === 0) return <div className="text-xs text-gray-400 italic">Aucune image trouvée.</div>;

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full max-w-md h-64 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={images[current]}
          alt={`Projet ${dossierImg} image ${current + 1}`}
          className="object-contain w-full h-full"
        />
        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full px-2 py-1 shadow">◀</button>
        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full px-2 py-1 shadow">▶</button>
      </div>
      <div className="mt-2 text-sm text-gray-600">
        {current + 1} / {images.length}
      </div>
    </div>
  );
};

export default ProjectCarousel;
