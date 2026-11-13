// Каждый набор: id (латиницей, уникальный), name, icon и список слов.
// Правила: слова en не должны повторяться между наборами,
// а русские переводы внутри одного набора не должны совпадать.
// В наборе должно быть минимум 4 слова.
const WORD_SETS = [
  {
    id: "basic", name: "Базовые слова", icon: "🌱",
    words: [
      { en: "apple", ru: "яблоко" }, { en: "house", ru: "дом" }, { en: "water", ru: "вода" },
      { en: "book", ru: "книга" }, { en: "friend", ru: "друг" }, { en: "window", ru: "окно" },
      { en: "street", ru: "улица" }, { en: "bread", ru: "хлеб" }, { en: "garden", ru: "сад" },
      { en: "moon", ru: "луна" }, { en: "sun", ru: "солнце" }, { en: "tree", ru: "дерево" },
      { en: "river", ru: "река" }, { en: "mountain", ru: "гора" }, { en: "table", ru: "стол" },
      { en: "chair", ru: "стул" }, { en: "door", ru: "дверь" }, { en: "city", ru: "город" },
      { en: "road", ru: "дорога" }, { en: "car", ru: "машина" }, { en: "dog", ru: "собака" },
      { en: "cat", ru: "кошка" }, { en: "bird", ru: "птица" }, { en: "fish", ru: "рыба" },
      { en: "milk", ru: "молоко" }, { en: "cheese", ru: "сыр" }, { en: "egg", ru: "яйцо" },
      { en: "sugar", ru: "сахар" }, { en: "salt", ru: "соль" }, { en: "rain", ru: "дождь" },
      { en: "snow", ru: "снег" }, { en: "wind", ru: "ветер" }, { en: "cloud", ru: "облако" },
      { en: "sea", ru: "море" }, { en: "flower", ru: "цветок" }, { en: "school", ru: "школа" },
      { en: "teacher", ru: "учитель" }, { en: "child", ru: "ребёнок" }, { en: "family", ru: "семья" },
      { en: "night", ru: "ночь" }, { en: "morning", ru: "утро" }, { en: "king", ru: "король" },
      { en: "day", ru: "день" }, { en: "week", ru: "неделя" }, { en: "year", ru: "год" },
      { en: "time", ru: "время" }, { en: "man", ru: "мужчина" }, { en: "woman", ru: "женщина" },
      { en: "boy", ru: "мальчик" }, { en: "girl", ru: "девочка" }, { en: "name", ru: "имя" },
      { en: "world", ru: "мир" }, { en: "country", ru: "страна" }, { en: "life", ru: "жизнь" },
      { en: "love", ru: "любовь" }, { en: "sky", ru: "небо" }, { en: "star", ru: "звезда" },
      { en: "fire", ru: "огонь" }, { en: "earth", ru: "земля" }, { en: "light", ru: "свет" },
    ]
  },
  {
    id: "food", name: "Еда", icon: "🍕",
    words: [
      { en: "meat", ru: "мясо" }, { en: "rice", ru: "рис" }, { en: "soup", ru: "суп" },
      { en: "coffee", ru: "кофе" }, { en: "tea", ru: "чай" }, { en: "juice", ru: "сок" },
      { en: "butter", ru: "масло" }, { en: "potato", ru: "картофель" }, { en: "tomato", ru: "помидор" },
      { en: "cake", ru: "торт" }, { en: "lemon", ru: "лимон" }, { en: "banana", ru: "банан" },
      { en: "chicken", ru: "курица" }, { en: "onion", ru: "лук" }, { en: "cucumber", ru: "огурец" },
      { en: "honey", ru: "мёд" }, { en: "breakfast", ru: "завтрак" }, { en: "dinner", ru: "ужин" },
      { en: "lunch", ru: "обед" }, { en: "cookie", ru: "печенье" }, { en: "orange", ru: "апельсин" },
      { en: "carrot", ru: "морковь" }, { en: "pepper", ru: "перец" }, { en: "garlic", ru: "чеснок" },
      { en: "cherry", ru: "вишня" }, { en: "grape", ru: "виноград" }, { en: "pasta", ru: "макароны" },
      { en: "sandwich", ru: "бутерброд" }, { en: "chocolate", ru: "шоколад" }, { en: "ice cream", ru: "мороженое" },
    ]
  },
  {
    id: "travel", name: "Путешествия", icon: "✈️",
    words: [
      { en: "ticket", ru: "билет" }, { en: "passport", ru: "паспорт" }, { en: "airport", ru: "аэропорт" },
      { en: "luggage", ru: "багаж" }, { en: "hotel", ru: "отель" }, { en: "map", ru: "карта" },
      { en: "train", ru: "поезд" }, { en: "bus", ru: "автобус" }, { en: "station", ru: "вокзал" },
      { en: "flight", ru: "рейс" }, { en: "tourist", ru: "турист" }, { en: "journey", ru: "путешествие" },
      { en: "beach", ru: "пляж" }, { en: "island", ru: "остров" }, { en: "bridge", ru: "мост" },
      { en: "border", ru: "граница" }, { en: "taxi", ru: "такси" }, { en: "ship", ru: "корабль" },
      { en: "customs", ru: "таможня" }, { en: "guide", ru: "гид" }, { en: "suitcase", ru: "чемодан" },
      { en: "plane", ru: "самолёт" }, { en: "vacation", ru: "отпуск" }, { en: "visa", ru: "виза" },
      { en: "souvenir", ru: "сувенир" }, { en: "backpack", ru: "рюкзак" }, { en: "arrival", ru: "прибытие" },
      { en: "departure", ru: "отправление" }, { en: "tent", ru: "палатка" }, { en: "reservation", ru: "бронирование" },
    ]
  },
  {
    id: "work", name: "Работа", icon: "💼",
    words: [
      { en: "office", ru: "офис" }, { en: "job", ru: "работа" }, { en: "boss", ru: "начальник" },
      { en: "meeting", ru: "встреча" }, { en: "salary", ru: "зарплата" }, { en: "colleague", ru: "коллега" },
      { en: "computer", ru: "компьютер" }, { en: "email", ru: "электронная почта" }, { en: "project", ru: "проект" },
      { en: "manager", ru: "менеджер" }, { en: "customer", ru: "клиент" }, { en: "contract", ru: "договор" },
      { en: "deadline", ru: "срок сдачи" }, { en: "company", ru: "компания" }, { en: "report", ru: "отчёт" },
      { en: "business", ru: "бизнес" }, { en: "interview", ru: "собеседование" }, { en: "career", ru: "карьера" },
      { en: "desk", ru: "рабочий стол" }, { en: "team", ru: "команда" }, { en: "employee", ru: "сотрудник" },
      { en: "schedule", ru: "расписание" }, { en: "task", ru: "задача" }, { en: "goal", ru: "цель" },
      { en: "profit", ru: "прибыль" }, { en: "resume", ru: "резюме" }, { en: "vacancy", ru: "вакансия" },
      { en: "skill", ru: "навык" }, { en: "experience", ru: "опыт" }, { en: "presentation", ru: "презентация" },
    ]
  },
  {
    id: "home", name: "Дом и быт", icon: "🏠",
    words: [
      { en: "kitchen", ru: "кухня" }, { en: "bedroom", ru: "спальня" }, { en: "bathroom", ru: "ванная" },
      { en: "bed", ru: "кровать" }, { en: "sofa", ru: "диван" }, { en: "lamp", ru: "лампа" },
      { en: "mirror", ru: "зеркало" }, { en: "carpet", ru: "ковёр" }, { en: "curtain", ru: "штора" },
      { en: "shelf", ru: "полка" }, { en: "wall", ru: "стена" }, { en: "floor", ru: "пол" },
      { en: "ceiling", ru: "потолок" }, { en: "roof", ru: "крыша" }, { en: "stairs", ru: "лестница" },
      { en: "key", ru: "ключ" }, { en: "clock", ru: "часы" }, { en: "pillow", ru: "подушка" },
      { en: "blanket", ru: "одеяло" }, { en: "fridge", ru: "холодильник" }, { en: "stove", ru: "плита" },
      { en: "oven", ru: "духовка" }, { en: "plate", ru: "тарелка" }, { en: "cup", ru: "чашка" },
      { en: "spoon", ru: "ложка" }, { en: "fork", ru: "вилка" }, { en: "knife", ru: "нож" },
      { en: "bottle", ru: "бутылка" }, { en: "towel", ru: "полотенце" }, { en: "soap", ru: "мыло" },
    ]
  },
  {
    id: "body", name: "Тело и здоровье", icon: "💪",
    words: [
      { en: "head", ru: "голова" }, { en: "face", ru: "лицо" }, { en: "hand", ru: "рука" },
      { en: "foot", ru: "ступня" }, { en: "leg", ru: "нога" }, { en: "finger", ru: "палец" },
      { en: "eye", ru: "глаз" }, { en: "ear", ru: "ухо" }, { en: "nose", ru: "нос" },
      { en: "mouth", ru: "рот" }, { en: "tooth", ru: "зуб" }, { en: "hair", ru: "волосы" },
      { en: "neck", ru: "шея" }, { en: "shoulder", ru: "плечо" }, { en: "back", ru: "спина" },
      { en: "chest", ru: "грудь" }, { en: "stomach", ru: "живот" }, { en: "heart", ru: "сердце" },
      { en: "brain", ru: "мозг" }, { en: "blood", ru: "кровь" }, { en: "bone", ru: "кость" },
      { en: "skin", ru: "кожа" }, { en: "knee", ru: "колено" }, { en: "elbow", ru: "локоть" },
      { en: "throat", ru: "горло" }, { en: "tongue", ru: "язык" }, { en: "health", ru: "здоровье" },
      { en: "doctor", ru: "врач" }, { en: "medicine", ru: "лекарство" }, { en: "pain", ru: "боль" },
    ]
  },
  {
    id: "clothes", name: "Одежда", icon: "👕",
    words: [
      { en: "shirt", ru: "рубашка" }, { en: "t-shirt", ru: "футболка" }, { en: "trousers", ru: "брюки" },
      { en: "jeans", ru: "джинсы" }, { en: "dress", ru: "платье" }, { en: "skirt", ru: "юбка" },
      { en: "jacket", ru: "куртка" }, { en: "coat", ru: "пальто" }, { en: "sweater", ru: "свитер" },
      { en: "hat", ru: "шляпа" }, { en: "cap", ru: "кепка" }, { en: "scarf", ru: "шарф" },
      { en: "gloves", ru: "перчатки" }, { en: "socks", ru: "носки" }, { en: "shoes", ru: "туфли" },
      { en: "boots", ru: "ботинки" }, { en: "sneakers", ru: "кроссовки" }, { en: "belt", ru: "ремень" },
      { en: "tie", ru: "галстук" }, { en: "suit", ru: "костюм" }, { en: "pocket", ru: "карман" },
      { en: "button", ru: "пуговица" }, { en: "umbrella", ru: "зонт" }, { en: "bag", ru: "сумка" },
      { en: "glasses", ru: "очки" }, { en: "watch", ru: "наручные часы" }, { en: "ring", ru: "кольцо" },
      { en: "necklace", ru: "ожерелье" }, { en: "uniform", ru: "форма" }, { en: "pajamas", ru: "пижама" },
    ]
  },
  {
    id: "animals", name: "Животные", icon: "🦁",
    words: [
      { en: "horse", ru: "лошадь" }, { en: "cow", ru: "корова" }, { en: "pig", ru: "свинья" },
      { en: "sheep", ru: "овца" }, { en: "goat", ru: "коза" }, { en: "rabbit", ru: "кролик" },
      { en: "mouse", ru: "мышь" }, { en: "lion", ru: "лев" }, { en: "tiger", ru: "тигр" },
      { en: "bear", ru: "медведь" }, { en: "wolf", ru: "волк" }, { en: "fox", ru: "лиса" },
      { en: "elephant", ru: "слон" }, { en: "monkey", ru: "обезьяна" }, { en: "snake", ru: "змея" },
      { en: "frog", ru: "лягушка" }, { en: "duck", ru: "утка" }, { en: "goose", ru: "гусь" },
      { en: "owl", ru: "сова" }, { en: "eagle", ru: "орёл" }, { en: "whale", ru: "кит" },
      { en: "shark", ru: "акула" }, { en: "dolphin", ru: "дельфин" }, { en: "butterfly", ru: "бабочка" },
      { en: "bee", ru: "пчела" }, { en: "spider", ru: "паук" }, { en: "ant", ru: "муравей" },
      { en: "turtle", ru: "черепаха" }, { en: "giraffe", ru: "жираф" }, { en: "zebra", ru: "зебра" },
    ]
  },
  {
    id: "verbs", name: "Частые глаголы", icon: "🏃",
    words: [
      { en: "eat", ru: "есть" }, { en: "drink", ru: "пить" }, { en: "sleep", ru: "спать" },
      { en: "run", ru: "бегать" }, { en: "swim", ru: "плавать" }, { en: "fly", ru: "летать" },
      { en: "read", ru: "читать" }, { en: "write", ru: "писать" }, { en: "speak", ru: "говорить" },
      { en: "listen", ru: "слушать" }, { en: "see", ru: "видеть" }, { en: "hear", ru: "слышать" },
      { en: "think", ru: "думать" }, { en: "know", ru: "знать" }, { en: "want", ru: "хотеть" },
      { en: "give", ru: "давать" }, { en: "take", ru: "брать" }, { en: "buy", ru: "покупать" },
      { en: "sell", ru: "продавать" }, { en: "open", ru: "открывать" }, { en: "close", ru: "закрывать" },
      { en: "help", ru: "помогать" }, { en: "wait", ru: "ждать" }, { en: "ask", ru: "спрашивать" },
      { en: "answer", ru: "отвечать" }, { en: "learn", ru: "учить" }, { en: "play", ru: "играть" },
      { en: "sing", ru: "петь" }, { en: "dance", ru: "танцевать" }, { en: "cook", ru: "готовить" },
    ]
  },
  {
    id: "adjectives", name: "Прилагательные", icon: "🎨",
    words: [
      { en: "big", ru: "большой" }, { en: "small", ru: "маленький" }, { en: "long", ru: "длинный" },
      { en: "short", ru: "короткий" }, { en: "tall", ru: "высокий" }, { en: "fast", ru: "быстрый" },
      { en: "slow", ru: "медленный" }, { en: "hot", ru: "горячий" }, { en: "cold", ru: "холодный" },
      { en: "warm", ru: "тёплый" }, { en: "new", ru: "новый" }, { en: "old", ru: "старый" },
      { en: "young", ru: "молодой" }, { en: "good", ru: "хороший" }, { en: "bad", ru: "плохой" },
      { en: "beautiful", ru: "красивый" }, { en: "happy", ru: "счастливый" }, { en: "sad", ru: "грустный" },
      { en: "strong", ru: "сильный" }, { en: "weak", ru: "слабый" }, { en: "rich", ru: "богатый" },
      { en: "poor", ru: "бедный" }, { en: "easy", ru: "лёгкий" }, { en: "difficult", ru: "трудный" },
      { en: "clean", ru: "чистый" }, { en: "dirty", ru: "грязный" }, { en: "heavy", ru: "тяжёлый" },
      { en: "dark", ru: "тёмный" }, { en: "quiet", ru: "тихий" }, { en: "brave", ru: "смелый" },
    ]
  },
  {
    id: "tech", name: "Технологии", icon: "📱",
    words: [
      { en: "phone", ru: "телефон" }, { en: "smartphone", ru: "смартфон" }, { en: "screen", ru: "экран" },
      { en: "keyboard", ru: "клавиатура" }, { en: "internet", ru: "интернет" }, { en: "website", ru: "сайт" },
      { en: "password", ru: "пароль" }, { en: "file", ru: "файл" }, { en: "folder", ru: "папка" },
      { en: "battery", ru: "батарея" }, { en: "charger", ru: "зарядка" }, { en: "camera", ru: "камера" },
      { en: "photo", ru: "фото" }, { en: "video", ru: "видео" }, { en: "message", ru: "сообщение" },
      { en: "app", ru: "приложение" }, { en: "laptop", ru: "ноутбук" }, { en: "tablet", ru: "планшет" },
      { en: "printer", ru: "принтер" }, { en: "cable", ru: "кабель" }, { en: "network", ru: "сеть" },
      { en: "data", ru: "данные" }, { en: "software", ru: "программа" }, { en: "code", ru: "код" },
      { en: "robot", ru: "робот" }, { en: "headphones", ru: "наушники" }, { en: "link", ru: "ссылка" },
      { en: "account", ru: "аккаунт" }, { en: "update", ru: "обновление" }, { en: "download", ru: "скачивать" },
    ]
  },
];