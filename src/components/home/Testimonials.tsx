import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Star } from 'lucide-react';

const testimonials = [
  {
    text: 'Adorei a experiência! Pude criar uma página especial para o João...',
    couple: 'Mariana e João',
    time: '1 mês atrás',
    image: 'https://i.pinimg.com/736x/66/45/1c/66451c389f306f07b97eaa438464461b.jpg'
  },
  // ... outros depoimentos
];

export const Testimonials = () => {
  return (
    <section className="py-16 bg-black/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Depoimentos</h2>
        <p className="text-center text-gray-300 mb-12">Veja o que nossos clientes estão dizendo...</p>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-black/20 p-6 rounded-lg h-full">
                <div className="flex items-center mb-4">
                  <img src={testimonial.image} alt={testimonial.couple} className="w-16 h-16 rounded-full object-cover mr-4" />
                  <div>
                    <p className="font-bold">{testimonial.couple}</p>
                    <p className="text-sm text-gray-400">{testimonial.time}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-pink-500" fill="#FF4E6D" />
                  ))}
                </div>
                <p className="text-gray-300">{testimonial.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
