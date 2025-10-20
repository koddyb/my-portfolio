// Service pour gérer le compteur de visites
export const initVisitCounter = (): number => {
  // Vérifier si le code s'exécute côté client
  if (typeof window === 'undefined') return 0;
  
  // Vérifier si c'est une nouvelle session
  if (!sessionStorage.getItem('visitCounted')) {
    // Récupérer le compteur actuel
    const currentCount = localStorage.getItem('visitCount') || '0';
    // Incrémenter le compteur
    const newCount = parseInt(currentCount) + 1;
    // Mettre à jour le localStorage
    localStorage.setItem('visitCount', newCount.toString());
    // Marquer la visite comme comptée pour cette session
    sessionStorage.setItem('visitCounted', 'true');
    return newCount;
  }
  
  // Retourner le compteur actuel sans l'incrémenter
  return parseInt(localStorage.getItem('visitCount') || '0');
};

export const getVisitCount = (): number => {
  if (typeof window === 'undefined') return 0;
  return parseInt(localStorage.getItem('visitCount') || '0');
};
