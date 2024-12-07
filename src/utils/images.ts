export const convertImagesToBase64 = async (images: File[]): Promise<string[]> => {
  const promises = images.map(file => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Falha ao converter imagem'));
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  });

  try {
    return await Promise.all(promises);
  } catch (error) {
    console.error('Erro ao converter imagens:', error);
    return [];
  }
};