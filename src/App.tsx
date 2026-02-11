import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, Sun, Moon, Phone, Mail, MapPin, 
  Home, Shield, Zap, TreePine, ArrowRight, CheckCircle2,
  Building2, Heart, Star, ZoomIn
} from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const houses = [
  {
    id: 1,
    name: "Budynek A - Stary Dwór",
    location: "Stary Dwór, koło Dobrego Miasta",
    price: "Od 550 000 zł",
    area: "110",
    rooms: 3,
    land: "Od 500",
    status: "Dostępny",
    image: "images/1.png",
    tags: ["Garaż", "Ogród", "Pompa ciepła", "Rekuperacja", "Działka z lasem", "Strumyk"]
  },
];

const realizations = [
  { id: 1, image: "images/1.png" },
  { id: 2, image: "images/2.png" },
  { id: 3, image: "images/3.jpeg" },
  { id: 4, image: "images/4.jpeg" },
  { id: 5, image: "images/5.jpeg" },
  { id: 7, image: "images/7.jpeg" },
  { id: 9, image: "images/rzut1.jpeg" },
  { id: 10, image: "images/rzut2.jpeg" }
];

const features = [
  { icon: Shield, title: "Gwarancja 5 lat", desc: "Pełne wsparcie posprzedażowe", color: "from-emerald-500 to-teal-600" },
  { icon: Zap, title: "Energooszczędność", desc: "Nowoczesne technologie", color: "from-amber-500 to-orange-600" },
  { icon: TreePine, title: "Ekologia", desc: "Zielone rozwiązania", color: "from-green-500 to-emerald-600" },
  { icon: Home, title: "Indywidualny projekt", desc: "Dopasowany do Ciebie", color: "from-blue-500 to-cyan-600" }
];

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter] = useState("all");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const filteredHouses = activeFilter === "all" 
    ? houses 
    : houses.filter(h => h.status === activeFilter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Dziękujemy za wiadomość! Skontaktujemy się wkrótce.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  // Przygotowanie slajdów dla lightbox - realizacje + mapa na końcu
  const lightboxSlides = [
    ...realizations.map(r => ({ src: r.image })),
    { src: "images/mapa.jpeg" }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? "dark bg-gray-950" : "bg-gray-50"}`}>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-20 -left-40 w-96 h-96 rounded-full opacity-20 blur-3xl ${darkMode ? "bg-amber-500" : "bg-amber-300"}`}
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl ${darkMode ? "bg-orange-500" : "bg-orange-300"}`}
        />
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${darkMode ? "bg-gray-950/80 backdrop-blur-xl border-gray-800" : "bg-white/80 backdrop-blur-xl border-gray-200"} border-b`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Domy </span>
                <span className="text-xl font-bold text-amber-500">2-Lokalowe</span> 
              </div>
            </motion.div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {["O nas", "Oferta", "Wizualizacje", "Kontakt"].map((item) => (
                <motion.button
                  key={item}
                  whileHover={{ y: -2 }}
                  onClick={() => scrollToSection(item.toLowerCase().replace(" ", "-"))}
                  className={`font-bold text-lg transition-colors ${darkMode ? "text-gray-300 hover:text-amber-400" : "text-gray-600 hover:text-amber-600"}`}
                >
                  {item}
                </motion.button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              {/* Dark Mode Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDarkMode(!darkMode)}
                className={`p-3 rounded-2xl transition-all ${darkMode ? "bg-gray-800 text-amber-400" : "bg-gray-100 text-gray-700"}`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("kontakt")}
                className="hidden sm:flex bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all"
              >
                Kontakt
              </motion.button>

              {/* Mobile Menu Toggle */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-3 rounded-xl ${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`lg:hidden ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"} border-t overflow-hidden`}
            >
              <div className="px-4 py-6 space-y-3">
                {["O nas", "Oferta", "Wizualizacje", "Kontakt"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase().replace(" ", "-"))}
                    className={`block w-full text-left py-3 px-4 rounded-xl font-medium ${darkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-50"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400 px-5 py-2.5 rounded-full"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </span>
                <span className="text-sm font-medium">Nowe inwestycja 2026</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`text-5xl lg:text-7xl font-bold leading-tight ${darkMode ? "text-white" : "text-gray-900"}`}
              >
                Zbuduj swoją
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">
                  przyszłość
                </span>
                w wymarzonym domu
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`text-xl leading-relaxed max-w-xl ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                Oferujemy <span className="text-amber-500 font-semibold">nowoczesne budynki 2-lokalowe</span> w bardzo spokojnej lokalizacji. 
                Komfort, jakość i przestrzeń dla Twojej rodziny.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection("oferta")}
                  className="group bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all flex items-center gap-3"
                >
                  Zobacz ofertę
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection("kontakt")}
                  className={`px-8 py-4 rounded-2xl font-semibold transition-all flex items-center gap-3 ${darkMode ? "bg-gray-800 text-white hover:bg-gray-700 border border-gray-700" : "bg-white text-gray-900 hover:bg-gray-50 border border-gray-200"}`}
                >
                  Umów spotkanie
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative rounded-[2.5rem] overflow-hidden shadow-2xl"
              >
                <img 
                  src="images/1.png" 
                  alt="Nowoczesny 2-lokalowy" 
                  className="w-full h-[500px] lg:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white/80 text-sm">Budynek 2-LOKALOWY</div>
                        <div className="text-white font-bold text-xl">110 m² • 3 pokoje</div>
                      </div>
                      <div className="bg-emerald-500 text-white px-4 py-2 rounded-xl font-semibold">
                        Dostępny
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className={`absolute -right-4 -bottom-6 p-6 rounded-2xl shadow-2xl ${darkMode ? "bg-gray-800" : "bg-white"}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Gwarancja jakości</div>
                    <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>5 lat na konstrukcję</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className={`py-12 -mt-20 relative z-10 ${darkMode ? "bg-gray-900/50" : "bg-white/50"} backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-2xl transition-all ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-white border border-gray-100"} shadow-lg hover:shadow-xl`}
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className={`font-bold text-lg mb-1 ${darkMode ? "text-white" : "text-gray-900"}`}>{feature.title}</h3>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="o-nas" className={`py-24 ${darkMode ? "bg-gray-950" : "bg-gray-50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer group"
                onClick={() => { setLightboxIndex(realizations.length); setLightboxOpen(true); }}
              >
                <img 
                  src="images/mapa.jpeg" 
                  alt="Mapa lokalizacji" 
                  className="w-full h-auto object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-8 h-8 text-white" />
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 2 }}
                className="absolute -right-4 -bottom-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white p-6 rounded-2xl shadow-xl"
              >
                <div className="text-4xl font-bold">Idealna</div>
                <div className="text-amber-100">lokalizacja</div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-block bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-500 border border-amber-500/30 px-5 py-2 rounded-full text-sm font-medium">
                O naszej firmie
              </div>
              <h2 className={`text-4xl lg:text-5xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                Budujemy domy,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600"> spełniamy marzenia</span>
              </h2>
              <p className={`text-lg leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
Nasze obiekty mieszkalne prezentują współczesny styl architektoniczny i powstają z wykorzystaniem nowoczesnych rozwiązań budowlanych oraz obowiązujących standardów. Klasyczne ocieplone fundamenty, stropy żelbetowe oraz ściany z betonu komórkowego 24 cm firmy Solbet, styropian grubości 18 cm, zapewniają doskonałą termoizolację, znakomite wygłuszenie akustyczne oraz oszczędność energii. Pokrycie dachowe wykonane z dachówki ceramicznej, gwarantujące odporność na warunki pogodowe oraz pełną szczelność. Każdy budynek wyposażony jest w ogrzewanie podłogowe rozłożone na całej powierzchni użytkowej, zasilane nowoczesną, efektywną i innowacyjną pompą ciepła. W okresie letnim pompa może pełnić funkcję układu chłodzenia budynku. Zamontowano również profesjonalny system wentylacji mechanicznej z odzyskiem ciepła. Dzięki temu możesz liczyć na niższe rachunki za utrzymanie oraz zdrowsze powietrze w pomieszczeniach. Przestronne przeszklenia sprawiają, że do wnętrz o każdej porze dnia dociera obfite światło dzienne.
D.M. House wznosimy i oferujemy domy w zabudowie 2-lokalowej w Starym Dworze, koło Dobrego Miasta z przestronnymi ogrodami.Ścianą lasu, której nigdy nikt nie zabuduje. W wąwiozie płynie strumyk.
Nasze nieruchomości stanowią idealną propozycję zarówno dla rodzin z pociechami i młodych par, jak i dla osób dojrzałych, które pragną odpoczynku od miejskiego hałasu w wyjątkowo cichej i spokojnej lokalizacji.
              </p>
              <div className="flex flex-wrap gap-3">
                {["5 lat gwarancji", "Pompy ciepła", "Rekuperacja", "Garaż", "Las", "Strumyk"].map((item, i) => (
                  <motion.span 
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`px-4 py-2 rounded-full font-medium ${darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-700"} shadow-md`}
                  >
                    ✓ {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section id="oferta" className={`py-24 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-500 border border-amber-500/30 px-5 py-2 rounded-full text-sm font-medium mb-4">
              Nasza oferta
            </div>
            <h2 className={`text-4xl lg:text-5xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Poznaj nasze <span className="text-amber-500">budynki</span>
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Starannie wyselekcjonowane nieruchomości w najlepszych lokalizacjach
            </p>
          </motion.div>

          {/* Houses Grid */}
          <div className={`grid gap-8 ${filteredHouses.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' : 'md:grid-cols-2'}`}>
            {filteredHouses.map((house, i) => (
              <motion.div
                key={house.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className={`group rounded-3xl overflow-hidden transition-all duration-300 ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"} shadow-xl hover:shadow-2xl`}
              >
                <div className="relative overflow-hidden">
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    src={house.image} 
                    alt={house.name} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-4 right-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm ${
                      house.status === "Dostępny" 
                        ? "bg-emerald-500/90 text-white" 
                        : "bg-blue-500/90 text-white"
                    }`}>
                      {house.status}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 text-amber-500 text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    {house.location}
                  </div>
                  <h3 className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>{house.name}</h3>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                      { val: house.area + " m²", lbl: "Powierzchnia" },
                      { val: house.rooms, lbl: "Pokoje" },
                      { val: house.land + " m²", lbl: "Działka" }
                    ].map((stat, idx) => (
                      <div key={idx} className={`text-center p-4 rounded-2xl ${darkMode ? "bg-gray-700/50" : "bg-gray-50"}`}>
                        <div className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>{stat.val}</div>
                        <div className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-500"}`}>{stat.lbl}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {house.tags.map((tag, idx) => (
                      <span key={idx} className="px-4 py-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-500 text-sm rounded-full border border-amber-500/30">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t border-gray-700">
                    <div>
                      <span className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>{house.price}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => scrollToSection("kontakt")}
                      className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-amber-500/25"
                    >
                      Skontaktuj się
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Realizations Section - NAPRAWIONE ID */}
      <section id="wizualizacje" className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/30 px-5 py-2 rounded-full text-sm font-medium mb-4">
              Realizacja
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Zobacz naszą <span className="text-amber-500">wizualizację</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {realizations.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => { setLightboxIndex(i); setLightboxOpen(true); }}
                className="group relative rounded-3xl overflow-hidden cursor-pointer"
              >
                <motion.img 
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.5 }}
                  src={item.image} 
                  alt="Wizualizacja" 
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                {/* Ikona powiększenia */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-8 h-8 text-white" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("kontakt")}
              className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-10 py-4 rounded-2xl font-semibold shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all flex items-center gap-3 mx-auto"
            >
              Umów się na wizytę
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className={`py-24 ${darkMode ? "bg-gray-950" : "bg-gray-50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-500 border border-amber-500/30 px-5 py-2 rounded-full text-sm font-medium mb-4">
                Kontakt
              </div>
              <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Porozmawiajmy o Twoim
                <span className="text-amber-500"> wymarzonym domu</span>
              </h2>
              <p className={`text-xl mb-8 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Skontaktuj się z nami, a nasz doradca przedstawi Ci dostępne opcje.
              </p>
              <div className="space-y-6">
                {[
                  { icon: Phone, title: "D.M. House sp. z o.o. Krzysztof Wąsiewski", value: "+48 691177373", href: "tel:+48691177373", subtitle: "Pon-Sb: 9:00 - 18:00" },
                  { icon: Mail, title: "Email", value: "dmhouse91@gmail.com", href: "mailto:dmhouse91@gmail.com" },
                  { icon: MapPin, title: "Biuro", value: "Reja 8, 11-040 Dobre Miasto" }
                ].map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.href}
                    whileHover={{ x: 10 }}
                    className={`flex items-start gap-5 p-5 rounded-2xl transition-all ${darkMode ? "bg-gray-800/50 hover:bg-gray-800" : "bg-white hover:bg-gray-50"} shadow-lg`}
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/25">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className={`font-semibold text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>{item.title}</div>
                      <div className="text-amber-500 text-lg">{item.value}</div>
                      {item.subtitle && <div className={`text-sm mt-1 ${darkMode ? "text-gray-500" : "text-gray-500"}`}>{item.subtitle}</div>}
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`p-8 lg:p-10 rounded-3xl ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-white border border-gray-100"} shadow-2xl`}
            >
              <h3 className={`text-2xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>Wyślij wiadomość</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className={`block font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Imię i nazwisko</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-5 py-4 rounded-2xl outline-none transition-all ${darkMode ? "bg-gray-700 border border-gray-600 text-white focus:border-amber-500" : "bg-gray-50 border border-gray-200 focus:border-amber-500"}`}
                    placeholder="Jan Kowalski"
                  />
                </div>
                <div>
                  <label className={`block font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-5 py-4 rounded-2xl outline-none transition-all ${darkMode ? "bg-gray-700 border border-gray-600 text-white focus:border-amber-500" : "bg-gray-50 border border-gray-200 focus:border-amber-500"}`}
                    placeholder="jan@email.pl"
                  />
                </div>
                <div>
                  <label className={`block font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Telefon</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-5 py-4 rounded-2xl outline-none transition-all ${darkMode ? "bg-gray-700 border border-gray-600 text-white focus:border-amber-500" : "bg-gray-50 border border-gray-200 focus:border-amber-500"}`}
                    placeholder="+48 000 000 000"
                  />
                </div>
                <div>
                  <label className={`block font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Wiadomość</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-5 py-4 rounded-2xl outline-none transition-all resize-none ${darkMode ? "bg-gray-700 border border-gray-600 text-white focus:border-amber-500" : "bg-gray-50 border border-gray-200 focus:border-amber-500"}`}
                    placeholder="Jestem zainteresowany/a..."
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all"
                >
                  Wyślij wiadomość
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lightbox dla galerii */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
      />

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold">Domy</span>
                  <span className="text-xl font-bold text-amber-500">2-Lokalowe</span>
                </div>
              </div>
              <p className="text-gray-400 max-w-md mb-6">
                Nowoczesne budynki 2-lokalowe w spokojnej lokalizacji z lasem i strumykiem.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: Heart, label: "FB" },
                  { icon: Star, label: "IG" },
                  { icon: Building2, label: "IN" }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="w-11 h-11 bg-gray-800 hover:bg-amber-600 rounded-xl flex items-center justify-center transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-4">Nawigacja</h4>
              <ul className="space-y-3">
                {["O nas", "Oferta", "Wizualizacje", "Kontakt"].map((item, i) => (
                  <li key={i}>
                    <button 
                      onClick={() => scrollToSection(item.toLowerCase().replace(" ", "-"))}
                      className="text-gray-400 hover:text-amber-500 transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
              <ul className="space-y-3 text-gray-400">
                <li>Krzysztof Wąsiewski</li>
                <li>Telefon 691177373</li>
                <li>dmhouse91@gmail.com</li>
                <li>ul. Reja 8<br />11-040 Dobre Miasto</li>
              </ul>
            </motion.div>
          </div>
          <div className={`border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
            <p>© 2026 Domy 2-Lokalowe. Wszystkie prawa zastrzeżone.</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-amber-500 transition-colors">Polityka prywatności</a>
              <a href="#" className="hover:text-amber-500 transition-colors">Regulamin</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
