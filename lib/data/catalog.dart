import 'package:flutter/material.dart';

import 'vocabulary.dart';

/// Типы модулей каталога (экран «Модули»).
enum ModType { grammar, vocab, task, dialog, writing, reading }

extension ModTypeInfo on ModType {
  String get label => switch (this) {
        ModType.grammar => 'Til bilgisi',
        ModType.vocab => 'Luğat',
        ModType.task => 'Vazifeler',
        ModType.dialog => 'Dialoglar',
        ModType.writing => 'Yazuv',
        ModType.reading => 'Oquv',
      };

  IconData get icon => switch (this) {
        ModType.grammar => Icons.category_rounded,
        ModType.vocab => Icons.style_rounded,
        ModType.task => Icons.checklist_rounded,
        ModType.dialog => Icons.forum_rounded,
        ModType.writing => Icons.edit_rounded,
        ModType.reading => Icons.menu_book_rounded,
      };

  Color get color => switch (this) {
        ModType.grammar => const Color(0xFF00B894),
        ModType.vocab => const Color(0xFF6C5CE7),
        ModType.task => const Color(0xFF00CEC9),
        ModType.dialog => const Color(0xFFE84393),
        ModType.writing => const Color(0xFFE17055),
        ModType.reading => const Color(0xFF0984E3),
      };
}

class CatalogModule {
  const CatalogModule(
    this.title,
    this.sub,
    this.words,
    this.type, {
    this.progress = 0,
    this.wordList,
  });

  final String title;
  final String sub;
  final int words;
  final ModType type;

  /// 0..1 — сколько модуля пройдено.
  final double progress;

  /// Словарь модуля, если есть — показывается в деталях.
  final List<WordPair>? wordList;
}

