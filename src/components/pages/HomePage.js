
import { ImageMain } from "../image/ImageMain";
import { useParams } from "react-router-dom";
import { LogoHeader } from "../image/LogoHeader";

//851934681333

export const HomePage = () => {
  const { artistName } = useParams();

  const images = [
  
    //2025
    {
      image: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/capella/capella.jpg",
      pageTo: "https://www.lacapella.barcelona/es/programacion/exposiciones/caca-banal/",
      artist: "majin",
      isDownload: true,
      text: "exhibition in La Capella with atractive_smithers.",
      year: "2025"
    },



    //2024


    {
      image: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/benyart/prova.jpg",
      pageTo: "/guerra_mundial",
      artist: "majin",
      isDownload: false,
      text: "video for ben yart's mixtape with dome.",
      year: "2024"
    },
    
    {
      image: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/foflas.jpg",
      pageTo: "/foflas",
      artist: "majin",
      isDownload: false,
      text: "AI generated shitpost with el foflas.",
      year: "2024"
    },
    {
      image: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat17.jpg",
      pageTo: "/f",
      artist: "majin",
      isDownload: false,
      text: "documentary of a festival in Navarra with dome.  ",
      year: "2024"
    },
   
    {
      image: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat3.jpg",
      pageTo: "/inout",
      artist: "polcrosas",
      isDownload: false,
      text: 'exhibition in Tabakalera for my final degree MA thesis.  ',
      year: "2023"
    },

    {
      image: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat16.jpg",
      pageTo: "/juego_del_telefono",
      artist: "polcrosas",
      isDownload: false, 
      text: "video essay about language and cameras.  ",
      year: "2023"
    },
    {
      image: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat18.jpg",
      pageTo: "/cundits_en_euskalherria",
      artist: "polcrosas",
      isDownload: false, 
      text: "documentary about my friends music tour.  ",
      year: "2023"
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
      image: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat6.jpg",
      pageTo: "/tapetum_lucidum",
      artist: "majin",
      isDownload: false,
      text: "custom dreambooth model images of dogs with dome.  ",
      year: "2023"
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
      image: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat4.jpg",
      pageTo: "/mu",
      artist: "polcrosas",
      isDownload: false,
      text: "monographic artist book.  ",
      year: "2022"
    },

    {
      image: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat7.jpg",
      pageTo: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/pol/pdfs/carglass.pdf",
      artist: "polcrosas",
      isDownload: true,
      text: "atractive_smithers fanzine.  ",
      year: "2022"
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
      image: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat8.jpg",
      pageTo: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/pol/pdfs/cundits.pdf",
      artist: "polcrosas",
      isDownload: true,
      text: "els cundits fanzine.  ",
      year: "2021"
    },

    {
      image: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat5.jpg",
      pageTo: "https://artefactosnativos.com/hiperpublicacion.html",
      artist: "majin",
      isDownload: true,
      text: "24h nonstop publishing residency with eze.  ",
      year: "2021"
    },

    {
      image: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat15.jpg",
      pageTo: "/vertical_but_rather_be_horizontal",
      artist: "polcrosas",
      isDownload: false,
      text: "video poem with cameras and the sea.  ",
      year: "2021"
    },

    {
      image: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat10.jpg",
      pageTo: "/tarot",
      artist: "polcrosas",
      isDownload: false,
      text: "tarot set of dog panoramics.  ",
      year: "2021"
    },

 //2020

    {
      image: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat12.jpg",
      pageTo: "/rxtx",
      artist: "polcrosas",
      isDownload: false,
      text: "virtual flamethrower in an online exhibition.  ",
      year: "2020"
    },

    {
      image: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat.jpg",
      pageTo: "/serbal",
      artist: "majin",
      isDownload: false,
      text: "fanzine made during lockdown.  ",
      year: "2020"
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
      image: "https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat13.jpg",
      pageTo: "/cosas_de_casa",
      artist: "polcrosas",
      isDownload: false,
      text: "video series made at home.  ",
      year: "2020"
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
              year={image.year}
            />
          ))}
        </div>
      </div>
    </div>
  );
}; 