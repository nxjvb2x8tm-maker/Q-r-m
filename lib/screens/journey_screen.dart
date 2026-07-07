import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../data/course.dart';
import '../state/app_state.dart';
import '../widgets/common.dart';
import 'lesson_sheet.dart';

/// Экран 1 — волнистый путь уроков как в Duolingo.
class JourneyScreen extends StatelessWidget {
  const JourneyScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);

    // Группируем уроки по модулям.
    final modules = <CourseModule, List<LessonRef>>{};
    for (final ref in courseLessonRefs) {
      modules.putIfAbsent(ref.module, () => []).add(ref);
    }

    return SafeArea(
      bottom: false,
      child: CustomScrollView(
        physics: const BouncingScrollPhysics(),
        slivers: [
          SliverToBoxAdapter(child: _JourneyTop(app: app)),
          for (final entry in modules.entries) ...[
            SliverToBoxAdapter(
              child: _ModuleBanner(module: entry.key, refs: entry.value, app: app),
            ),
            _LessonPath(refs: entry.value, app: app),
          ],
          const SliverToBoxAdapter(child: SizedBox(height: 120)),
        ],
      ),
    );
  }
}

class _JourneyTop extends StatelessWidget {
  const _JourneyTop({required this.app});

  final AppState app;

  @override
  Widget build(BuildContext context) {
    final t = app.palette;
    return Padding(
      padding: const EdgeInsets.fromLTRB(18, 8, 18, 4),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('„Laf et" ile qırımtatarcanı ögren ✨',
                    style: TextStyle(
                        color: t.text2,
                        fontSize: 13,
                        fontWeight: FontWeight.w700)),
                const SizedBox(height: 2),
                Text('A1 — Kencetay',
                    style: TextStyle(
                        color: t.text,
                        fontSize: 24,
                        fontWeight: FontWeight.w900,
                        letterSpacing: -0.5)),
              ],
            ),
          ),
          StatPill(icon: Icons.local_fire_department_rounded, value: '${app.streakDays}', color: t.gold),
          const SizedBox(width: 8),
          StatPill(icon: Icons.bolt_rounded, value: '${app.xp}', color: t.accent),
        ],
      ),
    );
  }
}

/// Разделитель между большими модулями («Bölük»).
class _ModuleBanner extends StatelessWidget {
  const _ModuleBanner({required this.module, required this.refs, required this.app});

  final CourseModule module;
  final List<LessonRef> refs;
  final AppState app;

  @override
  Widget build(BuildContext context) {
    final t = app.palette;
    final section = refs.first.section;
    final moduleNumber = refs.first.moduleNumber;
    final doneInModule =
        refs.where((r) => r.globalIndex < app.completedLessons).length;

    return Padding(
      padding: const EdgeInsets.fromLTRB(18, 26, 18, 6),
      child: Column(
        children: [
          Row(
            children: [
              Expanded(child: Divider(color: t.border, thickness: 1)),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 10),
                child: Text('${section.number}. Bölük',
                    style: TextStyle(
                        color: t.text3,
                        fontSize: 11,
                        fontWeight: FontWeight.w800,
                        letterSpacing: 1)),
              ),
              Expanded(child: Divider(color: t.border, thickness: 1)),
            ],
          ),
          const SizedBox(height: 10),
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [module.color, module.color.withOpacity(0.7)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(22),
              boxShadow: [
                BoxShadow(
                  color: module.color.withOpacity(0.4),
                  blurRadius: 20,
                  offset: const Offset(0, 10),
                ),
              ],
            ),
            child: Row(
              children: [
                Container(
                  width: 46,
                  height: 46,
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.22),
                    borderRadius: BorderRadius.circular(14),
                  ),
                  child: Center(
                    child: Text('$moduleNumber',
                        style: const TextStyle(
                            color: Colors.white,
                            fontSize: 20,
                            fontWeight: FontWeight.w900)),
                  ),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(module.title,
                          style: const TextStyle(
                              color: Colors.white,
                              fontSize: 17,
                              fontWeight: FontWeight.w900)),
                      const SizedBox(height: 2),
                      Text(module.subtitle,
                          style: TextStyle(
                              color: Colors.white.withOpacity(0.85),
                              fontSize: 12.5,
                              fontWeight: FontWeight.w600)),
                    ],
                  ),
                ),
                Text('$doneInModule/${refs.length}',
                    style: const TextStyle(
                        color: Colors.white,
                        fontSize: 15,
                        fontWeight: FontWeight.w900)),
              ],
            ),
          ),
          const SizedBox(height: 4),
        ],
      ),
    );
  }
}

/// Волнистый путь из кружочков-уроков внутри модуля.
class _LessonPath extends StatelessWidget {
  const _LessonPath({required this.refs, required this.app});

  final List<LessonRef> refs;
  final AppState app;

  static const _nodeSize = 76.0;
  static const _rowHeight = 108.0;
  static const _amplitude = 96.0;

