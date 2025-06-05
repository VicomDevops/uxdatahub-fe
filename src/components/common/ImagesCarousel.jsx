import React from 'react'
import { Carousel,CarouselControl,CarouselIndicators} from "reactstrap";

/**
 * A wrapper around the reactstrap Carousel component that takes the following props:
 * items: an array of image items to be displayed in the carousel
 * slides: the rendered JSX for each item in the carousel
 * activeIndex: the index of the currently-active slide
 * next: a function to call when the "next" button is clicked
 * previous: a function to call when the "previous" button is clicked
 * goToIndex: a function to call when the carousel indicators are clicked
 * interval: the number of milliseconds to wait before automatically transitioning to the next slide
 * fade: whether the carousel should use a fade animation when transitioning between slides
 */
const ImagesCarousel = ({ items, slides, activeIndex, next, previous, goToIndex, interval, fade }) => {
    
    //RENDER
    return (
        <Carousel
            className='carouselItem'
            activeIndex={activeIndex}
            next={next}
            previous={previous}
            interval={interval}
            fade={fade}
        >
            <CarouselIndicators
                items={items}
                activeIndex={activeIndex}
                onClickHandler={goToIndex}
            />
            {slides}
            <CarouselControl
                direction="prev"
                directionText="Previous"
                onClickHandler={previous}
            />
            <CarouselControl
                direction="next"
                directionText="Next"
                onClickHandler={next}
            />
        </Carousel>
    )
}

export default ImagesCarousel