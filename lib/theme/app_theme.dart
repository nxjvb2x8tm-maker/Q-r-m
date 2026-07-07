import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

/// Дизайн-токены «Laf et» — перенесены из HTML-прототипа.
class LafPalette {
  const LafPalette({
    required this.bg,
    required this.card,
    required this.card2,
    required this.border,
    required this.accent,
    required this.accentSoft,
    required this.green,
    required this.red,
    required this.gold,
    required this.blue,
    required this.pink,
    required this.teal,
    required this.text,
    required this.text2,
    required this.text3,
    required this.isDark,
  });

  final Color bg;
  final Color card;
  final Color card2;
  final Color border;
  final Color accent;
  final Color accentSoft;
  final Color green;
  final Color red;
  final Color gold;
  final Color blue;
  final Color pink;
  final Color teal;
  final Color text;
  final Color text2;
  final Color text3;
  final bool isDark;

  static const light = LafPalette(
    bg: Color(0xFFF0F1FA),
    card: Color(0xFFFFFFFF),
    card2: Color(0xFFECEEFF),
    border: Color(0x14000000),
    accent: Color(0xFF6C5CE7),
    accentSoft: Color(0x1A6C5CE7),
    green: Color(0xFF00A878),
    red: Color(0xFFE17055),
    gold: Color(0xFFE8A800),
    blue: Color(0xFF0984E3),
    pink: Color(0xFFE84393),
    teal: Color(0xFF00B894),
    text: Color(0xFF1A1A3E),
    text2: Color(0xFF666699),
    text3: Color(0x33000000),
    isDark: false,
  );

  static const dark = LafPalette(
    bg: Color(0xFF0D0D18),
    card: Color(0xFF181828),
    card2: Color(0xFF20203A),
    border: Color(0x14FFFFFF),
    accent: Color(0xFF6C5CE7),
    accentSoft: Color(0x2E6C5CE7),
    green: Color(0xFF00B894),
    red: Color(0xFFFF7675),
    gold: Color(0xFFFDCB6E),
    blue: Color(0xFF74B9FF),
    pink: Color(0xFFFD79A8),
    teal: Color(0xFF00CEC9),
    text: Color(0xFFF0F0FF),
    text2: Color(0xFF9090B8),
    text3: Color(0x33FFFFFF),
    isDark: true,
  );

  /// Мягкая «дорогая» тень для карточек.
  List<BoxShadow> get cardShadow => [
        BoxShadow(
          color: isDark ? const Color(0x66000000) : const Color(0x14403A80),
          blurRadius: 24,
          offset: const Offset(0, 8),
        ),
      ];
}

ThemeData buildLafTheme(LafPalette t) {
  final base = t.isDark ? ThemeData.dark() : ThemeData.light();
  final textTheme = GoogleFonts.nunitoTextTheme(base.textTheme).apply(
    bodyColor: t.text,
    displayColor: t.text,
  );
  return base.copyWith(
    scaffoldBackgroundColor: t.bg,
    textTheme: textTheme,
    colorScheme: base.colorScheme.copyWith(
      primary: t.accent,
      secondary: t.teal,
      surface: t.card,
      error: t.red,
    ),
    splashFactory: InkRipple.splashFactory,
    dividerColor: t.border,
  );
}
