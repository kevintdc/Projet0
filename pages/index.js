import Head from "next/head";
import Navbar from "../components/Navbar";
import ServiceCard from "../components/ServiceCard";
import { FaCode, FaTools, FaEdit, FaPaintBrush } from "react-icons/fa";
import { useState } from "react";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";

function HomeContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    if (!executeRecaptcha) {
      setStatus("error: CAPTCHA non initialisé");
      return;
    }

    const token = await executeRecaptcha("contact_form");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, token }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus(`error: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <>
      <Head>
        <title>
          Toudic Development | Création de sites web & design freelance
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Solutions web et design freelance" />
        <meta name="author" content="Toudic Development" />
        <meta
          name="keywords"
          content="web, design, freelance, développement, création, site internet, graphisme, aude, limoux, 
        développeur web, carcassonne, aude, meilleur, compétent, qualité, prix, limoux et alentours, dev, toudic, toudic dev, toudicdev, toudic development, toudic-development,
        toudic developpement"
        />
        <meta
          property="og:title"
          content="Toudic Development | Création de sites web & design freelance"
        />
        <meta
          property="og:description"
          content="Solutions web et design freelance"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://toudicdev.fr" />
        <meta property="og:image" content="/og-image.png" />
      </Head>

      <Navbar />

      <main className="pt-16 bg-[#003479] text-white min-h-screen">
        <section
          id="home"
          className="h-screen flex flex-col justify-center items-center text-center px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Solutions web et design freelance
          </h1>
          <p className="text-lg md:text-xl max-w-2xl">
            Je crée des sites performants, assure leur maintenance, et propose
            du graphisme (logos, cartes de visite, etc.).
          </p>
        </section>
        {/* SERVICES */}
        <section id="services" className="py-20 px-6 bg-[#002657] text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-12">Services</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <ServiceCard
                icon={<FaCode />}
                title="Création de site"
                description="Développement de sites web modernes, performants et responsive."
              />
              <ServiceCard
                icon={<FaTools />}
                title="Maintenance"
                description="Surveillance, mises à jour et corrections pour assurer la stabilité."
              />
              <ServiceCard
                icon={<FaEdit />}
                title="Modifications"
                description="Ajout de contenu, fonctionnalités ou refonte graphique."
              />
              <ServiceCard
                icon={<FaPaintBrush />}
                title="Graphisme"
                description="Logos, cartes de visite et visuels professionnels."
              />
            </div>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section id="portfolio" className="py-20 px-6 bg-[#003479] text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-12">Portfolio</h2>
            <p className="text-gray-300 mb-8">
              Voici un aperçu de mon travail. Découvrez mon portfolio complet en
              ligne.
            </p>
            <a
              href="https://portfolio-ivory-mu-66.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-md font-semibold transition"
            >
              Voir le Portfolio
            </a>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-20 px-6 bg-[#002657] text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-12">Contact</h2>
            <form
              className="space-y-6 max-w-xl mx-auto"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Votre nom"
                required
                className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Votre email"
                required
                className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="Votre message"
                required
                className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white"
              />
              <button
                type="submit"
                className="bg-[#206fd6] hover:bg-[#5891dd] text-white px-6 py-3 rounded font-semibold transition"
              >
                Envoyer
              </button>
            </form>

            {status === "loading" && (
              <p className="mt-4 text-gray-400">Envoi en cours...</p>
            )}
            {status === "success" && (
              <p className="mt-4 text-green-400">Message envoyé ✅</p>
            )}
            {status.startsWith("error") && (
              <p className="mt-4 text-red-400">
                Erreur : {status.replace("error:", "").trim()}
              </p>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-[#003479] text-white py-6 text-center text-sm">
        &copy; {new Date().getFullYear()} Toudic Development. Tous droits
        réservés.
        <br />
        <a
          href="https://www.instagram.com/toudic.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#f542bf] hover:underline mt-2 inline-block"
        >
          Suivez-moi sur Instagram
        </a>
      </footer>
    </>
  );
}

export default function Home() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LcRZs8rAAAAAAebRRnRafFXRGwCIV6vfdUi0njt">
      <HomeContent />
    </GoogleReCaptchaProvider>
  );
}
