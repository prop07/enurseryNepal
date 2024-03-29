import {AiFillInstagram , AiFillTwitterSquare}from "react-icons/ai";
import {FaFacebookSquare  } from "react-icons/fa";
import logo from "../images/logo.png"


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
    <footer className=" divide-y  ">
	<div className="container flex flex-col justify-between py-8 p-2 mx-auto space-y-8 lg:flex-row lg:space-y-0">
		<div className="lg:w-1/3">
			<a rel="noopener noreferrer" href="#" className="flex justify-center space-x-3 lg:justify-start">
				<div className="flex items-center justify-center w-48 h-16 ">
        <img  src={logo} alt={logo}/>
				</div>
				
			</a>
		</div>
		<div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
			<div className="space-y-3">
      <ul>
        {quickshopitems.map((item, index) => (
          <li className="mb-4" key={item} ><span  className={`text-sm truncate  ${index === 0?"font-bold": "hover:text-cyan-600 cursor-pointer "}`} key={index}>{item}</span></li>
        ))}
        </ul>
			</div>
			<div className="space-y-3">
      <ul>
          {informationitems.map((item, index) => (
            <li className="mb-4" key={item}  ><span  className={`text-sm truncate   ${index === 0?"font-bold":"hover:text-cyan-600 cursor-pointer "}`} key={index}>{item}</span></li>
            
          ))}
        </ul>
			</div>
			<div className="space-y-3">
      <ul>
          {ourservicesitem.map((item, index) => (
            <li className="mb-4" key={item} ><span  className={`text-sm truncate  ${index === 0?"font-bold":"hover:text-cyan-600 cursor-pointer "}`} key={index}>{item}</span></li>
          ))}
        </ul>
			</div>
			<div className="space-y-3">
				<div className="uppercase ">Social media</div>
				<div className="flex justify-start space-x-3">
					<AiFillInstagram title="instagram" className="cursor-pointer bg-gradient-to-r  hover:text-green-700" size={25}/>
          <AiFillTwitterSquare title="twitter" className="cursor-pointer  hover:text-green-700" size={25}/>
          <FaFacebookSquare title="facebook" className="cursor-pointer hover:text-green-700" size={25}/>
				</div>
			</div>
		</div>
	</div>
	<div className="py-2 bg-neutral-700 text-white text-sm text-center ">© 2010 enurserynepal Company Co. All rights reserved.</div>
</footer>
  );
};

export default Footer;
