
import { ImageMain } from "../image/ImageMain";
import { useParams } from "react-router-dom";
import { LogoHeader } from "../image/LogoHeader";

//851934681333

export const HomePage = () => {
  const { artistName } = useParams();

  const images = [
  
    //2025
    {
      image: "https://i.imgur.com/lsJ7PlY.jpg", //2024. guerra mundial
      pageTo: "https://www.lacapella.barcelona/es/caca-banal",
      artist: "majin",
      isDownload: true,
      text: "exhibition in La Capella with atractive_smithers."
    },



    //2024


    {
      image: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/benyart/prova.jpg", //2024. guerra mundial
      pageTo: "/guerra_mundial",
      artist: "majin",
      isDownload: false,
      text: "video for ben yart's mixtape with dome."
    },
    
    {
      image: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/foflas.jpg", //2024. foflas
      pageTo: "/foflas",
      artist: "majin",
      isDownload: false,
      text: "AI generated shitpost with el foflas."
    },
    {
      image: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat17.jpg", //2024. f. (el regreso de la filoxera)
      pageTo: "/f",
      artist: "majin",
      isDownload: false,
      text: "documentary of a festival in Navarra with dome.  "
    },
   
    {
      image: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat3.jpg",//2023. inout
      pageTo: "/inout",
      artist: "polcrosas",
      isDownload: false,
      text: 'exhibition in Tabakalera for my final degree MA thesis.  '
    },

    {
      image: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat16.jpg",//2023. ¿En qué momento esta cámara deja de serlo?
      pageTo: "/juego_del_telefono",
      artist: "polcrosas",
      isDownload: false, 
      text: "video essay about language and cameras.  "
    },
    {
      image: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat18.jpg",//2023. Els Cundits en Euskal Herría
      pageTo: "/cundits_en_euskalherria",
      artist: "polcrosas",
      isDownload: false, 
      text: "documentary about my friends music tour.  "
    },


    //2023
    // {
    //   image: "metalgearfeelings",
    //   pageTo: "/metal_gear_feelings",
    //   artist: "domenecmiralles",
    //   isDownload: false,
    // },

    // // { //agent sisters dilemma
    // //   image: "dilemma",
    // //   pageTo: "/agent-sisters-dilemma",
    // //   artist: "domenecmiralles",
    // //   isDownload: false
    // // },

    {
      image: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat6.jpg",//2023. tapetum lucidum
      pageTo: "/tapetum_lucidum",
      artist: "majin",
      isDownload: false,
      text: "custom dreambooth model images of dogs with dome.  "
    },

   // {
    // image: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat9.jpg",//dededemons
     // pageTo:
       // "/dededemons",
     // artist: "majin",
    // isDownload: false,
     // text: "pixel sorting comic book with dome.  "
   // },




    // {
    //   image: "dimon",
    //   pageTo: "/dimons-wizard-lair",
    //   artist: "domenecmiralles",
    //   isDownload: false,
    // },

    // { //peeping death
    //   image: "bobobo",
    //   pageTo: "/bobobo",
    //   artist: "domenecmiralles",
    //   isDownload: false
    // },

    // {
    //   image: "omega",
    //   pageTo: "https://planetomegatcg.com",
    //   artist: "domenecmiralles",
    //   isDownload: false,
    // },

    //2022

    // {
    //   image: "savingvhuvhu",
    //   pageTo: "/saving-vhuvhu",
    //   artist: "domenecmiralles",
    //   isDownload: false,
    // },

    // {
    //   //attempt at new history
    //   image: "new_history",
    //   pageTo:
    //     "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/attempt_at_new_history/new_history.zip",
    //   artist: "domenecmiralles",
    //   isDownload: true,
    // },

    {
      image: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat4.jpg",//2022. mu
      pageTo: "/mu",
      artist: "polcrosas",
      isDownload: false,
      text: "monographic artist book.  "
    },

    {
      image: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat7.jpg",//2022. carglass
      pageTo:
        "/carglass",
      artist: "polcrosas",
      isDownload: false,
      text: "atractive_smithers fanzine.  "
    },

    //2021

    // {
    //   //trunk & peakpaws
    //   image: "peakpaws",
    //   pageTo:
    //     "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/trunk%26peakpaws/trunk_%26_peakpaws_save_the_world.pdf",
    //   artist: "domenecmiralles",
    //   isDownload: true,
    // },

 
    {
      image: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat8.jpg",//2021. els cundits
      pageTo:
        "/cundits",
      artist: "polcrosas",
      isDownload: false,
      text: "els cundits fanzine.  "
      
    },

    {
      image: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat5.jpg",//2021. hiperpublicación 100/24
      pageTo: "https://artefactosnativos.com/hiperpublicacion.html",
      artist: "majin",
      isDownload: true,
      text: "24h nonstop publishing residency with eze.  "
    },

    {
      image: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat15.jpg",//2021. i'm vertical but i'd rather be horizontal
      pageTo: "/vertical_but_rather_be_horizontal",
      artist: "polcrosas",
      isDownload: false,
      text: "video poem with cameras and the sea.  "
    },

    {
      image: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat10.jpg",//2021. dog's tarot
      pageTo: "/tarot",
      artist: "polcrosas",
      isDownload: false,
      text: "tarot set of dog panoramics.  "
    },

 //2020

    {
      image: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat12.jpg",//2020. rxtx
      pageTo: "/rxtx",
      artist: "polcrosas",
      isDownload: false,
      text: "virtual flamethrower in an online exhibition.  "
    },

   

    {
      image: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat.jpg",//2020. serbal.pntic.mec.es
      pageTo: "/serbal",
      artist: "majin",
      isDownload: false,
      text: "fanzine made during lockdown.  "
    },

    // {
    //   image: "friend_phenomenology",
    //   pageTo: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/friend_phenomenology/friendship_phenomenology.zip",
    //   artist: "domenecmiralles",
    //   isDownload: true
    // },

   // {
  //    image: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat2.jpg",//volum
  //    pageTo: "/volum",
   //   artist: "polcrosas",
    //  isDownload: false,
    //  text: "1st volume of a photobook series.  "
    //},
    {
      image: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat13.jpg", //2021. cosas de casa
      pageTo:
        "/cosas_de_casa",
      artist: "polcrosas",
      isDownload: false,
      text: "video series made at home.  "
    },

    // {
    //   image: "miscellaneous",
    //   pageTo: "/miscellaneous",
    //   artist: "domenecmiralles",
    //   isDownload: false,
    // },
  ];

  const filteredImages = [];

  for (var i = 0; i < images.length; i++) {
    //artista
    if (artistName !== undefined) {
      if (images[i].artist === artistName || images[i].artist === "majin") {
        if (images[i].artist === "polcrosas") {
          console.log("gora eta")
        }
        else {
        
        filteredImages.push(images[i]);
      }
      }
      if (images[i].artist === "polcrosas" ) {
        filteredImages.push(images[i]);
      }
    }

    //majin
    if (artistName === undefined) {
      if (images[i].artist === "majin" ) {
        filteredImages.push(images[i]);
      }

     if (images[i].artist === "polcrosas" ) {
        filteredImages.push(images[i]);
      }
      
    }
    console.log(filteredImages)
  }


  return (
    <div className="bg-black">
      <LogoHeader className="pb-16"/>
      
      <div className="flex flex-col items-center justify-center mt-4">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mr-4 ml-4">
          {filteredImages.map((image, index) => (
            <ImageMain
              key={index}
              image={image.image}
              pageTo={image.pageTo}
              artist={image.artist}
              isDownload={image.isDownload}
              text={image.text}
            />
          ))}
        </div>
      </div>
    </div>
  );
}; 