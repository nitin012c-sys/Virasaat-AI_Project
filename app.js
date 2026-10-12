// Virasaat AI - Interactive Logic (Vanilla JavaScript)
(function() {
        // --- SVG Icons Definition ---
        const ICONS = {
          arch: (size = 22) => `<svg aria-hidden="true" fill="none" height="${size}" viewBox="0 0 24 24" width="${size}"><g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"><path d="M4 21V9l8-6 8 6v12" /><path d="M8 21v-8a4 4 0 0 1 8 0v8M2 21h20" /></g></svg>`,
          book: (size = 22) => `<svg aria-hidden="true" fill="none" height="${size}" viewBox="0 0 24 24" width="${size}"><g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13Z" /><path d="M8 8h8M8 12h6" /></g></svg>`,
          map: (size = 22) => `<svg aria-hidden="true" fill="none" height="${size}" viewBox="0 0 24 24" width="${size}"><g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" /><path d="M9 3v15M15 6v15" /></g></svg>`,
          image: (size = 22) => `<svg aria-hidden="true" fill="none" height="${size}" viewBox="0 0 24 24" width="${size}"><g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"><rect x="3" y="4" width="18" height="16" rx="1" /><circle cx="9" cy="10" r="2" /><path d="m21 15-5-5L5 20" /></g></svg>`,
          scan: (size = 22) => `<svg aria-hidden="true" fill="none" height="${size}" viewBox="0 0 24 24" width="${size}"><g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"><path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3" /><circle cx="12" cy="12" r="4" /><path d="M7 12h10" /></g></svg>`,
          arrow: (size = 18) => `<svg aria-hidden="true" fill="none" height="${size}" viewBox="0 0 24 24" width="${size}"><g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"><path d="M5 12h14m-5-5 5 5-5 5" /></g></svg>`,
          play: (size = 20) => `<svg aria-hidden="true" fill="none" height="${size}" viewBox="0 0 24 24" width="${size}"><g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"><path d="m8 5 11 7-11 7V5Z" /></g></svg>`,
          pause: (size = 20) => `<svg aria-hidden="true" fill="none" height="${size}" viewBox="0 0 24 24" width="${size}"><g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"><path d="M9 5v14M15 5v14" /></g></svg>`,
          spark: (size = 17) => `<svg aria-hidden="true" fill="none" height="${size}" viewBox="0 0 24 24" width="${size}"><g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"><path d="m12 3 1.3 4.2L17 9l-3.7 1.8L12 15l-1.3-4.2L7 9l3.7-1.8L12 3Z" /><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15ZM5 3l.7 2.3L8 6l-2.3.7L5 9l-.7-2.3L2 6l2.3-.7L5 3Z" /></g></svg>`,
          cube: (size = 22) => `<svg aria-hidden="true" fill="none" height="${size}" viewBox="0 0 24 24" width="${size}"><g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"><path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 7 9 5 9-5v10l-9 5-9-5V7Z" /><path d="M12 12v10" /></g></svg>`,
          search: (size = 18) => `<svg aria-hidden="true" fill="none" height="${size}" viewBox="0 0 24 24" width="${size}"><g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></g></svg>`
        };

        // Populate Static Icons
        document.getElementById("brand-icon").innerHTML = ICONS.arch(24);
        document.getElementById("footer-arch-icon").innerHTML = ICONS.arch(27);
        document.querySelectorAll(".btn-arrow").forEach(el => el.innerHTML = ICONS.arrow(17));
        document.getElementById("search-icon-3d").innerHTML = ICONS.search(18);
        document.getElementById("search-icon-story").innerHTML = ICONS.search(18);
        const searchIconHeritage = document.getElementById("search-icon-heritage");
        if (searchIconHeritage) searchIconHeritage.innerHTML = ICONS.search(18);
        document.getElementById("spark-icon-btn").innerHTML = ICONS.spark(17);
        document.getElementById("scan-btn-icon").innerHTML = ICONS.scan(18);
        document.getElementById("story-play-icon").innerHTML = ICONS.play(20);

        // --- Data Models ---
        const features = [
          {
            id: "3d",
            icon: "arch",
            number: "01",
            title: "3D Monument",
            subtitle: "Walk through history",
            description: "Rotate, zoom and discover verified hotspots across photoreal heritage models—right from your browser."
          },
          {
            id: "story",
            icon: "book",
            number: "02",
            title: "AI Storyteller",
            subtitle: "Hear the walls speak",
            description: "Listen to vivid, multilingual stories shaped from verified archives and local oral traditions."
          },
          {
            id: "culture",
            icon: "map",
            number: "03",
            title: "State Culture",
            subtitle: "36 places, countless traditions",
            description: "Explore the food, festivals, crafts, music and living heritage of every Indian state and territory."
          },
          {
            id: "gallery",
            icon: "image",
            number: "04",
            title: "Culture Gallery",
            subtitle: "A visual archive",
            description: "Journey through restored photographs, miniature paintings and rare cultural records."
          },
          {
            id: "scanner",
            icon: "scan",
            number: "05",
            title: "Smart Scanner",
            subtitle: "Point. Scan. Discover.",
            description: "Identify a monument through your camera and instantly retrieve its story, era and archival record."
          }
        ];

        const monuments = [
          {
            name: "Taj Mahal",
            place: "Agra, Uttar Pradesh",
            year: 1648,
            dynasty: "Mughal Empire",
            image: "https://images.unsplash.com/photo-1532664189809-02133fee698d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1200",
            hotspots: 24,
            desc: "The renowned white marble mausoleum on the Yamuna river, commissioned by Mughal Emperor Shah Jahan.",
            uid: "33149233cefd492b9abdd50fe5a8c921",
            modelUrl: "https://sketchfab.com/3d-models/taj-mahal-33149233cefd492b9abdd50fe5a8c921",
            modelEmbed: "https://sketchfab.com/models/33149233cefd492b9abdd50fe5a8c921/embed?autostart=1&ui_infos=0",
            streetViewUrl: "https://artsandculture.google.com/streetview/taj-mahal/UwGKcX7FFM5U4g?sv_lng=78.04199578059838&sv_lat=27.173762258910912&sv_h=9.155004179979311&sv_p=-1.0717467105690446&sv_pid=vQAmRxAVGgXXQmPcT8d0cQ&sv_z=1",
            mapsEmbedUrl: "https://maps.google.com/maps?q=loc:27.1751,78.0421&t=k&z=17&output=embed",
            videoEmbedUrl: "https://www.youtube-nocookie.com/embed/49HTYo4Pf70?autoplay=1"
          },
          {
            name: "Sun Temple, Konark",
            place: "Konark, Odisha",
            year: 1250,
            dynasty: "Eastern Ganga dynasty",
            image: "https://images.unsplash.com/photo-1596901224267-67ca38199090?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1200",
            hotspots: 20,
            desc: "Thirteenth-century monumental chariot temple of Surya with 24 carved stone wheels.",
            uid: "6cc905be2ae34e8091eb1eaa84a17738",
            modelUrl: "https://sketchfab.com/3d-models/sun-temple-konark-6cc905be2ae34e8091eb1eaa84a17738",
            modelEmbed: "https://sketchfab.com/models/6cc905be2ae34e8091eb1eaa84a17738/embed?autostart=1&ui_infos=0",
            streetViewUrl: "https://artsandculture.google.com/streetview/sun-temple-konark/4QF7iV2jUj6lSg?sv_lng=86.0945&sv_lat=19.8876&sv_h=0&sv_p=0&sv_pid=konark&sv_z=1",
            mapsEmbedUrl: "https://maps.google.com/maps?q=loc:19.8876,86.0945&t=k&z=17&output=embed",
            videoEmbedUrl: "https://www.youtube-nocookie.com/embed/Q53z8eQYg3c?autoplay=1"
          },
          {
            name: "Qutub Minar",
            place: "Delhi",
            year: 1199,
            dynasty: "Delhi Sultanate",
            image: "https://images.unsplash.com/photo-1629735919597-fed920b5bd84?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1200",
            hotspots: 14,
            desc: "A towering 73m fluted brick minaret built by Qutb-ud-din Aibak and Iltutmish.",
            uid: "e165e25ec8f1497aa83ab72419f40ddc",
            modelUrl: "https://sketchfab.com/3d-models/qutub-minar-e165e25ec8f1497aa83ab72419f40ddc",
            modelEmbed: "https://sketchfab.com/models/e165e25ec8f1497aa83ab72419f40ddc/embed?autostart=1&ui_infos=0",
            streetViewUrl: "https://artsandculture.google.com/streetview/qutub-minar/6AG0rS4-oMGwLw?sv_lng=77.18488656702158&sv_lat=28.524744699093315&sv_h=7.5&sv_p=11&sv_pid=bu6n95IlT9-_w7UpN66Iiw&sv_z=1",
            mapsEmbedUrl: "https://maps.google.com/maps?q=loc:28.5245,77.1855&t=k&z=17&output=embed",
            videoEmbedUrl: "https://www.youtube-nocookie.com/embed/x1v1sHw9B8M?autoplay=1"
          },
          {
            name: "Brihadeeswarar Temple",
            place: "Thanjavur, Tamil Nadu",
            year: 1010,
            dynasty: "Chola dynasty",
            image: "https://images.unsplash.com/photo-1719498481736-c125dfa45b03?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1200",
            hotspots: 25,
            desc: "The great Chola granite temple dedicated to Shiva, celebrating Dravidian engineering.",
            uid: "b80c75f91dad4994a0e7000467433ac9",
            modelUrl: "https://sketchfab.com/3d-models/brihadisvara-temple-b80c75f91dad4994a0e7000467433ac9",
            modelEmbed: "https://sketchfab.com/models/b80c75f91dad4994a0e7000467433ac9/embed?autostart=1&ui_infos=0",
            streetViewUrl: "https://artsandculture.google.com/streetview/brihadeshwara-temple/bQEBFDWGbe1WIQ?sv_lng=79.13209723333006&sv_lat=10.782600687334803&sv_h=-115&sv_p=20&sv_pid=3JuLIKGyCVNnfhbHM9zc5A&sv_z=1",
            mapsEmbedUrl: "https://maps.google.com/maps?q=loc:10.7828,79.1318&t=k&z=17&output=embed",
            videoEmbedUrl: "https://www.youtube-nocookie.com/embed/hB55Jj-tqB4?autoplay=1"
          },
          {
            name: "Hawa Mahal",
            place: "Jaipur, Rajasthan",
            year: 1799,
            dynasty: "Kachhwaha Rajput",
            image: "https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1200",
            hotspots: 18,
            desc: "The Palace of Winds, built as an extension of Jaipur City Palace with 953 honeycomb jharokhas.",
            uid: "47c0ea2a759544729c137d8b86ba5b9a",
            modelUrl: "https://studio.tripo3d.ai/3d-model/hawa-mahal-jaipur-pink-sandstone-facade-with-hundreds-of-jharokhas-and-420df521-394d-4fda-b836-64cf37d1798f",
            modelEmbed: "https://sketchfab.com/models/47c0ea2a759544729c137d8b86ba5b9a/embed?autostart=1&ui_infos=0",
            streetViewUrl: "https://artsandculture.google.com/streetview/hawa-mahal/awE1gYhL27z69w?sv_lng=75.8267&sv_lat=26.9239&sv_h=0&sv_p=0&sv_pid=hawamahal&sv_z=1",
            mapsEmbedUrl: "https://maps.google.com/maps?q=loc:26.9239,75.8267&t=k&z=17&output=embed",
            videoEmbedUrl: "https://www.youtube-nocookie.com/embed/5aM2tE8gZk0?autoplay=1"
          },
          {
            name: "Red Fort",
            place: "Delhi",
            year: 1639,
            dynasty: "Mughal Empire",
            image: "https://images.unsplash.com/photo-1519955266818-0231b63402bc?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1200",
            hotspots: 31,
            desc: "The fortified red sandstone palace complex of Shahjahanabad in Old Delhi.",
            uid: "bfde286898e94fd6bd44570df4669a8c",
            modelUrl: "https://sketchfab.com/3d-models/red-fort-bfde286898e94fd6bd44570df4669a8c",
            modelEmbed: "https://sketchfab.com/models/bfde286898e94fd6bd44570df4669a8c/embed?autostart=1&ui_infos=0",
            streetViewUrl: "https://artsandculture.google.com/streetview/red-fort/TAGwBR4r9ZE7dg?sv_lng=77.2372845722391&sv_lat=28.656020503802175&sv_h=73.46682828661217&sv_p=13.099218224881099&sv_pid=6fhnf129W3s4sKLASuWk3Q&sv_z=1",
            mapsEmbedUrl: "https://maps.google.com/maps?q=loc:28.6562,77.2410&t=k&z=17&output=embed",
            videoEmbedUrl: "https://www.youtube-nocookie.com/embed/6E_U-0Xk2y0?autoplay=1"
          }
        ];

        const dynasties = [
          { name: "The Chola Dynasty", era: "848–1279 CE", story: "Masters of bronze, oceans and monumental temples" },
          { name: "The Mughal Empire", era: "1526–1857 CE", story: "Gardens, empires and the architecture of memory" },
          { name: "The Mauryan Empire", era: "322–185 BCE", story: "From conquest to compassion under Emperor Ashoka" },
          { name: "The Ahom Kingdom", era: "1228–1826 CE", story: "Six centuries of resilience beside the Brahmaputra" },
          { name: "The Vijayanagara Empire", era: "1336–1646 CE", story: "Golden era of stone carving, markets and Hampi" },
          { name: "The Maratha Empire", era: "1674–1818 CE", story: "Rugged hill forts and naval prowess of Chhatrapati Shivaji" }
        ];

        const stateCultures = {
          "Rajasthan": {
            slogan: "Footprints of valour across the golden sands.",
            categories: [
              { title: "Legends & Legacies", detail: "Rajput chronicles, hill forts and stories of courage" },
              { title: "Food & Flavours", detail: "Dal baati churma, ker sangri and royal rasois" },
              { title: "Festivals & Faith", detail: "Pushkar Camel Mela, Gangaur and Teej" },
              { title: "Musical Heritage", detail: "Bhapang, Kamayacha and Dhani Sarangi" }
            ]
          },
          "Assam": {
            slogan: "Stories carried by the great river and the red earth.",
            categories: [
              { title: "Legends & Legacies", detail: "Ahom kingdom heritage and chronicles of Buranjis" },
              { title: "Food & Flavours", detail: "Masor tenga, khaar, pitha and elephant apple" },
              { title: "Festivals & Faith", detail: "Magh Bihu, Rongali Bihu and satra dances" },
              { title: "Musical Heritage", detail: "Kali horn, Tokari lute and Bihu Dhol" }
            ]
          },
          "Tamil Nadu": {
            slogan: "Where living temples keep a thousand years of rhythm.",
            categories: [
              { title: "Legends & Legacies", detail: "Chola seafaring, Sangam poetry and Brihadisvara" },
              { title: "Food & Flavours", detail: "Chettinad spiced feasts, pongal and filter kaapi" },
              { title: "Festivals & Faith", detail: "Thai Pongal, Mattu Pongal and Karthigai Deepam" },
              { title: "Musical Heritage", detail: "Saraswati Veena, Nadaswaram, Bhajan Tambura and Ghatam" }
            ]
          },
          "Gujarat": {
            slogan: "A coast of commerce, colour and enduring craft.",
            categories: [
              { title: "Legends & Legacies", detail: "Harappan Dholavira, Rani ki Vav and stepwells" },
              { title: "Food & Flavours", detail: "Undhiyu in earthen pots, dhokla and Gujarati thali" },
              { title: "Festivals & Faith", detail: "Navratri Garba, Uttarayan and Rann Utsav" },
              { title: "Musical Heritage", detail: "Karnat long horn, Ravanahatha and Jodiya Pawa" }
            ]
          },
          "Punjab": {
            slogan: "Land of five rivers, golden wheat and boundless warmth.",
            categories: [
              { title: "Legends & Legacies", detail: "Harappan tandoor roots and Khalsa foundation" },
              { title: "Food & Flavours", detail: "Sarson da saag, makki di roti and churned butter" },
              { title: "Festivals & Faith", detail: "Baisakhi harvest, Lohri and Gurpurab" },
              { title: "Musical Heritage", detail: "Dhol, Tumbi, Algoza and Chimta" }
            ]
          },
          "West Bengal": {
            slogan: "A river delta where art, literature and devotion intertwine.",
            categories: [
              { title: "Legends & Legacies", detail: "Terracotta temples of Bishnupur and colonial renaissance" },
              { title: "Food & Flavours", detail: "Shorshe ilish, macher jhol, sandesh and mishti doi" },
              { title: "Festivals & Faith", detail: "Durga Puja (UNESCO Heritage) and Dhaak Utsav" },
              { title: "Musical Heritage", detail: "Khamak / Anandalahari, Ektara and Dhaak" }
            ]
          },
          "Kerala": {
            slogan: "God’s own country of sacred backwaters and spice hills.",
            categories: [
              { title: "Legends & Legacies", detail: "Chera maritime trade, Muziris and spice routes" },
              { title: "Food & Flavours", detail: "Traditional 28-dish plantain leaf Sadya and appam" },
              { title: "Festivals & Faith", detail: "Onam harvest, Vallam Kali boat races and Thrissur Pooram" },
              { title: "Musical Heritage", detail: "Chenda melam, Idakka and Panchavadyam" }
            ]
          },
          "Odisha": {
            slogan: "Soul of India, carved in granite, cloth and rhythm.",
            categories: [
              { title: "Legends & Legacies", detail: "Kalinga empire, Konark Sun Temple and Jagannath" },
              { title: "Food & Flavours", detail: "Chhena poda baked cheese, dalma and pakhala" },
              { title: "Festivals & Faith", detail: "Rath Yatra of Puri, Raja Parba and Chandan Yatra" },
              { title: "Musical Heritage", detail: "Ganilauri wood idiophone, Mardala and tribal flutes" }
            ]
          },
          "Nagaland": {
            slogan: "Hills of warrior legends, mist and vibrant clan traditions.",
            categories: [
              { title: "Legends & Legacies", detail: "Heritage of 16 recognized indigenous Naga tribes" },
              { title: "Food & Flavours", detail: "Smoked pork with raja mircha, fermented axone and bamboo" },
              { title: "Festivals & Faith", detail: "Hornbill Festival of Festivals at Kisama" },
              { title: "Musical Heritage", detail: "Log drum percussion and multi-pitch mouth horns" }
            ]
          },
          "Meghalaya": {
            slogan: "Abode of clouds, living root bridges and sacred groves.",
            categories: [
              { title: "Legends & Legacies", detail: "Khasi, Garo and Jaintia matrilineal traditions" },
              { title: "Food & Flavours", detail: "Jadoh red rice, dohneiiong sesame pork and tungrymbai" },
              { title: "Festivals & Faith", detail: "Wangala Hundred Drums Festival and Shad Suk Mynsiem" },
              { title: "Musical Heritage", detail: "Bom great kettle drum and Duitara two-stringed lute" }
            ]
          },
          "Maharashtra": {
            slogan: "Forts of Shivaji, coastal Konkan and living devotion.",
            categories: [
              { title: "Legends & Legacies", detail: "Maratha hill forts, Ajanta-Ellora caves and Shivaji" },
              { title: "Food & Flavours", detail: "Puran poli, pithla bhakri, misal pav and solkadhi" },
              { title: "Festivals & Faith", detail: "Ganesh Chaturthi, Gudi Padwa and Pandharpur Wari" },
              { title: "Musical Heritage", detail: "Ektara, Dholki, Tutari and Lejim" }
            ]
          },
          "Jammu & Kashmir / Ladakh": {
            slogan: "Crown of high mountain passes, saffron valleys and ancient monasteries.",
            categories: [
              { title: "Legends & Legacies", detail: "Silk Route crossroads, Martand Temple and Hemis Gompa" },
              { title: "Food & Flavours", detail: "Wazwan 36-course feast, Rogan josh, gushtaba and kahwa" },
              { title: "Festivals & Faith", detail: "Hemis Tsechu, Cham mask dances and Losar New Year" },
              { title: "Musical Heritage", detail: "Damaru cosmic drum, Santoor, Rabab and Dungchen horns" }
            ]
          },
          "Telangana & Andhra Pradesh": {
            slogan: "Pearl of the Deccan, fiery coastal spices and Kakatiya arches.",
            categories: [
              { title: "Legends & Legacies", detail: "Kakatiya dynasty, Golconda Fort and Asaf Jahi Nizams" },
              { title: "Food & Flavours", detail: "Hyderabadi dum biryani, gongura mutton and pootharekulu" },
              { title: "Festivals & Faith", detail: "Bonalu, Bathukamma floral celebration and Ugadi" },
              { title: "Musical Heritage", detail: "Burrakatha Dakki storytelling vessel and Veena" }
            ]
          },
          "Bihar & UP": {
            slogan: "Heartland of the sacred Ganga, Vedic philosophy and grand empires.",
            categories: [
              { title: "Legends & Legacies", detail: "Mauryan Pataliputra, Nalanda University and Varanasi" },
              { title: "Food & Flavours", detail: "Litti chokha, sattu paratha and Awadhi dum cuisine" },
              { title: "Festivals & Faith", detail: "Chhath Puja solar vrata, Ganga Mahotsav and Dev Deepawali" },
              { title: "Musical Heritage", detail: "Shehnai of Varanasi, Sarod and Pakhawaj" }
            ]
          },
          "Chhattisgarh": {
            slogan: "Dandakaranya forest heartland of metalcraft and sacred rivers.",
            categories: [
              { title: "Legends & Legacies", detail: "Kakatiya lineage and indigenous Gond-Muria heritage" },
              { title: "Food & Flavours", detail: "Chila rice pancakes, fara and red ant chaprah chutney" },
              { title: "Festivals & Faith", detail: "Bastar Dussehra 75-day festival for Ma Danteshwari" },
              { title: "Musical Heritage", detail: "Korku bamboo flutes, Mandar drum and bronze bells" }
            ]
          }
        };

        const CULTURAL_HERITAGE_DATA = [
          // --- FESTIVALS OF INDIA (https://www.indianculture.gov.in/festivals-of-india) ---
          {
            id: "fest-bihu",
            title: "Magh Bihu & Rongali Bihu",
            sub: "Harvest Thanksgiving & Assamese New Year",
            state: "Assam",
            region: "Northeast",
            category: "festivals",
            categoryLabel: "Festivals of India",
            purpose: "Marks the conclusion of harvesting season with communal feasts (Uruka) beside Meji bamboo bonfires, welcoming spring with the Bohag Bihu dance symbolising fertility, agricultural renewal, and community harmony.",
            history: "Rooted in Austroasiatic, Tibeto-Burman and Tai-Ahom agricultural rituals; recorded extensively in medieval Ahom Buranjis. King Rudra Singha in 1698 invited performers to the royal Rang Ghar pavilion.",
            image: "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/festivals-of-india"
          },
          {
            id: "fest-pushkar",
            title: "Pushkar Camel Mela & Kartik Purnima",
            sub: "Sacred Lake Fair & Pastoral Gathering",
            state: "Rajasthan",
            region: "North",
            category: "festivals",
            categoryLabel: "Festivals of India",
            purpose: "Combines the world's largest historic camel and livestock trading fair with a sacred pilgrimage dip in the holy Pushkar Lake on the full moon of Kartik to seek spiritual release and blessings from Lord Brahma.",
            history: "Ancient pilgrimage mentioned in the Mahabharata and Padma Purana; houses one of the very few surviving ancient temples dedicated to Brahma in the world, active for over two millennia.",
            image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/festivals-of-india"
          },
          {
            id: "fest-hornbill",
            title: "Hornbill Festival (Kisama Heritage)",
            sub: "The Great Festival of Naga Festivals",
            state: "Nagaland",
            region: "Northeast",
            category: "festivals",
            categoryLabel: "Festivals of India",
            purpose: "Celebrated annually in the heritage village of Kisama to foster inter-tribal camaraderie and preserve indigenous warrior traditions, songs, dances, and handcrafted tribal wood carvings.",
            history: "Named in tribute to the revered Great Indian Hornbill, celebrated in ancient Naga folklore for its bravery, vigilance, and vibrant plumage; preserves centuries of oral heritage.",
            image: "https://images.unsplash.com/photo-1544717305-2782549b5136?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/festivals-of-india"
          },
          {
            id: "fest-onam",
            title: "Onam & Vallam Kali Snake Boat Race",
            sub: "Harvest Festival & Homecoming of King Mahabali",
            state: "Kerala",
            region: "South",
            category: "festivals",
            categoryLabel: "Festivals of India",
            purpose: "Commemorates the annual return of the mythical righteous King Mahabali to visit his subjects; celebrated with exquisite floral rangolis (Pookkalam), grand vegetarian Sadya feasts, and fierce 100-oar snake boat regattas.",
            history: "Documented in Sangam literature and medieval Chera inscriptions; reflects the agrarian transition during the Malayalam month of Chingam celebrating abundance and social equality.",
            image: "https://images.unsplash.com/photo-1609137144822-45e07bd62923?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/festivals-of-india"
          },
          {
            id: "fest-durga",
            title: "Durga Puja & Dhaak Utsav",
            sub: "UNESCO Intangible Cultural Heritage",
            state: "West Bengal",
            region: "East",
            category: "festivals",
            categoryLabel: "Festivals of India",
            purpose: "Ten-day public celebration commemorating the victory of Goddess Durga over Mahishasura; transformed into a massive public open-air art exhibition featuring handcrafted terracotta pandals and rhythmic Dhaak drum beats.",
            history: "Inscribed on UNESCO's Representative List of the Intangible Cultural Heritage of Humanity in 2021. Earliest recorded grand community Baro-yaari celebrations date back to 1757 at Shovabazar Rajbari.",
            image: "https://images.unsplash.com/photo-1569420079089-a29dcaeaae13?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/festivals-of-india"
          },
          {
            id: "fest-pongal",
            title: "Pongal & Mattu Pongal",
            sub: "Solar Thanksgiving & Cattle Veneration",
            state: "Tamil Nadu",
            region: "South",
            category: "festivals",
            categoryLabel: "Festivals of India",
            purpose: "A four-day solar harvest festival thanking Surya and cattle for agricultural abundance; fresh milk and rice are boiled in earthen pots until boiling over to signify inexhaustible prosperity.",
            history: "Dating back to the Sangam period (3rd century BCE), attested in classical Tamil epics Silappathikaram and Manimekalai as a sacred festival of the harvest season.",
            image: "https://images.unsplash.com/photo-1548013146-72479768bada?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/festivals-of-india"
          },
          {
            id: "fest-baisakhi",
            title: "Baisakhi & Giddha",
            sub: "Wheat Harvest & Foundation of the Khalsa Panth",
            state: "Punjab",
            region: "North",
            category: "festivals",
            categoryLabel: "Festivals of India",
            purpose: "Celebrates the ripening of the golden rabi wheat harvest with high-energy Bhangra and Giddha folk performances, while remembering the historic founding of the Khalsa Panth in 1699.",
            history: "Established as a monumental turning point in Indian history when Guru Gobind Singh created the order of the Khalsa at Anandpur Sahib on Vaisakhi day in 1699.",
            image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/festivals-of-india"
          },
          {
            id: "fest-rathyatra",
            title: "Rath Yatra of Puri",
            sub: "Chariot Procession of Lord Jagannath",
            state: "Odisha",
            region: "East",
            category: "festivals",
            categoryLabel: "Festivals of India",
            purpose: "Annual sacred journey where Lord Jagannath, Balabhadra, and Subhadra emerge from the sanctum to meet all people without distinction, travelling to Gundicha Temple in immense hand-crafted chariots.",
            history: "Described in the Skanda Purana and Ganga dynasty epigraphs; the oldest and largest annual chariot procession continuously documented for over 900 years.",
            image: "https://images.unsplash.com/photo-1629735919597-fed920b5bd84?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/festivals-of-india"
          },
          {
            id: "fest-navratri",
            title: "Navratri Garba & Rann Utsav",
            sub: "Nine Nights of Folk Dance & Shakti Veneration",
            state: "Gujarat",
            region: "West",
            category: "festivals",
            categoryLabel: "Festivals of India",
            purpose: "Community celebration of Nine Nights worshipping Goddess Amba; hundreds of thousands dance in synchronised circular patterns around perforated earthen lanterns (Garbha Deep) to live folk dhol beats.",
            history: "Tracing its origins to the ancient pastoral traditions of Krishna and Radha; recorded in Abul Fazl's Ain-i-Akbari as an unparalleled communal spectacle of western India.",
            image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/festivals-of-india"
          },
          {
            id: "fest-chhath",
            title: "Chhath Puja Mahaparv",
            sub: "Ancient Vedic Solar Vrata & Riverbank Offering",
            state: "Bihar & UP",
            region: "North",
            category: "festivals",
            categoryLabel: "Festivals of India",
            purpose: "Four-day rigorous ascetic vow dedicated to Surya and Usha; devotees stand in flowing river waters offering arghya in woven bamboo baskets (soop) with zero caste or priestly mediation.",
            history: "Direct continuation of Rigvedic solar adoration; mentioned in the Mahabharata as practiced by Karna (ruler of Anga) and Draupadi. Noted for strict ecological purity.",
            image: "https://images.unsplash.com/photo-1544717305-2782549b5136?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/festivals-of-india"
          },
          {
            id: "fest-hemis",
            title: "Hemis Tsechu & Cham Mask Dance",
            sub: "Sacred Himalayan Monastic Celebration",
            state: "Jammu & Kashmir / Ladakh",
            region: "North",
            category: "festivals",
            categoryLabel: "Festivals of India",
            purpose: "Commemorates the birth anniversary of Guru Padmasambhava; Buddhist lamas perform mystical Cham dances wearing wooden masks portraying the victory of enlightened awareness over destructive passions.",
            history: "Instituted in the 17th century by King Sengge Namgyal and Lama Stagsang Raspa; features the ceremonial unfurling of a towering two-storey silk Thangka tapestry every 12 years.",
            image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/festivals-of-india"
          },
          {
            id: "fest-bastar",
            title: "Bastar Dussehra",
            sub: "World's Longest 75-Day Indigenous Festival",
            state: "Chhattisgarh",
            region: "Central",
            category: "festivals",
            categoryLabel: "Festivals of India",
            purpose: "A 75-day festival celebrating the supreme tribal deity Ma Danteshwari and spirits of the Sal forest; marked by massive two-tiered wooden chariots constructed without a single iron nail.",
            history: "Commenced in the 15th century by Kakatiya King Purushottam Deo; involves active democratic participation of Maria, Muria, and Bhatra tribes across the Dandakaranya forests.",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/festivals-of-india"
          },

          // --- FOOD & CULTURE (https://www.indianculture.gov.in/food-and-culture) ---
          {
            id: "food-dalbaati",
            title: "Dal Baati Churma & Ker Sangri",
            sub: "Arid Desert Gastronomy & Royal Mewar Heritage",
            state: "Rajasthan",
            region: "North",
            category: "food",
            categoryLabel: "Food & Culture",
            purpose: "Created to withstand lengthy desert sieges and cavalry campaigns; slow-baked wheat dough balls submerged in golden ghee preserve for days, while wild desert berries provide deep mineral strength.",
            history: "Originated during 8th-century military campaigns under Rawal Bappa of Mewar; later refined with crushed sweet churma and Panchmel dal across royal Marwar rasois.",
            image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/food-and-culture"
          },
          {
            id: "food-saag",
            title: "Sarson da Saag & Makki di Roti",
            sub: "Agrarian Tandoori Winter Tradition",
            state: "Punjab",
            region: "North",
            category: "food",
            categoryLabel: "Food & Culture",
            purpose: "Nourishment for farming families through harsh north-Indian winters; fresh mustard leaves slow-simmered in earthen pots with bathua, ginger, and garlic, crowned with fresh white churned butter.",
            history: "Terracotta tandoors dating back to Harappan sites (Kalibangan) show unbroken continuity of earthen flatbread and roasted grains in the five-rivers basin.",
            image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/food-and-culture"
          },
          {
            id: "food-ilish",
            title: "Shorshe Ilish & Mishti Doi",
            sub: "Riverine Delta Cuisine & Clay-Pot Fermentation",
            state: "West Bengal",
            region: "East",
            category: "food",
            categoryLabel: "Food & Culture",
            purpose: "Celebrates Bengal's monsoon blessing; prized Hilsa fish steamed with freshly stone-ground mustard paste (shorshe bata) and green chilies, followed by caramelized sweet curd fermented in porous terracotta pots.",
            history: "Mentioned in 15th-century Mangalkavya literature as sacred festival food; porous clay absorbs excess moisture to concentrate milk sugars naturally without artificial thickeners.",
            image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/food-and-culture"
          },
          {
            id: "food-chettinad",
            title: "Chettinad Spiced Feast & Filter Kaapi",
            sub: "Ancient Maritime Spice-Route Gastronomy",
            state: "Tamil Nadu",
            region: "South",
            category: "food",
            categoryLabel: "Food & Culture",
            purpose: "Crafted by the seafaring Nattukottai Chettiars; features freshly stone-ground kalpasi (black stone flower), star anise, and Telicherry peppercorns to stimulate metabolic fire (Agni).",
            history: "Refined over centuries of maritime trade with Burma, Ceylon, and Sumatra; served strictly on fresh plantain leaves following Ayurvedic principles of six tastes (Shadrasa).",
            image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/food-and-culture"
          },
          {
            id: "food-sadya",
            title: "Traditional Sadya & Palada Payasam",
            sub: "Plantain-Leaf Multi-Course Harvest Banquet",
            state: "Kerala",
            region: "South",
            category: "food",
            categoryLabel: "Food & Culture",
            purpose: "A sacred multi-course vegetarian banquet of 24 to 28 dishes served on a single plantain leaf; features Avial, Sambar, Olan, Thoran, Kalan, and sweet jaggery-coconut milk Payasam.",
            history: "Rooted in ancient Chera kingdom harvest customs; the specific order and leaf-placement of dishes dates back over a thousand years to optimize digestive enzymes.",
            image: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/food-and-culture"
          },
          {
            id: "food-undhiyu",
            title: "Gujarati Thali, Undhiyu & Khandvi",
            sub: "Inverted Earthen Pot Winter Gastronomy",
            state: "Gujarat",
            region: "West",
            category: "food",
            categoryLabel: "Food & Culture",
            purpose: "Winter speciality Undhiyu (from 'undhu' meaning upside-down) where winter tubers, Surti papdi, and fenugreek muthiyas are sealed in earthen pots and slow-cooked in charcoal embers underground.",
            history: "Centered on Jain and Vaishnava philosophies of non-violence (Ahimsa); masters the intricate equilibrium of sweet, sour, spicy, and bitter in a single meal.",
            image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/food-and-culture"
          },
          {
            id: "food-masortenga",
            title: "Masor Tenga & Khaar",
            sub: "River Brahmaputra Indigenous Culinary Heritage",
            state: "Assam",
            region: "Northeast",
            category: "food",
            categoryLabel: "Food & Culture",
            purpose: "A light, sour fish broth prepared with elephant apple (ou tenga) or tomatoes to cool the body during tropical summers; paired with alkaline Khaar filtered from sun-dried banana peel ashes.",
            history: "Documented in ancient Assamese texts and Tai-Ahom medicinal scrolls for balancing bodily humors and promoting gut health.",
            image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/food-and-culture"
          },
          {
            id: "food-wazwan",
            title: "Kashmiri Wazwan: Rogan Josh & Gushtaba",
            sub: "Royal 36-Course Master Craftsmanship",
            state: "Jammu & Kashmir / Ladakh",
            region: "North",
            category: "food",
            categoryLabel: "Food & Culture",
            purpose: "Cooked by master hereditary chefs (Wazas); mutton slow-simmered with Kashmiri shallots (pran), dried cockscomb flower (maval) for ruby-red hue, fennel, and pure saffron threads.",
            history: "Brought to peak sophistication in the 14th century under Sultan Sikandar and Central Asian craft guilds; served communally in large engraved copper platters (Traem).",
            image: "https://images.unsplash.com/photo-1545247181-516773cae754?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/food-and-culture"
          },
          {
            id: "food-chhenapoda",
            title: "Chhena Poda & Dalma",
            sub: "India's First Baked Cheese & Jagannath Mahaprasad",
            state: "Odisha",
            region: "East",
            category: "food",
            categoryLabel: "Food & Culture",
            purpose: "India's indigenous baked dessert made by kneading fresh cottage cheese (chhena) with cardamom and jaggery, wrapped in sal leaves and baked overnight in hearth embers until caramelised.",
            history: "Originating in Nayagarh in the early 20th century, sharing culinary DNA with the millennia-old Chhappan Bhog (56 offerings) of the Puri Jagannath Temple.",
            image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/food-and-culture"
          },
          {
            id: "food-biryani",
            title: "Hyderabadi Dum Biryani & Gongura Mutton",
            sub: "Royal Asaf Jahi Dum Pukht & Deccan Herbs",
            state: "Telangana & Andhra Pradesh",
            region: "South",
            category: "food",
            categoryLabel: "Food & Culture",
            purpose: "Long-grain basmati and marinated meat sealed with dough in heavy handis and cooked slowly over wood embers (dum pukht); paired with tangy, iron-rich sorrel leaves (gongura).",
            history: "Refined in the royal kitchens of the Nizams of Hyderabad, fusing Persian and Mughal cooking techniques with fiery Andhra chilies and native spices.",
            image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/food-and-culture"
          },

          // --- MUSICAL INSTRUMENTS OF INDIA (https://www.indianculture.gov.in/musical-instruments-of-india) ---
          {
            id: "inst-tambura",
            title: "Bhajan Tambura",
            sub: "Tat Vadya · Chordophone Drone Instrument",
            state: "Tamil Nadu",
            region: "South",
            category: "instruments",
            categoryLabel: "Musical Instruments",
            purpose: "Plucked string drone instrument crafted from jackwood, brass strings, and celluloid; provides the foundational continuous acoustic pitch (Shruti) for Carnatic recitals and devotional bhajans.",
            history: "Classified as Tat Vadya in Bharata Muni's Natya Shastra (c. 200 BCE – 200 CE); revered as the sonic bedrock of Indian classical melody.",
            image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/musical-instruments-of-india"
          },
          {
            id: "inst-bhapang",
            title: "Bhapang / Apang Plucked Drum",
            sub: "Tat Vadya · Variable-Pitch Talking Chordophone",
            state: "Rajasthan",
            region: "North",
            category: "instruments",
            categoryLabel: "Musical Instruments",
            purpose: "Tucked under the armpit while plucking a single gut string with variable finger tension; produces hypnotic, talking percussive tones to accompany the heroic ballads of Mewati Jogis.",
            history: "Ancient single-stringed instrument documented in folk chronicles of the Mewat region, celebrated for its unique vocal mimicry and acoustic elasticity.",
            image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/musical-instruments-of-india"
          },
          {
            id: "inst-sarangi",
            title: "Dhani Sarangi Bowed Lute",
            sub: "Tat Vadya · 39 Sympathetic Resonating Strings",
            state: "Rajasthan",
            region: "North",
            category: "instruments",
            categoryLabel: "Musical Instruments",
            purpose: "Carved from a single block of seasoned wood and played by sliding cuticles against gut strings; celebrated across Indian music as the instrument that most faithfully reproduces the emotional nuance of the human voice.",
            history: "Derived from 'Sau Rang' (a hundred colours); documented across North Indian courts as the premier melodic accompanist to classical Khayal and Dhrupad singing.",
            image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/musical-instruments-of-india"
          },
          {
            id: "inst-veena",
            title: "Saraswati Veena",
            sub: "Tat Vadya · Ancient 24-Fret Plucked Lute",
            state: "Karnataka & Tamil Nadu",
            region: "South",
            category: "instruments",
            categoryLabel: "Musical Instruments",
            purpose: "Ancient 24-fret plucked lute featuring a carved dragon (yali) head and hollow jackwood resonator; the primary solo instrument of South Indian classical Carnatic music.",
            history: "Described in the Sama Veda and Natya Shastra; perfected in the 17th century by Govinda Dikshitar under the royal patronage of the Nayak rulers of Thanjavur.",
            image: "https://images.unsplash.com/photo-1520523839898-507121c21069?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/musical-instruments-of-india"
          },
          {
            id: "inst-khamak",
            title: "Khamak / Anandalahari",
            sub: "Avanaddha Vadya · Baul Mystic Tension Drum",
            state: "West Bengal",
            region: "East",
            category: "instruments",
            categoryLabel: "Musical Instruments",
            purpose: "Rhythmic string-tension drum held under the left arm; pulling the string taut with one hand while plucking with a wooden plectrum creates elastic, sliding rhythmic sweeps essential to Baul spiritual poetry.",
            history: "Avanaddha-Tat hybrid instrument documented in medieval Bengali Sahajiya Buddhist texts; central to Bengal's living UNESCO oral heritage.",
            image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/musical-instruments-of-india"
          },
          {
            id: "inst-bom",
            title: "Bom Khasi Kettle Drum",
            sub: "Avanaddha Vadya · Great Tribal Council Drum",
            state: "Meghalaya",
            region: "Northeast",
            category: "instruments",
            categoryLabel: "Musical Instruments",
            purpose: "Colossal single-headed kettle drum crafted from hollowed softwood trunk and stretched cowhide; struck with heavy mallets during state assemblies, warrior summons, and harvest dances in the Khasi Hills.",
            history: "Centuries-old tribal instrument representing democratic sovereignty of Khasi village Dorbars (councils), sounded across mist-shrouded valleys.",
            image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/musical-instruments-of-india"
          },
          {
            id: "inst-damaru",
            title: "Damaru Hourglass Drum",
            sub: "Avanaddha Vadya · Sacred Cosmic Rhythm Vessel",
            state: "Jammu & Kashmir / Ladakh",
            region: "North",
            category: "instruments",
            categoryLabel: "Musical Instruments",
            purpose: "Hourglass-shaped double-headed drum played by twisting the wrist so knotted string balls strike both skins; used in Tantric monastic rituals and wandering Shaivite devotional performances.",
            history: "Iconic emblem of Lord Shiva, representing the primordial sonic vibration (Nada-Brahma) from which the Sanskrit alphabet emerged in the Natya Shastra.",
            image: "https://images.unsplash.com/photo-1544717305-2782549b5136?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/musical-instruments-of-india"
          },
          {
            id: "inst-mridangam",
            title: "Mridangam Concert Drum",
            sub: "Avanaddha Vadya · Master Carnatic Percussion",
            state: "Tamil Nadu",
            region: "South",
            category: "instruments",
            categoryLabel: "Musical Instruments",
            purpose: "Two-headed barrel drum tuned with black iron-paste (karanai); produces multi-tonal acoustic harmonics and complex mathematical rhythmic cycles (Talas) in classical Carnatic concerts.",
            history: "Mentioned in the Ramayana, Mahabharata, and Silappathikaram; literally translates from Sanskrit as 'body made of clay' (Mrida-Angam).",
            image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/musical-instruments-of-india"
          },
          {
            id: "inst-kali",
            title: "Kali Procession Horn",
            sub: "Sushir Vadya · Aerophone Double-Reed Trumpet",
            state: "Assam",
            region: "Northeast",
            category: "instruments",
            categoryLabel: "Musical Instruments",
            purpose: "Conical wooden tube with fingerholes and a wide brass bell; blown with circular breathing to yield piercing, joyous melodies during Assamese royal processions and traditional weddings.",
            history: "Preserved in the royal courts of the Ahom kingdom as an auspicious ceremonial wind instrument of state.",
            image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/musical-instruments-of-india"
          },
          {
            id: "inst-shehnai",
            title: "Shehnai Double-Reed Oboe",
            sub: "Sushir Vadya · Auspicious Temple & Concert Horn",
            state: "Bihar & UP",
            region: "North",
            category: "instruments",
            categoryLabel: "Musical Instruments",
            purpose: "Auspicious wind instrument made of seasoned dark wood with a flared brass bell; believed to bring divine blessings (Mangala Vadya) at temple gates and weddings.",
            history: "Played as part of the royal Naubat (nine-instrument court ensemble); elevated to the world's most prestigious concert halls by Bharat Ratna Ustad Bismillah Khan.",
            image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/musical-instruments-of-india"
          },
          {
            id: "inst-bansuri",
            title: "Bansuri Bamboo Transverse Flute",
            sub: "Sushir Vadya · Ancient Six-Hole Flute",
            state: "Pan-India",
            region: "North & South",
            category: "instruments",
            categoryLabel: "Musical Instruments",
            purpose: "Transverse flute crafted from a single natural hollow bamboo culm without keys or reeds; player uses subtle breath control and finger half-shading to create microtonal glides (meend).",
            history: "One of the oldest instruments in world civilization; documented in the Rigveda as Venu and eternally associated with Lord Krishna in ancient Vrindavan lore.",
            image: "https://images.unsplash.com/photo-1520523839898-507121c21069?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/musical-instruments-of-india"
          },
          {
            id: "inst-ganilauri",
            title: "Ganilauri Kutia Kond Rhythm Wood",
            sub: "Ghan Vadya · Rare Idiophone of Odisha",
            state: "Odisha",
            region: "East",
            category: "instruments",
            categoryLabel: "Musical Instruments",
            purpose: "Solid tuned wood bar instrument carved from native light timber by the Kutia Kond tribe; struck with wooden mallets to maintain trance-inducing rhythmic timing during sacred dances.",
            history: "Categorised under Ghan Vadya in Natya Shastra as a self-vibrating instrument needing no tuning strings or skins, preserved in deep tribal forest heritage.",
            image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/musical-instruments-of-india"
          },
          {
            id: "inst-ghatam",
            title: "Ghatam High-Fired Clay Pot",
            sub: "Ghan Vadya · Ceramic Percussion Vessel",
            state: "Tamil Nadu",
            region: "South",
            category: "instruments",
            categoryLabel: "Musical Instruments",
            purpose: "Specially baked clay pot with iron and brass filings played by striking the mouth, neck, and belly with the fingers, thumbs, and palm to generate sparkling metallic resonance.",
            history: "Mentioned in the Valmiki Ramayana; one of the oldest percussion instruments in South India, requiring master pottery craftsmanship in Manamadurai.",
            image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/musical-instruments-of-india"
          },
          // --- Additional States: Festivals, Food & Culture, Musical Instruments ---
          {
            id: "fest-ganesh",
            title: "Ganesh Chaturthi & Dhol Tasha",
            sub: "Sarvajanik Ganeshotsav & Historic Rhythm Formations",
            state: "Maharashtra",
            region: "West",
            category: "festivals",
            categoryLabel: "Festivals of India",
            purpose: "A 10-day community celebration venerating Lord Ganesha, marked by sacred clay idol immersion (Visarjan) accompanied by massive 100-member synchronised Dhol-Tasha-Dhvaj percussion pathaks.",
            history: "Transformed in 1893 by freedom fighter Lokmanya Bal Gangadhar Tilak from a private household worship into a historic mass social mobilization movement against British colonial rule.",
            image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/festivals-of-india"
          },
          {
            id: "fest-dasara",
            title: "Mysuru Dasara Jamboo Savari",
            sub: "Royal Elephant Procession & Palace Illumination",
            state: "Karnataka",
            region: "South",
            category: "festivals",
            categoryLabel: "Festivals of India",
            purpose: "Celebrates Goddess Chamundeshwari's victory over Mahishasura; the golden 750-kilogram golden howdah (Chinnada Ambari) carrying the deity is borne by a lead tusker elephant through illuminated royal streets.",
            history: "Initiated by the Vijayanagara Empire kings in the 14th century, continued without interruption by Raja Wadiyar I of the Kingdom of Mysore starting in 1610 CE.",
            image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/festivals-of-india"
          },
          {
            id: "fest-khajuraho",
            title: "Khajuraho Dance Festival & Bhagoria",
            sub: "Classical Temple Dances & Tribal Harvest Celebration",
            state: "Madhya Pradesh",
            region: "Central",
            category: "festivals",
            categoryLabel: "Festivals of India",
            purpose: "Celebrated against the floodlit backdrop of the UNESCO World Heritage Western Group of Temples, presenting India's major classical dance traditions alongside the indigenous Bhagoria Haat of Bhil tribes.",
            history: "Started in 1975 to revive classical temple art forms beside the 10th-century Chandela dynasty stone architectural masterpieces.",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/festivals-of-india"
          },
          {
            id: "fest-kullu",
            title: "Kullu Dussehra & Deva Congregation",
            sub: "Week-Long Assembly of 200+ Himalayan Village Deities",
            state: "Himachal Pradesh",
            region: "North",
            category: "festivals",
            categoryLabel: "Festivals of India",
            purpose: "Commences on Vijaya Dashami when Dussehra concludes elsewhere; over 200 palanquins of local devatas from remote Himalayan valleys gather at Dhalpur Maidan to pay homage to Lord Raghunath.",
            history: "Instituted in 1660 CE by Raja Jagat Singh of Kullu after consecrating the idol of Lord Raghunath brought from Ayodhya.",
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/festivals-of-india"
          },
          {
            id: "fest-shigmo",
            title: "Shigmo Festival (Shigmotsav)",
            sub: "Goan Spring Harvest & Warrior Welcome",
            state: "Goa",
            region: "West",
            category: "festivals",
            categoryLabel: "Festivals of India",
            purpose: "A 14-day spring harvest festival honoring returning warriors who fought invaders; features traditional folk dances like Ghode Modni (horse dance), Fugdi, and Romtamel with vibrant costumes.",
            history: "Pre-Portuguese Hindu agrarian festival documented across Konkan folk traditions, preserved through centuries of coastal history.",
            image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/festivals-of-india"
          },
          {
            id: "food-puranpoli",
            title: "Puran Poli & Pithla Bhakri",
            sub: "Maratha Cavalry Trail Ration & Festive Sweet Flatbread",
            state: "Maharashtra",
            region: "West",
            category: "food",
            categoryLabel: "Food & Culture",
            purpose: "Chana dal slow-cooked with jaggery, nutmeg, and cardamom stuffed inside delicate whole-wheat dough and roasted with ghee; paired with hearty gram-flour pithla and sorghum bhakri.",
            history: "Described in the 12th-century Sanskrit encyclopaedia Manasollasa composed by Western Chalukya King Someshvara III; sustained Shivaji's guerrilla infantry across rugged Western Ghats forts.",
            image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/food-and-culture"
          },
          {
            id: "food-bisibelebath",
            title: "Bisi Bele Bath & Mysore Pak",
            sub: "Royal Palace Kitchens of Mysore & Spiced Lentil Rice",
            state: "Karnataka",
            region: "South",
            category: "food",
            categoryLabel: "Food & Culture",
            purpose: "Hot lentil rice slow-cooked with tamarind, nutmeg, Marathi moggu, and 30-spice blend with ghee-roasted cashews; followed by melt-in-mouth Mysore Pak crafted from gram flour, pure ghee, and sugar syrup.",
            history: "Developed in the royal palace kitchens (Rasoi) of the Wadiyars of Mysore under Maharaja Krishnaraja Wadiyar IV by chief royal cook Kakasura Madappa.",
            image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/food-and-culture"
          },
          {
            id: "food-bhutte",
            title: "Bhutte ka Kees & Dal Bafla",
            sub: "Malwa Plateau Grated Corn & Hearth-Baked Wheat",
            state: "Madhya Pradesh",
            region: "Central",
            category: "food",
            categoryLabel: "Food & Culture",
            purpose: "Tender local corn grated and tempered with mustard seeds, asafoetida, green chilies, and simmered slowly in whole milk, topped with freshly grated coconut and coriander.",
            history: "Centuries-old culinary innovation of Indore and Malwa region utilizing the abundant monsoon corn harvest of central India's black soil plains.",
            image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/food-and-culture"
          },
          {
            id: "food-siddu",
            title: "Siddu with Pure Ghee & Chha Gosht",
            sub: "Himalayan High-Altitude Fermented Wheat Bread",
            state: "Himachal Pradesh",
            region: "North",
            category: "food",
            categoryLabel: "Food & Culture",
            purpose: "Yeast-fermented whole wheat dough stuffed with crushed walnuts, poppy seeds, and roasted spices, steamed over boiling water and dipped generously into molten desi ghee.",
            history: "Indispensable high-calorie mountain preparation devised to sustain pastoral Gaddi shepherds through sub-zero Himalayan winters.",
            image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/food-and-culture"
          },
          {
            id: "food-goanfish",
            title: "Goan Fish Curry with Kokum & Bebinca",
            sub: "Konkan Coastal Kokum Broth & 7-Layered Royal Dessert",
            state: "Goa",
            region: "West",
            category: "food",
            categoryLabel: "Food & Culture",
            purpose: "Fresh coastal catch stewed in a velvet coconut-milk gravy soured with sun-dried kokum rinds (bhindim) and Kashmiri chilies; paired with Bebinca, a rich 7-layer baked coconut milk pudding.",
            history: "Living fusion of ancient Saraswat coastal seafood traditions with 450 years of Portuguese culinary influence along the Arabian Sea trade routes.",
            image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/food-and-culture"
          },
          {
            id: "inst-tutari",
            title: "Tutari / Shringa Curved Trumpet",
            sub: "Sushir Vadya · Royal Maratha Military Horn",
            state: "Maharashtra",
            region: "West",
            category: "instruments",
            categoryLabel: "Musical Instruments",
            purpose: "Curved crescent-shaped brass wind horn sounded during royal coronation ceremonies, religious processions, and historic battle summons across the Sahyadri mountains.",
            history: "An emblem of sovereign Maratha identity during the reign of Chhatrapati Shivaji Maharaj; classified as Sushir Vadya in the Natya Shastra.",
            image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/musical-instruments-of-india"
          },
          {
            id: "inst-maddale",
            title: "Maddale Yakshagana Drum",
            sub: "Avanaddha Vadya · Epic Theatre Percussion",
            state: "Karnataka",
            region: "South",
            category: "instruments",
            categoryLabel: "Musical Instruments",
            purpose: "Heavy barrel-shaped two-headed drum carved from jackfruit wood, tuned with rice paste and manganese powder; leads the dramatic rhythm of coastal Yakshagana dance-theatre.",
            history: "Integral percussion instrument belonging to the Maddalam lineage described in medieval Kannada and Sanskrit musical treatises.",
            image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/musical-instruments-of-india"
          },
          {
            id: "inst-ransingha",
            title: "Ransingha S-Shaped Horn",
            sub: "Sushir Vadya · Himalayan Temple & Procession Horn",
            state: "Himachal Pradesh",
            region: "North",
            category: "instruments",
            categoryLabel: "Musical Instruments",
            purpose: "Large two-piece S-curved copper horn producing deep, echoing resonant calls across high mountain valleys during devata processions and festive fairs.",
            history: "Millennia-old wind instrument of the Western Himalayas depicted in early medieval pahari temple reliefs and royal chronicles.",
            image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/musical-instruments-of-india"
          },
          {
            id: "inst-ghumot",
            title: "Ghumot Heritage Earthen Pot Drum",
            sub: "Avanaddha Vadya · Declared State Heritage Instrument",
            state: "Goa",
            region: "West",
            category: "instruments",
            categoryLabel: "Musical Instruments",
            purpose: "Earthen pot percussion instrument with both mouth openings covered with goatskin or synthetic membrane; played with finger slaps and base vibrations during Zagor, Dhalo, and Aarti.",
            history: "Officially declared the Heritage Musical Instrument of Goa in 2019; dates back to ancient Konkan village communities.",
            image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
            sourceUrl: "https://www.indianculture.gov.in/musical-instruments-of-india"
          }
        ];

        const cultureChanges = [
          { id: "currency", title: "Currency", then: "Silver rupee", now: "Digital rupee", note: "From hand-struck imperial coins to instant digital exchange." },
          { id: "message", title: "Messages", then: "Palm-leaf letter", now: "Instant message", note: "The medium changed; our need to stay connected did not." },
          { id: "music", title: "Music", then: "Royal mehfil", now: "Global streaming", note: "Once heard in intimate courts, classical traditions now cross borders." },
          { id: "travel", title: "Travel", then: "Grand trunk road", now: "High-speed rail", note: "Ancient routes still shape the way modern India moves." }
        ];

        const experienceImages = [
          "https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1800",
          "https://images.unsplash.com/photo-1519955266818-0231b63402bc?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1800",
          "https://images.unsplash.com/photo-1629735919597-fed920b5bd84?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1800",
          "https://images.unsplash.com/photo-1596901224267-67ca38199090?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1800",
          "https://images.unsplash.com/photo-1532664189809-02133fee698d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1800",
          "https://images.unsplash.com/photo-1719498481736-c125dfa45b03?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1800"
        ];

        const visitModes = [
          { id: "model", title: "Interactive 3D", detail: "Rotate, zoom and open historical hotspots", icon: "cube" },
          { id: "video", title: "3D Video Walkthrough", detail: "Watch a guided cinematic journey", icon: "play" },
          { id: "maps", title: "Google 3D Street View", detail: "Explore the monument and 360° street view", icon: "map" }
        ];

        // --- Application State ---
        let activeFeature = "3d";
        let backdropIndex = 0;
        let selectedMonument = monuments[0];
        let visitMode = "model";
        let selectedDynasty = dynasties[0];
        let isPlaying = false;
        let selectedState = "Rajasthan";
        let selectedCultureCategory = stateCultures["Rajasthan"] ? stateCultures["Rajasthan"].categories[0] : null;
        let selectedComparison = cultureChanges[0];
        let isScanning = false;
        let scanComplete = false;
        let panelCultureCat = "all";
        let panelCultureQuery = "";
        let activeHeritageCat = "all";
        let activeHeritageState = "All States";
        let heritageSearchQuery = "";

        // --- Render Feature Grid ---
        const featureCardsGrid = document.getElementById("feature-cards-grid");
        features.forEach((feat) => {
          const card = document.createElement("button");
          card.type = "button";
          card.className = `feature-card ${feat.id === activeFeature ? "is-active" : ""}`;
          card.dataset.id = feat.id;
          card.innerHTML = `
            <span class="feature-number">${feat.number}</span>
            <span class="feature-icon">${ICONS[feat.icon](28)}</span>
            <strong>${feat.title}</strong>
            <small>${feat.subtitle}</small>
            <span class="feature-description">${feat.description}</span>
            <span class="feature-link">Open experience ${ICONS.arrow(16)}</span>
          `;
          card.addEventListener("click", () => {
            selectFeature(feat.id);
            document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth", block: "start" });
          });
          featureCardsGrid.appendChild(card);
        });

        // --- Feature Switcher ---
        function selectFeature(id) {
          activeFeature = id;
          changeBackdrop();

          // Update active card styling
          document.querySelectorAll(".feature-card").forEach(c => {
            c.classList.toggle("is-active", c.dataset.id === id);
          });

          // Update experience headers
          const cur = features.find(f => f.id === id);
          document.getElementById("experience-count-num").textContent = `${cur.number} / 05`;
          document.getElementById("experience-title-heading").textContent = cur.title;
          document.getElementById("experience-lead-p").textContent = cur.description;

          // Toggle Panels
          document.querySelectorAll(".experience-panel").forEach(p => p.style.display = "none");
          const targetPanel = document.getElementById(`panel-${id}`);
          if (targetPanel) targetPanel.style.display = (id === "culture") ? "block" : (id === "gallery" ? "block" : "block");

          // Update overlays
          const modelOverlay = document.getElementById("experience-model-overlay");
          const scanFrame = document.getElementById("experience-scan-frame");
          
          if (id === "3d") {
            modelOverlay.style.display = "block";
            scanFrame.style.display = "none";
            updateModelBadge();
          } else if (id === "scanner") {
            modelOverlay.style.display = "none";
            scanFrame.style.display = "block";
          } else {
            modelOverlay.style.display = "none";
            scanFrame.style.display = "none";
          }
        }

        function changeBackdrop() {
          let next = Math.floor(Math.random() * experienceImages.length);
          if (next === backdropIndex) next = (next + 1) % experienceImages.length;
          backdropIndex = next;
          const bgImg = document.getElementById("experience-bg-img");
          bgImg.classList.remove("animate-in");
          void bgImg.offsetWidth; // trigger reflow
          bgImg.src = experienceImages[backdropIndex];
          bgImg.classList.add("animate-in");
        }

        // --- 3D Panel Logic ---
        function updateModelBadge() {
          const curMode = visitModes.find(m => m.id === visitMode);
          document.getElementById("experience-model-badge").innerHTML = `
            ${ICONS[curMode.icon](17)} ${curMode.title} ready
          `;
        }

        function renderRecentMonuments() {
          const container = document.getElementById("monuments-recent-buttons");
          container.innerHTML = "";
          monuments.slice(0, 3).forEach(m => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = (m.name === selectedMonument.name) ? "selected" : "";
            btn.innerHTML = `<strong>${m.name}</strong><span>${m.place}</span>`;
            btn.addEventListener("click", () => {
              selectedMonument = m;
              renderRecentMonuments();
              update3DLabels();
              changeBackdrop();
            });
            container.appendChild(btn);
          });
        }

        function renderVisitModes() {
          const container = document.getElementById("visit-modes-grid");
          container.innerHTML = "";
          visitModes.forEach(mode => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = (mode.id === visitMode) ? "selected" : "";
            btn.innerHTML = `
              ${ICONS[mode.icon](22)}
              <span><strong>${mode.title}</strong><small>${mode.detail}</small></span>
            `;
            btn.addEventListener("click", () => {
              visitMode = mode.id;
              renderVisitModes();
              updateModelBadge();
              update3DLabels();
              changeBackdrop();
              openFullscreenViewer(selectedMonument, visitMode);
            });
            container.appendChild(btn);
          });
        }

        function update3DLabels() {
          document.getElementById("visit-mode-label").textContent = `Choose how to experience ${selectedMonument.name}`;
          const launchBtn = document.getElementById("launch-visit-btn");
          launchBtn.textContent = (visitMode === "model") ? "Launch 3D model" : (visitMode === "video" ? "Play walkthrough" : "Open 3D Street View");
        }

        // Monument Search Filter
        const monumentSearchInput = document.getElementById("monument-search-input");
        const monumentSearchResults = document.getElementById("monument-search-results");
        const recentsWrap = document.getElementById("monument-recents-wrap");

        monumentSearchInput.addEventListener("input", (e) => {
          const q = e.target.value.trim().toLowerCase();
          if (!q) {
            monumentSearchResults.style.display = "none";
            recentsWrap.style.display = "block";
            return;
          }
          recentsWrap.style.display = "none";
          monumentSearchResults.style.display = "block";
          monumentSearchResults.innerHTML = "";

          const matched = monuments.filter(m => `${m.name} ${m.place}`.toLowerCase().includes(q));
          if (matched.length === 0) {
            monumentSearchResults.innerHTML = `<p class="empty-state">No monument found. Try a city or state.</p>`;
          } else {
            matched.forEach(m => {
              const item = document.createElement("button");
              item.type = "button";
              item.innerHTML = `
                <span><strong>${m.name}</strong><small>${m.place} · ${m.year}</small></span>
                ${ICONS.cube(16)}
              `;
              item.addEventListener("click", () => {
                selectedMonument = m;
                monumentSearchInput.value = "";
                monumentSearchResults.style.display = "none";
                recentsWrap.style.display = "block";
                renderRecentMonuments();
                update3DLabels();
                changeBackdrop();
              });
              monumentSearchResults.appendChild(item);
            });
          }
        });

        // --- Fullscreen 3D & Street View Viewer Logic ---
        const viewerModal = document.getElementById("viewer-modal");
        const modalBox = document.getElementById("modal-window-box");
        const modalCloseBtn = document.getElementById("modal-close-btn");
        const modalFullscreenBtn = document.getElementById("modal-fullscreen-btn");
        const modalViewportFrame = document.getElementById("modal-viewport-frame");
        const modalStreetviewBanner = document.getElementById("modal-streetview-banner");
        const modalStreetviewBtn = document.getElementById("modal-streetview-btn");
        const modalSourceLink = document.getElementById("modal-source-link");

        function openFullscreenViewer(monument, mode) {
          if (!monument) monument = selectedMonument;
          if (!mode) mode = visitMode;
          visitMode = mode;
          selectedMonument = monument;

          renderVisitModes();
          updateModelBadge();
          update3DLabels();

          const nameHeading = document.getElementById("modal-monument-name");
          const eraBadge = document.getElementById("modal-monument-era");
          const footerHotspots = document.getElementById("modal-footer-hotspots");
          const footerDynasty = document.getElementById("modal-footer-dynasty");
          const footerNotes = document.getElementById("modal-footer-notes");

          // Ensure fullscreen mode
          viewerModal.classList.add("is-fullscreen");
          modalBox.classList.add("fullscreen-mode");

          // Update header details
          eraBadge.textContent = `${monument.place} · ${monument.dynasty} (${monument.year})`;
          footerHotspots.textContent = `✦ ${monument.hotspots} Verified Archival Hotspots`;
          footerDynasty.textContent = `Dynasty: ${monument.dynasty}`;

          // Highlight active mode tab in modal
          document.querySelectorAll(".modal-mode-tab").forEach(tab => {
            tab.classList.toggle("is-active", tab.dataset.mode === mode);
          });

          if (mode === "model") {
            nameHeading.textContent = `${monument.name} — Interactive 3D Model`;
            modalViewportFrame.src = monument.modelEmbed || "";
            modalStreetviewBanner.style.display = "none";
            modalSourceLink.href = monument.modelUrl || "#";
            modalSourceLink.textContent = monument.modelUrl?.includes("tripo3d") ? "Open Tripo3D Source ↗" : "Open Sketchfab Source ↗";
            footerNotes.textContent = "Photogrammetry 3D Mesh · Interactive Realtime Render";
          } else if (mode === "video") {
            nameHeading.textContent = `${monument.name} — 3D Video Walkthrough`;
            modalViewportFrame.src = monument.videoEmbedUrl || "";
            modalStreetviewBanner.style.display = "none";
            modalSourceLink.href = monument.videoEmbedUrl ? monument.videoEmbedUrl.replace("embed/", "watch?v=").replace("?autoplay=1", "") : "#";
            modalSourceLink.textContent = "Watch on YouTube ↗";
            footerNotes.textContent = "Curated Cinematic Walkthrough · 4K Drone & Interior Archive";
          } else if (mode === "maps") {
            nameHeading.textContent = `${monument.name} — Google 3D Street View`;
            modalViewportFrame.src = monument.mapsEmbedUrl || "";
            modalStreetviewBanner.style.display = "flex";
            modalStreetviewBtn.href = monument.streetViewUrl || "#";
            modalSourceLink.href = monument.streetViewUrl || monument.mapsEmbedUrl || "#";
            modalSourceLink.textContent = "Launch Street View ↗";
            footerNotes.textContent = "Google Arts & Culture 360° Street View & Satellite Photogrammetry";
          }

          viewerModal.classList.add("is-open");
        }

        function closeFullscreenViewer() {
          viewerModal.classList.remove("is-open");
          if (modalViewportFrame) {
            modalViewportFrame.src = ""; // Clear src to stop audio / WebGL context
          }
        }

        // Mode tabs click inside the modal
        document.querySelectorAll(".modal-mode-tab").forEach(tab => {
          tab.addEventListener("click", () => {
            const nextMode = tab.dataset.mode;
            openFullscreenViewer(selectedMonument, nextMode);
          });
        });

        // Toggle Fullscreen button inside modal header
        modalFullscreenBtn?.addEventListener("click", () => {
          viewerModal.classList.toggle("is-fullscreen");
          modalBox.classList.toggle("fullscreen-mode");
        });

        modalCloseBtn?.addEventListener("click", closeFullscreenViewer);
        viewerModal?.addEventListener("click", (e) => {
          if (e.target === viewerModal) closeFullscreenViewer();
        });

        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape" && viewerModal.classList.contains("is-open")) {
            closeFullscreenViewer();
          }
        });

        document.getElementById("launch-visit-btn")?.addEventListener("click", () => {
          openFullscreenViewer(selectedMonument, visitMode);
        });

        window.openFullscreenViewer = openFullscreenViewer;

        // --- AI Storyteller Logic ---
        const storySearchInput = document.getElementById("story-search-input");
        const storySearchResults = document.getElementById("story-search-results");
        const surpriseStoryBtn = document.getElementById("surprise-story-btn");
        const storyToggleBtn = document.getElementById("story-toggle-btn");
        const soundwaveBars = document.getElementById("soundwave-bars");

        function updateStoryUI() {
          document.getElementById("story-player-status").textContent = isPlaying ? "Now telling" : "Ready to tell";
          document.getElementById("story-player-title").textContent = selectedDynasty.name;
          document.getElementById("story-summary-text").textContent = `${selectedDynasty.story} · ${selectedDynasty.era}`;
          document.getElementById("story-play-icon").innerHTML = isPlaying ? ICONS.pause(20) : ICONS.play(20);
          soundwaveBars.classList.toggle("moving", isPlaying);
        }

        storySearchInput.addEventListener("input", (e) => {
          const q = e.target.value.trim().toLowerCase();
          if (!q) {
            storySearchResults.style.display = "none";
            return;
          }
          storySearchResults.style.display = "block";
          storySearchResults.innerHTML = "";
          const matched = dynasties.filter(d => d.name.toLowerCase().includes(q));
          if (matched.length === 0) {
            storySearchResults.innerHTML = `<p class="empty-state">No matching dynasty found.</p>`;
          } else {
            matched.forEach(d => {
              const item = document.createElement("button");
              item.type = "button";
              item.innerHTML = `
                <span><strong>${d.name}</strong><small>${d.era}</small></span>
                ${ICONS.arrow(15)}
              `;
              item.addEventListener("click", () => {
                selectedDynasty = d;
                storySearchInput.value = "";
                storySearchResults.style.display = "none";
                updateStoryUI();
                changeBackdrop();
              });
              storySearchResults.appendChild(item);
            });
          }
        });

        surpriseStoryBtn.addEventListener("click", () => {
          const idx = dynasties.findIndex(d => d.name === selectedDynasty.name);
          selectedDynasty = dynasties[(idx + 1) % dynasties.length];
          storySearchInput.value = "";
          storySearchResults.style.display = "none";
          isPlaying = true;
          updateStoryUI();
          changeBackdrop();
          speakStory(selectedDynasty);
        });

        storyToggleBtn.addEventListener("click", () => {
          isPlaying = !isPlaying;
          updateStoryUI();
          if (isPlaying) {
            speakStory(selectedDynasty);
          } else if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
          }
        });

        function speakStory(d) {
          if (!('speechSynthesis' in window)) return;
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(`${d.name}. ${d.story}, during ${d.era}.`);
          utterance.rate = 0.95;
          utterance.onend = () => {
            isPlaying = false;
            updateStoryUI();
          };
          window.speechSynthesis.speak(utterance);
        }

        // --- Cultural Item Archival Modal Logic ---
        function openCulturalDetailModal(itemOrId) {
          const item = typeof itemOrId === "string" ? CULTURAL_HERITAGE_DATA.find(x => x.id === itemOrId) : itemOrId;
          if (!item) return;
          const modal = document.getElementById("cultural-detail-modal");
          if (!modal) return;

          document.getElementById("cultural-modal-title").textContent = item.title;
          document.getElementById("cultural-modal-badge").textContent = `${item.state} · ${item.categoryLabel}`;
          const imgEl = document.getElementById("cultural-modal-image");
          if (imgEl) {
            imgEl.src = item.image;
            imgEl.alt = item.title;
          }
          document.getElementById("cultural-modal-heading").textContent = item.title;
          document.getElementById("cultural-modal-sub").textContent = `${item.sub} · Region: ${item.region} India`;
          document.getElementById("cultural-modal-purpose").textContent = item.purpose;
          document.getElementById("cultural-modal-history").textContent = item.history;

          const sourceBtn = document.getElementById("cultural-modal-source-btn");
          if (sourceBtn) {
            sourceBtn.href = item.sourceUrl;
            sourceBtn.textContent = `Open Official Record on ${item.categoryLabel} Portal ↗`;
          }

          modal.classList.add("is-open");
        }
        window.openCulturalDetailModal = openCulturalDetailModal;

        function closeCulturalDetailModal() {
          const modal = document.getElementById("cultural-detail-modal");
          if (modal) modal.classList.remove("is-open");
        }
        window.closeCulturalDetailModal = closeCulturalDetailModal;

        document.getElementById("cultural-modal-close-btn")?.addEventListener("click", closeCulturalDetailModal);
        document.getElementById("cultural-detail-modal")?.addEventListener("click", (e) => {
          if (e.target.id === "cultural-detail-modal") closeCulturalDetailModal();
        });
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape") closeCulturalDetailModal();
        });

        // --- State Culture Module Logic (Experience Module Feature 03) ---
        function renderStateCulture() {
          // 1. Render State Buttons
          const statePickerContainer = document.getElementById("state-picker-buttons");
          if (statePickerContainer) {
            statePickerContainer.innerHTML = "";
            Object.keys(stateCultures).forEach(st => {
              const btn = document.createElement("button");
              btn.type = "button";
              btn.className = (st === selectedState) ? "selected" : "";
              btn.textContent = st;
              btn.addEventListener("click", () => {
                selectedState = st;
                renderStateCulture();
                changeBackdrop();
              });
              statePickerContainer.appendChild(btn);
            });
          }

          // 2. State Slogan Quote
          const sloganEl = document.getElementById("state-slogan-quote");
          if (sloganEl && stateCultures[selectedState]) {
            sloganEl.textContent = `“${stateCultures[selectedState].slogan}”`;
          }

          // 3. Category Buttons in Panel
          const catNav = document.getElementById("culture-panel-cat-nav");
          if (catNav) {
            catNav.querySelectorAll(".heritage-cat-btn").forEach(btn => {
              const cat = btn.dataset.cat;
              btn.classList.toggle("is-active", cat === panelCultureCat);
              btn.onclick = () => {
                panelCultureCat = cat;
                renderStateCulture();
              };
            });
          }

          // 4. Populate Items Grid in Experience Panel
          const itemsGrid = document.getElementById("culture-panel-items-grid");
          if (itemsGrid) {
            itemsGrid.innerHTML = "";
            const q = panelCultureQuery.trim().toLowerCase();

            const matched = CULTURAL_HERITAGE_DATA.filter(item => {
              const matchesState = q ? true : (item.state === selectedState || item.state.includes(selectedState) || selectedState.includes(item.state));
              const matchesCat = (panelCultureCat === "all" || item.category === panelCultureCat);
              const matchesQuery = !q || (
                item.title.toLowerCase().includes(q) ||
                item.sub.toLowerCase().includes(q) ||
                item.state.toLowerCase().includes(q) ||
                item.purpose.toLowerCase().includes(q) ||
                item.history.toLowerCase().includes(q)
              );
              return matchesState && matchesCat && matchesQuery;
            });

            if (matched.length === 0) {
              const stateInfo = stateCultures[selectedState];
              if (stateInfo && stateInfo.categories && !q) {
                stateInfo.categories.forEach(cat => {
                  const card = document.createElement("div");
                  card.className = "culture-panel-card";
                  card.innerHTML = `
                    <div class="culture-panel-card-info" style="padding: 4px 6px;">
                      <strong>${cat.title}</strong>
                      <span>${selectedState} Heritage</span>
                      <p>${cat.detail}</p>
                    </div>
                  `;
                  itemsGrid.appendChild(card);
                });
              } else {
                itemsGrid.innerHTML = `<p style="grid-column: 1 / -1; color: #baa98f; font-size: 13px; text-align: center; padding: 24px;">No cultural records found matching your query. Explore the full repository below.</p>`;
              }
            } else {
              matched.forEach(item => {
                const card = document.createElement("div");
                card.className = "culture-panel-card";
                card.style.cursor = "pointer";
                card.innerHTML = `
                  <img src="${item.image}" alt="${item.title}" loading="lazy" />
                  <div class="culture-panel-card-info">
                    <strong>${item.title}</strong>
                    <span>${item.categoryLabel} · ${item.state}</span>
                    <p>${item.purpose.slice(0, 95)}…</p>
                  </div>
                `;
                card.addEventListener("click", () => openCulturalDetailModal(item));
                itemsGrid.appendChild(card);
              });
            }
          }
        }

        // Panel Search Input listener
        const panelSearchInput = document.getElementById("culture-search-panel-input");
        if (panelSearchInput) {
          panelSearchInput.addEventListener("input", (e) => {
            panelCultureQuery = e.target.value;
            renderStateCulture();
          });
        }

        // --- National Living Heritage Repository Logic (All States Search & Filter) ---
        function renderHeritageRepository() {
          const pillsContainer = document.getElementById("heritage-state-pills");
          const itemsGrid = document.getElementById("heritage-items-grid");
          const catNav = document.getElementById("heritage-category-nav");
          if (!itemsGrid) return;

          // Compute list of unique states
          const statesSet = new Set();
          CULTURAL_HERITAGE_DATA.forEach(d => {
            if (d.state && d.state !== "Pan-India") statesSet.add(d.state);
          });
          const allStatesList = ["All States", ...Array.from(statesSet).sort()];

          // Render State Pills
          if (pillsContainer) {
            pillsContainer.innerHTML = "";
            allStatesList.forEach(st => {
              const pill = document.createElement("button");
              pill.type = "button";
              pill.className = `heritage-state-pill ${st === activeHeritageState ? "is-active" : ""}`;
              pill.textContent = st;
              pill.addEventListener("click", () => {
                activeHeritageState = st;
                renderHeritageRepository();
              });
              pillsContainer.appendChild(pill);
            });
          }

          // Category nav buttons binding
          if (catNav) {
            catNav.querySelectorAll(".heritage-cat-btn").forEach(btn => {
              const cat = btn.dataset.cat;
              btn.classList.toggle("is-active", cat === activeHeritageCat);
              btn.onclick = () => {
                activeHeritageCat = cat;
                renderHeritageRepository();
              };
            });
          }

          // Filter Data
          const q = heritageSearchQuery.trim().toLowerCase();
          const filtered = CULTURAL_HERITAGE_DATA.filter(item => {
            const matchesCat = (activeHeritageCat === "all" || item.category === activeHeritageCat);
            const matchesState = (activeHeritageState === "All States" || item.state === activeHeritageState || item.state.includes(activeHeritageState));
            const matchesQuery = !q || (
              item.title.toLowerCase().includes(q) ||
              item.sub.toLowerCase().includes(q) ||
              item.state.toLowerCase().includes(q) ||
              item.region.toLowerCase().includes(q) ||
              item.purpose.toLowerCase().includes(q) ||
              item.history.toLowerCase().includes(q)
            );
            return matchesCat && matchesState && matchesQuery;
          });

          // Render Grid
          itemsGrid.innerHTML = "";
          if (filtered.length === 0) {
            itemsGrid.innerHTML = `
              <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: rgba(255,255,255,0.02); border: 1px dashed rgba(240,232,219,0.15);">
                <p style="font-family: 'Playfair Display', serif; font-size: 22px; color: #f0e8db; margin-bottom: 8px;">No Cultural Records Found</p>
                <p style="color: #baa98f; font-size: 14px; max-width: 500px; margin: 0 auto 18px;">
                  We couldn’t find any festivals, culinary dishes, or musical instruments matching “${heritageSearchQuery}” in ${activeHeritageState}.
                </p>
                <button type="button" class="heritage-cat-btn" style="display: inline-block; cursor: pointer;" onclick="window.resetHeritageFilters()">
                  Reset Search &amp; Show All
                </button>
              </div>
            `;
            return;
          }

          filtered.forEach(item => {
            const card = document.createElement("article");
            card.className = "heritage-card";
            card.innerHTML = `
              <div class="heritage-card-media" style="cursor: pointer;" title="Click to inspect archival record">
                <img src="${item.image}" alt="${item.title}" loading="lazy" />
                <div class="heritage-badge-stack">
                  <span class="heritage-badge cat-badge">${item.categoryLabel}</span>
                  <span class="heritage-badge state-badge">${item.state}</span>
                </div>
              </div>
              <div class="heritage-card-content">
                <h3 class="heritage-card-title">${item.title}</h3>
                <p class="heritage-card-sub">${item.sub} · ${item.region} India</p>
                <div class="heritage-card-purpose">
                  <strong>✦ Purpose &amp; Cultural Meaning:</strong>
                  <p>${item.purpose}</p>
                </div>
                <div class="heritage-card-history">
                  <strong>📜 Archival Record ("hius data"):</strong>
                  <p>${item.history}</p>
                </div>
                <div class="heritage-card-footer">
                  <button type="button" class="heritage-explore-btn">
                    View Archival Record ↗
                  </button>
                  <a href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer" class="heritage-portal-link" title="Open official Ministry of Culture portal record">
                    Portal ↗
                  </a>
                </div>
              </div>
            `;

            // Open modal on clicking "View Archival Record" or clicking the image
            card.querySelector(".heritage-explore-btn").addEventListener("click", () => openCulturalDetailModal(item));
            card.querySelector(".heritage-card-media").addEventListener("click", () => openCulturalDetailModal(item));
            itemsGrid.appendChild(card);
          });
        }
        window.renderHeritageRepository = renderHeritageRepository;

        window.resetHeritageFilters = function() {
          activeHeritageCat = "all";
          activeHeritageState = "All States";
          heritageSearchQuery = "";
          const input = document.getElementById("heritage-main-search-input");
          if (input) input.value = "";
          renderHeritageRepository();
        };

        // Main Repository Search Input listener
        const mainSearchInput = document.getElementById("heritage-main-search-input");
        if (mainSearchInput) {
          mainSearchInput.addEventListener("input", (e) => {
            heritageSearchQuery = e.target.value;
            renderHeritageRepository();
          });
        }

        // --- Culture Gallery (Then vs Now) Logic ---
        function renderCultureGallery() {
          const tabsContainer = document.getElementById("gallery-change-tabs");
          tabsContainer.innerHTML = "";
          cultureChanges.forEach(ch => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = (ch.id === selectedComparison.id) ? "selected" : "";
            btn.textContent = ch.title;
            btn.addEventListener("click", () => {
              selectedComparison = ch;
              renderCultureGallery();
              changeBackdrop();
            });
            tabsContainer.appendChild(btn);
          });

          const compContainer = document.getElementById("gallery-then-now-container");
          compContainer.innerHTML = `
            <div>
              <small>Then</small>
              <strong>${selectedComparison.then}</strong>
              <span>Past archive</span>
            </div>
            <i>${ICONS.arrow(20)}</i>
            <div>
              <small>Now</small>
              <strong>${selectedComparison.now}</strong>
              <span>Living culture</span>
            </div>
          `;
          document.getElementById("gallery-note-text").textContent = selectedComparison.note;
        }

        // --- Smart Scanner Logic ---
        const smartScanBtn = document.getElementById("smart-scan-btn");
        const scanBtnIcon = document.getElementById("scan-btn-icon");
        const scanBtnLabel = document.getElementById("scan-btn-label");
        const scanLine = document.getElementById("experience-scan-line");
        const scannerResultCard = document.getElementById("scanner-result-card");

        smartScanBtn.addEventListener("click", () => {
          if (isScanning) return;
          isScanning = true;
          scanComplete = false;
          smartScanBtn.disabled = true;
          scanBtnIcon.innerHTML = ICONS.spark(18);
          scanBtnLabel.textContent = "Recognising monument…";
          scanLine.style.display = "block";
          scannerResultCard.style.display = "none";

          window.setTimeout(() => {
            isScanning = false;
            scanComplete = true;
            smartScanBtn.disabled = false;
            scanBtnIcon.innerHTML = ICONS.scan(18);
            scanBtnLabel.textContent = "Scan another monument";
            scanLine.style.display = "none";
            scannerResultCard.style.display = "block";

            // Randomly select or showcase scanned monument
            const scannedMon = monuments[Math.floor(Math.random() * monuments.length)];
            document.getElementById("scanner-detected-title").textContent = `${scannedMon.name} (${scannedMon.place})`;
            document.getElementById("scanner-detected-desc").textContent = `Identified: ${scannedMon.desc} Era: ${scannedMon.dynasty} (${scannedMon.year}). Verified record retrieved from National Heritage Database.`;
          }, 1800);
        });

        // Initialize Module Displays
        renderRecentMonuments();
        renderVisitModes();
        updateModelBadge();
        updateStoryUI();
        renderStateCulture();
        renderHeritageRepository();
        renderCultureGallery();
        selectFeature("3d");

        // --- Live 3D Monument Gallery (Sketchfab & monument.json API) ---
        (() => {
          const gallery = document.querySelector("#monument-gallery");
          const form = document.querySelector("#monument-search-form");
          const searchInput = document.querySelector("#monument-search-term");
          const RESULT_LIMIT = 12;

          if (!gallery) return;

          const LOCAL_CATALOG = [
            { uid: "7b43e635cbfb47719d5a124302b78579", name: "Taj Mahal", city: "Agra", state: "Uttar Pradesh" },
            { uid: "47c0ea2a759544729c137d8b86ba5b9a", name: "Hawa Mahal (Palace of Winds)", city: "Jaipur", state: "Rajasthan" },
            { uid: "bfde286898e94fd6bd44570df4669a8c", name: "Red Fort (Lal Qila)", city: "Delhi", state: "Delhi" },
            { uid: "e165e25ec8f1497aa83ab72419f40ddc", name: "Qutub Minar", city: "Delhi", state: "Delhi" },
            { uid: "6cc905be2ae34e8091eb1eaa84a17738", name: "Sun Temple, Konark", city: "Konark", state: "Odisha" },
            { uid: "3ac58986c87642c8846d28f797e59374", name: "Lahori Gate - Red Fort", city: "Delhi", state: "Delhi" },
            { uid: "8f5d2468d33c423cbe0b63aa189ee8ce", name: "Jaipur Royal Pavilion", city: "Jaipur", state: "Rajasthan" }
          ];

          function showStatus(message) {
            gallery.replaceChildren();
            const status = document.createElement("p");
            status.className = "gallery-status";
            status.textContent = message;
            gallery.append(status);
          }

          function getModels(payload) {
            if (!payload) return [];
            if (Array.isArray(payload.results?.models)) return payload.results.models;
            if (Array.isArray(payload.results)) return payload.results;
            if (Array.isArray(payload.models)) return payload.models;
            if (Array.isArray(payload.data)) return payload.data;
            if (Array.isArray(payload)) return payload;
            return [];
          }

          function makeModelCard(model) {
            const uid = model.uid || model.asset?.sourceModelUid;
            if (typeof uid !== "string" || !/^[a-z0-9]+$/i.test(uid)) return null;

            const card = document.createElement("article");
            card.className = "sketchfab-card";

            const frame = document.createElement("iframe");
            frame.src = `https://sketchfab.com/models/${encodeURIComponent(uid)}/embed?autostart=0&ui_infos=0`;
            frame.title = model.name ? `${model.name} 3D model` : "Sketchfab 3D monument model";
            frame.loading = "lazy";
            frame.allow = "autoplay; fullscreen; xr-spatial-tracking";
            frame.setAttribute("allowfullscreen", "");

            const info = document.createElement("div");
            info.className = "sketchfab-card-info";

            const title = document.createElement("strong");
            title.textContent = model.name || "Untitled 3D model";

            const sourceLink = document.createElement("a");
            sourceLink.href = `https://sketchfab.com/3d-models/${encodeURIComponent(uid)}`;
            sourceLink.target = "_blank";
            sourceLink.rel = "noopener noreferrer";
            sourceLink.textContent = "View source and attribution on Sketchfab";

            info.append(title, sourceLink);
            card.append(frame, info);
            return card;
          }

          async function loadModels(searchTerm) {
            const query = searchTerm.trim();
            if (!query) {
              showStatus("Enter a monument, city, or heritage site to search.");
              return;
            }

            showStatus(`Searching models for “${query}”…`);
            const endpoint = new URL("https://api.sketchfab.com/v3/search");
            endpoint.searchParams.set("type", "models");
            endpoint.searchParams.set("q", query);
            endpoint.searchParams.set("count", String(RESULT_LIMIT));

            let models = [];

            // 1. Try public Sketchfab API
            try {
              const response = await fetch(endpoint, { headers: { Accept: "application/json" } });
              if (response.ok) {
                models = getModels(await response.json());
              }
            } catch (err) {
              console.warn("Sketchfab direct API request bypassed, attempting local monument.json catalog:", err);
            }

            // 2. Try proxy /api/sources/sketchfab/search if running local api server
            if (models.length === 0) {
              try {
                const proxyResp = await fetch(`/api/sources/sketchfab/search?q=${encodeURIComponent(query)}&limit=${RESULT_LIMIT}`);
                if (proxyResp.ok) {
                  const proxyJson = await proxyResp.json();
                  models = getModels(proxyJson);
                }
              } catch (_) {}
            }

            // 3. Try monument.json / public/monument.json
            if (models.length === 0) {
              try {
                const jsonRes = await fetch("monument.json").catch(() => fetch("/monument.json"));
                if (jsonRes && jsonRes.ok) {
                  const data = await jsonRes.json();
                  const allLocal = getModels(data);
                  const qLower = query.toLowerCase();
                  const matched = allLocal.filter(m =>
                    (m.name && m.name.toLowerCase().includes(qLower)) ||
                    (m.city && m.city.toLowerCase().includes(qLower)) ||
                    (m.state && m.state.toLowerCase().includes(qLower)) ||
                    (m.description && m.description.toLowerCase().includes(qLower)) ||
                    qLower.includes("monument") ||
                    qLower.includes("india")
                  );
                  models = matched.length > 0 ? matched : allLocal;
                }
              } catch (localErr) {
                console.warn("Failed fetching external monument.json, using built-in catalog:", localErr);
              }
            }

            // 4. Built-in catalog fallback
            if (models.length === 0) {
              const qLower = query.toLowerCase();
              const matched = LOCAL_CATALOG.filter(m =>
                m.name.toLowerCase().includes(qLower) ||
                m.city.toLowerCase().includes(qLower) ||
                m.state.toLowerCase().includes(qLower) ||
                qLower.includes("monument") ||
                qLower.includes("india")
              );
              models = matched.length > 0 ? matched : LOCAL_CATALOG;
            }

            const cards = models.map(makeModelCard).filter(Boolean);
            gallery.replaceChildren();

            if (cards.length === 0) {
              showStatus("No embeddable models were found. Try another search term.");
              return;
            }

            gallery.append(...cards);
          }

          form?.addEventListener("submit", (event) => {
            event.preventDefault();
            loadModels(searchInput?.value ?? "");
          });

          loadModels(gallery.dataset.searchTerm ?? "Indian monuments");
        })();

      })();