/// Полный каталог модулей курса A1 — перенесён из прототипа «Laf et».
final List<CatalogModule> catalogModules = [
  // ── 1. Bölük · Elifbe ──
  const CatalogModule('Til bilgisi · Elifbe',
      '1. Bölük · Алфавит и гармония гласных', 30, ModType.grammar,
      progress: 0.85),
  const CatalogModule('Luğat · Temel sözler', '1. Bölük · 24 базовых слова', 24,
      ModType.vocab,
      progress: 0.6, wordList: words1),
  const CatalogModule(
      'Vazifeler 1', '1. Bölük · Söz tapuv + Tercime', 24, ModType.task,
      progress: 0.4),
  const CatalogModule(
      'Vazifeler 2', '1. Bölük · Söz qur + Muqayese', 25, ModType.task,
      progress: 0.15),
  // ── 2. Bölük · Meraba ──
  const CatalogModule('Luğat · Selâmlaşuv', '2. Bölük · Приветствия и знакомство',
      20, ModType.vocab,
      progress: 0.1, wordList: words2),
  const CatalogModule(
      'Dialoglar', '2. Bölük · 4 диалога знакомства', 4, ModType.dialog),
  const CatalogModule(
      'Vazifeler 1', '2. Bölük · Muqayese + Boşluqlar', 13, ModType.task),
  const CatalogModule(
      'Vazifeler 2', '2. Bölük · Tertiple + Sayla', 10, ModType.task),
  const CatalogModule('Yazuv · Öz dialogıñ',
      '2. Bölük · Vazife 5 · Напиши свой диалог', 0, ModType.writing),
  // ── 3. Bölük · Bu ne? O kim? ──
  const CatalogModule('Luğat · Eşyalar & İnsanlar', '3. Bölük · Предметы и люди',
      30, ModType.vocab,
      wordList: words3),
  const CatalogModule('Luğat · Yerler & Tabiat',
      '3. Bölük · Места, природа, животные', 27, ModType.vocab),
  const CatalogModule('Til bilgisi · Bu/Şu/O + Ne/Kim',
      '3. Bölük · Указательные · Ne/Kim', 20, ModType.grammar),
  const CatalogModule('Til bilgisi · Çoqluq şekil',
      '3. Bölük · Множественное число', 12, ModType.grammar),
  const CatalogModule('Til bilgisi · Sual eki -mı/-mi',
      '3. Bölük · Вопросит. частица + degil', 14, ModType.grammar),
  const CatalogModule('Vazifeler 1',
      '3. Bölük · Muqayese + Ebet/Yoq + Sual yaz', 19, ModType.task),
  const CatalogModule(
      'Vazifeler 2', '3. Bölük · Dialog + -lar/-ler', 22, ModType.task),
  // ── Tekrar 1–3 ──
  const CatalogModule('Tekrar · Luğat',
      'Повторение 1—3 · Семья · Цвета · Время', 42, ModType.vocab),
  const CatalogModule('Vazifeler 1',
      'Повторение 1—3 · Muqayese + Sayla + Boşluqlar', 21, ModType.task),
  const CatalogModule('Vazifeler 2',
      'Повторение 1—3 · Tertiple + Çoqluq + Ne/Kim', 30, ModType.task),
  const CatalogModule('Vazifeler 3',
      'Повторение 1—3 · D/Y + Dialog + Tercime', 20, ModType.task),
  const CatalogModule('Vazifeler 4',
      'Повторение 1—3 · Söz qur + Sual yaz', 13, ModType.task),
  const CatalogModule('Yazuv · Büyük dialog',
      'Повторение 1—3 · Vazife 12 · Большой диалог', 0, ModType.writing),
  // ── 4. Bölük · Qayda? ──
  const CatalogModule(
      'Til bilgisi · Bar / Yoq', '4. Bölük · Есть и нет', 6, ModType.grammar),
  const CatalogModule('Til bilgisi · Yer kelişi',
      '4. Bölük · Местный падеж -da/-de/-ta/-te', 8, ModType.grammar),
  const CatalogModule('Luğat · Qayda?',
      '4. Bölük · Школа · Дом · Положения', 27, ModType.vocab),
  const CatalogModule('Vazifeler 1',
      '4. Bölük · Sual+Cevap + Aff. + Ebet/Yoq', 15, ModType.task),
  const CatalogModule(
      'Vazifeler 2', '4. Bölük · Sual yaz + Dialog', 11, ModType.task),
  // ── 5. Bölük · Sayılar ──
  const CatalogModule('Til bilgisi · Sayılar',
      '5. Bölük · Числа · qaç? · ne qadar?', 6, ModType.grammar),
  const CatalogModule('Vazifeler 1',
      '5. Bölük · Sualler + Sıra sayıları', 12, ModType.task),
  // ── 6. Bölük · Haberlik + Sıfatlar ──
  const CatalogModule('Til bilgisi · Haberlik',
      '6. Bölük · Личные аффиксы -m/-sıñ/...', 8, ModType.grammar),
  const CatalogModule('Til bilgisi · Sıfatlar',
      '6. Bölük · Прилагательные · антонимы', 8, ModType.grammar),
  const CatalogModule('Luğat · Şeerde',
      '6. Bölük · Город · Тело · Национальн.', 27, ModType.vocab),
  const CatalogModule(
      'Vazifeler 1', '6. Bölük · Cümle + Yalğama', 14, ModType.task),
  const CatalogModule(
      'Vazifeler 2', '6. Bölük · Sualler + Cümle qur', 11, ModType.task),
  const CatalogModule('Oquv · Menim mektebim',
      '6. Bölük · Чтение + вопросы по тексту', 5, ModType.reading),
  const CatalogModule('Vazifeler 3',
      '6. Bölük · D/Y + Sıfat qoş + Sıfat+isim', 16, ModType.task),
  // ── Tekrar 4–6 ──
  const CatalogModule('Vazifeler 1',
      'Повторение 4—6 · Bar/Yoq + Yer kelişi + Sayılar', 18, ModType.task),
  const CatalogModule('Vazifeler 2',
      'Повторение 4—6 · Haberlik + Zıt sıfat', 14, ModType.task),
];
