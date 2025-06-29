import React, { useState, useRef } from 'react';
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/all';
import gsap from 'gsap';
import blackScooter from '../assets/mainScooter.png';
import yellowScooter from '../assets/yellowScooter.png';
import whiteScooter from '../assets/whiteScooter.png';

const models = [
    {
        name: 'EV-B',
        image: blackScooter,
        bg: 'linear-gradient(to bottom right, #5bc1c5, #90d5d0)',
        speed: '50km/hr',
        battery: '80km',
        charging: '3.5hr',
    },
    {
        name: 'EV-Y',
        image: yellowScooter,
        bg: 'linear-gradient(to bottom right, #fff176, #fdd835)',
        speed: '55km/hr',
        battery: '85km',
        charging: '3.0hr',
    },
    {
        name: 'EV-W',
        image: whiteScooter,
        bg: 'linear-gradient(to bottom right, #ffffff, #e0e0e0)',
        speed: '45km/hr',
        battery: '70km',
        charging: '3.2hr',
    }
];

const Hero = () => {
    const [modelIndex, setModelIndex] = useState(0);
    const scooterRef = useRef(null);
    const heroBgRef = useRef(null);

    useGSAP(() => {
  const futureSplit = new SplitText('#heading', { type: 'chars, words' });

  gsap.set(futureSplit.chars, { display: 'inline-block' });

  gsap.from(scooterRef.current, {
    x: 500,
    opacity: 0,
    duration: 1,
    ease: 'power1.inOut',
  });
  gsap.fromTo(
    futureSplit.chars,
    {
      fontFamily: '"Bebas Neue", sans-serif',
      yPercent: 100,
      opacity: 0
    },
    {
      fontFamily: '"Bebas Neue", sans-serif',
      yPercent: 0,
      opacity: 1,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.06,
    }
  );
}, []);



    const handleModelChange = (direction) => {
        const nextIndex = direction === 'next'
            ? (modelIndex + 1) % models.length
            : (modelIndex - 1 + models.length) % models.length;

        gsap.to(scooterRef.current, {
            x: direction === 'next' ? -500 : 500,
            opacity: 0,
            duration: 0.5,
            ease: 'power1.inOut',
            onComplete: () => {
                setModelIndex(nextIndex);

                gsap.to(heroBgRef.current, {
                    background: models[nextIndex].bg,
                    duration: 0.6
                });

                gsap.fromTo(
                    scooterRef.current,
                    { x: direction === 'next' ? 500 : -500, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.6, ease: 'power1.inOut' }
                );
            }
        });
    };

    const currentModel = models[modelIndex];

    return (
        <div
            ref={heroBgRef}
            className='relative z-[0] pt-16 w-screen h-screen overflow-hidden transition-all duration-500'
            style={{ background: currentModel.bg }}
        >
            <div className="absolute z-[-1] top-0 right-0 translate-x-1/2 -translate-y-1/3 w-[600px] h-[600px] rounded-full opacity-20" />
            <div className="absolute z-[-1] md:hidden w-[600px] h-[600px] bottom-0 left-0 -translate-x-1/2 translate-y-1/2 rounded-full opacity-20" />

            <div className='h-[calc(100vh-64px)] flex flex-col px-6 md:flex-row-reverse'>
                <div className='relative w-full h-1/2 md:w-3/5 md:h-full flex flex-col'>
                    <div className='pt-8 md:pt-28 flex justify-end'>
                        <h1 className='text-[200px] -translate-x-20 text-white leading-[0.8] md:text-[20rem]' style={{ fontFamily: 'robson' }}>
                            {currentModel.name}
                        </h1>
                    </div>

                    <div
                        ref={scooterRef}
                        id='scooter'
                        className='absolute bottom-0 left-0 h-full w-full bg-contain bg-center bg-no-repeat scale-160 sm:scale-130 z-0 pointer-events-none transition-all duration-500'
                        style={{ backgroundImage: `url(${currentModel.image})` }}
                    ></div>
                    <div className='flex w-full md:w-screen md:-translate-x-2/5 justify-between mt-auto z-10 pb-4 px-6'>
                        <div
                            className='w-fit h-fit flex items-center justify-center cursor-pointer text-black'
                            onClick={() => handleModelChange('prev')}
                        >
                            <GrFormPreviousLink size={32} />
                        </div>
                        <div className='flex gap-1 items-center'>
                            {models.map((_, i) => (
                                <div
                                    key={i}
                                    className={`rounded-full h-2.5 w-2.5 transition-all ease-in-out
                    ${i === modelIndex ? 'bg-zinc-50 border border-black' : 'bg-zinc-600 '}`}
                                ></div>
                            ))}
                        </div>
                        <div
                            className='w-fit h-fit flex items-center justify-center cursor-pointer text-black'
                            onClick={() => handleModelChange('next')}
                        >
                            <GrFormNextLink size={32} />
                        </div>
                    </div>
                </div>

                <div className='relative w-full h-1/2 md:w-2/5 md:h-full mt-6 flex flex-col items-center md:items-start md:pt-28 lg:pl-28'>
                    <h3 className='uppercase tracking-[0.4rem] md:tracking-[1.5vw] lg:tracking-[1vw] md:text-base lg:text-lg lg:translate-x-[4vw]' style={{ fontFamily: 'Inter, sans-serif' }}>let's ride the</h3>
                    <div className='overflow-hidden'><h1 id='heading' className='text-[15vh] whitespace-nowrap leading-none font-extrabold sm:font-[400] sm:text-[20vh] md:text-[15vw] text-zinc-900 md:mt-4' style={{ fontFamily: '"Bebas Neue", sans-serif' }}>FUTURE</h1></div>
                    <h5 className='text-sm capitalize font-medium md:self-start md:mt-8'>simple and sleek design <br className='hidden md:block' /> with users in mind.</h5>

                    <div className='rounded-2xl w-full flex gap-5 bg-white/20 backdrop-blur-4xl px-6 py-4 mt-4 md:mt-16 md:translate-x-[100%] md:absolute md:bottom-32 justify-between'>
                        <div className='flex flex-col'>
                            <h5 className='text-lg leading-none font-[600]'>{currentModel.speed}</h5>
                            <p className='text-[12px]'>Speed</p>
                        </div>
                        <div className='flex flex-col '>
                            <h5 className='text-lg leading-none font-[600]'>{currentModel.battery}</h5>
                            <p className='text-[12px]'>Battery Range</p>
                        </div>
                        <div className='flex flex-col '>
                            <h5 className='text-lg leading-none font-[600]'>{currentModel.charging}</h5>
                            <p className='text-[12px]'>Charging Time</p>
                        </div>
                    </div>

                    <button className='w-fit h-fit self-end md:self-start px-4 py-2 bg-[linear-gradient(to_right,_#B5D9E9,_#5bc1c5)] mt-4 rounded-xl shadow-md hover:shadow-lg hover:scale-105 cursor-pointer transition-all ease-in-out'>
                        Pre-Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
