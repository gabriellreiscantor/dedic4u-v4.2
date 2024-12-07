import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface ImageCarouselProps {
  images: (File | string)[];
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  if (images.length === 0) return null;

  const getImageUrl = (image: File | string): string => {
    if (typeof image === 'string') {
      return image;
    }
    return URL.createObjectURL(image);
  };

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={20}
      slidesPerView={1}
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      className="w-full rounded-lg overflow-hidden mb-6"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full pb-[177.78%]">
            <img
              src={getImageUrl(image)}
              alt={`Foto ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};