  @override
  Widget build(BuildContext context) {
    final t = app.palette;
    return SliverToBoxAdapter(
      child: LayoutBuilder(
        builder: (context, constraints) {
          final width = constraints.maxWidth;
          final centerX = width / 2;
          final positions = <Offset>[];
          for (var i = 0; i < refs.length; i++) {
            final dx = math.sin(i * 0.9) * _amplitude;
            positions.add(Offset(centerX + dx, _rowHeight * i + _rowHeight / 2));
          }
          final height = _rowHeight * refs.length;

          return SizedBox(
            height: height,
            width: width,
            child: Stack(
              children: [
                // Пунктирная волнистая линия-соединитель.
                Positioned.fill(
                  child: CustomPaint(
                    painter: _PathPainter(
                      positions: positions,
                      color: t.border,
                      completedColor: refs.first.module.color.withOpacity(0.55),
                      completedUntil: app.completedLessons,
                      refs: refs,
                    ),
                  ),
                ),
                for (var i = 0; i < refs.length; i++)
                  Positioned(
                    left: positions[i].dx - _nodeSize / 2,
                    top: positions[i].dy - _nodeSize / 2,
                    child: _LessonNode(ref: refs[i], app: app, size: _nodeSize),
                  ),
              ],
            ),
          );
        },
      ),
    );
  }
}

class _PathPainter extends CustomPainter {
  _PathPainter({
    required this.positions,
    required this.color,
    required this.completedColor,
    required this.completedUntil,
    required this.refs,
  });

  final List<Offset> positions;
  final Color color;
  final Color completedColor;
  final int completedUntil;
  final List<LessonRef> refs;

  @override
  void paint(Canvas canvas, Size size) {
    for (var i = 0; i < positions.length - 1; i++) {
      final done = refs[i].globalIndex < completedUntil;
      final paint = Paint()
        ..style = PaintingStyle.stroke
        ..strokeWidth = 6
        ..strokeCap = StrokeCap.round
        ..color = done ? completedColor : color;
      final p0 = positions[i];
      final p1 = positions[i + 1];
      final mid = Offset((p0.dx + p1.dx) / 2, (p0.dy + p1.dy) / 2);
      final path = Path()
        ..moveTo(p0.dx, p0.dy)
        ..quadraticBezierTo(p0.dx, mid.dy, mid.dx, mid.dy)
        ..quadraticBezierTo(p1.dx, mid.dy, p1.dx, p1.dy);
      _drawDashed(canvas, path, paint, done);
    }
  }

  void _drawDashed(Canvas canvas, Path path, Paint paint, bool solid) {
    if (solid) {
      canvas.drawPath(path, paint);
      return;
    }
    for (final metric in path.computeMetrics()) {
      var dist = 0.0;
      while (dist < metric.length) {
        final seg = metric.extractPath(dist, dist + 10);
        canvas.drawPath(seg, paint);
        dist += 18;
      }
    }
  }

  @override
  bool shouldRepaint(_PathPainter old) =>
      old.completedUntil != completedUntil || old.positions != positions;
}

/// Кружок-урок: пройден / текущий / заблокирован.
class _LessonNode extends StatelessWidget {
  const _LessonNode({required this.ref, required this.app, required this.size});

  final LessonRef ref;
  final AppState app;
  final double size;

  @override
  Widget build(BuildContext context) {
    final t = app.palette;
    final done = ref.globalIndex < app.completedLessons;
    final current = ref.globalIndex == app.completedLessons;
    final locked = ref.globalIndex > app.completedLessons;
    final color = ref.module.color;

    final Widget circle = Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        gradient: locked
            ? null
            : LinearGradient(
                colors: [color, color.withOpacity(0.72)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
        color: locked ? t.card2 : null,
        border: Border.all(
          color: locked ? t.border : Colors.white.withOpacity(0.35),
          width: 3,
        ),
        boxShadow: locked
            ? null
            : [
                BoxShadow(
                  color: color.withOpacity(0.5),
                  blurRadius: 18,
                  offset: const Offset(0, 8),
                ),
              ],
      ),
      child: Icon(
        done ? Icons.check_rounded : ref.lesson.type.icon,
        color: locked ? t.text3 : Colors.white,
        size: 30,
      ),
    );

    return GestureDetector(
      onTap: locked
          ? null
          : () => showLessonSheet(context, ref),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (current)
            _CurrentBadge(color: color)
          else
            const SizedBox(height: 20),
          _Bounce(active: current, child: circle),
        ],
      ),
    );
  }
}

class _CurrentBadge extends StatelessWidget {
  const _CurrentBadge({required this.color});

  final Color color;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 2),
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 3),
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(10),
        boxShadow: [
          BoxShadow(color: color.withOpacity(0.5), blurRadius: 10),
        ],
      ),
      child: const Text('СТАРТ',
          style: TextStyle(
              color: Colors.white,
              fontSize: 9.5,
              fontWeight: FontWeight.w900,
              letterSpacing: 0.5)),
    );
  }
}

/// Лёгкая пульсация текущего узла.
class _Bounce extends StatefulWidget {
  const _Bounce({required this.child, required this.active});

  final Widget child;
  final bool active;

  @override
  State<_Bounce> createState() => _BounceState();
}

class _BounceState extends State<_Bounce> with SingleTickerProviderStateMixin {
  late final AnimationController _c = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 1400),
  );

  @override
  void initState() {
    super.initState();
    if (widget.active) _c.repeat(reverse: true);
  }

  @override
  void didUpdateWidget(_Bounce old) {
    super.didUpdateWidget(old);
    if (widget.active && !_c.isAnimating) {
      _c.repeat(reverse: true);
    } else if (!widget.active && _c.isAnimating) {
      _c.stop();
    }
  }

  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (!widget.active) return widget.child;
    return AnimatedBuilder(
      animation: _c,
      builder: (context, child) => Transform.translate(
        offset: Offset(0, -4 * _c.value),
        child: child,
      ),
      child: widget.child,
    );
  }
}
