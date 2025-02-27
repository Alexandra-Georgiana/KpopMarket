// popular
import p1_img from "./print_2.png";
import p2_img from "./print_4.jpeg";
import p3_img from "./totebag_1.jpeg";
import p4_img from "./sticker_3.jpeg";
import p5_img from "./keychain_3.jpeg";

// latest 
import p6_img from "./print_7.jpeg";
import p7_img from "./freebies.jpeg";
import p8_img from "./keychain_1.jpeg";

// Footer
import facebook from './facebook.svg';
import instagram from './instagram.svg';
import twitter from './twitter.svg';
import youtube from './youtube.svg';
import linkedin from './linkedin.svg';

// **POPULAR PRODUCTS**
export const POPULAR = [
  {
    id: 1,
    name: "print_1",
    image: p1_img,
    new_price: "$15.00",
    old_price: "$20.00",	
  },
  {
    id: 2,
    name: "print_4",
    image: p2_img,
    new_price: "$6.00",
  },
  {
    id: 3,
    name: "totebag_1",
    image: p3_img,
    new_price: "$15.00",
    old_price: "$20.00",
  },
  {
    id: 4,
    name: "sticker_3",
    image: p4_img,
    new_price: "$5.00",
    old_price: "$10.00",
  },
  {
    id: 5,
    name: "keychain_3",
    image: p5_img,
    new_price: "$5.00"
  },
];


// **LATEST PRODUCTS**
export const LATEST = [
  {
    id: 6,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    image: p6_img,
    new_price: 50.0,
    old_price: 80.5,
  },
  {
    id: 7,
    name: "print_7",
    image: p7_img,
    new_price: "$15.00"
  },
  {
    id: 8,
    name: "keychain_1",
    image: p8_img,
    new_price: "$5.00", 
    old_price: "$10.00"
  },
];
export default POPULAR;

// **FOOTER LINKS**
export const FOOTER_LINKS = [
  {
    title: "Learn More",
    links: [
      "About Us",
      "Categories",
      "Exchange Policy",
      "Order Now",
      "FAQ",
      "Privacy Policy",
    ],
  },
  {
    title: "Our Community",
    links: [
      "Terms and Conditions",
      "Special Offers",
      "Customer Reviews",
    ],
  },
];

// **FOOTER CONTACT INFO**
export const FOOTER_CONTACT_INFO = {
  title: "Contact Us",
  links: [
    { label: "Contact Number", value: "074621****" },
    { label: "Email Address", value: "info@mimisky.com" },
  ],
};

// **SOCIAL LINKS**

export const SOCIALS = {
  title: "Follow Us",
  links: [
    { url: "https://www.facebook.com", icon: facebook },
    { url: "https://www.instagram.com", icon: instagram },
    { url: "https://www.twitter.com", icon: twitter },
    { url: "https://www.youtube.com", icon: youtube },
    { url: "https://www.linkedin.com", icon: linkedin },
  ],
};

export const ALL = {
  POPULAR,
  LATEST,
  FOOTER_LINKS,
  FOOTER_CONTACT_INFO,
  SOCIALS,
}

export const MENU_ITEMS = [
  "Albums", "Boygroups", "Girlgroups", "O.S.T", "Solo Artists",
  "All Albums", "Merchandise", "Tote Bags", "Stickers", "Prints",
  "Keychains", "Below 10€", "All Merchandise", "Artists", "Sale", "Rewards"
];


