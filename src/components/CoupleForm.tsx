import React from 'react';
import { useDropzone } from 'react-dropzone';
import { FormData, Plan } from '../types';
import { Upload, AlertCircle, X } from 'lucide-react';
import { validateForm } from '../utils/validation';
import { ErrorMessage } from './ErrorMessage';

interface CoupleFormProps {
  selectedPlan: Plan;
  formData: FormData;
  onChange: (data: Partial<FormData>) => void;
  onSubmit: () => void;
}

export const CoupleForm: React.FC<CoupleFormProps> = ({
  selectedPlan,
  formData,
  onChange,
  onSubmit,
}) => {
  const errors = validateForm(formData);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: selectedPlan.maxImages,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length + formData.images.length > selectedPlan.maxImages) {
        alert(`Você pode adicionar no máximo ${selectedPlan.maxImages} imagens neste plano.`);
        return;
      }
      onChange({ images: [...formData.images, ...acceptedFiles] });
    },
  });

  const removeImage = (index: number) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    onChange({ images: newImages });
  };

  return (
    <div className="w-full max-w-2xl space-y-6">
      <ErrorMessage errors={errors} />

      <div>
        <label className="block text-white mb-2">Título da Mensagem</label>
        <input
          type="text"
          maxLength={30}
          value={formData.title}
          onChange={(e) => onChange({ title: e.target.value })}
          className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-pink-500/20 focus:border-pink-500 focus:outline-none"
          placeholder="Ex: Para o amor da minha vida"
        />
        <p className="text-sm text-gray-400 mt-1">
          {30 - formData.title.length} caracteres restantes
        </p>
      </div>

      <div>
        <label className="block text-white mb-2">
          Imagens (Máximo: {selectedPlan.maxImages})
        </label>
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-pink-500/20 rounded-lg p-6 text-center cursor-pointer hover:border-pink-500/40"
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-pink-500 mb-2" />
          <p className="text-white">Arraste imagens ou clique para selecionar</p>
          <p className="text-sm text-gray-400 mt-2">
            {formData.images.length} de {selectedPlan.maxImages} imagens selecionadas
          </p>
        </div>

        <div className="mt-4 space-y-2">
          {formData.images.map((image, index) => (
            <div key={index} className="flex items-center bg-white/10 p-2 rounded-lg">
              <img
                src={URL.createObjectURL(image)}
                alt={`Imagem ${index + 1}`}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <span className="ml-3 text-sm flex-grow truncate">
                {image.name}
              </span>
              <button
                onClick={() => removeImage(index)}
                className="ml-2 p-1 hover:bg-white/10 rounded-full"
              >
                <X className="w-4 h-4 text-pink-500" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-white mb-2">Mensagem Personalizada</label>
        <textarea
          maxLength={selectedPlan.maxCharacters}
          value={formData.message}
          onChange={(e) => onChange({ message: e.target.value })}
          className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-pink-500/20 focus:border-pink-500 focus:outline-none h-32"
          placeholder="Escreva sua mensagem de amor aqui..."
        />
        <p className="text-sm text-gray-400 mt-1">
          {selectedPlan.maxCharacters - formData.message.length} caracteres restantes
        </p>
      </div>

      <div>
        <label className="block text-white mb-2">Data do Relacionamento</label>
        <input
          type="date"
          value={formData.relationshipDate}
          onChange={(e) => onChange({ relationshipDate: e.target.value })}
          className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-pink-500/20 focus:border-pink-500 focus:outline-none"
        />
      </div>

      {selectedPlan.allowsMusic && (
        <div>
          <label className="block text-white mb-2">Link do YouTube (Opcional)</label>
          <input
            type="url"
            value={formData.youtubeLink}
            onChange={(e) => onChange({ youtubeLink: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-pink-500/20 focus:border-pink-500 focus:outline-none"
            placeholder="https://youtube.com/watch?v=..."
          />
        </div>
      )}

      <button
        onClick={onSubmit}
        disabled={errors.length > 0}
        className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-500/50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-colors"
      >
        Criar Página
      </button>
    </div>
  );
};