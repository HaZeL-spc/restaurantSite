import React from 'react';
import RestaurantInfo from '../components/RestaurantInfo';
import Template from '../components/Template';

const About = () => {
  return (
    <Template>
      <div className="text-italy bg-about">
        <div className="image-holder about-site"> 
          <div className="about-story">
            <h2 className="about-headline">O nas</h2>
          <p>La Grande Mamma na Rynku Głównym, na zbiegu ul. Anny i Wiślnej jest już otwarta. W kamienicy z XVII wieku, z pięknymi sklepieniami i zabytkowymi portalami, stworzyliśmy miejsce w którym kosztować można autentycznej kuchni włoskiej w pięknych wnętrzach i w przyjaznej atmosferze. To tutaj właśnie w naszej otwartej kuchni na oczach gości wypiekają się słodkie pyszności i i pizza na cienkim chrupiącym spodzie. Chcemy żeby potrawy serwowane w la Grande Mamma cieszyły wszystkie 

      

    La Grande Mamma to miejsce wyjątkowe pod wieloma względami: wspaniałe widoki na krakowski Rynek, przytulne eleganckie i przyjazne wnętrza, wyśmienity serwis, doskonały wybór win i w końcu świetna kuchnia, bo to ona jest główna wartością, nad którą pracujemy każdego dnia.
          </p>
          </div>
          <div className="">
            <RestaurantInfo/>
          </div>
        </div>
        {/* <img src='/img/meat-salat.jpg' alt="Main" className="about-site-image"/> */}
      </div>
      </Template>
  );
};

export default About;