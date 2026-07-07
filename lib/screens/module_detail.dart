import 'package:flutter/material.dart';

import '../data/catalog.dart';
import '../data/vocabulary.dart';
import '../state/app_state.dart';
import '../widgets/common.dart';

/// Открывает детальную страницу модуля из каталога.
void openModuleDetail(BuildContext context, CatalogModule module) {
  Navigator.of(context).push(
    MaterialPageRoute(builder: (_) => ModuleDetailScreen(module: module)),
  );
}

class ModuleDetailScreen extends StatelessWidget {
  const ModuleDetailScreen({super.key, required this.module});

  final CatalogModule module;

  @override
  Widget build(BuildContext context) {
    final t = AppScope.of(context).palette;
    final color = module.type.color;
    final words = module.wordList;

    return Scaffold(
      backgroundColor: t.bg,
      body: SafeArea(
        child: CustomScrollView(
          physics: const BouncingScrollPhysics(),
          slivers: [
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(14, 8, 18, 4),
                child: Row(
                  children: [
                    _BackButton(color: color),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(module.type.label,
                          style: TextStyle(
                              color: color,
                              fontSize: 13,
                              fontWeight: FontWeight.w800)),
                    ),
                  ],
                ),
              ),
            ),
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(18, 8, 18, 8),
                child: LafCard(
                  gradient: LinearGradient(
                    colors: [color, color.withOpacity(0.72)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Icon(module.type.icon, color: Colors.white, size: 34),
                      const SizedBox(height: 12),
                      Text(module.title,
                          style: const TextStyle(
                              color: Colors.white,
                              fontSize: 22,
                              fontWeight: FontWeight.w900)),
                      const SizedBox(height: 4),
                      Text(module.sub,
                          style: TextStyle(
                              color: Colors.white.withOpacity(0.9),
                              fontSize: 13.5,
                              fontWeight: FontWeight.w600)),
                      const SizedBox(height: 16),
                      Row(
                        children: [
                          _Badge(icon: Icons.translate_rounded, text: '${module.words} слов'),
                          const SizedBox(width: 10),
                          _Badge(
                              icon: Icons.pie_chart_rounded,
                              text: '${(module.progress * 100).round()}% пройдено'),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),
            if (words != null && words.isNotEmpty) ...[
              const SliverToBoxAdapter(
                child: Padding(
                  padding: EdgeInsets.fromLTRB(20, 12, 20, 8),
                  child: SectionLabel('Словарь модуля'),
                ),
              ),
              SliverPadding(
                padding: const EdgeInsets.fromLTRB(18, 0, 18, 24),
                sliver: SliverList.separated(
                  itemCount: words.length,
                  separatorBuilder: (_, __) => const SizedBox(height: 10),
                  itemBuilder: (context, i) =>
                      _WordRow(pair: words[i], color: color, index: i),
                ),
              ),
            ] else
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.all(40),
                  child: Column(
                    children: [
                      Icon(module.type.icon, color: t.text3, size: 48),
                      const SizedBox(height: 14),
                      Text('Интерактивные упражнения этого модуля',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                              color: t.text2,
                              fontSize: 14,
                              fontWeight: FontWeight.w700)),
                    ],
                  ),
                ),
              ),
          ],
        ),
      ),
      bottomNavigationBar: SafeArea(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(18, 0, 18, 14),
          child: FilledButton(
            onPressed: () => Navigator.of(context).pop(),
            style: FilledButton.styleFrom(
              backgroundColor: color,
              foregroundColor: Colors.white,
              minimumSize: const Size.fromHeight(54),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
              elevation: 0,
            ),
            child: const Text('Повторить модуль',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900)),
          ),
        ),
      ),
    );
  }
}

class _BackButton extends StatelessWidget {
  const _BackButton({required this.color});

  final Color color;

  @override
  Widget build(BuildContext context) {
    final t = AppScope.of(context).palette;
    return GestureDetector(
      onTap: () => Navigator.of(context).pop(),
      child: Container(
        width: 40,
        height: 40,
        decoration: BoxDecoration(
          color: t.card,
          borderRadius: BorderRadius.circular(13),
          border: Border.all(color: t.border),
        ),
        child: Icon(Icons.arrow_back_rounded, color: t.text, size: 22),
      ),
    );
  }
}

class _Badge extends StatelessWidget {
  const _Badge({required this.icon, required this.text});

  final IconData icon;
  final String text;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 11, vertical: 6),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.2),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, color: Colors.white, size: 15),
          const SizedBox(width: 5),
          Text(text,
              style: const TextStyle(
                  color: Colors.white, fontSize: 12, fontWeight: FontWeight.w800)),
        ],
      ),
    );
  }
}

class _WordRow extends StatelessWidget {
  const _WordRow({required this.pair, required this.color, required this.index});

  final WordPair pair;
  final Color color;
  final int index;

  @override
  Widget build(BuildContext context) {
    final t = AppScope.of(context).palette;
    return LafCard(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 13),
      child: Row(
        children: [
          Container(
            width: 34,
            height: 34,
            decoration: BoxDecoration(
              color: color.withOpacity(0.14),
              borderRadius: BorderRadius.circular(11),
            ),
            child: Center(
              child: Text('${index + 1}',
                  style: TextStyle(
                      color: color, fontSize: 13, fontWeight: FontWeight.w900)),
            ),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(pair.qr,
                    style: TextStyle(
                        color: t.text, fontSize: 16, fontWeight: FontWeight.w900)),
                const SizedBox(height: 1),
                Text(pair.ru,
                    style: TextStyle(
                        color: t.text2, fontSize: 13, fontWeight: FontWeight.w600)),
              ],
            ),
          ),
          Icon(Icons.volume_up_rounded, color: t.text3, size: 20),
        ],
      ),
    );
  }
}
