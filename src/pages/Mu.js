import React from 'react';
import { Link } from 'react-router-dom';

const Mu = () => {
  const images = [
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/mu/mu%202.JPG',
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/mu/mu_2%202.JPG',
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/mu/mu_3%202.JPG',
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/mu/mu_4%202.JPG',
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/mu/mu_5%202.JPG',
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/mu/mu_7%202.JPG',
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/mu/mu_8%202.JPG',
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/mu/mu_9%202.JPG',
  ];

  return (
    <div className="container">
      <header className="header">
        <Link to="/">
          <h1>pol crosas</h1>
        </Link>
      </header>
      
      <div className="detail-page">
        <Link to="/" className="back-link">← back to home</Link>
        
        <div className="detail-content">
          <h2>mu (無)</h2>
          <p>monographic artist book (2022)</p>
          
          <div className="video-container aspect-4-3" style={{ paddingBottom: '75%' }}>
            <iframe
              src="https://www.youtube.com/embed/KAbClv5RVEM"
              title="Mu"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          
          <div className="image-gallery">
            {images.map((img, index) => (
              <img key={index} src={img} alt={`Mu ${index + 1}`} />
            ))}
          </div>
          
          <div style={{ display: 'flex', gap: '40px', margin: '30px 0', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 500px', lineHeight: '1.8' }}>
              <p style={{ marginBottom: '15px' }}>
                <strong>CITA APA:</strong> La mort i la primavera (1986). Barcelona: Fundació Mercè Rodoreda, 1997. Robat a M. Rodoreda i a A. Balasch.
              </p>
              <p style={{ marginBottom: '15px', fontStyle: 'italic' }}>
                Només aquesta pena d'adormir-se i de despertar-se i de sentir-se la vida que no saps d'on et ve i que fugirà sense que sàpigues per què te la van donar i per què te la prenen. Té, això, això i això. I ara apa.
              </p>
              
              <p style={{ marginBottom: '15px' }}>
                In <em>The Gateless Barrier,</em> "無" is exemplified as the door to enlightenment. One of its koans:
              </p>
              <p style={{ marginBottom: '15px' }}>
                Monk asks: Does a dog have Buddha nature or not?<br />
                Teacher says: None (無).
              </p>
              <p style={{ marginBottom: '15px' }}>
                This nothing cannot be translated as a negative response, but perhaps as a non-applicable question, an intrinsic nonsense in the proposal. It could be assimilated to point seven of Ludwig Wittgenstein's Tractatus Logico Philosophicus:
              </p>
              <p style={{ marginBottom: '15px', fontStyle: 'italic' }}>
                "On what cannot be spoken, one must remain silent."
              </p>
              
              <p style={{ marginBottom: '15px' }}>
                Little by little, in the history of Western humanist thought, notions about language have been crumbling, and through its cracks, the viscosity of the unspeakable has begun to ooze. Science tends to come later, like a broom car with Diogenes syndrome, and ten years after the tractatus, Kurt Gödel would publish his Incompleteness Theorems as Wittgenstein's simile of mathematical logic, axiomatically demonstrating that any axiomatic theory is incomplete, or what is the same, that there are undecidable propositions in "the language of God". In his defense, it's not as if Wittgenstein is punctual either; 18 centuries earlier, Nāgārjuna in his Fundamentals of the Middle Way wrote:
              </p>
              <p style={{ marginBottom: '15px', fontStyle: 'italic' }}>
                "It has been taught that there is a self and even that there is no self. But the Buddha has not taught the self or the non-self. When the object of language ceases, the object of thought ceases. Like nirvana, the nature of all things lacks arising and passing away."
              </p>
              
              <p style={{ marginBottom: '15px' }}>
                I suppose the impulse of meaninglessness has accompanied us since the first man, tightrope walking at ground level between animality and divinity on the rope thrown by the word. This ultra-verborreic circular exercise around the debris of dialectic is symptomatic of the Western condition, like a Beckettian exercise, a clamor of an emptied word. Beckett in Endgame:
              </p>
              <p style={{ marginBottom: '15px', fontStyle: 'italic' }}>
                "I use the words you taught me! If they no longer want to mean anything, teach me others!"
              </p>
              
              <p style={{ marginBottom: '15px' }}>
                This notion of the uncontrolled word nevertheless persists in Western consciousness, contrasting interestingly with the way of refining work towards simplicity that we often see in Eastern production. The trace of Wu Wei in the enso, the temporality and finitude in On Kawara, the same cinema of Ozu... These two ways of doing, while they could exemplify the Shakespearian duality, have a common background. Both share a materialization of a life force, or what is the same, an occupation of time. A falsely circular time, rather helical, constricting the body like a boa.
              </p>
              <p style={{ marginBottom: '15px' }}>
                Douglas Hofstadter poses MU as a logical puzzle without an answer, which is solved only by leaving the formulation of the system itself. This inward flight reminds me of the "fugitive freedom" that St. Augustine longs for in his Confessions:
              </p>
              <p style={{ marginBottom: '15px', fontStyle: 'italic' }}>
                "And if I tried to install my soul in God so that it could rest, I would slip into the void and collapse back onto myself. My soul was for me a miserable place where it was impossible to be, but from where I couldn't escape either. Where would I go fleeing from myself? Where would I go without following my own footsteps?"
              </p>
              
              <p style={{ marginBottom: '15px' }}>
                Flee, from what? From boredom? Giacomo Leopardi speaks of noia or tedium as an absence that fills the void. A void in the human soul that ignites desire, but also a final void that, without warning, creates where there was nothing before. A creative impulse without origin that can resemble the dance of particles and antiparticles that materialize and disappear constantly in the void, like an infinite struggle of being against nothingness. This ontological chance and indeterminacy that we are only beginning to accept can also be seen in Young's iconic double-slit experiment, which could give an interesting twist to the concept of action painting if you let it overexpose by repeating it enough times. It would end up creating, by probability, a monochrome, following a long tradition in 20th-century art. On the right, an illustration.
              </p>
              
              <p style={{ marginBottom: '15px' }}>
                Mu is also, according to the CCRU (or Khrú, devil of the apocalypse), a Transitional Pacific civilization linked to Lemurian influence, a proposal by Ernst Haekel about what could have been the beginning of civilization 66 million years ago in a submerged area near Madagascar. Currently, claims about the existence of Mu (nothing) are considered unfounded, although Aleister Crowley rescued it and there are Buddhist texts that mention a lost land in the Pacific. The connection between Crowley and Buddhism is not trivial, as his famous phrase "There is no god but man" is nothing more than a reformulation of the koan: "Kill Buddha if Buddha exists elsewhere. Kill him because you should assume your own Buddha nature," which Death Grips later reclaimed in their: "I am the beast I worship".
              </p>
              
              <p style={{ marginBottom: '15px' }}>
                So is Zen anti-humanist?
              </p>
              <p style={{ marginBottom: '15px' }}>
                無。
              </p>
              
              <p style={{ marginBottom: '15px' }}>
                This negative theology could also be applied to the intricacies of language as an Adornian approach to mystery and nonsense. I have conflicts when writing to accompany a work that grows on its own, and more so when thinking about how Derrida speaks of the truth of art in his non-saying (in other words, that the difference between form and content is trivial). I am more interested in this work simply pointing out the fluctuations of reality that accompany life, with all its vicissitudes and ruptures.
              </p>
            </div>
            
            <div style={{ flex: '0 0 300px', maxWidth: '300px' }}>
              <img
                src="https://majindonpatch-public.s3.eu-west-2.amazonaws.com/mu/extramu2.png"
                alt="Mu extra"
                style={{ width: '100%', border: '1px solid #000' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mu;
