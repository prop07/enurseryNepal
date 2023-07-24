import React from "react";

const Footer = () => {
  const quickshopitems = [
    "Quick Shop",

    "Indoor",
    "Semi Indoor",
    "Outdoor",
    "Vase/Pot",
    "Fertilizers/Pesticides",
  ];

  const informationitems = [
    "Information",
    "Introduction",
    "Policies",
    "Terms & Conditions",
    "Social",
    "Contact Us",
  ];
  const ourservicesitem = [
    " Our Services",

    "All Nursery Products",
    "Gardening",
    "Timely Visit",
    "Routine Services",
    "Request for Plant",
    "Gardener",
  ];

  return (
    <div className="grid grid-cols-6 bg-slate-200 p-8">
      <div></div>
      <div></div>
      <div></div>
      <div>
        <ul>
          {quickshopitems.map((item, index) => (
            <li className="cursor-pointer hover:text-cyan-600 text-sm p-2" key={index}>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {informationitems.map((item, index) => (
            <li className="cursor-pointer hover:text-cyan-600 text-sm p-2" key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {ourservicesitem.map((item, index) => (
            <li className="cursor-pointer hover:text-cyan-600 text-sm p-2" key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
