import CampaignGallery from "@/components/CampaignGallery";

const NEW = "/assets/images/PORTRAITS/web";

const slides = [
  { src: "/assets/images/portraits/web/Shakira FINALS - 4.jpg", caption: "Shakira — Global Citizen 2025" },
  { src: "/assets/images/portraits/web/Shakira FINALS - 2.jpg", caption: "Shakira — Global Citizen 2025" },
  { src: "/assets/images/portraits/web/949d8a7f-9ebf-4336-a511-b7efa1baa68a_rw_1920.jpg", caption: "Doja Cat — Global Citizen 2024" },
  { src: "/assets/images/portraits/web/764fbadb-3c26-4cac-a36c-f3e0b7cc8bb1_rw_3840.jpg", caption: "Kanii — SOB's" },
  { src: "/assets/images/portraits/web/c335f4d0-540b-4147-88d2-5b34568e0b3e_rw_1920-2.jpg", caption: "Jozzy — In the moment" },
  { src: "/assets/images/portraits/web/Fredro 5.jpg", caption: "Fredro Starr × BAPE" },
  { src: `${NEW}/1 pic yachty 2.jpg`, caption: "Lil Yachty" },
  { src: `${NEW}/50 Cent Edit 4.jpg`, caption: "50 Cent" },
  { src: `${NEW}/meek mill 7.jpg`, caption: "Meek Mill" },
  { src: `${NEW}/Jozzy 14.jpg`, caption: "Jozzy" },
  { src: `${NEW}/kanii 3.jpg`, caption: "Kanii" },
  { src: `${NEW}/Dina Ayada 16.jpg`, caption: "Dina Ayada" },
  { src: `${NEW}/nia sultana 26.jpg`, caption: "Nia Sultana" },
  { src: `${NEW}/Sina Orange Dress 6.jpg`, caption: "Sina" },
  { src: `${NEW}/Sina Orange Dress 7.jpg`, caption: "Sina" },
  { src: `${NEW}/ilham 2.jpg`, caption: "Ilham" },
  { src: `${NEW}/Baze 19.jpg`, caption: "Baze" },
  { src: `${NEW}/IB Mattic 3.jpg`, caption: "IB Mattic" },
  { src: `${NEW}/Keni Can Fly 10.jpg`, caption: "Keni Can Fly" },
  { src: `${NEW}/Yami 47.jpg`, caption: "Yami" },
  { src: `${NEW}/Justin_1.jpg`, caption: "Justin" },
  { src: `${NEW}/Justin_6.jpg`, caption: "Justin" },
  { src: `${NEW}/Chris 6.jpg`, caption: "Chris" },
  { src: `${NEW}/Fans 4.jpg`, caption: "Fans" },
  { src: `${NEW}/20251103-ID5A2936 2.jpg`, caption: "Portrait" },
  { src: `${NEW}/BE5208AC-C49D-4155-8CE3-813C216AFC1F.jpg`, caption: "Portrait" },
  { src: `${NEW}/IMG_8491.jpg`, caption: "Portrait" },
];

// grid tiles load the 800px thumb/ copy; the lightbox loads the full web/ copy
const images = slides.map((s) => ({ src: s.src, alt: s.caption, thumb: s.src.replace("/web/", "/thumb/") }));

/** Same size slider and masonry as the commercial galleries; the lightbox stops at the first and last photo */
export default function PortraitsCarousel() {
  return <CampaignGallery images={images} initialCols={10} maxCols={10} loop={false} />;
}
