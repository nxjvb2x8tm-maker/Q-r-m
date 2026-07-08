import 'package:flutter/material.dart';

import '../data/course.dart';
import '../state/app_state.dart';
import '../theme/app_theme.dart';
import '../widgets/common.dart';

/// Экран 2 — прогресс, рейтинг и статистика пользователя.
class ProgressScreen extends StatelessWidget {
  const ProgressScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final t = app.palette;

    return LafScaffoldBody(
      slivers: [
        const SliverToBoxAdapter(
          child: LafHeader(title: 'Ösüş · Прогресс', subtitle: 'Твоя статистика вживую'),
        ),
        SliverPadding(
          padding: const EdgeInsets.fromLTRB(18, 12, 18, 0),
          sliver: SliverList(
            delegate: SliverChildListDelegate([
              _OverallCard(app: app),
              const SizedBox(height: 16),
              _StatRow(app: app),
              const SizedBox(height: 20),
              const SectionLabel('По типам уроков'),
              const SizedBox(height: 12),
              _TypeBreakdown(app: app),
              const SizedBox(height: 20),
              const SectionLabel('Активность за неделю'),
              const SizedBox(height: 12),
              _WeeklyChart(palette: t),
              const SizedBox(height: 20),
              const SectionLabel('Достижения'),
              const SizedBox(height: 12),
              _Achievements(app: app),
            ]),
          ),
        ),
      ],
    );
  }
}

class _OverallCard extends StatelessWidget {
  const _OverallCard({required this.app});

  final AppState app;

  @override
  Widget build(BuildContext context) {
    final t = app.palette;
    return LafCard(
      gradient: LinearGradient(
        colors: [t.accent, const Color(0xFF8B7BF0)],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ),
      child: Row(
        children: [
          ProgressRing(
            value: app.courseProgress,
            color: Colors.white,
            size: 96,
            stroke: 10,
            center: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text('${(app.courseProgress * 100).round()}%',
                    style: const TextStyle(
                        color: Colors.white,
                        fontSize: 22,
                        fontWeight: FontWeight.w900)),
                const Text('курс A1',
                    style: TextStyle(
                        color: Colors.white70,
                        fontSize: 10,
                        fontWeight: FontWeight.w700)),
              ],
            ),
          ),
          const SizedBox(width: 18),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('A1 — Kencetay',
                    style: TextStyle(
                        color: Colors.white,
                        fontSize: 20,
                        fontWeight: FontWeight.w900)),
                const SizedBox(height: 4),
                Text('Пройдено ${app.completedLessons} из ${app.totalLessons} уроков',
                    style: const TextStyle(
                        color: Colors.white,
                        fontSize: 13,
                        fontWeight: FontWeight.w600)),
                const SizedBox(height: 2),
                Text('${app.completedModules} модулей завершено',
                    style: const TextStyle(
                        color: Colors.white70,
                        fontSize: 12.5,
                        fontWeight: FontWeight.w600)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _StatRow extends StatelessWidget {
  const _StatRow({required this.app});

  final AppState app;

  @override
  Widget build(BuildContext context) {
    final t = app.palette;
    final tiles = [
      _MiniStat('Серия', '${app.streakDays}', 'дней', Icons.local_fire_department_rounded, t.gold),
      _MiniStat('Опыт', '${app.xp}', 'XP', Icons.bolt_rounded, t.accent),
      _MiniStat('Точность', '94', '%', Icons.gps_fixed_rounded, t.teal),
    ];
    return Row(
      children: [
        for (var i = 0; i < tiles.length; i++) ...[
          if (i > 0) const SizedBox(width: 12),
          Expanded(child: tiles[i]),
        ],
      ],
    );
  }
}

class _MiniStat extends StatelessWidget {
  const _MiniStat(this.label, this.value, this.unit, this.icon, this.color);

  final String label;
  final String value;
  final String unit;
  final IconData icon;
  final Color color;

  @override
  Widget build(BuildContext context) {
    final t = AppScope.of(context).palette;
    return LafCard(
      padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 10),
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(9),
            decoration: BoxDecoration(
              color: color.withValues(alpha: 0.15),
              borderRadius: BorderRadius.circular(13),
            ),
            child: Icon(icon, color: color, size: 20),
          ),
          const SizedBox(height: 10),
          RichText(
            text: TextSpan(
              children: [
                TextSpan(
                    text: value,
                    style: TextStyle(
                        color: t.text, fontSize: 20, fontWeight: FontWeight.w900)),
                TextSpan(
                    text: ' $unit',
                    style: TextStyle(
                        color: t.text2, fontSize: 11, fontWeight: FontWeight.w700)),
              ],
            ),
          ),
          const SizedBox(height: 2),
          Text(label,
              style: TextStyle(
                  color: t.text2, fontSize: 11.5, fontWeight: FontWeight.w700)),
        ],
      ),
    );
  }
}

