export const savePageData = (formData: any, selectedPlan: any, slug: string) => {
  localStorage.setItem('pendingPageData', JSON.stringify({
    formData,
    selectedPlan,
    slug,
    timestamp: Date.now()
  }));
};

export const getPageData = () => {
  const data = localStorage.getItem('pendingPageData');
  return data ? JSON.parse(data) : null;
};

export const clearPageData = () => {
  localStorage.removeItem('pendingPageData');
};