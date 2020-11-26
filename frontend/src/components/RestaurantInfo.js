import React from 'react';

const RestaurantInfo = () => {
  return (
    <ul className="restaurant-info row d-flex flex-column">
      <li className="info-contact-li">
        <h2>Nr. telefonu</h2>
        <h3 className="info-contact">906 514 511</h3>
      </li>
      <li className="info-contact-li">
        <h2>E-mail</h2>
        <h3 className="info-contact">lepetit@gmail.com</h3>
      </li>
      <li className="info-contact-li">
        <h2>Adres</h2>
        <h3 className="info-contact">Kraków, Dworcowa 19</h3>
      </li>
    </ul>
  );
};

export default RestaurantInfo;