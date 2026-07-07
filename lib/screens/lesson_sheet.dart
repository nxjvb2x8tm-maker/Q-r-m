import 'package:flutter/material.dart';

import '../data/course.dart';
import '../state/app_state.dart';

/// Нижний лист урока — старт / завершение секции урока.
Future<void> showLessonSheet(BuildContext context, LessonRef ref) {
  final app = AppScope.of(context);
  return showModalBottomSheet(
    context: context,
    backgroundColor: Colors.transparent,
    isScrollControlled: true,
    builder: (context) => _LessonSheet(ref: ref, app: app),
  );
}

class _LessonSheet extends StatelessWidget {
  const _LessonSheet({required this.ref, required this.app});

  final LessonRef ref;
  final AppState app;

  @override
  Widget build(BuildContext context) {
    final t = app.palette;
    final color = ref.module.color;
    final current = ref.globalIndex == app.completedLessons;
    final done = ref.globalIndex < app.completedLessons;

    return Container(
      decoration: BoxDecoration(
        color: t.card,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(28)),
        border: Border.all(color: t.border),
      ),
      padding: EdgeInsets.fromLTRB(
          22, 12, 22, 24 + MediaQuery.of(context).padding.bottom),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 44,
            height: 5,
            decoration: BoxDecoration(
              color: t.border,
              borderRadius: BorderRadius.circular(3),
            ),
          ),
          const SizedBox(height: 22),
          Container(
            width: 68,
            height: 68,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [color, color.withOpacity(0.7)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(20),
              boxShadow: [
                BoxShadow(color: color.withOpacity(0.45), blurRadius: 18, offset: const Offset(0, 8)),
              ],
            ),
            child: Icon(ref.lesson.type.icon, color: Colors.white, size: 34),
          ),
          const SizedBox(height: 16),
          Text(ref.lesson.type.label,
              style: TextStyle(
                  color: color, fontSize: 12.5, fontWeight: FontWeight.w800, letterSpacing: 0.5)),
          const SizedBox(height: 4),
          Text(ref.lesson.title,
              textAlign: TextAlign.center,
              style: TextStyle(
                  color: t.text, fontSize: 21, fontWeight: FontWeight.w900)),
          const SizedBox(height: 6),
          Text('Урок ${ref.indexInModule + 1} из 8 · ${ref.lesson.words} слов',
              style: TextStyle(color: t.text2, fontSize: 13.5, fontWeight: FontWeight.w600)),
          const SizedBox(height: 24),
          SizedBox(
            width: double.infinity,
            child: FilledButton(
              onPressed: () {
                if (current) app.completeLesson(ref.globalIndex);
                Navigator.of(context).pop();
              },
              style: FilledButton.styleFrom(
                backgroundColor: color,
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(vertical: 16),
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(18)),
                elevation: 0,
              ),
              child: Text(
                done
                    ? 'Повторить урок'
                    : current
                        ? 'Начать · Başla!'
                        : 'Продолжить',
                style: const TextStyle(fontSize: 16.5, fontWeight: FontWeight.w900),
              ),
            ),
          ),
          if (current) ...[
            const SizedBox(height: 10),
            Text('Заверши, чтобы открыть следующий кружок пути',
                style: TextStyle(color: t.text2, fontSize: 12, fontWeight: FontWeight.w600)),
          ],
        ],
      ),
    );
  }
}
