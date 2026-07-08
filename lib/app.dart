import 'package:flutter/material.dart';

import 'screens/journey_screen.dart';
import 'screens/progress_screen.dart';
import 'screens/modules_screen.dart';
import 'screens/profile_screen.dart';
import 'state/app_state.dart';
import 'theme/app_theme.dart';
import 'widgets/nav_bar.dart';

/// Корневая оболочка: 4 главных экрана + плавающая панель управления.
class RootShell extends StatefulWidget {
  const RootShell({super.key});

  @override
  State<RootShell> createState() => _RootShellState();
}

class _RootShellState extends State<RootShell> {
  int _index = 0;

  static const _screens = [
    JourneyScreen(),
    ProgressScreen(),
    ModulesScreen(),
    ProfileScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    final t = AppScope.of(context).palette;
    return Scaffold(
      backgroundColor: t.bg,
      extendBody: true,
      body: _AmbientBackground(
        palette: t,
        child: AnimatedSwitcher(
          duration: const Duration(milliseconds: 320),
          switchInCurve: Curves.easeOutCubic,
          switchOutCurve: Curves.easeIn,
          transitionBuilder: (child, animation) {
            return FadeTransition(
              opacity: animation,
              child: SlideTransition(
                position: Tween<Offset>(
                  begin: const Offset(0, 0.02),
                  end: Offset.zero,
                ).animate(animation),
                child: child,
              ),
            );
          },
          child: KeyedSubtree(
            key: ValueKey(_index),
            child: _screens[_index],
          ),
        ),
      ),
      bottomNavigationBar: LafNavBar(
        index: _index,
        onChanged: (i) => setState(() => _index = i),
      ),
    );
  }
}

/// Мягкие цветные пятна на фоне — премиальная «дорогая» атмосфера.
class _AmbientBackground extends StatelessWidget {
  const _AmbientBackground({required this.palette, required this.child});

  final LafPalette palette;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return DecoratedBox(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: palette.isDark
              ? [const Color(0xFF0D0D18), const Color(0xFF121022)]
              : [const Color(0xFFF3F2FC), const Color(0xFFEDF0FB)],
        ),
      ),
      child: Stack(
        children: [
          Positioned(
            top: -120,
            right: -80,
            child: _Blob(color: palette.accent.withValues(alpha: 0.18)),
          ),
          Positioned(
            bottom: 40,
            left: -110,
            child: _Blob(color: palette.teal.withValues(alpha: 0.14)),
          ),
          Positioned.fill(child: child),
        ],
      ),
    );
  }
}

class _Blob extends StatelessWidget {
  const _Blob({required this.color});

  final Color color;

  @override
  Widget build(BuildContext context) {
    return IgnorePointer(
      child: Container(
        width: 320,
        height: 320,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          gradient: RadialGradient(
            colors: [color, color.withValues(alpha: 0)],
          ),
        ),
      ),
    );
  }
}
