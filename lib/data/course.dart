import 'package:flutter/material.dart';

/// Типы уроков на пути.
enum LessonType { vocab, grammar, task, reading }

extension LessonTypeInfo on LessonType {
  String get label => switch (this) {
        LessonType.vocab => 'Luğat · Словарь',
        LessonType.grammar => 'Til bilgisi · Грамматика',
        LessonType.task => 'Vazifeler · Задания',
        LessonType.reading => 'Oquv · Чтение',
      };

  IconData get icon => switch (this) {
        LessonType.vocab => Icons.style_rounded,
        LessonType.grammar => Icons.school_rounded,
        LessonType.task => Icons.extension_rounded,
        LessonType.reading => Icons.menu_book_rounded,
      };
}

class Lesson {
  const Lesson(this.title, this.type, this.words);

  final String title;
  final LessonType type;
  final int words;
}

class CourseModule {
  const CourseModule({
    required this.title,
    required this.subtitle,
    required this.color,
    required this.lessons,
  });

  final String title;
  final String subtitle;
  final Color color;
  final List<Lesson> lessons;
}

class CourseSection {
  const CourseSection({
    required this.number,
    required this.title,
    required this.subtitle,
    required this.color,
    required this.modules,
  });

  final int number;
  final String title;
  final String subtitle;
  final Color color;
  final List<CourseModule> modules;
}

/// Стандартный состав модуля: 3 словаря → 2 грамматики → 2 задания → 1 чтение.
List<Lesson> _moduleLessons({
  required List<String> vocab,
  required List<String> grammar,
  required List<String> tasks,
  required String reading,
}) {
  return [
    Lesson(vocab[0], LessonType.vocab, 10),
    Lesson(vocab[1], LessonType.vocab, 8),
    Lesson(vocab[2], LessonType.vocab, 8),
    Lesson(grammar[0], LessonType.grammar, 6),
    Lesson(grammar[1], LessonType.grammar, 6),
    Lesson(tasks[0], LessonType.task, 12),
    Lesson(tasks[1], LessonType.task, 12),
    Lesson(reading, LessonType.reading, 5),
  ];
}

