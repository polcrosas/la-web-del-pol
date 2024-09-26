import React from "react";
import { LogoHeader } from "../../image/LogoHeader";
import YouTube from "react-youtube";
import { Carousel } from "@mantine/carousel";
import { loadS3Image } from "../../helpers/Functions";

export const Mu = () => {
  return (
    <div className="">
      <LogoHeader />

      <div className="grid md:grid-cols-1 lg:grid-cols-2 mt-8">
        <div className="mt-8 ml-8 video-container mb-8">
          <YouTube videoId={"KAbClv5RVEM"} />
        </div>
        <Carousel className="mr-8">
          <Carousel.Slide>
            <img src={loadS3Image("mu 2.JPG", "mu")} alt="mu_pics"></img>
          </Carousel.Slide>
          <Carousel.Slide>
            <img src={loadS3Image("mu_2 2.JPG", "mu")} alt="mu_pics"></img>
          </Carousel.Slide>
          <Carousel.Slide>
            <img src={loadS3Image("mu_3 2.JPG", "mu")} alt="mu_pics"></img>
          </Carousel.Slide>
          <Carousel.Slide>
            <img src={loadS3Image("mu_4 2.JPG", "mu")} alt="mu_pics"></img>
          </Carousel.Slide>
          <Carousel.Slide>
            <img src={loadS3Image("mu_5 2.JPG", "mu")} alt="mu_pics"></img>
          </Carousel.Slide>
          <Carousel.Slide>
            <img src={loadS3Image("mu_6 2.JPG", "mu")} alt="mu_pics"></img>
          </Carousel.Slide>
          <Carousel.Slide>
            <img src={loadS3Image("mu_7 2.JPG", "mu")} alt="mu_pics"></img>
          </Carousel.Slide>
          <Carousel.Slide>
            <img src={loadS3Image("mu_8 2.JPG", "mu")} alt="mu_pics"></img>
          </Carousel.Slide>
          <Carousel.Slide>
            <img src={loadS3Image("mu_9 2.JPG", "mu")} alt="mu_pics"></img>
          </Carousel.Slide>
        </Carousel>
      </div>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 mt-8">
        <div className="text-white text-justify ml-8 mr-8 mt-8 mb-8">
          Només aquesta pena d’adormir-se i de despertar-se i de sentir-se la
          vida que no saps d’on et ve i que fugirà sense que sàpigues per què te
          la van donar i per què te la prenen. Té, això, això i això. I ara apa.{" "}
          <br></br>
          CITA APA: La mort i la primavera (1986). Barcelona: Fundació Mercè
          Rodoreda, 1997. Robat a M. Rodoreda i a A. Balasch. <br></br>
          En La puerta sin puerta se ejemplifica mu “無” como la puerta a la
          iluminación. En uno de sus koans se ejemplifica: <br></br>
          僧問：狗子還有佛性也無？<br></br>
          師云：無。<br></br>
          “Un monje preguntó: Un perro tiene naturaleza de buda o no?
          <br></br>
          El maestro dijo: [Mu]!”<br></br>
          Esta nada no se puede traducir como una respuesta negativa, sino quizá
          como una pregunta no aplicable, un sinsentido intrínseco en la
          propuesta. Podría asimilarse al punto siete del Tractatus Logico
          Philosophicus de Ludwig Witgenstein: <br></br>
          “Sobre lo que no se puede hablar hay que callar”.<br></br>
          Poco a poco, en la historia del pensamiento humanista occidental las
          nociones sobre el lenguaje se han ido agrietando y por sus roturas ha
          empezado a supurar la viscosidad de lo indecible. La ciencia
          acostumbra a venir luego, como un coche escoba con síndrome de
          Diógenes y diez años después del tractatus Kurt Gödel publicaría sus
          Teoremas de la incompletitud como el símil de Wittgenstein de la
          lógica matemática demostrando axiomáticamente que cualquier teoría
          axiomática es incompleta, o lo que es lo mismo que hay proposiciones
          indecibles en “el lenguaje de Dios”. En su defensa, tampoco es que
          Wittgenstein sea puntual, 18 siglos antes Nāgārjuna en sus Fundamentos
          de la vía media escribió:<br></br>
          “Se ha enseñado que hay un yo e incluso que no hay un yo. Pero el Buda
          no ha enseñado el yo ni el no yo. Cuando cesa el objeto del lenguaje,
          cesa el objeto del pensamiento. Al igual que el nirvana, la naturaleza
          de todas las cosas carece del surgir y del perecer.”
          <br></br>
          Supongo que la pulsión del sinsentido nos ha acompañado desde el
          primer hombre, haciendo funambulismo a ras de suelo entre la
          animalidad y la divinidad en la cuerda que nos ha tirado la palabra.
          Es sintomático de la condición occidental este ejercicio circular
          ultra verborreico alrededor de los escombros de la dialéctica, como un
          ejercicio becketiano, un clamor de una palabra vaciada. Beckett en
          Final de partida:
          <br></br>
          “¡Uso las palabras que me has enseñado! ¡Si ya no quieren decir nada,
          enséñame otras!”
          <br></br>
          Esta noción de la palabra descontrolada pese a todo en la consciencia
          occidental se contrapone de forma interesante con la forma de refinar
          un trabajo hacia la sencillez que solemos ver en la producción
          oriental. El rastro del Wu Wei en el enso, la temporalidad y finitud
          en On Kawara, el mismo cine de Ozu… Estas dos formas de hacer, si bien
          podrían ejemplificar la dualidad Sheakesperiana, tienen un trasfondo
          común. Ambas comparten una materialización de una potencia de vida, o
          lo que es lo mismo, un ocupar el tiempo. Un tiempo falazmente
          circular, más bien helicoidal, constriñendo al cuerpo como una boa.
          <br></br>
          Douglas Hofstadter plantea MU como un rompecabezas lógico sin
          respuesta, que se soluciona solo saliendo de la formulación del
          sistema en sí. Esta huida hacia dentro me recuerda a la “libertad de
          fugitivo” que anhela San Agustín en sus Confesiones:
          <br></br>
          “Y si trataba de instalar mi alma en Dios para que descansase,
          resbalaba en el vacío y volvía a desplomarse sobre mí. Mi alma era
          para mí un lugar miserable donde no era posible estar, pero de donde
          tampoco podía escaparme. ¿Adónde iba a ir yo huyendo de mí? ¿Adónde
          iba a ir yo sin seguir mis propias huellas?”
          <br></br>
          ¿Huir, de qué? ¿Del hastío? Giacomo Leopardi habla de noia o tedio
          como una ausencia que llena el vacío. Una vacío en el alma humana que
          enciende el deseo, pero también un vacío último que, sin aviso, crea
          donde antes no había nada. Una pulsión creadora sin origen que puede
          recordar a la danza de partículas y antipartículas que se materializan
          y desaparecen constantemente en el vacío, como una lucha infinita del
          ser contra la nada. <br></br>
          Este azar e indeterminación ontológica que solo estamos empezando a
          aceptar también se puede ver en el icónico experimento de Young o de
          la doble rendija, que podría dar un giro interesante al concepto de
          action painting si lo dejas sobreexponer repitiéndolo suficientes
          veces. Acabaría creando, por probabilidad, una monocromía, siguiendo
          una larga tradición en el arte del siglo 20. A la derecha una
          ilustración.
          <br></br>
          Mu también es, según el CCRU (o Khrú, diablo del apocalipsis) una
          civilización Pacífica transicional vinculada a la influencia
          lemuriana, una propuesta de Ernst Haekel sobre lo que podría haber
          sido el inicio de la civilización hace 66 millones de años en una zona
          sumergida cerca de Madagascar. Actualmente se considera que las
          pretensiones sobre la existencia de Mu (nada) carecen de fundamento,
          aunque Aleister Crowley la rescató y hay textos budistas que mencionan
          una tierra perdida en el pacífico. La conexión entre Crowley y el
          budismo no es trivial, ya que su famosa frase ”There is no god but
          man” no es más que una reformulación del koan: “Mata a Buda si Buda
          existe en alguna otra parte. Mátalo porque deberías asumir tu propia
          naturaleza de Buda” que luego Death Grips reivindicó en su: “I am the
          beast I worship”.
          <br></br>
          ¿Entonces es el Zen antihumanista?<br></br>
          無。<br></br>
          Esta teología negativa también podría ser aplicada a los entramados
          del lenguaje como una aproximación adorniana al misterio y al
          sinsentido. Tengo conflictos al escribir para acompañar una obra que
          crece por sí misma, y más pensando en cómo Derrida habla de la verdad
          del arte en su no-decir (en otras palabras, que la diferencia entre
          forma y contenido es trivial). Me interesa más con este trabajo
          sencillamente señalar las fluctuaciones de la realidad que acompañan
          la vida, con todas sus vicisitudes y roturas.<br></br>
        </div>

        <div className="mr-8">
          <img
            src={loadS3Image("extramu2.png", "mu")}
            className="mb-8"
            alt="extra2"
          ></img>
        </div>
      </div>
    </div>
  );
};
