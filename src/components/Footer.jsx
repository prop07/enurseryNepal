import {AiFillInstagram , AiFillTwitterSquare}from "react-icons/ai"
import {FaFacebookSquare  } from "react-icons/fa"

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
    <footer className="px-4 divide-y ">
	<div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
		<div className="lg:w-1/3">
			<a rel="noopener noreferrer" href="#" className="flex justify-center space-x-3 lg:justify-start">
				<div className="flex items-center justify-center w-12 h-12 rounded-full ">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="flex-shrink-0 w-5 h-5 rounded-full ">
						<path d="M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z"></path>
					</svg>
				</div>
				<span className="self-center text-2xl font-semibold">Brand name</span>
			</a>
		</div>
		<div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
			<div className="space-y-3">
      <ul>
        {quickshopitems.map((item, index) => (
          <li className="mb-4" key={item} ><span  className={`text-sm truncate cursor-pointer hover:text-cyan-600 ${index === 0?"font-bold":null}`} key={index}>{item}</span></li>
        ))}
        </ul>
			</div>
			<div className="space-y-3">
      <ul>
          {informationitems.map((item, index) => (
            <li className="mb-4" key={item}  ><span  className={`text-sm truncate cursor-pointer hover:text-cyan-600 ${index === 0?"font-bold":null}`} key={index}>{item}</span></li>
            
          ))}
        </ul>
			</div>
			<div className="space-y-3">
      <ul>
          {ourservicesitem.map((item, index) => (
            <li className="mb-4" key={item} ><span  className={`text-sm truncate cursor-pointer hover:text-cyan-600 ${index === 0?"font-bold":null}`} key={index}>{item}</span></li>
          ))}
        </ul>
			</div>
			<div className="space-y-3">
				<div className="uppercase ">Social media</div>
				<div className="flex justify-start space-x-3">
					<AiFillInstagram className="cursor-pointer hover:text-cyan-600" size={25}/>
          <AiFillTwitterSquare className="cursor-pointer hover:text-cyan-600" size={25}/>
          <FaFacebookSquare className="cursor-pointer hover:text-cyan-600" size={25}/>
				</div>
			</div>
		</div>
	</div>
	<div className="py-6 text-sm text-center ">© 1968 Company Co. All rights reserved.</div>
</footer>
  );
};

export default Footer;
