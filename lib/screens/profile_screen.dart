import 'package:flutter/material.dart';

import '../state/app_state.dart';
import '../widgets/common.dart';

/// Экран 4 — профиль, настройки, помощь.
class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final t = app.palette;

    return LafScaffoldBody(
      slivers: [
        SliverPadding(
          padding: const EdgeInsets.fromLTRB(18, 12, 18, 0),
          sliver: SliverList(
            delegate: SliverChildListDelegate([
              _ProfileHeader(app: app),
              const SizedBox(height: 22),
              const SectionLabel('Оформление'),
              const SizedBox(height: 12),
              _ThemeToggle(app: app),
              const SizedBox(height: 20),
              const SectionLabel('Настройки'),
              const SizedBox(height: 12),
              _SettingsGroup(app: app),
              const SizedBox(height: 20),
              const SectionLabel('Поддержка'),
              const SizedBox(height: 12),
              _SupportGroup(app: app),
              const SizedBox(height: 20),
              Center(
                child: Text('Laf et · v1.0.0 · A1 Kencetay',
                    style: TextStyle(
                        color: t.text3, fontSize: 12, fontWeight: FontWeight.w700)),
              ),
            ]),
          ),
        ),
      ],
    );
  }
}

class _ProfileHeader extends StatelessWidget {
  const _ProfileHeader({required this.app});

  final AppState app;

  @override
  Widget build(BuildContext context) {
    final t = app.palette;
    return LafCard(
      child: Column(
        children: [
          Stack(
            children: [
              Container(
                width: 92,
                height: 92,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: LinearGradient(
                    colors: [t.accent, const Color(0xFF00CEC9)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  boxShadow: [
                    BoxShadow(color: t.accent.withOpacity(0.4), blurRadius: 18, offset: const Offset(0, 8)),
                  ],
                ),
                child: Center(
                  child: Text(
                    app.userName.isNotEmpty ? app.userName[0].toUpperCase() : '?',
                    style: const TextStyle(
                        color: Colors.white, fontSize: 40, fontWeight: FontWeight.w900),
                  ),
                ),
              ),
              Positioned(
                right: 0,
                bottom: 0,
                child: GestureDetector(
                  onTap: () => _editName(context, app),
                  child: Container(
                    padding: const EdgeInsets.all(7),
                    decoration: BoxDecoration(
                      color: t.card,
                      shape: BoxShape.circle,
                      border: Border.all(color: t.border),
                    ),
                    child: Icon(Icons.edit_rounded, size: 15, color: t.accent),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 14),
          GestureDetector(
            onTap: () => _editName(context, app),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(app.userName,
                    style: TextStyle(
                        color: t.text, fontSize: 22, fontWeight: FontWeight.w900)),
                const SizedBox(width: 6),
                Icon(Icons.edit_rounded, size: 16, color: t.text2),
              ],
            ),
          ),
          const SizedBox(height: 8),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
            decoration: BoxDecoration(
              color: t.accentSoft,
              borderRadius: BorderRadius.circular(20),
            ),
            child: Text('A1 · Kencetay',
                style: TextStyle(
                    color: t.accent, fontSize: 13, fontWeight: FontWeight.w800)),
          ),
          const SizedBox(height: 18),
          Row(
            children: [
              _HeaderStat(value: '${app.streakDays}', label: 'Серия', icon: Icons.local_fire_department_rounded, color: t.gold),
              _Divider(color: t.border),
              _HeaderStat(value: '${app.xp}', label: 'Опыт', icon: Icons.bolt_rounded, color: t.accent),
              _Divider(color: t.border),
              _HeaderStat(value: '${(app.courseProgress * 100).round()}%', label: 'Курс', icon: Icons.school_rounded, color: t.teal),
            ],
          ),
        ],
      ),
    );
  }
}

void _editName(BuildContext context, AppState app) {
  final controller = TextEditingController(text: app.userName);
  final t = app.palette;
  showDialog(
    context: context,
    builder: (context) => AlertDialog(
      backgroundColor: t.card,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(22)),
      title: Text('Ваше имя', style: TextStyle(color: t.text, fontWeight: FontWeight.w900)),
      content: TextField(
        controller: controller,
        autofocus: true,
        style: TextStyle(color: t.text, fontWeight: FontWeight.w700),
        decoration: InputDecoration(
          filled: true,
          fillColor: t.card2,
          border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(14), borderSide: BorderSide.none),
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context),
          child: Text('Отмена', style: TextStyle(color: t.text2, fontWeight: FontWeight.w800)),
        ),
        FilledButton(
          onPressed: () {
            app.setName(controller.text);
            Navigator.pop(context);
          },
          style: FilledButton.styleFrom(backgroundColor: t.accent),
          child: const Text('Сохранить', style: TextStyle(fontWeight: FontWeight.w800)),
        ),
      ],
    ),
  );
}

class _HeaderStat extends StatelessWidget {
  const _HeaderStat({
    required this.value,
    required this.label,
    required this.icon,
    required this.color,
  });

  final String value;
  final String label;
  final IconData icon;
  final Color color;

  @override
  Widget build(BuildContext context) {
    final t = AppScope.of(context).palette;
    return Expanded(
      child: Column(
        children: [
          Icon(icon, color: color, size: 20),
          const SizedBox(height: 4),
          Text(value,
              style: TextStyle(color: t.text, fontSize: 18, fontWeight: FontWeight.w900)),
          Text(label,
              style: TextStyle(color: t.text2, fontSize: 11.5, fontWeight: FontWeight.w700)),
        ],
      ),
    );
  }
}

class _Divider extends StatelessWidget {
  const _Divider({required this.color});

  final Color color;

  @override
  Widget build(BuildContext context) =>
      Container(width: 1, height: 38, color: color);
}

