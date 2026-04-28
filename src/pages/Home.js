import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const tarotImages = [
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_0.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_1.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_2.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_3.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_4.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_5.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_7.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_8.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_9.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_10.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_11.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_12.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_13.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_14.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_15.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_16.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_17.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_18.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_19.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_20.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_21.png',
];

const Home = () => {
  const navigate = useNavigate();
  const [bioOpen, setBioOpen] = useState(false);
  const [openProject, setOpenProject] = useState(null);
  const [tarotQuestion, setTarotQuestion] = useState('');
  const [tarotSpread, setTarotSpread] = useState([]);
  const [tarotError, setTarotError] = useState('');
  const [itemsPerRow, setItemsPerRow] = useState(3);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [tarotImagesLoading, setTarotImagesLoading] = useState(false);
  const [inoutImagesLoaded, setInoutImagesLoaded] = useState(false);
  const [tapetumImagesLoaded, setTapetumImagesLoaded] = useState(false);
  const [muImagesLoaded, setMuImagesLoaded] = useState(false);
  const dropdownRef = useRef(null);
  
  // Check for preferred start page (for iOS PWA)
  useEffect(() => {
    const preferredPage = localStorage.getItem('preferredStartPage');
    // Only redirect if coming from standalone mode (PWA) and on home page
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                         window.navigator.standalone === true;
    
    if (isStandalone && preferredPage === '/mtg') {
      navigate('/mtg');
    }
  }, [navigate]);
  
  // Preload all project images
  useEffect(() => {
    const imageUrls = projects.map(p => p.image);
    let loaded = 0;
    
    const loadImage = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loaded++;
          setLoadedCount(loaded);
          resolve();
        };
        img.onerror = () => {
          loaded++;
          setLoadedCount(loaded);
          resolve(); // Still resolve to not block the loading screen
        };
        img.src = url;
      });
    };
    
    Promise.all(imageUrls.map(loadImage)).then(() => {
      setImagesLoaded(true);
    });
  }, []);
  
  // Update itemsPerRow based on actual grid behavior
  // CSS uses: grid-template-columns: repeat(auto-fill, minmax(400px, 1fr))
  useEffect(() => {
    const updateItemsPerRow = () => {
      const containerWidth = window.innerWidth - 40; // Account for margins (20px each side)
      const minCardWidth = 400;
      
      // Calculate how many 400px cards can fit
      const columns = Math.floor(containerWidth / minCardWidth);
      
      // Ensure at least 1 column
      setItemsPerRow(Math.max(1, columns));
    };
    
    // Set initial value
    updateItemsPerRow();
    
    // Add event listener for window resize
    window.addEventListener('resize', updateItemsPerRow);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateItemsPerRow);
  }, []);
  
  const projects = [
    // 2025
    {
      id: 'capella',
      title: 'caca banal',
      description: 'daniel moreno roldán exhibition with atractive_smithers in la capella',
      year: '2025',
      image: 'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/capella/capella.jpg',
      link: 'https://www.lacapella.barcelona/es/programacion/exposiciones/caca-banal/',
      isExternal: true,
      buttonLabel: 'go to la capella'
    },
    
    // 2024
    {
      id: 'guerra_mundial',
      title: 'guerra mundial',
      description: "video for ben yart's mixtape with dome",
      year: '2024',
      image: 'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/benyart/prova.jpg',
      isExternal: false,
      content: {
        videos: ['https://www.youtube.com/embed/84JsUfDeSo0']
      }
    },
    {
      id: 'foflas',
      title: 'foflas mixtape',
      description: 'ai generated shitpost with atractive_smithers',
      year: '2024',
      image: 'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/foflas.jpg',
      isExternal: false,
      content: {
        videos: ['https://www.youtube.com/embed/ZHJE_b56_HM']
      }
    },
    {
      id: 'f',
      title: 'f. barranco, el regreso de la filoxera',
      description: 'festival aftermovie with dome',
      year: '2024',
      image: 'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat17.jpg',
      isExternal: false,
      content: {
        videos: ['https://www.youtube.com/embed/tCDvDmz59Qg']
      }
    },
    
    // 2023
    {
      id: 'inout',
      title: 'inout',
      description: 'final degree ma thesis exhibited in tabakalera',
      year: '2023',
      image: 'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat3.jpg',
      isExternal: false,
      content: {
        text: '<p style="line-height: 1.8; margin-bottom: 20px">INOUT is a hostel in Vallvidrera, Barcelona—a non-profit social initiative where 90% of the workforce consists of neurodivergent individuals or people with functional diversity. This exhibition investigates the liminal spaces between inside and outside, figure and ground, reality and simulacrum, or individual and language, utilizing INOUT as both a documentary source and a formal reference. This research aims to showcase objects that are simultaneously documentary and self-referential; objects exploring the spaces where language and chance collide—simulacra of the "outside" that never fully emancipates itself, never truly becoming "outside" at all.</p><p style="line-height: 1.8; margin-bottom: 20px">In this sense, INOUT manifests these constant dualities. Rather than being divided by a fixed border, they are separated by an ever-shifting coastline—infinite yet malleable—where waves crashing against rocks perpetually construct and reconstruct the frontier.</p>',
        videos: ['https://www.youtube.com/embed/gRGq4XQya_A', 'https://www.youtube.com/embed/UeFHuBp10QM'],
        images: [
          'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-2.jpg',
          'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-3.jpg',
          'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-8.jpg',
          'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-13.jpg',
          'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-11.jpg',
          'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-18.jpg',
          'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-21.jpg',
          'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-23.jpg',
          'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-26.jpg',
          'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-35.jpg',
          'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-41.jpg',
          'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-42.jpg',
          'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-58.jpg',
          'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-75.jpg',
          'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-84.jpg',
          'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-86.jpg',
          'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-95.jpg',
          'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-136.jpg',
          'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-142.jpg',
          'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-152.jpg',
          'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-168.jpg',
          'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-177.jpg',
          'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-184.jpg',
          'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-225.jpg',
        ]
      }
    },
    {
      id: 'juego_del_telefono',
      title: 'juego del teléfono',
      description: 'video essay about language and cameras',
      year: '2023',
      image: 'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat16.jpg',
      isExternal: false,
      content: {
        videos: ['https://www.youtube.com/embed/n0BoP_HJkQ0']
      }
    },
    {
      id: 'cundits_euskalherria',
      title: 'els cundits en euskalherria',
      description: 'documentary about my friends music tour',
      year: '2023',
      image: 'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat18.jpg',
      isExternal: false,
      content: {
        videos: ['https://www.youtube.com/embed/3MDoXISPsZM']
      }
    },
    {
      id: 'tapetum',
      title: 'tapetum lucidum',
      description: 'custom dreambooth model images of dogs with dome',
      year: '2023',
      image: 'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat6.jpg',
      isExternal: false,
      content: {
        text: '<strong>A cluster of rats gnawing at the edges of six or seven undercrypts, <em>tapetum lucidum</em> is a text-to-image Stable Diffusion model trained out of pictures of shiny-eyed lurking mammals. Their results come to the surface with an aura of prejudices; camcorder .mp4 of a night-vision holy guinea pig, etc. Not the prompts but the implication of the model\'s basis: <em>tapetum lucidum</em> resembles a BDSM club plagued by the creatures of the night.</strong>',
        videos: ['https://www.youtube.com/embed/hcHudWPNR5Y', 'https://www.youtube.com/embed/grVdAwhsiVg'],
        text2: '<strong>The model was created by Domenec Miralles. The videos, images, and forms of exhibition are an ongoing effort enacted by majin don patch (Domenec Miralles + Pol Crosas). Different variations of tapetum lucidum have been reified into physical existence in exhibitions and concerts, presented as site-specific holographic fans, metal sculptures of dogs or cats, small TFT screens, and others.</strong>',
        images: Array.from({ length: 16 }, (_, i) => i + 1)
          .filter(num => num !== 6)
          .map(num => `https://majindonpatch-public.s3.eu-west-2.amazonaws.com/tapetum_lucidum/tapetum_pics/${num}.jpg`),
        text3: '<strong>1st of June of 2023, Elías Querejeta Zine Eskola. While showing him <em>tapetum lucidum</em>, Pol Crosas interviews Pedro Costa about the nature of artificial intelligence generated images and how they dialogue with contemporary cinema.</strong>',
        pdf: 'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/tapetum_lucidum/acabat_alta.pdf'
      }
    },
    
    // 2022
    {
      id: 'mu',
      title: 'mu',
      description: 'monographic artist book',
      year: '2022',
      image: 'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat4.jpg',
      isExternal: false,
      content: {
        videos: ['https://www.youtube.com/embed/KAbClv5RVEM'],
        images: [
          'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/mu/mu%202.JPG',
          'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/mu/mu_2%202.JPG',
          'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/mu/mu_3%202.JPG',
          'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/mu/mu_4%202.JPG',
          'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/mu/mu_6%202.JPG',
          'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/mu/mu_5%202.JPG',
          'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/mu/mu_7%202.JPG',
          'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/mu/mu_8%202.JPG',
          'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/mu/mu_9%202.JPG',
        ],
        text: `<div style="display: flex; gap: 40px; margin: 30px 0; align-items: flex-start; flex-wrap: wrap;">
  <div style="flex: 1 1 500px; line-height: 1.8;">
    <p style="margin-bottom: 15px; font-style: italic;">Només aquesta pena d'adormir-se i de despertar-se i de sentir-se la vida que no saps d'on et ve i que fugirà sense que sàpigues per què te la van donar i per què te la prenen. Té, això, això i això. I ara apa.</p>
    <p style="margin-bottom: 15px">CITA APA: La mort i la primavera (1986). Barcelona: Fundació Mercè Rodoreda, 1997. Robat a M. Rodoreda i a A. Balasch.</p>
    
    <p style="margin-bottom: 15px">In <em>The Gateless Barrier,</em> "無" is exemplified as the door to enlightenment. One of its koans:</p>
    <p style="margin-bottom: 15px">Monk asks: Does a dog have Buddha nature or not?<br />Teacher says: None (無).</p>
    <p style="margin-bottom: 15px">This nothing cannot be translated as a negative response, but perhaps as a non-applicable question, an intrinsic nonsense in the proposal. It could be assimilated to point seven of Ludwig Wittgenstein's Tractatus Logico Philosophicus:</p>
    <p style="margin-bottom: 15px; font-style: italic;">"On what cannot be spoken, one must remain silent."</p>
    
    <p style="margin-bottom: 15px">Little by little, in the history of Western humanist thought, notions about language have been crumbling, and through its cracks, the viscosity of the unspeakable has begun to ooze. Science tends to come later, like a broom car with Diogenes syndrome, and ten years after the tractatus, Kurt Gödel would publish his Incompleteness Theorems as Wittgenstein's simile of mathematical logic, axiomatically demonstrating that any axiomatic theory is incomplete, or what is the same, that there are undecidable propositions in "the language of God". In his defense, it's not as if Wittgenstein is punctual either; 18 centuries earlier, Nāgārjuna in his Fundamentals of the Middle Way wrote:</p>
    <p style="margin-bottom: 15px; font-style: italic;">"It has been taught that there is a self and even that there is no self. But the Buddha has not taught the self or the non-self. When the object of language ceases, the object of thought ceases. Like nirvana, the nature of all things lacks arising and passing away."</p>
    
    <p style="margin-bottom: 15px">I suppose the impulse of meaninglessness has accompanied us since the first man, tightrope walking at ground level between animality and divinity on the rope thrown by the word. This ultra-verborreic circular exercise around the debris of dialectic is symptomatic of the Western condition, like a Beckettian exercise, a clamor of an emptied word. Beckett in Endgame:</p>
    <p style="margin-bottom: 15px; font-style: italic;">"I use the words you taught me! If they no longer want to mean anything, teach me others!"</p>
    
    <p style="margin-bottom: 15px">This notion of the uncontrolled word nevertheless persists in Western consciousness, contrasting interestingly with the way of refining work towards simplicity that we often see in Eastern production. The trace of Wu Wei in the enso, the temporality and finitude in On Kawara, the same cinema of Ozu... These two ways of doing, while they could exemplify the Shakespearian duality, have a common background. Both share a materialization of a life force, or what is the same, an occupation of time. A falsely circular time, rather helical, constricting the body like a boa.</p>
    <p style="margin-bottom: 15px">Douglas Hofstadter poses MU as a logical puzzle without an answer, which is solved only by leaving the formulation of the system itself. This inward flight reminds me of the "fugitive freedom" that St. Augustine longs for in his Confessions:</p>
    <p style="margin-bottom: 15px; font-style: italic;">"And if I tried to install my soul in God so that it could rest, I would slip into the void and collapse back onto myself. My soul was for me a miserable place where it was impossible to be, but from where I couldn't escape either. Where would I go fleeing from myself? Where would I go without following my own footsteps?"</p>
    
    <p style="margin-bottom: 15px">Flee, from what? From boredom? Giacomo Leopardi speaks of noia or tedium as an absence that fills the void. A void in the human soul that ignites desire, but also a final void that, without warning, creates where there was nothing before. A creative impulse without origin that can resemble the dance of particles and antiparticles that materialize and disappear constantly in the void, like an infinite struggle of being against nothingness. This ontological chance and indeterminacy that we are only beginning to accept can also be seen in Young's iconic double-slit experiment, which could give an interesting twist to the concept of action painting if you let it overexpose by repeating it enough times. It would end up creating, by probability, a monochrome, following a long tradition in 20th-century art. On the right, an illustration.</p>
    
    <p style="margin-bottom: 15px">Mu is also, according to the CCRU (or Khrú, devil of the apocalypse), a Transitional Pacific civilization linked to Lemurian influence, a proposal by Ernst Haekel about what could have been the beginning of civilization 66 million years ago in a submerged area near Madagascar. Currently, claims about the existence of Mu (nothing) are considered unfounded, although Aleister Crowley rescued it and there are Buddhist texts that mention a lost land in the Pacific. The connection between Crowley and Buddhism is not trivial, as his famous phrase "There is no god but man" is nothing more than a reformulation of the koan: "Kill Buddha if Buddha exists elsewhere. Kill him because you should assume your own Buddha nature," which Death Grips later reclaimed in their: "I am the beast I worship".</p>
    
    <p style="margin-bottom: 15px">So is Zen anti-humanist?</p>
    <p style="margin-bottom: 15px">無。</p>
    
    <p style="margin-bottom: 15px">This negative theology could also be applied to the intricacies of language as an Adornian approach to mystery and nonsense. I have conflicts when writing to accompany a work that grows on its own, and more so when thinking about how Derrida speaks of the truth of art in his non-saying (in other words, that the difference between form and content is trivial). I am more interested in this work simply pointing out the fluctuations of reality that accompany life, with all its vicissitudes and ruptures.</p>
  </div>
  
  <div style="flex: 0 0 300px; max-width: 300px;">
    <img src="https://majindonpatch-public.s3.eu-west-2.amazonaws.com/mu/extramu2.png" alt="Mu extra" style="width: 100%; border: 1px solid #000" />
  </div>
</div>`
      }
    },
    {
      id: 'carglass',
      title: 'carglass',
      description: 'atractive_smithers fanzine',
      year: '2022',
      image: 'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat7.jpg',
      link: 'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/pol/pdfs/carglass.pdf',
      isExternal: true,
      buttonLabel: 'download pdf'
    },
    
    // 2021
    {
      id: 'cundits',
      title: 'els cundits',
      description: 'els cundits fanzine',
      year: '2021',
      image: 'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat8.jpg',
      link: 'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/pol/pdfs/cundits.pdf',
      isExternal: true,
      buttonLabel: 'download pdf'
    },
    {
      id: 'hiperpublicacion',
      title: 'hiperpublicación',
      description: '24h nonstop publishing residency with eze',
      year: '2021',
      image: 'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat5.jpg',
      link: 'https://artefactosnativos.com/hiperpublicacion.html',
      isExternal: true,
      buttonLabel: 'go to artefactos nativos'
    },
    {
      id: 'vertical',
      title: 'vertical',
      description: 'video poem with cameras and the sea',
      year: '2021',
      image: 'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat15.jpg',
      isExternal: false,
      content: {
        videos: ['https://www.youtube.com/embed/-lyEMlVZGnI']
      }
    },
    {
      id: 'tarot',
      title: 'tarot',
      description: 'tarot set of dog panoramics',
      year: '2021',
      image: 'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat10.jpg',
      isExternal: false,
      content: {
        interactive: 'tarot'
      }
    },
    
    // 2020
    {
      id: 'rxtx',
      title: 'rxtx',
      description: 'virtual flamethrower in an online exhibition',
      year: '2020',
      image: 'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat12.jpg',
      isExternal: false,
      content: {
        videos: ['https://www.youtube.com/embed/s9ZI-0z4iNs']
      }
    },
    {
      id: 'serbal',
      title: 'serbal.pntic.mec.es',
      description: 'fanzine made during lockdown',
      year: '2020',
      image: 'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat.jpg',
      isExternal: false,
      content: {
        image: 'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/serbal/serbal_pic.jpg',
        text: '<p style="line-height: 1.6; margin-bottom: 20px"><em>Et sic in infinitum,</em> is born in 1617 in the treatise <em>Utriusque cosmi maioris scilicet et minoris metaphysica, physica atque technica historia in duo volumina secundum cosmi differentiam divisa</em> by the English Rosicrucian physician, inventor, astrologer, urinomancer, geomancer, and metaphysician, Robert Fludd (1574-1637), whom we conjure as the guardian angel of this fanzine. On page 26 surrounded by four <em>et sic in infinitums,</em> we encounter a black square delineating a map of primordial matter or the primordial being before creation.</p>',
        links: [
          { text: 'instagram', url: 'https://www.instagram.com/serbal.pntic.mec.es/' },
          { text: 'website', url: 'https://serbalpnticmec.wordpress.com' },
          { text: 'purchase', url: 'https://fatbottombooks.com/books/fanzine/serbalpnticmeces-et-sic-infinitum' }
        ],
        videos: ['https://www.youtube.com/embed/auos2LvZVBQ']
      }
    },
    {
      id: 'cosas_de_casa',
      title: 'cosas de casa',
      description: 'video series made at home',
      year: '2020',
      image: 'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/website2/jpg_quadrat/proves_cuadrat13.jpg',
      isExternal: false,
      content: {
        videos: ['https://www.youtube.com/embed/agq5to_akAQ', 'https://www.youtube.com/embed/OiY2K_TKBRU', 'https://www.youtube.com/embed/MWr8QDxJ0tU']
      }
    }
  ];

  // Calculate how many blank squares needed to fill the row
  const blanksNeeded = itemsPerRow - (projects.length % itemsPerRow);
  const blankSquares = blanksNeeded === itemsPerRow ? [] : Array(blanksNeeded).fill(null);

  const handleProjectClick = (project) => {
    setBioOpen(false); // Close bio when opening a project
    const newOpenProject = openProject === project.id ? null : project.id;
    setOpenProject(newOpenProject);
    
    // If opening inout project, preload its images
    if (newOpenProject === 'inout') {
      setInoutImagesLoaded(false);
      const inoutProject = projects.find(p => p.id === 'inout');
      if (inoutProject?.content?.images) {
        let loadedInoutCount = 0;
        const totalInoutImages = inoutProject.content.images.length;
        
        const loadInoutImage = (url) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              loadedInoutCount++;
              if (loadedInoutCount === totalInoutImages) {
                setInoutImagesLoaded(true);
              }
              resolve();
            };
            img.onerror = () => {
              loadedInoutCount++;
              if (loadedInoutCount === totalInoutImages) {
                setInoutImagesLoaded(true);
              }
              resolve();
            };
            img.src = url;
          });
        };
        
        Promise.all(inoutProject.content.images.map(loadInoutImage));
      }
    }
    
    // If opening tapetum project, preload its images
    if (newOpenProject === 'tapetum') {
      setTapetumImagesLoaded(false);
      const tapetumProject = projects.find(p => p.id === 'tapetum');
      if (tapetumProject?.content?.images) {
        let loadedTapetumCount = 0;
        const totalTapetumImages = tapetumProject.content.images.length;
        
        const loadTapetumImage = (url) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              loadedTapetumCount++;
              if (loadedTapetumCount === totalTapetumImages) {
                setTapetumImagesLoaded(true);
              }
              resolve();
            };
            img.onerror = () => {
              loadedTapetumCount++;
              if (loadedTapetumCount === totalTapetumImages) {
                setTapetumImagesLoaded(true);
              }
              resolve();
            };
            img.src = url;
          });
        };
        
        Promise.all(tapetumProject.content.images.map(loadTapetumImage));
      }
    }
    
    // If opening mu project, preload its images
    if (newOpenProject === 'mu') {
      setMuImagesLoaded(false);
      const muProject = projects.find(p => p.id === 'mu');
      if (muProject?.content?.images) {
        let loadedMuCount = 0;
        const totalMuImages = muProject.content.images.length;
        
        const loadMuImage = (url) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              loadedMuCount++;
              if (loadedMuCount === totalMuImages) {
                setMuImagesLoaded(true);
              }
              resolve();
            };
            img.onerror = () => {
              loadedMuCount++;
              if (loadedMuCount === totalMuImages) {
                setMuImagesLoaded(true);
              }
              resolve();
            };
            img.src = url;
          });
        };
        
        Promise.all(muProject.content.images.map(loadMuImage));
      }
    }
  };

  const getProjectIndex = (projectId) => {
    return projects.findIndex(p => p.id === projectId);
  };

  const getDropdownRow = (projectId) => {
    const index = getProjectIndex(projectId);
    return Math.floor(index / itemsPerRow);
  };

  // Auto-scroll to dropdown when a project opens
  useEffect(() => {
    if (openProject && dropdownRef.current) {
      // Small delay to ensure dropdown is rendered
      setTimeout(() => {
        const dropdownTop = dropdownRef.current.getBoundingClientRect().top + window.pageYOffset;
        const offset = 87; // Offset to leave space for project cards above
        window.scrollTo({
          top: dropdownTop - offset,
          behavior: 'smooth'
        });
      }, 100);
    }
  }, [openProject]);

  const generateTarotSpread = () => {
    if (!tarotQuestion.trim()) {
      setTarotError('ask something smh...');
      return;
    }
    setTarotError('');
    setTarotImagesLoading(true);
    const shuffledDeck = [...tarotImages].sort(() => 0.5 - Math.random());
    const drawnCards = shuffledDeck.slice(0, 10);
    
    // Preload tarot images
    let loadedTarotCount = 0;
    const loadTarotImage = (url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          loadedTarotCount++;
          if (loadedTarotCount === drawnCards.length) {
            setTarotImagesLoading(false);
          }
          resolve();
        };
        img.onerror = () => {
          loadedTarotCount++;
          if (loadedTarotCount === drawnCards.length) {
            setTarotImagesLoading(false);
          }
          resolve();
        };
        img.src = url;
      });
    };
    
    Promise.all(drawnCards.map(loadTarotImage)).then(() => {
      setTarotSpread(drawnCards);
    });
  };

  const renderTarotInteractive = () => (
    <div>
      <div style={{ maxWidth: '400px', margin: '30px auto', textAlign: 'center' }}>
        <p style={{ marginBottom: '10px' }}>ask your question below:</p>
        <input
          type="text"
          value={tarotQuestion}
          onChange={(e) => setTarotQuestion(e.target.value)}
          placeholder="your question..."
          style={{
            padding: '10px',
            fontSize: '16px',
            width: '100%',
            marginBottom: '10px',
            border: '1px solid #000'
          }}
        />
        {tarotError && <p style={{ color: '#000', fontSize: '14px', marginBottom: '10px' }}>{tarotError}</p>}
        <button
          onClick={generateTarotSpread}
          style={{
            padding: '10px 20px',
            border: '1px solid #000',
            background: '#fff',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          spread
        </button>
      </div>

      {tarotImagesLoading && (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '75px', height: '75px' }}
          >
            <source src="/charging_gif.mp4" type="video/mp4" />
          </video>
        </div>
      )}

      {tarotSpread.length > 0 && !tarotImagesLoading && (
        <div className="tarot-spread-grid">
          <div style={{ gridColumn: '4', gridRow: '3' }}>
            <img src={tarotSpread[0]} alt="Card 1" style={{ width: '100%' }} />
          </div>
          <div style={{ gridColumn: '4', gridRow: '3', transform: 'rotate(90deg)' }}>
            <img src={tarotSpread[1]} alt="Card 2" style={{ width: '100%' }} />
          </div>
          <div style={{ gridColumn: '4', gridRow: '4' }}>
            <img src={tarotSpread[2]} alt="Card 3" style={{ width: '100%' }} />
          </div>
          <div style={{ gridColumn: '3', gridRow: '3' }}>
            <img src={tarotSpread[3]} alt="Card 4" style={{ width: '100%' }} />
          </div>
          <div style={{ gridColumn: '4', gridRow: '2' }}>
            <img src={tarotSpread[4]} alt="Card 5" style={{ width: '100%' }} />
          </div>
          <div style={{ gridColumn: '5', gridRow: '3' }}>
            <img src={tarotSpread[5]} alt="Card 6" style={{ width: '100%' }} />
          </div>
          <div style={{ gridColumn: '7', gridRow: '5' }}>
            <img src={tarotSpread[6]} alt="Card 7" style={{ width: '100%' }} />
          </div>
          <div style={{ gridColumn: '7', gridRow: '4' }}>
            <img src={tarotSpread[7]} alt="Card 8" style={{ width: '100%' }} />
          </div>
          <div style={{ gridColumn: '7', gridRow: '3' }}>
            <img src={tarotSpread[8]} alt="Card 9" style={{ width: '100%' }} />
          </div>
          <div style={{ gridColumn: '7', gridRow: '2' }}>
            <img src={tarotSpread[9]} alt="Card 10" style={{ width: '100%' }} />
          </div>
        </div>
      )}
    </div>
  );

  // Show loading screen while images are loading
  if (!imagesLoaded) {
    return (
      <div className="loading-screen">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="loading-video"
          controls={false}
          preload="auto"
          onLoadedData={(e) => e.target.play().catch(() => {})}
        >
          <source src="/charging_gif.mp4" type="video/mp4" />
        </video>
      </div>
    );
  }
  
  return (
    <div className="container">
      <header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '16px', fontWeight: 'bold' }}>pol crosas</h1>
        <button
          onClick={() => {
            setBioOpen(!bioOpen);
            setOpenProject(null); // Close any open project when opening bio
          }}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            opacity: bioOpen ? 0.5 : 1
          }}
        >
          about
        </button>
      </header>
      
      {/* Bio Section - Dropdown */}
      {bioOpen && (
        <div style={{
          border: '1px solid #000',
          borderTop: 'none',
          padding: '20px',
          marginBottom: '0'
        }}>
          <p style={{ marginBottom: '15px', lineHeight: '1.6' }}>
            pol crosas (b. 1999, barcelona) is an artist and curator whose practice encompasses film, publishing, artificial intelligence, and visual/digital arts. he holds a bachelor's degree in fine arts from the university of barcelona and an ma in curation and creation at elías querejeta zine eskola. he is a member of the obobo collective, working alongside domenec miralles and gustavo cilleruelo in the field of artificial intelligence-driven creation. he is also a member of atractive_smithers, barcelona based shitposting group.
          </p>
          <p style={{ marginBottom: '15px', lineHeight: '1.6' }}>
            pol has curated and exhibited in various spaces in barcelona, san sebastián, and london. he has created and installed publications, video pieces, and sculptures in venues such as tabakalera, colour factory london, arts libris, gallery46, among others. he has curated film cycles, collaborative publications, and concert series at arts santa mònica, tabakalera, rocío santa cruz, galeria dels àngels, dabadaba, and pumarejo, among others. he has published or self-published over 20 artist books, fanzines, catalogs, and comics.
          </p>
          <div className="bio-socials">
            <a href="https://www.instagram.com/huidaespectacular1999" target="_blank" rel="noreferrer">instagram</a>
            <a href="https://x.com/polcrosas" target="_blank" rel="noreferrer">twitter</a>
            <a href="https://vimeo.com/pol" target="_blank" rel="noreferrer">vimeo</a>
            <a href="https://www.youtube.com/@polcrosas" target="_blank" rel="noreferrer">youtube</a>
            <a href="mailto:pol.crosas@gmail.com">contact</a>
          </div>
        </div>
      )}
      
      <div className="grid">
        {projects.map((project, index) => {
          const currentRow = Math.floor(index / itemsPerRow);
          const openProjectRow = openProject ? getDropdownRow(openProject) : -1;
          const showDropdownAfter = openProject && currentRow === openProjectRow && (index + 1) % itemsPerRow === 0;
          const isLastProject = index === projects.length - 1;
          const isLastInRow = (index + 1) % itemsPerRow === 0;
          
          return (
            <React.Fragment key={project.id}>
              <div
                onClick={() => handleProjectClick(project)}
                className={`entry-card ${openProject === project.id ? 'active' : ''}`}
                style={{ cursor: 'pointer' }}
              >
                <img src={project.image} alt={project.title} />
                <div className="entry-info">
                  <div className="entry-title">{project.title}</div>
                  <div className="entry-description">{project.description}</div>
                  <div className="entry-year">{project.year}</div>
                </div>
              </div>
              
              {/* Add blank squares after last project if needed, before dropdown */}
              {isLastProject && blankSquares.map((_, blankIndex) => (
                <div key={`blank-${blankIndex}`} className="entry-card blank-square"></div>
              ))}
              
              {/* Show dropdown after the last item in the row (or after blank squares for last row) */}
              {(showDropdownAfter || (isLastProject && openProject && currentRow === openProjectRow)) && (
                <div className="project-dropdown" ref={dropdownRef}>
                  <div className="dropdown-content">
                    {/* Handle external projects with button */}
                    {projects.find(p => p.id === openProject)?.isExternal ? (
                      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                        <a
                          href={projects.find(p => p.id === openProject).link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-block',
                            padding: '15px 30px',
                            border: '1px solid #000',
                            fontSize: '16px',
                            textDecoration: 'none',
                            color: '#000',
                            background: '#fff',
                            cursor: 'pointer'
                          }}
                        >
                          {projects.find(p => p.id === openProject).buttonLabel}
                        </a>
                      </div>
                    ) : projects.find(p => p.id === openProject)?.content && (
                      <>
                        {projects.find(p => p.id === openProject).content.interactive === 'tarot' ? (
                          renderTarotInteractive()
                        ) : (
                          <>
                            {openProject === 'serbal' && projects.find(p => p.id === openProject).content.text && projects.find(p => p.id === openProject).content.image ? (
                              <div className="serbal-layout">
                                <div className="serbal-content">
                                  <div style={{ lineHeight: '1.6', marginBottom: '20px' }} dangerouslySetInnerHTML={{ __html: projects.find(p => p.id === openProject).content.text }} />
                                  {projects.find(p => p.id === openProject).content.links && (
                                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                      {projects.find(p => p.id === openProject).content.links.map((link, i) => (
                                        <a
                                          key={i}
                                          href={link.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          style={{ padding: '10px 20px', border: '1px solid #000', display: 'inline-block' }}
                                        >
                                          {link.text}
                                        </a>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                <img
                                  src={projects.find(p => p.id === openProject).content.image}
                                  alt={projects.find(p => p.id === openProject).title}
                                  className="serbal-image"
                                />
                              </div>
                            ) : (
                              <>
                                {projects.find(p => p.id === openProject).content.text && (
                                  <div style={{ marginBottom: '20px', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: projects.find(p => p.id === openProject).content.text }} />
                                )}
                            
                                {projects.find(p => p.id === openProject).content.image && (
                                  <img
                                    src={projects.find(p => p.id === openProject).content.image}
                                    alt={projects.find(p => p.id === openProject).title}
                                    style={{ width: '100%', maxWidth: '600px', marginBottom: '20px' }}
                                  />
                                )}
                                
                                {projects.find(p => p.id === openProject).content.links && (
                                  <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                    {projects.find(p => p.id === openProject).content.links.map((link, i) => (
                                      <a
                                        key={i}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ padding: '10px 20px', border: '1px solid #000', display: 'inline-block' }}
                                      >
                                        {link.text}
                                      </a>
                                    ))}
                                  </div>
                                )}
                              </>
                            )}
                            
                            {projects.find(p => p.id === openProject).content.videos && (
                          openProject === 'cosas_de_casa' ? (
                            <div className="cosas-de-casa-grid">
                              {projects.find(p => p.id === openProject).content.videos.map((video, i) => (
                                <div key={i} className="video-container">
                                  <iframe
                                    src={video}
                                    title={`${projects.find(p => p.id === openProject).title} ${i + 1}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  />
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="dropdown-videos">
                              {projects.find(p => p.id === openProject).content.videos.map((video, i) => (
                                <div key={i} className={`video-container ${openProject === 'foflas' ? 'squared' : ''} ${openProject === 'f' || openProject === 'mu' ? 'aspect-4-3' : ''}`}>
                                  <iframe
                                    src={video}
                                    title={`${projects.find(p => p.id === openProject).title} ${i + 1}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  />
                                </div>
                              ))}
                            </div>
                          )
                        )}
                        
                        {projects.find(p => p.id === openProject).content.text2 && (
                          <div style={{ marginBottom: '20px', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: projects.find(p => p.id === openProject).content.text2 }} />
                        )}
                        
                        {projects.find(p => p.id === openProject).content.images && (
                          <>
                            {((openProject === 'inout' && !inoutImagesLoaded) || (openProject === 'tapetum' && !tapetumImagesLoaded) || (openProject === 'mu' && !muImagesLoaded)) ? (
                              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                <video
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                  style={{ width: '75px', height: '75px' }}
                                >
                                  <source src="/charging_gif.mp4" type="video/mp4" />
                                </video>
                              </div>
                            ) : (
                              <div className="image-gallery">
                                {projects.find(p => p.id === openProject).content.images.map((img, i) => (
                                  <img key={i} src={img} alt={`${projects.find(p => p.id === openProject).title} ${i + 1}`} />
                                ))}
                              </div>
                            )}
                          </>
                        )}
                        
                        {projects.find(p => p.id === openProject).content.text3 && (
                          <div style={{ marginBottom: '20px', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: projects.find(p => p.id === openProject).content.text3 }} />
                        )}
                        
                        {projects.find(p => p.id === openProject).content.pdf && (
                          <a
                            href={projects.find(p => p.id === openProject).content.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: 'inline-block', padding: '10px 20px', border: '1px solid #000', marginTop: '10px' }}
                          >
                            download pdf
                          </a>
                        )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      
      {/* Bottom row with logos - full width */}
      <div className="logos-container">
        <img
          src="https://majindonpatch-public.s3.eu-west-2.amazonaws.com/capella/logos.png"
          alt="logos"
        />
      </div>
    </div>
  );
};

export default Home;
