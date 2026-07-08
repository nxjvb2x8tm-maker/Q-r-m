import 'package:flutter/material.dart';

import '../data/catalog.dart';
import '../state/app_state.dart';
import '../widgets/common.dart';
import 'module_detail.dart';

/// Экран 3 — каталог всех модулей (быстрый возврат к пройденному).
class ModulesScreen extends StatefulWidget {
  const ModulesScreen({super.key});

  @override
  State<ModulesScreen> createState() => _ModulesScreenState();
}

class _ModulesScreenState extends State<ModulesScreen> {
  ModType? _filter;

  @override
  Widget build(BuildContext context) {
    final visible = _filter == null
        ? catalogModules
        : catalogModules.where((m) => m.type == _filter).toList();

    return LafScaffoldBody(
      slivers: [
        LafHeader(
          title: 'Modüller',
          subtitle: 'A1 · ${catalogModules.length} модулей',
        ).sliver,
        SliverToBoxAdapter(child: _FilterBar(
          selected: _filter,
          onSelect: (f) => setState(() => _filter = f),
        )),
        SliverPadding(
          padding: const EdgeInsets.fromLTRB(18, 8, 18, 0),
          sliver: SliverList.separated(
            itemCount: visible.length,
            separatorBuilder: (_, __) => const SizedBox(height: 12),
            itemBuilder: (context, i) => _ModuleTile(module: visible[i]),
          ),
        ),
      ],
    );
  }
}

class _FilterBar extends StatelessWidget {
  const _FilterBar({required this.selected, required this.onSelect});

  final ModType? selected;
  final ValueChanged<ModType?> onSelect;

  @override
  Widget build(BuildContext context) {
    final t = AppScope.of(context).palette;
    final chips = <(ModType?, String)>[
      (null, 'Все'),
      (ModType.vocab, 'Словарь'),
      (ModType.grammar, 'Грамматика'),
      (ModType.task, 'Задания'),
      (ModType.dialog, 'Диалоги'),
      (ModType.reading, 'Чтение'),
    ];
    return SizedBox(
      height: 44,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.fromLTRB(18, 6, 18, 6),
        itemCount: chips.length,
        separatorBuilder: (_, __) => const SizedBox(width: 8),
        itemBuilder: (context, i) {
          final active = selected == chips[i].$1;
          final color = chips[i].$1?.color ?? t.accent;
          return GestureDetector(
            onTap: () => onSelect(chips[i].$1),
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 200),
              padding: const EdgeInsets.symmetric(horizontal: 16),
              alignment: Alignment.center,
              decoration: BoxDecoration(
                color: active ? color : t.card,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: active ? color : t.border),
                boxShadow: active
                    ? [BoxShadow(color: color.withValues(alpha: 0.35), blurRadius: 12, offset: const Offset(0, 4))]
                    : null,
              ),
              child: Text(chips[i].$2,
                  style: TextStyle(
                      color: active ? Colors.white : t.text2,
                      fontSize: 13.5,
                      fontWeight: FontWeight.w800)),
            ),
          );
        },
      ),
    );
  }
}

class _ModuleTile extends StatelessWidget {
  const _ModuleTile({required this.module});

  final CatalogModule module;

  @override
  Widget build(BuildContext context) {
    final t = AppScope.of(context).palette;
    final color = module.type.color;
    return LafCard(
      padding: const EdgeInsets.all(14),
      onTap: () => openModuleDetail(context, module),
      child: Row(
        children: [
          Container(
            width: 54,
            height: 54,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [color, color.withValues(alpha: 0.7)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(16),
              boxShadow: [
                BoxShadow(color: color.withValues(alpha: 0.4), blurRadius: 12, offset: const Offset(0, 6)),
              ],
            ),
            child: Icon(module.type.icon, color: Colors.white, size: 26),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Expanded(
                      child: Text(module.title,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: TextStyle(
                              color: t.text,
                              fontSize: 15.5,
                              fontWeight: FontWeight.w900)),
                    ),
                    Text('Открыт',
                        style: TextStyle(
                            color: color,
                            fontSize: 12,
                            fontWeight: FontWeight.w800)),
                  ],
                ),
                const SizedBox(height: 3),
                Text('${module.sub} · ${module.words} слов',
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                        color: t.text2,
                        fontSize: 12,
                        fontWeight: FontWeight.w600)),
                const SizedBox(height: 9),
                LafProgressBar(value: module.progress, color: color, height: 7),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

extension on Widget {
  Widget get sliver => SliverToBoxAdapter(child: this);
}
