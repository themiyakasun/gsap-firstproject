import { useRef, useState } from 'react';
import { sliderLists } from '../../constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Menu = () => {
  const currentRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useGSAP(() => {
    gsap.fromTo('#title', { opacity: 0 }, { opacity: 1, duration: 1 });
    gsap.fromTo(
      '.cocktail img',
      { opacity: 0, xPercent: -100 },
      { opacity: 1, xPercent: 0, duration: 1, ease: 'power1.inOut' }
    );
    gsap.fromTo(
      '.details h2',
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 100, ease: 'power1.inOut' }
    );
    gsap.fromTo(
      '.details p',
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 100, ease: 'power1.inOut' }
    );
  }, [currentIndex]);

  const totalCocktails = sliderLists.length;

  const goToSlide = (index: number) => {
    const newIndex = (index + totalCocktails) % totalCocktails;
    setCurrentIndex(newIndex);
  };

  const getCocktailAt = (indexOffset: number) => {
    return sliderLists[
      (currentIndex + indexOffset + totalCocktails) % totalCocktails
    ];
  };

  const currentCocktail = getCocktailAt(0);
  const prevCocktail = getCocktailAt(-1);
  const nextContail = getCocktailAt(1);

  return (
    <div id='menu' aria-labelledby='menu-heading'>
      <img
        src='/images/slider-left-leaf.png'
        alt='left-leaf'
        id='m-left-leaf'
      />
      <img
        src='/images/slider-right-leaf.png'
        alt='right-leaf'
        id='m-right-leaf'
      />
      <h2 id='menu-heading' className='sr-only'>
        Cocktail Menu
      </h2>

      <nav className='cocktail-tabs' aria-label='Cocktail Navigation'>
        {sliderLists.map((cocktail, index) => {
          const isActive = index === currentIndex;

          return (
            <button
              key={cocktail.id}
              className={`${
                isActive
                  ? 'text-white border-white'
                  : 'text-white/50 border-white/50'
              } `}
              onClick={() => goToSlide(index)}
            >
              {cocktail.name}
            </button>
          );
        })}
      </nav>

      <div className='content'>
        <div className='arrows'>
          <button
            className='text-left'
            onClick={() => goToSlide(currentIndex - 1)}
          >
            <span>{prevCocktail.name}</span>
            <img
              src='/images/right-arrow.png'
              alt='right-arrow'
              aria-hidden='true'
            />
          </button>
          <button
            className='text-left'
            onClick={() => goToSlide(currentIndex + 1)}
          >
            <span>{nextContail.name}</span>
            <img
              src='/images/left-arrow.png'
              alt='left-arrow'
              aria-hidden='true'
            />
          </button>
        </div>

        <div className='cocktail'>
          <img src={currentCocktail.image} className='object-contain' />
        </div>

        <div className='recipe'>
          <div ref={currentRef} className='info'>
            <p>Recipe for:</p>
            <p id='title'>{currentCocktail.name}</p>
          </div>

          <div className='details'>
            <h2>{currentCocktail.title}</h2>
            <p>{currentCocktail.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
