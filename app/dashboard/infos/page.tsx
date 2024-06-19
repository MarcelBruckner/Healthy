import { Metadata } from "next";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";
import { BRISTOl_STOOL_SCALA } from "@/app/lib/utils";

export const metadata: Metadata = {
  title: "Infos"
};

export default function Page() {


  function ScalaEntry({ index }: { index: number }) {
    const src = `/toilet-scala/typ${index + 1}.png`
    const alt = `Typ ${index}: ${BRISTOl_STOOL_SCALA[index]}`

    return < div key={alt} className="mb-4 flex flex-row" >
      <Image className="left-3 mr-3" src={src} alt={alt} width="100" height="100" />
      <div className="flex flex-row h-auto ">
        <p className="font-bold mr-4 h-full content-center">Typ {index + 1}:</p> <p className="h-full content-center">{BRISTOl_STOOL_SCALA[index]}</p>
      </div>
    </div>
  }

  return (
    <div>
      <div className="mb-4 max-w-4xl rounded-xl bg-gray-50 shadow-sm p-4">
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Ernährungs-Symptom-Tagebuch
        </h1>
        Ein Ernährungstagebuch kann Sie unterstützen, Ihren täglichen Tagesablauf und Ihre Gewohnheiten hinsichtlich der Nahrungsaufnahme zu reflektieren. Weiters kann es Ihnen helfen herauszufinden, welche Nahrungsmittel Sie besser oder weniger gut vertragen. Wenn Sie Ihr Stuhlverhalten mitdokumentieren, können Sie gegebenfalls auch einen Zusammenhang zwischen bestimmten Lebensmitteln und deren Auswirkung auf Ihren Verdauungstrakt erkennen.
      </div>

      <div className="mb-4 max-w-4xl rounded-xl bg-gray-50 shadow-sm p-4">
        <h2 className={`${lusitana.className} mb-4 text-xl md:text-xl`}>
          Was ist wichtig bei der Führung eines Ernährungstagebuchs?</h2>
        <ul className="space-y-1  list-disc list-inside ">
          <li>Notieren Sie alles, was Sie essen und trinken, auch Zwischenmahlzeiten bzw. kleine Snacks, am besten direkt nach dem Verzehr, um nichts zu vergessen.</li>
          <li>Je genauer, desto besser und aussagekräftiger: Beschreiben Sie alles so genau wie möglich. (Zeitpunkt der Nahrungsaufnahme, Menge, Fettgehalt der Speisen,…)</li>
          <li>Wenn keine Gewichtsangaben bekannt sind oder Sie das Lebensmittel nicht abwiegen können, dann schätzen Sie die Menge so gut wie möglich. (z. B. 1 Teelöffel, 1 Scheibe, 1 Handtellergroß, 1 Schöpfer,…)</li>
          <li>Geben Sie bei den Getränken auch die Art an. (z. B. Mineralwasser, Leitungswasser, schwarzer Tee, Fruchtsaft,…)</li>
          <li>Notieren Sie, wenn Beschwerden nach dem Essen oder Trinken auftreten und beschreiben Sie diese genau.</li>
          <li>Notieren Sie Ihre Therapie, wie Medikamente und andere Behandlungen. (z. B. Strahlentherapie)</li>
          <li>Notieren Sie, wenn es sonstige Besonderheiten gab. (z. B. Zeitdruck beim Essen, das Naschen beim Fernsehen,…)</li>
          <li>Notieren Sie Ihr Stuhlverhalten. Tragen Sie die Uhrzeit, die Konsistenz, die Farbe, die Menge und sonstige Auffälligkeiten Ihres Stuhles ein.</li>
        </ul>
      </div>



      <div className="mb-4 max-w-4xl rounded-xl bg-gray-50 shadow-sm p-4">
        <h2 className={`${lusitana.className} mb-4 text-xl md:text-xl`}>
          Bristol-Stuhlformen-Skala
        </h2>
        {BRISTOl_STOOL_SCALA.map((entry, index) => <ScalaEntry key={index} index={index} />)}
      </div>

      <div>
        <Link target="_blank" className="text-white bg-brand-700 hover:bg-brand-800 focus:ring-4 focus:ring-brand-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-brand-600 dark:hover:bg-brand-700 focus:outline-none dark:focus:ring-brand-800" href="https://selpers.com/wp-content/uploads/2019/06/Ern%C3%A4hrungs-Symptom-Tagebuch-bei-Durchfall.pdf">Source: selpers.com</Link>
      </div>
    </div >
  );
}
