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
    <div className="grid md:grid-cols-5 bg-slate-200 py-4 md:gap-18 px-4">
      <div className="hidden md:block"></div>
      <div className="hidden md:block"></div>
   

      <div>
        <ul>
          {quickshopitems.map((item, index) => (
            <li className="mb-4" key={item} ><span className="text-sm truncate cursor-pointer hover:text-cyan-600" key={index}>{item}</span></li>
          ))}
        </ul>
      </div>
      <div >
        <ul>
          {informationitems.map((item, index) => (
            <li className="mb-4" key={item}  ><span className="text-sm truncate  cursor-pointer hover:text-cyan-600" key={index}>{item}</span></li>
            
          ))}
        </ul>
      </div>
      <div >
        <ul>
          {ourservicesitem.map((item, index) => (
            <li className="mb-4" key={item} ><span className="text-sm truncate cursor-pointer hover:text-cyan-600" key={index}>{item}</span></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
