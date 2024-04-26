import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import Card from "./Card/Card";

const Swip = ({ data }) => {
  return (
    <Swiper
      className="pb-3 sm:pb-10"
      spaceBetween={5}
      loop={true}
      navigation={false}
      pagination={{
        clickable: false,
      }}
      modules={[Pagination]}
      breakpoints={{
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      }}
    >
      {data?.slice(0, 8).map((card) => {
        return (
          <SwiperSlide key={card.id}>
            <Card
              title={card.name}
              img={card.images.box?.og}
              rate={card?.topCriticScore}
              download={card?.tier}
              id={card?.id}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Swip;