class _ThemeToggle extends StatelessWidget {
  const _ThemeToggle({required this.app});

  final AppState app;

  @override
  Widget build(BuildContext context) {
    final t = app.palette;
    return LafCard(
      padding: const EdgeInsets.all(8),
      child: Row(
        children: [
          Expanded(
            child: _ThemeOption(
              label: 'Тёмная',
              icon: Icons.dark_mode_rounded,
              active: app.isDark,
              onTap: () => app.setTheme(true),
            ),
          ),
          const SizedBox(width: 8),
          Expanded(
            child: _ThemeOption(
              label: 'Светлая',
              icon: Icons.light_mode_rounded,
              active: !app.isDark,
              onTap: () => app.setTheme(false),
            ),
          ),
        ],
      ),
    );
  }
}

class _ThemeOption extends StatelessWidget {
  const _ThemeOption({
    required this.label,
    required this.icon,
    required this.active,
    required this.onTap,
  });

  final String label;
  final IconData icon;
  final bool active;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final t = AppScope.of(context).palette;
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 220),
        padding: const EdgeInsets.symmetric(vertical: 20),
        decoration: BoxDecoration(
          color: active ? t.accentSoft : t.card2,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: active ? t.accent : Colors.transparent,
            width: 2,
          ),
        ),
        child: Column(
          children: [
            Icon(icon, color: active ? t.accent : t.text2, size: 26),
            const SizedBox(height: 8),
            Text(label,
                style: TextStyle(
                    color: active ? t.accent : t.text2,
                    fontSize: 13.5,
                    fontWeight: FontWeight.w800)),
          ],
        ),
      ),
    );
  }
}

class _SettingsGroup extends StatelessWidget {
  const _SettingsGroup({required this.app});

  final AppState app;

  @override
  Widget build(BuildContext context) {
    final t = app.palette;
    return LafCard(
      padding: const EdgeInsets.symmetric(vertical: 4, horizontal: 6),
      child: Column(
        children: [
          _SettingRow(
            icon: Icons.notifications_rounded,
            color: t.gold,
            label: 'Уведомления',
            trailing: Switch.adaptive(
              value: app.notificationsOn,
              activeColor: t.accent,
              onChanged: app.setNotifications,
            ),
          ),
          _RowDivider(color: t.border),
          _SettingRow(
            icon: Icons.local_fire_department_rounded,
            color: t.red,
            label: 'Цель в день',
            trailing: _GoalPicker(app: app),
          ),
          _RowDivider(color: t.border),
          _SettingRow(
            icon: Icons.widgets_rounded,
            color: t.accent,
            label: 'Виджет',
            trailing: Icon(Icons.chevron_right_rounded, color: t.text2),
          ),
          _RowDivider(color: t.border),
          _SettingRow(
            icon: Icons.bar_chart_rounded,
            color: t.teal,
            label: 'Статистика',
            trailing: Text('скоро',
                style: TextStyle(color: t.text2, fontSize: 12.5, fontWeight: FontWeight.w700)),
          ),
        ],
      ),
    );
  }
}

class _GoalPicker extends StatelessWidget {
  const _GoalPicker({required this.app});

  final AppState app;

  @override
  Widget build(BuildContext context) {
    final t = app.palette;
    return GestureDetector(
      onTap: () {
        const options = [5, 10, 15, 20, 30];
        final next = options[(options.indexOf(app.dailyGoalMin) + 1) % options.length];
        app.setDailyGoal(next);
      },
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text('${app.dailyGoalMin} мин',
              style: TextStyle(color: t.accent, fontSize: 14, fontWeight: FontWeight.w800)),
          Icon(Icons.chevron_right_rounded, color: t.text2),
        ],
      ),
    );
  }
}

class _SupportGroup extends StatelessWidget {
  const _SupportGroup({required this.app});

  final AppState app;

  @override
  Widget build(BuildContext context) {
    final t = app.palette;
    return LafCard(
      padding: const EdgeInsets.symmetric(vertical: 4, horizontal: 6),
      child: Column(
        children: [
          _SettingRow(
            icon: Icons.help_rounded,
            color: t.blue,
            label: 'Помощь и вопросы',
            trailing: Icon(Icons.chevron_right_rounded, color: t.text2),
          ),
          _RowDivider(color: t.border),
          _SettingRow(
            icon: Icons.info_rounded,
            color: t.accent,
            label: 'О приложении',
            trailing: Icon(Icons.chevron_right_rounded, color: t.text2),
          ),
          _RowDivider(color: t.border),
          _SettingRow(
            icon: Icons.star_rounded,
            color: t.gold,
            label: 'Оценить «Laf et»',
            trailing: Icon(Icons.chevron_right_rounded, color: t.text2),
          ),
        ],
      ),
    );
  }
}

class _SettingRow extends StatelessWidget {
  const _SettingRow({
    required this.icon,
    required this.color,
    required this.label,
    required this.trailing,
  });

  final IconData icon;
  final Color color;
  final String label;
  final Widget trailing;

  @override
  Widget build(BuildContext context) {
    final t = AppScope.of(context).palette;
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: color.withOpacity(0.15),
              borderRadius: BorderRadius.circular(11),
            ),
            child: Icon(icon, color: color, size: 20),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Text(label,
                style: TextStyle(color: t.text, fontSize: 15, fontWeight: FontWeight.w800)),
          ),
          trailing,
        ],
      ),
    );
  }
}

class _RowDivider extends StatelessWidget {
  const _RowDivider({required this.color});

  final Color color;

  @override
  Widget build(BuildContext context) => Padding(
        padding: const EdgeInsets.only(left: 54),
        child: Divider(height: 1, color: color),
      );
}