/// Курс A1 «Kencetay»: 5 секций × 2 модуля × 8 уроков.
final List<CourseSection> courseSections = [
  CourseSection(
    number: 1,
    title: 'Başlanğıç',
    subtitle: 'Алфавит и первые слова',
    color: const Color(0xFF6C5CE7),
    modules: [
      CourseModule(
        title: 'Elifbe',
        subtitle: 'Алфавит и гармония гласных',
        color: const Color(0xFF6C5CE7),
        lessons: _moduleLessons(
          vocab: [
            'Temel sözler 1 · Семья',
            'Temel sözler 2 · Вещи',
            'Temel sözler 3 · Природа',
          ],
          grammar: ['Elifbe · Буквы q, ñ, ğ', 'Гармония гласных'],
          tasks: ['Söz tapuv · Найди слово', 'Tercime · Перевод'],
          reading: 'Oquv · Первые фразы',
        ),
      ),
      CourseModule(
        title: 'Meraba!',
        subtitle: 'Приветствия и знакомство',
        color: const Color(0xFF00CEC9),
        lessons: _moduleLessons(
          vocab: [
            'Selâmlaşuv · Приветствия',
            'Tanışuv · Знакомство',
            'Nezaket · Вежливость',
          ],
          grammar: ['Adıñ ne? · Вопросы', 'Menim adım … · Ответы'],
          tasks: ['Muqayese · Сопоставь', 'Boşluqlar · Пропуски'],
          reading: 'Dialoglar · 4 диалога',
        ),
      ),
    ],
  ),
  CourseSection(
    number: 2,
    title: 'Bu ne? O kim?',
    subtitle: 'Предметы, люди и места',
    color: const Color(0xFFFD79A8),
    modules: [
      CourseModule(
        title: 'Eşyalar & İnsanlar',
        subtitle: 'Предметы и люди вокруг',
        color: const Color(0xFFFD79A8),
        lessons: _moduleLessons(
          vocab: [
            'Eşyalar · Предметы',
            'İnsanlar · Профессии',
            'Yerler · Места',
          ],
          grammar: ['Bu / Şu / O + Ne / Kim', 'Çoqluq · Множ. число'],
          tasks: ['Ebet / Yoq · Да и нет', 'Sual yaz · Напиши вопрос'],
          reading: 'Oquv · Bu ne? O kim?',
        ),
      ),
      CourseModule(
        title: 'Tekrar 1–3',
        subtitle: 'Большое повторение',
        color: const Color(0xFFFDCB6E),
        lessons: _moduleLessons(
          vocab: [
            'Qorantam · Семья',
            'Renkler · Цвета',
            'Vaqıt · Время',
          ],
          grammar: ['Sual eki -mı / -mi', 'Degil · Отрицание'],
          tasks: ['Tertiple · Расставь', 'D/Y + Dialog'],
          reading: 'Yazuv · Большой диалог',
        ),
      ),
    ],
  ),
  CourseSection(
    number: 3,
    title: 'Qayda?',
    subtitle: 'Где? Местный падеж и числа',
    color: const Color(0xFF00B894),
    modules: [
      CourseModule(
        title: 'Qayda?',
        subtitle: 'Школа, дом, положения',
        color: const Color(0xFF00B894),
        lessons: _moduleLessons(
          vocab: [
            'Mektepte · В школе',
            'Evde · Дома',
            'Allar · Положения',
          ],
          grammar: ['Bar / Yoq · Есть и нет', 'Yer kelişi -da / -de'],
          tasks: ['Sual + Cevap', 'Aff. + Ebet / Yoq'],
          reading: 'Oquv · Menim odam',
        ),
      ),
      CourseModule(
        title: 'Sayılar',
        subtitle: 'Числа и счёт',
        color: const Color(0xFFE17055),
        lessons: _moduleLessons(
          vocab: [
            'Sayılar 1–10',
            'Sayılar 11–100',
            'Sıra sayıları · Порядковые',
          ],
          grammar: ['Qaç? · Сколько?', 'Ne qadar? · Как много?'],
          tasks: ['Sualler · Вопросы', 'Sayı yaz · Запиши число'],
          reading: 'Oquv · Bazarda',
        ),
      ),
    ],
  ),
  CourseSection(
    number: 4,
    title: 'Tarif',
    subtitle: 'Описываем себя и мир',
    color: const Color(0xFFA29BFE),
    modules: [
      CourseModule(
        title: 'Haberlik',
        subtitle: 'Личные аффиксы -m / -sıñ',
        color: const Color(0xFFA29BFE),
        lessons: _moduleLessons(
          vocab: [
            'Milletler · Национальности',
            'Beden · Части тела',
            'Şeerde · В городе',
          ],
          grammar: ['Haberlik · Аффиксы', 'Men talebem · Я — ученик'],
          tasks: ['Cümle qur · Собери', 'Yalğama · Присоедини'],
          reading: 'Oquv · Menim mektebim',
        ),
      ),
      CourseModule(
        title: 'Sıfatlar',
        subtitle: 'Прилагательные и антонимы',
        color: const Color(0xFFE84393),
        lessons: _moduleLessons(
          vocab: [
            'Sıfatlar · Качества',
            'Zıt sıfatlar · Антонимы',
            'Ev tarifi · Опиши дом',
          ],
          grammar: ['Sıfat + isim', 'Büyük mü? · Сравнение'],
          tasks: ['Sıfat qoş · Добавь', 'D/Y · Верно-неверно'],
          reading: 'Oquv · Bizim köyümiz',
        ),
      ),
    ],
  ),
  CourseSection(
    number: 5,
    title: 'Netice',
    subtitle: 'Глаголы и финал уровня A1',
    color: const Color(0xFF0984E3),
    modules: [
      CourseModule(
        title: 'Fiiller',
        subtitle: 'Глаголы настоящего времени',
        color: const Color(0xFF0984E3),
        lessons: _moduleLessons(
          vocab: [
            'Areketler · Действия',
            'Kün tertibi · Режим дня',
            'Hobbiler · Увлечения',
          ],
          grammar: ['Şimdiki zaman -a / -e', 'Ne yapasıñ? · Вопросы'],
          tasks: ['Fiil sayla · Выбери', 'Cümle tamamla'],
          reading: 'Oquv · Menim künüm',
        ),
      ),
      CourseModule(
        title: 'İmtihan A1',
        subtitle: 'Большое повторение курса',
        color: const Color(0xFFFDCB6E),
        lessons: _moduleLessons(
          vocab: [
            'Tekrar · Слова 1–3',
            'Tekrar · Слова 4–6',
            'Tekrar · Фразы',
          ],
          grammar: ['Tekrar · Грамматика 1', 'Tekrar · Грамматика 2'],
          tasks: ['Büyük vazife 1', 'Büyük vazife 2'],
          reading: 'İmtihan · Финал A1 🏆',
        ),
      ),
    ],
  ),
];

/// Урок с координатами внутри курса — для линейного пути.
class LessonRef {
  const LessonRef({
    required this.section,
    required this.module,
    required this.lesson,
    required this.globalIndex,
    required this.indexInModule,
    required this.moduleNumber,
  });

  final CourseSection section;
  final CourseModule module;
  final Lesson lesson;
  final int globalIndex;
  final int indexInModule;

  /// Сквозной номер модуля в курсе (с 1).
  final int moduleNumber;
}

final List<LessonRef> courseLessonRefs = _flattenCourse();

List<LessonRef> _flattenCourse() {
  final refs = <LessonRef>[];
  var globalIndex = 0;
  var moduleNumber = 0;
  for (final section in courseSections) {
    for (final module in section.modules) {
      moduleNumber++;
      for (var i = 0; i < module.lessons.length; i++) {
        refs.add(LessonRef(
          section: section,
          module: module,
          lesson: module.lessons[i],
          globalIndex: globalIndex++,
          indexInModule: i,
          moduleNumber: moduleNumber,
        ));
      }
    }
  }
  return refs;
}
