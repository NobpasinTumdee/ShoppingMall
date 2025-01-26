import React, { useEffect, useState } from 'react';
import './About.css';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { UsersInterface } from '../../../interfaces/UsersInterface';
import { GetUserById } from '../../../services/https';

import Product from "../../../assets/icon/ForPage/MainIcon/Product.png";
import Product1 from "../../../assets/icon/ForPage/MainIcon/Product/PD1.png";
import Product3 from "../../../assets/icon/ForPage/MainIcon/Product/PD3.png";

const About: React.FC = () => {
    const [user, setUser] = useState<UsersInterface | null>(null); // State to store user data
    const userIdstr = localStorage.getItem("id");
    useEffect(() => {
        fetchUserData(String(userIdstr));
    }, []);

    const fetchUserData = async (userIdstr: string) => {
        try {
            const res = await GetUserById(userIdstr);
            if (res.status === 200) {
                setUser(res.data);
                console.log(user);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };


    gsap.registerPlugin(ScrollTrigger)

    gsap.to('.Ami1', {
        scrollTrigger: {
            trigger: '.Ami1', // start animation when ".box" enters the viewport
            // start: 'top 20%', //เริ่มเล่นอนิเมชั่นเมื่อยู่ตรงไหน 20px 80%
            // markers: true, //แสดงจุดมาค
            toggleActions: "restart none none none" //ทำงานตอนไหน  หยุดทำงานเมื่อออกจากหน้า(pause) กลับมาเล่นต่อได้ไหม(resume/reverse) ไม่รู้อันสุดท้าย
        },
        keyframes: [
            { y: 0, scale: 0.95, opacity: 0, progress: 0 },       // 0%
            // { x: 200, opacity: 0.5, progress: 0.5 }, // 50%
            { y: 0, scale: 1, opacity: 1, progress: 1 },     // 100%
        ]
    });

    gsap.to('.p1', {
        scrollTrigger: '.p1',
        y: -400,
        duration: 2
    });
    gsap.to('.p2', {
        scrollTrigger: '.p2',
        y: -500,
        duration: 1
    });
    gsap.to('.p3', {
        scrollTrigger: '.p3',
        y: -400,
        duration: 2
    });
    gsap.to('.aboutus', {
        scrollTrigger: '.aboutus',
        y: -400,
        duration: 2
    });
    gsap.to('.aboutus2', {
        scrollTrigger: '.aboutus2',
        y: -300,
        duration: 2
    });
    gsap.to('.Brand', {
        scrollTrigger: '.Brand',
        opacity: 1,
        scale: 1,
        duration: 3
    });
    gsap.to('.aboutus3', {
        scrollTrigger: '.aboutus3',
        scale: 1,
        duration: 2
    });
    gsap.to('.aboutus4', {
        scrollTrigger: '.aboutus4',
        scale: 1,
        duration: 2
    });

    return (
        <>
            {/* <div className='Navabout'>
                <img style={{ margin: 'auto 0px' }} height={30} src={LOGO} alt="LOGO" />
                <div className='Menuabout'>
                    <p>MENU</p>
                    <img width={50} src={user?.Profile} />
                </div>
            </div> */}
            <div style={{ height: '110px', zIndex: '0' }}></div>
            <div style={{ height: '110px', zIndex: '0' }}></div>
            <div className='maincontan'>
                <h1 className='Ami1'>Where Timeless <br /> Luxury Meets Modern <br />Style ICONIC</h1>
                <div style={{ margin: '35% 0% 0', display: 'flex', justifyContent: 'center' }}>
                    <img className='p1' src={Product} width={300} />
                    <img className='p2' src={Product1} width={300} />
                    <img className='p3' src={Product3} width={300} />
                </div>
                <div className='aboutus'>
                    <h3>ABOUTUS</h3>
                    <p>Nestled in the heart of the city, ICONIC stands as a beacon of luxury, offering a shopping experience unlike any other. Designed for those who appreciate the finer things in life, ICONIC is more than just a mall—it’s a masterpiece of modern architecture and refined style.</p>
                    <p>As you step into ICONIC, you are greeted by an ambiance that exudes sophistication. Every corner has been meticulously curated to provide an environment that blends timeless elegance with contemporary comfort. From the marble-clad floors to the soaring ceilings adorned with bespoke chandeliers, every detail is a testament to our commitment to excellence.</p>
                    <p>ICONIC is home to an array of world-renowned brands, each chosen to meet the discerning tastes of our visitors. Whether you’re searching for haute couture, bespoke jewelry, or cutting-edge gadgets, you’ll find them all under one roof. Our exclusive designer collections cater to those who seek uniqueness and quality in every purchase.</p>
                </div>

                <div className='aboutus2'>
                    <div className='Brand'>
                        <div style={{ margin: 'auto' }}>
                            <p>Brand</p>
                            <h2>Pilgrim</h2>
                            <p>NO1 LOYALTY CLUB</p>
                        </div>
                    </div>
                    <img src="https://www.illumsbolighus.com/on/demandware.static/-/Library-Sites-IBHSharedLibrary/default/dw55e9bc7c/inriver-images/pilgrim_1225x1225..jpg" alt="" />
                </div>
                <div className='aboutus3'>
                    <h3>"Elevate Your Everyday: ICONIC’s Exclusive Services and Experiences"</h3>
                    <p>At ICONIC, we believe that luxury is not just about products—it’s about the experience. That’s why we go above and beyond to provide services that elevate your everyday into something extraordinary.</p>
                    <p>Our concierge team is at your service, ready to cater to your every need. From personal shopping assistants who help you find the perfect outfit to valet parking that ensures a seamless arrival, ICONIC’s services are designed with your convenience in mind.</p>
                    <p>For our VIP members, ICONIC offers access to private lounges where you can relax in style. Sip on a glass of champagne as you unwind in a serene space far from the hustle and bustle. Our team is on hand to ensure your comfort and privacy, making every visit truly memorable.</p>
                </div>
                <div style={{ height: '300px' }}></div>
                <div className='aboutus4'>
                    <h3>"ICONIC Dining: A Culinary Journey Like No Other"</h3>
                    <p>ICONIC redefines dining with an array of culinary experiences that delight the senses and nourish the soul. From casual bites to fine dining, our restaurants offer something for every palate, all in an atmosphere of unparalleled elegance.</p>
                    <p>Step into ICONIC’s food court, where global flavors come to life. Discover authentic Japanese sushi, tantalizing Italian pasta, and bold Thai spices—all crafted by renowned chefs who bring their passion to every plate. For those who crave something sweet, our dessert boutiques offer decadent cakes, artisanal chocolates, and handcrafted pastries that are almost too beautiful to eat.</p>
                    <p>Looking for a more intimate setting? ICONIC’s fine dining establishments promise an experience you’ll never forget. Imagine dining under a canopy of stars at our rooftop restaurant, savoring dishes made from the freshest ingredients, paired perfectly with a selection of world-class wines.</p>
                </div>
                <div style={{ height: '300px' }}></div>
            </div>
        </>
    );

};

export default About;