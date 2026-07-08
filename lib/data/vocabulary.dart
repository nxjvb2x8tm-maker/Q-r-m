/// Словари курса — перенесены из прототипа (src/data/words.js).
class WordPair {
  const WordPair(this.qr, this.ru);

  final String qr;
  final String ru;
}

/// 1. Bölük · Temel sözler — базовые слова.
const List<WordPair> words1 = [
  WordPair('ana', 'мама'),
  WordPair('baba', 'папа'),
  WordPair('ev', 'дом'),
  WordPair('kitap', 'книга'),
  WordPair('qalem', 'ручка'),
  WordPair('masa', 'стол'),
  WordPair('til', 'язык'),
  WordPair('çanta', 'сумка'),
  WordPair('ders', 'урок'),
  WordPair('su', 'вода'),
  WordPair('vatan', 'родина'),
  WordPair('lâle', 'тюльпан'),
  WordPair('gül', 'роза'),
  WordPair('oğlan', 'мальчик'),
  WordPair('qız', 'девочка'),
  WordPair('şeker', 'сахар'),
  WordPair('tahta', 'доска'),
  WordPair('yañı', 'новый'),
  WordPair('yüzüm', 'виноград'),
  WordPair('köy', 'деревня'),
  WordPair('at', 'лошадь'),
  WordPair('köpek', 'собака'),
  WordPair('ot', 'трава'),
  WordPair('dağ', 'гора'),
];

/// 2. Bölük · Selâmlaşuv — приветствия и знакомство.
const List<WordPair> words2 = [
  WordPair('Selâm / Meraba', 'Привет / Здравствуй'),
  WordPair('Selâm aleykum', 'Мир тебе (приветствие)'),
  WordPair('Aleykum selâm', 'И тебе мир (ответ)'),
  WordPair('Hayırlı sabalar', 'Доброе утро'),
  WordPair('Hayırlı aqşamlar', 'Добрый вечер'),
  WordPair('Hayırlı geceler', 'Спокойной ночи'),
  WordPair('Sağlıqnen qal', 'До свидания (уходящий)'),
  WordPair('Sağlıqnen bar', 'До свидания (остающийся)'),
  WordPair('Körüşkence', 'До встречи'),
  WordPair('Adıñ ne?', 'Как тебя зовут?'),
  WordPair('Adıñız ne?', 'Как вас зовут?'),
  WordPair('Menim adım …', 'Меня зовут …'),
  WordPair('Memnün oldum.', 'Приятно познакомиться.'),
  WordPair('Mende memnün oldum.', 'Мне тоже приятно.'),
  WordPair('Nasılsıñ?', 'Как дела? (неформально)'),
  WordPair('Nasılsıñız?', 'Как дела? (формально)'),
  WordPair('Qaç yaşındasıñ?', 'Сколько тебе лет?'),
  WordPair('Men … yaşındaman.', 'Мне … лет.'),
  WordPair('Qaydasıñ?', 'Где ты?'),
  WordPair('Selâm ayt', 'Передавай привет'),
];

/// 3. Bölük · Eşyalar, İnsanlar, Yerler — предметы, люди, места.
const List<WordPair> words3 = [
  WordPair('defter', 'тетрадь'),
  WordPair('tahta', 'доска'),
  WordPair('skemle', 'стул'),
  WordPair('bilgisayar', 'компьютер'),
  WordPair('telefon', 'телефон'),
  WordPair('pencere', 'окно'),
  WordPair('qapı', 'дверь'),
  WordPair('saat', 'часы'),
  WordPair('harita', 'карта'),
  WordPair('resim', 'картина / фото'),
  WordPair('çerçeve', 'рамка'),
  WordPair('tırnaqçıq', 'скрепка'),
  WordPair('oca', 'учитель'),
  WordPair('talebe', 'ученик'),
  WordPair('ekim', 'врач'),
  WordPair('mühendis', 'инженер'),
  WordPair('advokat', 'адвокат'),
  WordPair('aşçı', 'повар'),
  WordPair('aydavcı', 'водитель'),
  WordPair('tüccar', 'торговец'),
  WordPair('ressam', 'художник'),
  WordPair('mektep', 'школа'),
  WordPair('hastahane', 'больница'),
  WordPair('kitaphane', 'библиотека'),
  WordPair('tükân', 'магазин'),
  WordPair('park', 'парк'),
  WordPair('sınıf', 'класс'),
  WordPair('cami', 'мечеть'),
  WordPair('bazar', 'рынок / базар'),
  WordPair('restoran', 'ресторан'),
];
