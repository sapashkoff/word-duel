// =========================================================
// ДОПОЛНИТЕЛЬНЫЕ НАБОРЫ СЛОВ
// Файл подключается ПОСЛЕ words.js и добавляет темы в общий список WORD_SETS.
//
// ПРАВИЛА (игра проверяет их при запуске и пишет предупреждения в консоль браузера):
//  1) en не должны повторяться ни в одном наборе (статистика трудности общая)
//  2) ru не должны повторяться внутри одного набора (иначе два верных ответа)
//  3) для режимов "Сборка" и "Ввод" у слова должен быть ОДИН очевидный перевод
//     (без синонимов: например, не добавляй и big, и large с переводом "большой")
//  4) слова не длиннее 12 букв (иначе они не помещаются в ячейки сборки)
//  5) в наборе минимум 4 слова, лучше 25-40
// =========================================================
WORD_SETS.push(

  // ======================= СТУПЕНЬ 1 =======================
  {
    id: "time", name: "Время и календарь", icon: "📅", tier: 1,
    words: [
      { en: "Monday", ru: "понедельник" }, { en: "Tuesday", ru: "вторник" }, { en: "Wednesday", ru: "среда" },
      { en: "Thursday", ru: "четверг" }, { en: "Friday", ru: "пятница" }, { en: "Saturday", ru: "суббота" },
      { en: "Sunday", ru: "воскресенье" }, { en: "January", ru: "январь" }, { en: "February", ru: "февраль" },
      { en: "March", ru: "март" }, { en: "April", ru: "апрель" }, { en: "May", ru: "май" },
      { en: "June", ru: "июнь" }, { en: "July", ru: "июль" }, { en: "August", ru: "август" },
      { en: "September", ru: "сентябрь" }, { en: "October", ru: "октябрь" }, { en: "November", ru: "ноябрь" },
      { en: "December", ru: "декабрь" }, { en: "today", ru: "сегодня" }, { en: "tomorrow", ru: "завтра" },
      { en: "yesterday", ru: "вчера" }, { en: "week", ru: "неделя" }, { en: "month", ru: "месяц" },
      { en: "year", ru: "год" }, { en: "hour", ru: "час" }, { en: "minute", ru: "минута" },
      { en: "evening", ru: "вечер" }, { en: "weekend", ru: "выходные" }, { en: "calendar", ru: "календарь" },
      { en: "midnight", ru: "полночь" }, { en: "always", ru: "всегда" }, { en: "never", ru: "никогда" },
      { en: "often", ru: "часто" }, { en: "sometimes", ru: "иногда" }, { en: "early", ru: "рано" },
      { en: "late", ru: "поздно" },
    ]
  },
  {
    id: "produce", name: "Фрукты и овощи", icon: "🍎", tier: 1,
    words: [
      { en: "pear", ru: "груша" }, { en: "peach", ru: "персик" }, { en: "plum", ru: "слива" },
      { en: "cherry", ru: "вишня" }, { en: "grape", ru: "виноград" }, { en: "watermelon", ru: "арбуз" },
      { en: "melon", ru: "дыня" }, { en: "pineapple", ru: "ананас" }, { en: "coconut", ru: "кокос" },
      { en: "apricot", ru: "абрикос" }, { en: "raspberry", ru: "малина" }, { en: "blueberry", ru: "черника" },
      { en: "kiwi", ru: "киви" }, { en: "mango", ru: "манго" }, { en: "pomegranate", ru: "гранат" },
      { en: "lime", ru: "лайм" }, { en: "garlic", ru: "чеснок" }, { en: "cabbage", ru: "капуста" },
      { en: "pepper", ru: "перец" }, { en: "mushroom", ru: "гриб" }, { en: "pumpkin", ru: "тыква" },
      { en: "spinach", ru: "шпинат" }, { en: "lettuce", ru: "салат-латук" }, { en: "corn", ru: "кукуруза" },
      { en: "bean", ru: "фасоль" }, { en: "pea", ru: "горох" }, { en: "eggplant", ru: "баклажан" },
      { en: "zucchini", ru: "кабачок" }, { en: "broccoli", ru: "брокколи" }, { en: "radish", ru: "редис" },
      { en: "beet", ru: "свёкла" }, { en: "celery", ru: "сельдерей" }, { en: "olive", ru: "оливка" },
      { en: "avocado", ru: "авокадо" }, { en: "nut", ru: "орех" }, { en: "almond", ru: "миндаль" },
      { en: "walnut", ru: "грецкий орех" }, { en: "peanut", ru: "арахис" }, { en: "berry", ru: "ягода" },
    ]
  },
  {
    id: "adjectives", name: "Описания", icon: "🖍️", tier: 1,
    words: [
      { en: "big", ru: "большой" }, { en: "small", ru: "маленький" }, { en: "long", ru: "длинный" },
      { en: "short", ru: "короткий" }, { en: "tall", ru: "высокий" }, { en: "fast", ru: "быстрый" },
      { en: "slow", ru: "медленный" }, { en: "hot", ru: "горячий" }, { en: "warm", ru: "тёплый" },
      { en: "new", ru: "новый" }, { en: "old", ru: "старый" }, { en: "young", ru: "молодой" },
      { en: "good", ru: "хороший" }, { en: "bad", ru: "плохой" }, { en: "beautiful", ru: "красивый" },
      { en: "ugly", ru: "уродливый" }, { en: "clean", ru: "чистый" }, { en: "dirty", ru: "грязный" },
      { en: "easy", ru: "лёгкий" }, { en: "difficult", ru: "трудный" }, { en: "rich", ru: "богатый" },
      { en: "poor", ru: "бедный" }, { en: "strong", ru: "сильный" }, { en: "weak", ru: "слабый" },
      { en: "full", ru: "полный" }, { en: "empty", ru: "пустой" }, { en: "thick", ru: "толстый" },
      { en: "thin", ru: "тонкий" }, { en: "wide", ru: "широкий" }, { en: "narrow", ru: "узкий" },
      { en: "deep", ru: "глубокий" }, { en: "dark", ru: "тёмный" }, { en: "bright", ru: "яркий" },
      { en: "soft", ru: "мягкий" }, { en: "loud", ru: "громкий" }, { en: "quiet", ru: "тихий" },
      { en: "sweet", ru: "сладкий" }, { en: "sour", ru: "кислый" }, { en: "bitter", ru: "горький" },
      { en: "dangerous", ru: "опасный" }, { en: "safe", ru: "безопасный" }, { en: "famous", ru: "известный" },
      { en: "busy", ru: "занятый" }, { en: "ready", ru: "готовый" }, { en: "heavy", ru: "тяжёлый" },
      { en: "wet", ru: "мокрый" }, { en: "dry", ru: "сухой" },
    ]
  },
  {
    id: "talk", name: "Общение и вопросы", icon: "💬", tier: 1,
    words: [
      { en: "who", ru: "кто" }, { en: "what", ru: "что" }, { en: "where", ru: "где" },
      { en: "when", ru: "когда" }, { en: "why", ru: "почему" }, { en: "how", ru: "как" },
      { en: "which", ru: "который" }, { en: "whose", ru: "чей" }, { en: "here", ru: "здесь" },
      { en: "there", ru: "там" }, { en: "now", ru: "сейчас" }, { en: "then", ru: "тогда" },
      { en: "very", ru: "очень" }, { en: "also", ru: "тоже" }, { en: "only", ru: "только" },
      { en: "again", ru: "снова" }, { en: "together", ru: "вместе" }, { en: "almost", ru: "почти" },
      { en: "already", ru: "уже" }, { en: "still", ru: "всё ещё" }, { en: "soon", ru: "скоро" },
      { en: "maybe", ru: "возможно" }, { en: "yes", ru: "да" }, { en: "please", ru: "пожалуйста" },
      { en: "thanks", ru: "спасибо" }, { en: "sorry", ru: "извините" }, { en: "hello", ru: "привет" },
      { en: "goodbye", ru: "до свидания" }, { en: "welcome", ru: "добро пожаловать" }, { en: "because", ru: "потому что" },
      { en: "without", ru: "без" }, { en: "under", ru: "под" }, { en: "above", ru: "над" },
      { en: "behind", ru: "позади" }, { en: "between", ru: "между" }, { en: "near", ru: "рядом" },
      { en: "far", ru: "далеко" }, { en: "inside", ru: "внутри" }, { en: "outside", ru: "снаружи" },
    ]
  },
  {
    id: "school", name: "Школа и учёба", icon: "🎒", tier: 1,
    words: [
      { en: "lesson", ru: "урок" }, { en: "homework", ru: "домашнее задание" }, { en: "exam", ru: "экзамен" },
      { en: "student", ru: "студент" }, { en: "notebook", ru: "тетрадь" }, { en: "pen", ru: "ручка" },
      { en: "pencil", ru: "карандаш" }, { en: "ruler", ru: "линейка" }, { en: "eraser", ru: "ластик" },
      { en: "backpack", ru: "рюкзак" }, { en: "classroom", ru: "кабинет" }, { en: "blackboard", ru: "доска" },
      { en: "dictionary", ru: "словарь" }, { en: "grade", ru: "оценка" }, { en: "subject", ru: "предмет" },
      { en: "mathematics", ru: "математика" }, { en: "history", ru: "история" }, { en: "geography", ru: "география" },
      { en: "physics", ru: "физика" }, { en: "chemistry", ru: "химия" }, { en: "biology", ru: "биология" },
      { en: "literature", ru: "литература" }, { en: "university", ru: "университет" }, { en: "degree", ru: "степень" },
      { en: "diploma", ru: "диплом" }, { en: "lecture", ru: "лекция" }, { en: "textbook", ru: "учебник" },
      { en: "scissors", ru: "ножницы" }, { en: "paper", ru: "бумага" }, { en: "test", ru: "тест" },
      { en: "question", ru: "вопрос" }, { en: "uniform", ru: "школьная форма" }, { en: "marker", ru: "маркер" },
      { en: "bell", ru: "звонок" },
    ]
  },

  // ======================= СТУПЕНЬ 2 =======================
  {
    id: "kitchen", name: "Кухня и ресторан", icon: "🍽️", tier: 2,
    words: [
      { en: "menu", ru: "меню" }, { en: "waiter", ru: "официант" }, { en: "bill", ru: "счёт" },
      { en: "tip", ru: "чаевые" }, { en: "order", ru: "заказ" }, { en: "napkin", ru: "салфетка" },
      { en: "bottle", ru: "бутылка" }, { en: "jar", ru: "банка" }, { en: "pot", ru: "кастрюля" },
      { en: "pan", ru: "сковорода" }, { en: "bowl", ru: "миска" }, { en: "kettle", ru: "чайник" },
      { en: "toaster", ru: "тостер" }, { en: "blender", ru: "блендер" }, { en: "ingredient", ru: "ингредиент" },
      { en: "flour", ru: "мука" }, { en: "oil", ru: "растительное масло" }, { en: "sauce", ru: "соус" },
      { en: "salad", ru: "салат" }, { en: "steak", ru: "стейк" }, { en: "sausage", ru: "колбаса" },
      { en: "bacon", ru: "бекон" }, { en: "beef", ru: "говядина" }, { en: "pork", ru: "свинина" },
      { en: "shrimp", ru: "креветка" }, { en: "salmon", ru: "лосось" }, { en: "tuna", ru: "тунец" },
      { en: "cream", ru: "сливки" }, { en: "yogurt", ru: "йогурт" }, { en: "jam", ru: "варенье" },
      { en: "pancake", ru: "блин" }, { en: "dessert", ru: "десерт" }, { en: "candy", ru: "конфета" },
      { en: "snack", ru: "закуска" }, { en: "vinegar", ru: "уксус" }, { en: "spice", ru: "специя" },
      { en: "tray", ru: "поднос" }, { en: "lid", ru: "крышка" }, { en: "freezer", ru: "морозилка" },
      { en: "cutlery", ru: "столовые приборы" }, { en: "grill", ru: "гриль" }, { en: "fry", ru: "жарить" },
      { en: "bake", ru: "выпекать" }, { en: "slice", ru: "ломтик" },
    ]
  },
  {
    id: "professions", name: "Профессии", icon: "👷", tier: 2,
    words: [
      { en: "engineer", ru: "инженер" }, { en: "lawyer", ru: "юрист" }, { en: "judge", ru: "судья" },
      { en: "firefighter", ru: "пожарный" }, { en: "soldier", ru: "солдат" }, { en: "farmer", ru: "фермер" },
      { en: "fisherman", ru: "рыбак" }, { en: "baker", ru: "пекарь" }, { en: "butcher", ru: "мясник" },
      { en: "chef", ru: "шеф-повар" }, { en: "hairdresser", ru: "парикмахер" }, { en: "mechanic", ru: "механик" },
      { en: "electrician", ru: "электрик" }, { en: "plumber", ru: "сантехник" }, { en: "builder", ru: "строитель" },
      { en: "journalist", ru: "журналист" }, { en: "scientist", ru: "учёный" }, { en: "programmer", ru: "программист" },
      { en: "designer", ru: "дизайнер" }, { en: "accountant", ru: "бухгалтер" }, { en: "secretary", ru: "секретарь" },
      { en: "pilot", ru: "пилот" }, { en: "sailor", ru: "моряк" }, { en: "driver", ru: "водитель" },
      { en: "guard", ru: "охранник" }, { en: "tailor", ru: "портной" }, { en: "pharmacist", ru: "фармацевт" },
      { en: "architect", ru: "архитектор" }, { en: "politician", ru: "политик" }, { en: "artist", ru: "художник" },
      { en: "writer", ru: "писатель" }, { en: "singer", ru: "певец" }, { en: "actor", ru: "актёр" },
      { en: "policeman", ru: "полицейский" }, { en: "worker", ru: "рабочий" }, { en: "cleaner", ru: "уборщик" },
      { en: "gardener", ru: "садовник" }, { en: "carpenter", ru: "плотник" }, { en: "dancer", ru: "танцор" },
      { en: "musician", ru: "музыкант" }, { en: "photographer", ru: "фотограф" }, { en: "veterinarian", ru: "ветеринар" },
    ]
  },
  {
    id: "world", name: "Страны и мир", icon: "🌍", tier: 2,
    words: [
      { en: "country", ru: "страна" }, { en: "capital", ru: "столица" }, { en: "flag", ru: "флаг" },
      { en: "world", ru: "мир" }, { en: "continent", ru: "континент" }, { en: "Europe", ru: "Европа" },
      { en: "Asia", ru: "Азия" }, { en: "Africa", ru: "Африка" }, { en: "America", ru: "Америка" },
      { en: "Australia", ru: "Австралия" }, { en: "Russia", ru: "Россия" }, { en: "England", ru: "Англия" },
      { en: "France", ru: "Франция" }, { en: "Germany", ru: "Германия" }, { en: "Italy", ru: "Италия" },
      { en: "Spain", ru: "Испания" }, { en: "China", ru: "Китай" }, { en: "Japan", ru: "Япония" },
      { en: "India", ru: "Индия" }, { en: "Brazil", ru: "Бразилия" }, { en: "Canada", ru: "Канада" },
      { en: "Mexico", ru: "Мексика" }, { en: "Egypt", ru: "Египет" }, { en: "Turkey", ru: "Турция" },
      { en: "Greece", ru: "Греция" }, { en: "north", ru: "север" }, { en: "south", ru: "юг" },
      { en: "east", ru: "восток" }, { en: "west", ru: "запад" }, { en: "citizen", ru: "гражданин" },
      { en: "foreigner", ru: "иностранец" }, { en: "population", ru: "население" }, { en: "government", ru: "правительство" },
      { en: "president", ru: "президент" }, { en: "law", ru: "закон" }, { en: "English", ru: "английский" },
      { en: "Russian", ru: "русский" }, { en: "French", ru: "французский" }, { en: "German", ru: "немецкий" },
      { en: "Spanish", ru: "испанский" }, { en: "Chinese", ru: "китайский" },
    ]
  },
  {
    id: "sports", name: "Спорт и хобби", icon: "⚽", tier: 2,
    words: [
      { en: "football", ru: "футбол" }, { en: "basketball", ru: "баскетбол" }, { en: "tennis", ru: "теннис" },
      { en: "swimming", ru: "плавание" }, { en: "cycling", ru: "велоспорт" }, { en: "skiing", ru: "лыжный спорт" },
      { en: "skating", ru: "катание на коньках" }, { en: "ball", ru: "мяч" }, { en: "player", ru: "игрок" },
      { en: "coach", ru: "тренер" }, { en: "match", ru: "матч" }, { en: "goal", ru: "гол" },
      { en: "champion", ru: "чемпион" }, { en: "medal", ru: "медаль" }, { en: "race", ru: "гонка" },
      { en: "fitness", ru: "фитнес" }, { en: "yoga", ru: "йога" }, { en: "boxing", ru: "бокс" },
      { en: "golf", ru: "гольф" }, { en: "hockey", ru: "хоккей" }, { en: "volleyball", ru: "волейбол" },
      { en: "chess", ru: "шахматы" }, { en: "drawing", ru: "рисование" }, { en: "photography", ru: "фотография" },
      { en: "fishing", ru: "рыбалка" }, { en: "hiking", ru: "поход" }, { en: "camping", ru: "кемпинг" },
      { en: "knitting", ru: "вязание" }, { en: "hobby", ru: "хобби" }, { en: "collection", ru: "коллекция" },
      { en: "tournament", ru: "турнир" }, { en: "referee", ru: "арбитр" }, { en: "training", ru: "тренировка" },
      { en: "swim", ru: "плавать" }, { en: "jump", ru: "прыгать" }, { en: "throw", ru: "бросать" },
      { en: "catch", ru: "ловить" }, { en: "kick", ru: "бить ногой" }, { en: "puzzle", ru: "головоломка" },
    ]
  },
  {
    id: "arts", name: "Музыка и кино", icon: "🎬", tier: 2,
    words: [
      { en: "music", ru: "музыка" }, { en: "song", ru: "песня" }, { en: "guitar", ru: "гитара" },
      { en: "piano", ru: "пианино" }, { en: "violin", ru: "скрипка" }, { en: "drum", ru: "барабан" },
      { en: "saxophone", ru: "саксофон" }, { en: "flute", ru: "флейта" }, { en: "concert", ru: "концерт" },
      { en: "band", ru: "музыкальная группа" }, { en: "orchestra", ru: "оркестр" }, { en: "movie", ru: "фильм" },
      { en: "director", ru: "режиссёр" }, { en: "stage", ru: "сцена" }, { en: "audience", ru: "зрители" },
      { en: "picture", ru: "картина" }, { en: "poem", ru: "стихотворение" }, { en: "novel", ru: "роман" },
      { en: "story", ru: "рассказ" }, { en: "poet", ru: "поэт" }, { en: "microphone", ru: "микрофон" },
      { en: "melody", ru: "мелодия" }, { en: "lyrics", ru: "слова песни" }, { en: "comedy", ru: "комедия" },
      { en: "horror", ru: "ужасы" }, { en: "cartoon", ru: "мультфильм" }, { en: "series", ru: "сериал" },
      { en: "episode", ru: "серия" }, { en: "festival", ru: "фестиваль" }, { en: "gallery", ru: "галерея" },
      { en: "sculpture", ru: "скульптура" }, { en: "painting", ru: "живопись" }, { en: "poster", ru: "плакат" },
      { en: "radio", ru: "радио" }, { en: "television", ru: "телевидение" },
    ]
  },
  {
    id: "transport", name: "Транспорт", icon: "🚗", tier: 2,
    words: [
      { en: "bicycle", ru: "велосипед" }, { en: "motorcycle", ru: "мотоцикл" }, { en: "truck", ru: "грузовик" },
      { en: "helicopter", ru: "вертолёт" }, { en: "airplane", ru: "самолёт" }, { en: "boat", ru: "лодка" },
      { en: "tram", ru: "трамвай" }, { en: "engine", ru: "двигатель" }, { en: "wheel", ru: "колесо" },
      { en: "fuel", ru: "топливо" }, { en: "gasoline", ru: "бензин" }, { en: "passenger", ru: "пассажир" },
      { en: "highway", ru: "шоссе" }, { en: "tunnel", ru: "туннель" }, { en: "speed", ru: "скорость" },
      { en: "brake", ru: "тормоз" }, { en: "garage", ru: "гараж" }, { en: "scooter", ru: "самокат" },
      { en: "rocket", ru: "ракета" }, { en: "sail", ru: "парус" }, { en: "anchor", ru: "якорь" },
      { en: "harbor", ru: "гавань" }, { en: "cargo", ru: "груз" }, { en: "helmet", ru: "шлем" },
      { en: "tire", ru: "шина" }, { en: "crash", ru: "авария" }, { en: "pedestrian", ru: "пешеход" },
      { en: "traffic light", ru: "светофор" }, { en: "road sign", ru: "дорожный знак" }, { en: "captain", ru: "капитан" },
      { en: "ferry", ru: "паром" }, { en: "escalator", ru: "эскалатор" },
    ]
  },
  {
    id: "tools", name: "Инструменты и материалы", icon: "🔧", tier: 2,
    words: [
      { en: "hammer", ru: "молоток" }, { en: "nail", ru: "гвоздь" }, { en: "screw", ru: "шуруп" },
      { en: "screwdriver", ru: "отвёртка" }, { en: "saw", ru: "пила" }, { en: "drill", ru: "дрель" },
      { en: "ladder", ru: "стремянка" }, { en: "paint", ru: "краска" }, { en: "brush", ru: "кисть" },
      { en: "bucket", ru: "ведро" }, { en: "rope", ru: "верёвка" }, { en: "wire", ru: "провод" },
      { en: "pipe", ru: "труба" }, { en: "tool", ru: "инструмент" }, { en: "toolbox", ru: "ящик для инструментов" },
      { en: "shovel", ru: "лопата" }, { en: "axe", ru: "топор" }, { en: "wrench", ru: "гаечный ключ" },
      { en: "glue", ru: "клей" }, { en: "tape", ru: "скотч" }, { en: "brick", ru: "кирпич" },
      { en: "cement", ru: "цемент" }, { en: "wood", ru: "древесина" }, { en: "metal", ru: "металл" },
      { en: "plastic", ru: "пластик" }, { en: "glass", ru: "стекло" }, { en: "iron", ru: "железо" },
      { en: "steel", ru: "сталь" }, { en: "repair", ru: "ремонт" }, { en: "broom", ru: "метла" },
      { en: "fence", ru: "забор" }, { en: "rubber", ru: "резина" }, { en: "silk", ru: "шёлк" },
      { en: "wool", ru: "шерсть" }, { en: "sponge", ru: "губка" }, { en: "bulb", ru: "лампочка" },
      { en: "socket", ru: "розетка" }, { en: "switch", ru: "выключатель" }, { en: "cotton", ru: "хлопок" },
    ]
  },
  {
    id: "apartment", name: "Квартира", icon: "🏢", tier: 2,
    words: [
      { en: "apartment", ru: "квартира" }, { en: "rent", ru: "аренда" }, { en: "landlord", ru: "арендодатель" },
      { en: "tenant", ru: "арендатор" }, { en: "elevator", ru: "лифт" }, { en: "entrance", ru: "подъезд" },
      { en: "basement", ru: "подвал" }, { en: "attic", ru: "чердак" }, { en: "chimney", ru: "дымоход" },
      { en: "fireplace", ru: "камин" }, { en: "ceiling", ru: "потолок" }, { en: "corridor", ru: "коридор" },
      { en: "lock", ru: "замок" }, { en: "doorbell", ru: "дверной звонок" }, { en: "mailbox", ru: "почтовый ящик" },
      { en: "wardrobe", ru: "шкаф" }, { en: "drawer", ru: "выдвижной ящик" }, { en: "bookshelf", ru: "книжная полка" },
      { en: "bathtub", ru: "ванна" }, { en: "shower", ru: "душ" }, { en: "toilet", ru: "туалет" },
      { en: "sink", ru: "раковина" }, { en: "faucet", ru: "кран" }, { en: "dishwasher", ru: "посудомойка" },
      { en: "microwave", ru: "микроволновка" }, { en: "heater", ru: "обогреватель" }, { en: "stove", ru: "плита" },
      { en: "wallpaper", ru: "обои" }, { en: "roommate", ru: "сосед по комнате" }, { en: "garbage", ru: "мусор" },
      { en: "dust", ru: "пыль" }, { en: "laundry", ru: "стирка" },
    ]
  },
  {
    id: "holidays", name: "Праздники", icon: "🎉", tier: 2,
    words: [
      { en: "Christmas", ru: "Рождество" }, { en: "Easter", ru: "Пасха" }, { en: "New Year", ru: "Новый год" },
      { en: "holiday", ru: "праздник" }, { en: "party", ru: "вечеринка" }, { en: "celebration", ru: "празднование" },
      { en: "fireworks", ru: "фейерверк" }, { en: "candle", ru: "свеча" }, { en: "balloon", ru: "воздушный шар" },
      { en: "decoration", ru: "украшение" }, { en: "tradition", ru: "традиция" }, { en: "costume", ru: "костюм" },
      { en: "mask", ru: "маска" }, { en: "carnival", ru: "карнавал" }, { en: "parade", ru: "парад" },
      { en: "feast", ru: "пир" }, { en: "toast", ru: "тост" }, { en: "champagne", ru: "шампанское" },
      { en: "postcard", ru: "открытка" }, { en: "Halloween", ru: "Хэллоуин" }, { en: "Santa Claus", ru: "Санта-Клаус" },
      { en: "wish", ru: "желание" }, { en: "surprise", ru: "сюрприз" }, { en: "invitation", ru: "приглашение" },
      { en: "anniversary", ru: "годовщина" }, { en: "snowman", ru: "снеговик" }, { en: "ribbon", ru: "лента" },
      { en: "confetti", ru: "конфетти" }, { en: "magic", ru: "магия" }, { en: "memory", ru: "воспоминание" },
    ]
  },

  // ======================= СТУПЕНЬ 3 =======================
  {
    id: "finance", name: "Деньги и финансы", icon: "💰", tier: 3,
    words: [
      { en: "loan", ru: "кредит" }, { en: "debt", ru: "долг" }, { en: "tax", ru: "налог" },
      { en: "income", ru: "доход" }, { en: "expense", ru: "расход" }, { en: "cost", ru: "стоимость" },
      { en: "pay", ru: "платить" }, { en: "payment", ru: "платёж" }, { en: "invoice", ru: "счёт-фактура" },
      { en: "investment", ru: "инвестиция" }, { en: "stock", ru: "акция" }, { en: "economy", ru: "экономика" },
      { en: "inflation", ru: "инфляция" }, { en: "insurance", ru: "страхование" }, { en: "pension", ru: "пенсия" },
      { en: "bonus", ru: "премия" }, { en: "fee", ru: "плата" }, { en: "mortgage", ru: "ипотека" },
      { en: "loss", ru: "убыток" }, { en: "trade", ru: "торговля" }, { en: "export", ru: "экспорт" },
      { en: "import", ru: "импорт" }, { en: "savings", ru: "сбережения" }, { en: "coin", ru: "монета" },
      { en: "banknote", ru: "банкнота" }, { en: "wealth", ru: "богатство" }, { en: "poverty", ru: "бедность" },
      { en: "balance", ru: "баланс" }, { en: "currency", ru: "валюта" }, { en: "dollar", ru: "доллар" },
      { en: "euro", ru: "евро" }, { en: "exchange", ru: "обмен" }, { en: "auction", ru: "аукцион" },
    ]
  },
  {
    id: "internet", name: "Интернет и соцсети", icon: "📱", tier: 3,
    words: [
      { en: "post", ru: "публикация" }, { en: "comment", ru: "комментарий" }, { en: "like", ru: "лайк" },
      { en: "follow", ru: "подписываться" }, { en: "share", ru: "делиться" }, { en: "profile", ru: "профиль" },
      { en: "username", ru: "имя пользователя" }, { en: "download", ru: "скачивать" }, { en: "upload", ru: "загружать" },
      { en: "search", ru: "поиск" }, { en: "browser", ru: "браузер" }, { en: "click", ru: "кликнуть" },
      { en: "cursor", ru: "курсор" }, { en: "server", ru: "сервер" }, { en: "software", ru: "софт" },
      { en: "virus", ru: "вирус" }, { en: "hacker", ru: "хакер" }, { en: "code", ru: "код" },
      { en: "database", ru: "база данных" }, { en: "algorithm", ru: "алгоритм" }, { en: "blog", ru: "блог" },
      { en: "podcast", ru: "подкаст" }, { en: "notification", ru: "уведомление" }, { en: "setting", ru: "настройка" },
      { en: "subscription", ru: "подписка" }, { en: "advert", ru: "реклама" }, { en: "emoji", ru: "смайлик" },
      { en: "selfie", ru: "селфи" }, { en: "hashtag", ru: "хэштег" }, { en: "chat", ru: "чат" },
      { en: "streaming", ru: "трансляция" }, { en: "channel", ru: "канал" }, { en: "bug", ru: "баг" },
      { en: "backup", ru: "резервная копия" },
    ]
  },
  {
    id: "science", name: "Наука и космос", icon: "🔭", tier: 3,
    words: [
      { en: "planet", ru: "планета" }, { en: "galaxy", ru: "галактика" }, { en: "universe", ru: "вселенная" },
      { en: "space", ru: "космос" }, { en: "satellite", ru: "спутник" }, { en: "astronaut", ru: "космонавт" },
      { en: "telescope", ru: "телескоп" }, { en: "microscope", ru: "микроскоп" }, { en: "atom", ru: "атом" },
      { en: "energy", ru: "энергия" }, { en: "gravity", ru: "гравитация" }, { en: "oxygen", ru: "кислород" },
      { en: "hydrogen", ru: "водород" }, { en: "carbon", ru: "углерод" }, { en: "experiment", ru: "эксперимент" },
      { en: "laboratory", ru: "лаборатория" }, { en: "theory", ru: "теория" }, { en: "discovery", ru: "открытие" },
      { en: "invention", ru: "изобретение" }, { en: "electricity", ru: "электричество" }, { en: "magnet", ru: "магнит" },
      { en: "force", ru: "сила" }, { en: "science", ru: "наука" }, { en: "orbit", ru: "орбита" },
      { en: "comet", ru: "комета" }, { en: "asteroid", ru: "астероид" }, { en: "Mars", ru: "Марс" },
      { en: "Jupiter", ru: "Юпитер" }, { en: "molecule", ru: "молекула" }, { en: "evolution", ru: "эволюция" },
      { en: "dinosaur", ru: "динозавр" }, { en: "fossil", ru: "ископаемое" }, { en: "volcano", ru: "вулкан" },
      { en: "earthquake", ru: "землетрясение" }, { en: "climate", ru: "климат" }, { en: "pollution", ru: "загрязнение" },
      { en: "recycle", ru: "перерабатывать" },
    ]
  }

);