class _TypeBreakdown extends StatelessWidget {
  const _TypeBreakdown({required this.app});

  final AppState app;

  @override
  Widget build(BuildContext context) {
    final t = app.palette;
    final rows = [
      (LessonType.vocab, 'Словарь · Luğat', t.accent),
      (LessonType.grammar, 'Грамматика · Til bilgisi', t.teal),
      (LessonType.task, 'Задания · Vazifeler', t.pink),
      (LessonType.reading, 'Чтение · Oquv', t.blue),
    ];
    return LafCard(
      child: Column(
        children: [
          for (var i = 0; i < rows.length; i++) ...[
            if (i > 0) const SizedBox(height: 16),
            _TypeRow(
              icon: rows[i].$1.icon,
              label: rows[i].$2,
              color: rows[i].$3,
              value: app.progressForType(rows[i].$1),
            ),
          ],
        ],
      ),
    );
  }
}

class _TypeRow extends StatelessWidget {
  const _TypeRow({
    required this.icon,
    required this.label,
    required this.color,
    required this.value,
  });

  final IconData icon;
  final String label;
  final Color color;
  final double value;

  @override
  Widget build(BuildContext context) {
    final t = AppScope.of(context).palette;
    return Row(
      children: [
        Icon(icon, color: color, size: 20),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(label,
                      style: TextStyle(
                          color: t.text, fontSize: 13.5, fontWeight: FontWeight.w800)),
                  Text('${(value * 100).round()}%',
                      style: TextStyle(
                          color: color, fontSize: 13.5, fontWeight: FontWeight.w900)),
                ],
              ),
              const SizedBox(height: 7),
              LafProgressBar(value: value, color: color),
            ],
          ),
        ),
      ],
    );
  }
}

class _WeeklyChart extends StatelessWidget {
  const _WeeklyChart({required this.palette});

  final LafPalette palette;

  @override
  Widget build(BuildContext context) {
    const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const values = [0.3, 0.55, 0.4, 0.75, 0.6, 0.2, 0.9];
    return LafCard(
      child: SizedBox(
        height: 148,
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            for (var i = 0; i < days.length; i++)
              Expanded(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    Expanded(
                      child: Align(
                        alignment: Alignment.bottomCenter,
                        child: TweenAnimationBuilder<double>(
                          tween: Tween(begin: 0, end: values[i]),
                          duration: Duration(milliseconds: 600 + i * 80),
                          curve: Curves.easeOutCubic,
                          builder: (context, v, _) => FractionallySizedBox(
                            heightFactor: v,
                            child: Container(
                              width: 16,
                              decoration: BoxDecoration(
                                gradient: LinearGradient(
                                  begin: Alignment.topCenter,
                                  end: Alignment.bottomCenter,
                                  colors: [
                                    palette.accent,
                                    palette.accent.withValues(alpha: 0.5),
                                  ],
                                ),
                                borderRadius: BorderRadius.circular(8),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(days[i],
                        style: TextStyle(
                            color: palette.text2,
                            fontSize: 11,
                            fontWeight: FontWeight.w700)),
                  ],
                ),
              ),
          ],
        ),
      ),
    );
  }
}

class _Achievements extends StatelessWidget {
  const _Achievements({required this.app});

  final AppState app;

  @override
  Widget build(BuildContext context) {
    final t = app.palette;
    final items = [
      ('🔥', 'Серия ${app.streakDays} дней', app.streakDays >= 1),
      ('📚', 'Первый модуль', app.completedModules >= 1),
      ('⚡', '${app.xp} XP', true),
      ('🏆', 'Финал A1', app.courseProgress >= 1),
    ];
    return Row(
      children: [
        for (var i = 0; i < items.length; i++) ...[
          if (i > 0) const SizedBox(width: 12),
          Expanded(
            child: LafCard(
              padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 6),
              child: Column(
                children: [
                  Opacity(
                    opacity: items[i].$3 ? 1 : 0.3,
                    child: Text(items[i].$1, style: const TextStyle(fontSize: 26)),
                  ),
                  const SizedBox(height: 6),
                  Text(items[i].$2,
                      textAlign: TextAlign.center,
                      style: TextStyle(
                          color: items[i].$3 ? t.text : t.text2,
                          fontSize: 10.5,
                          fontWeight: FontWeight.w700)),
                ],
              ),
            ),
          ),
        ],
      ],
    );
  }
}
