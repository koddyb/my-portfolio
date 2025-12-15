export const initVisitCounter = (): number => {

  if (typeof window === 'undefined') return 0;
  if (!sessionStorage.getItem('visitCounted')) {
    const currentCount = localStorage.getItem('visitCount') || '0';
    const newCount = parseInt(currentCount) + 1;
    localStorage.setItem('visitCount', newCount.toString());
    sessionStorage.setItem('visitCounted', 'true');
    return newCount;
  }
  return parseInt(localStorage.getItem('visitCount') || '0');
};

export const getVisitCount = (): number => {
  if (typeof window === 'undefined') return 0;
  return parseInt(localStorage.getItem('visitCount') || '0');
};
