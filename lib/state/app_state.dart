import 'package:flutter/material.dart';

import '../data/course.dart';
import '../theme/app_theme.dart';

/// Глобальное состояние приложения: тема, профиль, прогресс по курсу.
class AppState extends ChangeNotifier {
  bool isDark = false;
  String userName = 'Imran';
  bool notificationsOn = true;
  int dailyGoalMin = 15;
  int streakDays = 1;

  /// Сколько уроков пути пройдено подряд с самого начала.
  int completedLessons = 3;

  int get xp => 120 + completedLessons * 20;

  LafPalette get palette => isDark ? LafPalette.dark : LafPalette.light;

  int get totalLessons => courseLessonRefs.length;

  double get courseProgress =>
      totalLessons == 0 ? 0 : completedLessons / totalLessons;

  LessonRef? get currentLesson => completedLessons < courseLessonRefs.length
      ? courseLessonRefs[completedLessons]
      : null;

  /// Прогресс по типу уроков (словарь / грамматика / задания / чтение).
  double progressForType(LessonType type) {
    var total = 0;
    var done = 0;
    for (final ref in courseLessonRefs) {
      if (ref.lesson.type != type) continue;
      total++;
      if (ref.globalIndex < completedLessons) done++;
    }
    return total == 0 ? 0 : done / total;
  }

  int get completedModules {
    var count = 0;
    for (final section in courseSections) {
      for (final module in section.modules) {
        final lastIndex = module.lessons.isEmpty
            ? -1
            : courseLessonRefs
                .lastWhere((r) => r.module == module)
                .globalIndex;
        if (lastIndex >= 0 && lastIndex < completedLessons) count++;
      }
    }
    return count;
  }

  void setTheme(bool dark) {
    if (isDark == dark) return;
    isDark = dark;
    notifyListeners();
  }

  void setName(String name) {
    final trimmed = name.trim();
    if (trimmed.isEmpty || trimmed == userName) return;
    userName = trimmed;
    notifyListeners();
  }

  void setNotifications(bool on) {
    notificationsOn = on;
    notifyListeners();
  }

  void setDailyGoal(int minutes) {
    dailyGoalMin = minutes;
    notifyListeners();
  }

  /// Завершить урок можно только по порядку — как в Duolingo.
  void completeLesson(int globalIndex) {
    if (globalIndex != completedLessons) return;
    completedLessons++;
    notifyListeners();
  }
}

/// Доступ к [AppState] из любого места дерева виджетов.
class AppScope extends InheritedNotifier<AppState> {
  const AppScope({
    super.key,
    required AppState state,
    required super.child,
  }) : super(notifier: state);

  static AppState of(BuildContext context) =>
      context.dependOnInheritedWidgetOfExactType<AppScope>()!.notifier!;
}
